import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = "scofield@olyxee.com";
const SMTP_USER = "scofield@olyxee.com";
const FROM_ADDRESS = `"Olyxee Contact" <${SMTP_USER}>`;

const MAX = { name: 120, email: 200, company: 160, type: 60, message: 4000 };
const TYPES = new Set(["general", "enterprise", "partnership", "research", "support"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const buckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = (buckets.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (bucket.length >= RATE_MAX) {
    buckets.set(ip, bucket);
    return false;
  }
  bucket.push(now);
  buckets.set(ip, bucket);
  return true;
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

let cachedTransporter: nodemailer.Transporter | null = null;
function getTransporter(): nodemailer.Transporter | null {
  const pass = process.env.TITAN_SMTP_PASSWORD;
  if (!pass) return null;
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass },
  });
  return cachedTransporter;
}

const TYPE_LABELS: Record<string, string> = {
  general: "General Inquiry",
  enterprise: "Enterprise",
  partnership: "Partnership",
  research: "Research Collaboration",
  support: "Support",
};

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please try again in a minute." }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const name = clean(body.name, MAX.name);
    const email = clean(body.email, MAX.email);
    const company = clean(body.company, MAX.company);
    const typeRaw = clean(body.type, MAX.type) || "general";
    const type = TYPES.has(typeRaw) ? typeRaw : "general";
    const message = clean(body.message, MAX.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in your name, email, and message." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const transporter = getTransporter();
    if (!transporter) {
      console.error("TITAN_SMTP_PASSWORD not configured");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const typeLabel = TYPE_LABELS[type];
    const subject = `[${typeLabel}] ${name}${company ? ` · ${company}` : ""}`;

    const text = [
      `New contact: ${typeLabel}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      "",
      "Message:",
      message,
    ].filter(Boolean).join("\n");

    const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Inter,sans-serif">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
        <div style="padding:24px 28px;border-bottom:1px solid #f3f4f6">
          <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">New contact</div>
          <div style="font-size:22px;color:#111827;font-weight:600">${escapeHtml(typeLabel)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 28px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:120px">Name</td><td style="padding:8px 28px;color:#111827;font-size:14px">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 28px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em">Email</td><td style="padding:8px 28px;color:#111827;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#111827">${escapeHtml(email)}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 28px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em">Company</td><td style="padding:8px 28px;color:#111827;font-size:14px">${escapeHtml(company)}</td></tr>` : ""}
        </table>
        <div style="padding:16px 28px 28px">
          <div style="padding:16px;background:#f9fafb;border-radius:12px;white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
        </div>
      </div>
    </body></html>`;

    try {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: TO_EMAIL,
        replyTo: email,
        subject,
        text,
        html,
      });
    } catch (err) {
      console.error("SMTP send error", err);
      return NextResponse.json({ error: "We couldn't deliver your message. Please try again in a moment." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
