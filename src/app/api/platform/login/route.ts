import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { clearAuthLimit, consumeAuthLimit, createPlatformSession, PLATFORM_COOKIE, sessionCookieOptions, verifyPassword } from "@/lib/platform-auth";
import { readJson, rejectCrossSite } from "@/lib/platform-request";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rejected = rejectCrossSite(req);
  if (rejected) return rejected;
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || email.length > 254 || !password || password.length > 128) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }
  try {
    // Per-email protection cannot be bypassed by changing a forwarded IP header.
    // The global bucket also caps work across addresses and server instances.
    if (!(await consumeAuthLimit("login:global", "all", 300, 60)) ||
      !(await consumeAuthLimit("login:email", email, 8, 900))) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }
    const result = await pool.query<{ id: string; password_hash: string }>(
      "SELECT id, password_hash FROM platform_users WHERE email = $1",
      [email],
    );
    const user = result.rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }
    const token = await createPlatformSession(user.id);
    await clearAuthLimit("login:email", email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(PLATFORM_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (error) {
    console.error("Platform login failed", error);
    return NextResponse.json({ error: "Sign in is unavailable right now. Please try again later." }, { status: 503 });
  }
}