import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  return NextResponse.json({
    resend_api_key_present: Boolean(key),
    resend_api_key_length: key ? key.length : 0,
    resend_api_key_prefix: key ? key.slice(0, 3) : null,
    careers_to_email: process.env.CAREERS_TO_EMAIL || "(default)",
    careers_from_email: process.env.CAREERS_FROM_EMAIL || "(default)",
    vercel_env: process.env.VERCEL_ENV || null,
    node_env: process.env.NODE_ENV || null,
  });
}
