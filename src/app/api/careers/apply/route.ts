import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { findRoleByTitle } from "@/lib/careers-roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LEN = {
  name: 120,
  email: 200,
  portfolio: 500,
  message: 2000,
};

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const rateBuckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = (rateBuckets.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_WINDOW_MS
  );
  if (bucket.length >= RATE_MAX) {
    rateBuckets.set(ip, bucket);
    return false;
  }
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  if (rateBuckets.size > 5000) {
    for (const [k, v] of rateBuckets) {
      if (v.every((ts) => now - ts >= RATE_WINDOW_MS)) rateBuckets.delete(k);
    }
  }
  return true;
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const requestedRoleTitle = clean(body.role_title, 200);
    const role = findRoleByTitle(requestedRoleTitle);
    if (!role) {
      return NextResponse.json(
        { error: "This role isn't open right now." },
        { status: 400 }
      );
    }

    const full_name = clean(body.full_name, MAX_LEN.name);
    const email = clean(body.email, MAX_LEN.email);
    const portfolio = clean(body.portfolio, MAX_LEN.portfolio);
    const message = clean(body.message, MAX_LEN.message);

    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO applications
        (role_title, role_team, role_type, full_name, email, portfolio, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [role.title, role.team, role.type, full_name, email, portfolio, message]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("careers apply error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
