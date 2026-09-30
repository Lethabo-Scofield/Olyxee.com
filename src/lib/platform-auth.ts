import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import type { Pool, PoolClient } from "pg";
import { pool } from "@/lib/db";

const scrypt = promisify(scryptCallback);
export const PLATFORM_COOKIE = "olyxee_platform_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;

export interface PlatformUser {
  id: string;
  email: string;
  name: string;
  company: string;
  created_at: Date;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt:${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, salt, hex] = stored.split(":");
  if (algorithm !== "scrypt" || !salt || !hex || !/^[a-f0-9]{128}$/i.test(hex)) return false;
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  return timingSafeEqual(actual, expected);
}

export async function createPlatformUser(name: string, email: string, company: string, password: string, db: Pool | PoolClient = pool): Promise<string> {
  const id = randomUUID();
  const passwordHash = await hashPassword(password);
  await db.query(
    "INSERT INTO platform_users (id, name, email, company, password_hash) VALUES ($1, $2, $3, $4, $5)",
    [id, name, email, company, passwordHash],
  );
  return id;
}

export async function createPlatformSession(userId: string, db: Pool | PoolClient = pool): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await db.query(
    "INSERT INTO platform_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '30 days')",
    [hashToken(token), userId],
  );
  return token;
}

// Shared, atomic buckets survive app restarts and work across server instances.
export async function consumeAuthLimit(kind: string, identity: string, max: number, windowSeconds: number): Promise<boolean> {
  const key = hashToken(`${kind}:${identity}`);
  const result = await pool.query<{ attempts: number }>(
    `INSERT INTO platform_auth_limits (bucket_key, attempts, reset_at)
     VALUES ($1, 1, now() + ($2::int * interval '1 second'))
     ON CONFLICT (bucket_key) DO UPDATE SET
       attempts = CASE WHEN platform_auth_limits.reset_at <= now() THEN 1 ELSE platform_auth_limits.attempts + 1 END,
       reset_at = CASE WHEN platform_auth_limits.reset_at <= now() THEN now() + ($2::int * interval '1 second') ELSE platform_auth_limits.reset_at END
     RETURNING attempts`,
    [key, windowSeconds],
  );
  // Periodically remove old buckets to keep the table bounded.
  if (Math.random() < 0.02) {
    await pool.query("DELETE FROM platform_auth_limits WHERE reset_at < now() - interval '1 day'");
  }
  return result.rows[0].attempts <= max;
}

export async function clearAuthLimit(kind: string, identity: string): Promise<void> {
  await pool.query("DELETE FROM platform_auth_limits WHERE bucket_key = $1", [hashToken(`${kind}:${identity}`)]);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}

export async function currentPlatformUser(): Promise<PlatformUser | null> {
  const token = (await cookies()).get(PLATFORM_COOKIE)?.value;
  if (!token) return null;
  const result = await pool.query<PlatformUser>(
    `SELECT u.id, u.email, u.name, u.company, u.created_at
     FROM platform_sessions s JOIN platform_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  );
  return result.rows[0] ?? null;
}

export async function currentSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(PLATFORM_COOKIE)?.value;
}