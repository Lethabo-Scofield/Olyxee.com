import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { consumeAuthLimit, createPlatformSession, createPlatformUser, PLATFORM_COOKIE, sessionCookieOptions } from "@/lib/platform-auth";
import { readJson, rejectCrossSite } from "@/lib/platform-request";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rejected = rejectCrossSite(req);
  if (rejected) return rejected;
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    company.length > 120 || password.length < 12 || password.length > 128) {
    return NextResponse.json({ error: "Enter a name, valid email, and a password of at least 12 characters." }, { status: 400 });
  }

  try {
    if (!(await consumeAuthLimit("signup:global", "all", 60, 60)) ||
      !(await consumeAuthLimit("signup:email", email, 5, 3600))) {
      return NextResponse.json({ error: "Too many signup attempts. Please try again later." }, { status: 429 });
    }
    const client = await pool.connect();
    let token: string;
    try {
      await client.query("BEGIN");
      const userId = await createPlatformUser(name, email, company, password, client);
      token = await createPlatformSession(userId, client);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    const res = NextResponse.json({ ok: true }, { status: 201 });
    res.cookies.set(PLATFORM_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "An account with this email already exists. Sign in instead." }, { status: 409 });
    }
    console.error("Platform signup failed", error);
    return NextResponse.json({ error: "Account creation is unavailable right now. Please try again later." }, { status: 503 });
  }
}