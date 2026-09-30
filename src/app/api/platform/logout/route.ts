import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { currentSessionToken, hashToken, PLATFORM_COOKIE, sessionCookieOptions } from "@/lib/platform-auth";
import { rejectCrossSite } from "@/lib/platform-request";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rejected = rejectCrossSite(req);
  if (rejected) return rejected;
  const token = await currentSessionToken();
  try {
    if (token) await pool.query("DELETE FROM platform_sessions WHERE token_hash = $1", [hashToken(token)]);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(PLATFORM_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
    return res;
  } catch (error) {
    console.error("Platform logout failed", error);
    return NextResponse.json({ error: "Could not sign out. Please try again." }, { status: 503 });
  }
}