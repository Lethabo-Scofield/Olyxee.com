import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const doSend = url.searchParams.get("send") === "1";
  const toOverride = url.searchParams.get("to");

  const key = process.env.RESEND_API_KEY;
  const config = {
    resend_api_key_present: Boolean(key),
    resend_api_key_length: key ? key.length : 0,
    resend_api_key_prefix: key ? key.slice(0, 3) : null,
    careers_to_email: process.env.CAREERS_TO_EMAIL || "(default: scofield@olyxee.com)",
    careers_from_email:
      process.env.CAREERS_FROM_EMAIL ||
      "(default: Olyxee Careers <onboarding@resend.dev>)",
    vercel_env: process.env.VERCEL_ENV || null,
    node_env: process.env.NODE_ENV || null,
  };

  if (!doSend) {
    return NextResponse.json({
      ...config,
      hint: "Append ?send=1 to attempt a test email and see the exact Resend response. Optionally add &to=youremail@example.com to override the recipient.",
    });
  }

  if (!key) {
    return NextResponse.json({ ...config, sendAttempted: false, error: "RESEND_API_KEY missing" });
  }

  const resend = new Resend(key);
  const from = process.env.CAREERS_FROM_EMAIL || "Olyxee Careers <onboarding@resend.dev>";
  const to = toOverride || process.env.CAREERS_TO_EMAIL || "scofield@olyxee.com";

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject: "Olyxee Resend diagnostic",
      text: "This is a test from /api/debug-env to verify Resend delivery.",
    });
    return NextResponse.json({
      ...config,
      sendAttempted: true,
      from,
      to,
      result,
    });
  } catch (err) {
    return NextResponse.json({
      ...config,
      sendAttempted: true,
      from,
      to,
      exception: String(err),
    });
  }
}
