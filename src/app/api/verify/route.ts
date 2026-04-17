import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code")?.trim();

  if (!code) {
    return NextResponse.json(
      { valid: false, error: "Missing code" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT code, full_name, role_title, start_date, end_date, status
       FROM internships WHERE code = $1`,
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ valid: false, error: "Invalid Code" });
    }

    return NextResponse.json({ valid: true, internship: result.rows[0] });
  } catch (err) {
    console.error("verify error", err);
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 }
    );
  }
}
