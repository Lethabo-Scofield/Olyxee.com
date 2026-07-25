import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "info@olyxee.com";
const FROM_ADDRESS =
  process.env.CONTACT_FROM_EMAIL || "Olyxee <onboarding@resend.dev>";

const TOPICS = {
  sales: "Sales",
  enterprise: "Enterprise",
  partnerships: "Partnerships",
  research: "Research",
  support: "Support",
  press: "Press",
  general: "General",
} as const;

type TopicKey = keyof typeof TOPICS;

const MAX_LEN = {
  name: 120,
  email: 200,
  company: 200,
  message: 4000,
};

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

interface BuildArgs {
  topicLabel: string;
  full_name: string;
  email: string;
  company?: string;
  message: string;
}

function buildText(a: BuildArgs): string {
  const lines: string[] = [];
  lines.push(`New ${a.topicLabel} inquiry`);
  lines.push("");
  lines.push(`Name: ${a.full_name}`);
  lines.push(`Email: ${a.email}`);
  if (a.company) lines.push(`Company: ${a.company}`);
  lines.push("");
  lines.push("Message:");
  lines.push(a.message);
  return lines.join("\n");
}

function buildHtml(a: BuildArgs): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:140px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top">${value}</td></tr>`;

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:24px 28px;border-bottom:1px solid #f3f4f6">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Contact form</div>
        <div style="font-size:22px;color:#111827;font-weight:600">${escapeHtml(a.topicLabel)} inquiry</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(a.full_name))}
        ${row("Email", `<a href="mailto:${escapeHtml(a.email)}" style="color:#111827;text-decoration:underline">${escapeHtml(a.email)}</a>`)}
        ${a.company ? row("Company", escapeHtml(a.company)) : ""}
      </table>
      <div style="padding:0 28px 24px"><div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:12px"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Message</div><div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(a.message)}</div></div></div>
    </div>
  </body></html>`;
}

function buildConfirmationHtml(a: BuildArgs): string {
  const firstName = a.full_name.split(" ")[0] || a.full_name;
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:32px 32px 24px">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Olyxee</div>
        <h1 style="font-size:22px;color:#111827;font-weight:600;margin:0 0 16px">We've got your message</h1>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          Thanks for reaching out about <strong style="color:#111827">${escapeHtml(a.topicLabel.toLowerCase())}</strong>. Your note has landed safely with us and we'll route it to the right person on the team.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          You'll typically hear back from us within one business day. If you need anything urgent in the meantime, just reply to this email.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:24px 0 4px">- The Olyxee team</p>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af">
        This is an automated confirmation. Replies go straight to our team.
      </div>
    </div>
  </body></html>`;
}

function buildConfirmationText(a: BuildArgs): string {
  const firstName = a.full_name.split(" ")[0] || a.full_name;
  const lines: string[] = [];
  lines.push(`Hi ${firstName},`);
  lines.push("");
  lines.push(`Thanks for reaching out about ${a.topicLabel.toLowerCase()}. Your note has landed safely with us and we'll route it to the right person on the team.`);
  lines.push("");
  lines.push("You'll typically hear back from us within one business day. If you need anything urgent in the meantime, just reply to this email.");
  lines.push("");
  lines.push("- The Olyxee team");
  return lines.join("\n");
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

    const topicKey = clean(body.topic, 40).toLowerCase() as TopicKey;
    const topicLabel = TOPICS[topicKey];
    if (!topicLabel) {
      return NextResponse.json(
        { error: "Please pick a valid topic." },
        { status: 400 }
      );
    }

    const full_name = clean(body.full_name, MAX_LEN.name);
    const email = clean(body.email, MAX_LEN.email);
    const company = clean(body.company, MAX_LEN.company);
    const message = clean(body.message, MAX_LEN.message);

    if (!full_name) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "Please enter your email." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please share a few details about what you need." },
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

    const args: BuildArgs = {
      topicLabel,
      full_name,
      email,
      company: company || undefined,
      message,
    };

    const subject = `New ${topicLabel} inquiry - ${full_name}`;

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject,
        text: buildText(args),
        html: buildHtml(args),
      });
      if (sendErr) {
        console.error("Resend send error", sendErr);
        return NextResponse.json(
          { error: "We couldn't deliver your message. Please try again in a moment." },
          { status: 502 }
        );
      }
    } catch (sendErr) {
      console.error("Resend send exception", sendErr);
      return NextResponse.json(
        { error: "We couldn't deliver your message. Please try again in a moment." },
        { status: 502 }
      );
    }

    resend.emails
      .send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: CONTACT_EMAIL,
        subject: `We've received your message`,
        text: buildConfirmationText(args),
        html: buildConfirmationHtml(args),
      })
      .then(({ error }) => {
        if (error) console.error("Contact confirmation send error", error);
      })
      .catch((err) => console.error("Contact confirmation send exception", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact submit error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
