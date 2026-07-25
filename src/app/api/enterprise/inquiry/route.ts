import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.ENTERPRISE_TO_EMAIL || "info@olyxee.com";
const FROM_ADDRESS =
  process.env.ENTERPRISE_FROM_EMAIL || "Olyxee Enterprise <onboarding@resend.dev>";

const MAX_LEN = {
  tier: 80,
  name: 120,
  email: 200,
  company: 200,
  role: 120,
  date: 20,
  time: 20,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

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

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

let cachedResend: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (cachedResend) return cachedResend;
  cachedResend = new Resend(apiKey);
  return cachedResend;
}

function buildConfirmationHtml(name: string, tier: string, dateTimeLabel: string): string {
  const firstName = name.split(" ")[0] || name;
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:32px 32px 24px">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Olyxee Enterprise</div>
        <h1 style="font-size:22px;color:#111827;font-weight:600;margin:0 0 16px">We've received your inquiry</h1>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          Thanks for your interest in our <strong style="color:#111827">${escapeHtml(tier)}</strong> tier. We've noted your preferred time of <strong style="color:#111827">${escapeHtml(dateTimeLabel)}</strong> and a member of our enterprise team will be in touch to confirm the details.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          If anything changes in the meantime, just reply to this email.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:24px 0 4px">- The Olyxee Enterprise team</p>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af">
        This is an automated confirmation. Replies go straight to our team.
      </div>
    </div>
  </body></html>`;
}

function buildConfirmationText(name: string, tier: string, dateTimeLabel: string): string {
  const firstName = name.split(" ")[0] || name;
  return [
    `Hi ${firstName},`,
    ``,
    `Thanks for your interest in our ${tier} tier. We've noted your preferred time of ${dateTimeLabel} and a member of our enterprise team will be in touch to confirm the details.`,
    ``,
    `If anything changes in the meantime, just reply to this email.`,
    ``,
    `- The Olyxee Enterprise team`,
  ].join("\n");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const tier = clean(body.tier, MAX_LEN.tier);
  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email);
  const company = clean(body.company, MAX_LEN.company);
  const role = clean(body.role, MAX_LEN.role);
  const date = clean(body.preferredDate, MAX_LEN.date);
  const time = clean(body.preferredTime, MAX_LEN.time);
  const message = clean(body.message, MAX_LEN.message);

  if (!tier) return NextResponse.json({ ok: false, error: "Missing tier" }, { status: 400 });
  if (!name) return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  if (!company)
    return NextResponse.json({ ok: false, error: "Company is required" }, { status: 400 });
  if (!date || !DATE_RE.test(date))
    return NextResponse.json({ ok: false, error: "Preferred date is required" }, { status: 400 });
  if (time && !TIME_RE.test(time))
    return NextResponse.json({ ok: false, error: "Invalid time" }, { status: 400 });

  const resend = getResend();
  if (!resend) {
    console.error("[enterprise/inquiry] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const subject = `Enterprise inquiry: ${tier} — ${company}`;
  const dateTimeLabel = time ? `${date} at ${time}` : date;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;line-height:1.55;">
      <h2 style="margin:0 0 16px;font-size:18px;">New enterprise tier inquiry</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 14px 6px 0;color:#737373;">Tier</td><td style="padding:6px 0;"><strong>${escapeHtml(tier)}</strong></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#737373;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#737373;">Company</td><td style="padding:6px 0;">${escapeHtml(company)}</td></tr>
        ${role ? `<tr><td style="padding:6px 14px 6px 0;color:#737373;">Role</td><td style="padding:6px 0;">${escapeHtml(role)}</td></tr>` : ""}
        <tr><td style="padding:6px 14px 6px 0;color:#737373;">Preferred meeting</td><td style="padding:6px 0;"><strong>${escapeHtml(dateTimeLabel)}</strong></td></tr>
      </table>
      ${
        message
          ? `<div style="margin-top:18px;"><div style="font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Notes</div><div style="white-space:pre-wrap;font-size:14px;">${escapeHtml(message)}</div></div>`
          : ""
      }
      <p style="margin-top:24px;font-size:12px;color:#a3a3a3;">Sent from olyxee.com</p>
    </div>
  `;

  const text = [
    `New enterprise tier inquiry`,
    ``,
    `Tier: ${tier}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    role ? `Role: ${role}` : null,
    `Preferred meeting: ${dateTimeLabel}`,
    message ? `\nNotes:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[enterprise/inquiry] Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 502 });
    }
  } catch (err) {
    console.error("[enterprise/inquiry] Exception:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }

  resend.emails
    .send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: TO_EMAIL,
      subject: "We've received your enterprise inquiry",
      text: buildConfirmationText(name, tier, dateTimeLabel),
      html: buildConfirmationHtml(name, tier, dateTimeLabel),
    })
    .then(({ error }) => {
      if (error) console.error("[enterprise/inquiry] Confirmation send error:", error);
    })
    .catch((err) => console.error("[enterprise/inquiry] Confirmation send exception:", err));

  return NextResponse.json({ ok: true });
}
