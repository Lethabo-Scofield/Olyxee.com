import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const ADMIN_COOKIE = "olyxee_admin";

export async function POST(req: Request) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    console.error("ADMIN_SECRET not configured");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let secret = "";
  try {
    const body = await req.json();
    secret = String(body.secret ?? "");
  } catch {
    secret = "";
  }

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
