import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "OLX-";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await pool.query(
      `SELECT code, full_name, role_title, start_date, end_date, status, created_at
       FROM internships ORDER BY created_at DESC`
    );
    return NextResponse.json({ interns: result.rows });
  } catch (err) {
    console.error("list interns error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const full_name = String(body.full_name ?? "").trim();
    const role_title = String(body.role_title ?? "").trim();
    const start_date = String(body.start_date ?? "").trim();
    const end_date = String(body.end_date ?? "").trim();
    const status = String(body.status ?? "active").trim() || "active";
    let code = String(body.code ?? "").trim();

    if (!full_name || !role_title || !start_date || !end_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!code) code = generateCode();

    const result = await pool.query(
      `INSERT INTO internships (code, full_name, role_title, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING code, full_name, role_title, start_date, end_date, status, created_at`,
      [code, full_name, role_title, start_date, end_date, status]
    );

    return NextResponse.json({ success: true, internship: result.rows[0] });
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    if (e?.code === "23505") {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }
    console.error("create intern error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
