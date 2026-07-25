import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEAM_EMAIL = process.env.ENTERPRISE_TO_EMAIL || "info@olyxee.com";
const FROM_ADDRESS =
  process.env.ENTERPRISE_FROM_EMAIL || "Olyxee Enterprise <onboarding@resend.dev>";

const MAX_LEN = {
  name: 120,
  email: 200,
  company: 200,
  phone: 60,
  message: 2000,
};

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

type Preference = "call" | "email";

interface ContactArgs {
  name: string;
  email: string;
  company: string;
  phone?: string;
  preference: Preference;
  message?: string;
}

function preferenceLabel(p: Preference): string {
  return p === "call" ? "Phone call" : "Email";
}

function buildTeamText(a: ContactArgs): string {
  const lines: string[] = [];
  lines.push("New enterprise inquiry");
  lines.push("");
  lines.push(`Name: ${a.name}`);
  lines.push(`Company: ${a.company}`);
  lines.push(`Email: ${a.email}`);
  if (a.phone) lines.push(`Phone: ${a.phone}`);
  lines.push(`Preferred contact: ${preferenceLabel(a.preference)}`);
  if (a.message) {
    lines.push("");
    lines.push("Message:");
    lines.push(a.message);
  }
  return lines.join("\n");
}

function buildTeamHtml(a: ContactArgs): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:170px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top">${value}</td></tr>`;

  const messageBlock = a.message
    ? `<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:12px"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Message</div><div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(a.message)}</div></div>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:24px 28px;border-bottom:1px solid #f3f4f6">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">New enterprise inquiry</div>
        <div style="font-size:22px;color:#111827;font-weight:600">${escapeHtml(a.company)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(a.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(a.email)}" style="color:#111827;text-decoration:underline">${escapeHtml(a.email)}</a>`)}
        ${a.phone ? row("Phone", escapeHtml(a.phone)) : ""}
        ${row("Preferred contact", `<strong>${escapeHtml(preferenceLabel(a.preference))}</strong>`)}
      </table>
      <div style="padding:0 28px 24px">${messageBlock}</div>
      <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af">Sent from olyxee.com /products</div>
    </div>
  </body></html>`;
}

function buildUserText(a: ContactArgs): string {
  const firstName = a.name.split(" ")[0] || a.name;
  const lines: string[] = [];
  lines.push(`Hi ${firstName},`);
  lines.push("");
  lines.push("Thank you for reaching out about bringing Orgni into your organization. We've received your message and a member of our team will be in touch shortly.");
  lines.push("");
  lines.push(
    a.preference === "call"
      ? "You asked us to reach you by phone, so we'll call you at the number you provided."
      : "You asked us to reach you by email, so we'll reply to this address."
  );
  lines.push("");
  lines.push("Warm regards,");
  lines.push("The Olyxee Team");
  lines.push("olyxee.com");
  return lines.join("\n");
}

function buildUserHtml(a: ContactArgs): string {
  const firstName = a.name.split(" ")[0] || a.name;
  const reach =
    a.preference === "call"
      ? "You asked us to reach you by phone, so we'll call you at the number you provided."
      : "You asked us to reach you by email, so we'll reply to this address.";
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:32px 32px 24px">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Olyxee Enterprise</div>
        <h1 style="font-size:22px;color:#111827;font-weight:600;margin:0 0 18px;line-height:1.3">We've received your message</h1>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">Thank you for reaching out about bringing <strong style="color:#111827">Orgni</strong> into your organization. A member of our team will be in touch shortly.</p>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">${escapeHtml(reach)}</p>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:24px 0 4px">Warm regards,</p>
        <p style="font-size:15px;color:#111827;line-height:1.65;margin:0 0 4px;font-weight:600">The Olyxee Team</p>
        <p style="font-size:13px;color:#9ca3af;margin:2px 0 0">olyxee.com</p>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af;line-height:1.5">
        This is an automated confirmation. If anything changes, reach us at <a href="mailto:${escapeHtml(TEAM_EMAIL)}" style="color:#6b7280;text-decoration:underline">${escapeHtml(TEAM_EMAIL)}</a>.
      </div>
    </div>
  </body></html>`;
}

let cachedResend: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (cachedResend) return cachedResend;
  cachedResend = new Resend(apiKey);
  return cachedResend;
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

    const name = clean(body.name, MAX_LEN.name);
    const email = clean(body.email, MAX_LEN.email).toLowerCase();
    const company = clean(body.company, MAX_LEN.company);
    const phone = clean(body.phone, MAX_LEN.phone);
    const message = clean(body.message, MAX_LEN.message);
    const preference: Preference = body.preference === "call" ? "call" : "email";

    if (!name) {
      return NextResponse.json({ error: "Please share your name." }, { status: 400 });
    }
    if (!company) {
      return NextResponse.json({ error: "Please share your company." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (preference === "call" && !phone) {
      return NextResponse.json(
        { error: "Please share a phone number so we can call you." },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const args: ContactArgs = {
      name,
      email,
      company,
      phone: phone || undefined,
      preference,
      message: message || undefined,
    };

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TEAM_EMAIL,
        replyTo: email,
        subject: `New enterprise inquiry: ${company} - ${name}`,
        text: buildTeamText(args),
        html: buildTeamHtml(args),
      });
      if (sendErr) {
        console.error("Resend send error", sendErr);
        return NextResponse.json(
          { error: "We couldn't send your message. Please try again in a moment." },
          { status: 502 }
        );
      }
    } catch (sendErr) {
      console.error("Resend send exception", sendErr);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again in a moment." },
        { status: 502 }
      );
    }

    resend.emails
      .send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: TEAM_EMAIL,
        subject: "We've received your message",
        text: buildUserText(args),
        html: buildUserHtml(args),
      })
      .then(({ error }) => {
        if (error) console.error("Enterprise confirmation send error", error);
      })
      .catch((err) => console.error("Enterprise confirmation send exception", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("enterprise contact error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
