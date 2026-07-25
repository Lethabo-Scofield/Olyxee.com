import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const WAITLIST_EMAIL = process.env.WAITLIST_TO_EMAIL || "info@olyxee.com";
const FROM_ADDRESS =
  process.env.WAITLIST_FROM_EMAIL || "Olyxee Waitlist <onboarding@resend.dev>";

const MAX_LEN = {
  name: 120,
  email: 200,
  company: 200,
  business: 2000,
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

function getClientIp(req: NextApiRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return fwd.split(",")[0]!.trim();
  }
  if (Array.isArray(fwd) && fwd.length > 0) {
    return fwd[0]!.split(",")[0]!.trim();
  }
  const real = req.headers["x-real-ip"];
  if (typeof real === "string") return real;
  return req.socket.remoteAddress || "unknown";
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

type Tool = "api" | "general";

interface WaitlistArgs {
  tool: Tool;
  name: string;
  email: string;
  company?: string;
  business?: string;
  message?: string;
}

function toolLabel(tool: Tool): string {
  return tool === "api" ? "API access" : "Platform waitlist";
}

/* Internal email to the team */
function buildTeamText(a: WaitlistArgs): string {
  const lines: string[] = [];
  lines.push(`New waitlist signup: ${toolLabel(a.tool)}`);
  lines.push("");
  lines.push(`Name: ${a.name}`);
  lines.push(`Email: ${a.email}`);
  if (a.company) lines.push(`Company: ${a.company}`);
  if (a.business) {
    lines.push("");
    lines.push("About their business:");
    lines.push(a.business);
  }
  if (a.message) {
    lines.push("");
    lines.push("Message:");
    lines.push(a.message);
  }
  return lines.join("\n");
}

function buildTeamHtml(a: WaitlistArgs): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:160px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top">${value}</td></tr>`;

  const businessBlock = a.business
    ? `<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:12px"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">About their business</div><div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(a.business)}</div></div>`
    : "";

  const messageBlock = a.message
    ? `<div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Message</div><div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(a.message)}</div></div>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:24px 28px;border-bottom:1px solid #f3f4f6">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">New waitlist signup</div>
        <div style="font-size:22px;color:#111827;font-weight:600">${escapeHtml(toolLabel(a.tool))}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(a.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(a.email)}" style="color:#111827;text-decoration:underline">${escapeHtml(a.email)}</a>`)}
        ${a.company ? row("Company", escapeHtml(a.company)) : ""}
      </table>
      <div style="padding:0 28px 24px">${businessBlock}${messageBlock}</div>
    </div>
  </body></html>`;
}

/* Confirmation email back to the user */
function buildUserText(a: WaitlistArgs): string {
  const firstName = a.name.split(" ")[0] || a.name;
  const lines: string[] = [];
  lines.push(`Hi ${firstName},`);
  lines.push("");
  if (a.tool === "api") {
    lines.push("You're on the Olyxee API waitlist. We'll be in touch as soon as early API keys, sandbox quotas, and integration support are ready for your team.");
    lines.push("");
    lines.push("In the meantime, the documentation is open: https://olyxee.com/docs");
  } else {
    lines.push("You're on the Olyxee Platform waitlist. We'll notify you the moment access opens, ahead of the general public.");
  }
  lines.push("");
  lines.push("If anything changes or you'd like to share more about what you're building, just reply to this email.");
  lines.push("");
  lines.push("Warm regards,");
  lines.push("The Olyxee Team");
  lines.push("olyxee.com");
  return lines.join("\n");
}

function buildUserHtml(a: WaitlistArgs): string {
  const firstName = a.name.split(" ")[0] || a.name;
  const isApi = a.tool === "api";
  const intro = isApi
    ? `You're on the <strong style="color:#111827">Olyxee API waitlist</strong>. We'll be in touch as soon as early API keys, sandbox quotas, and integration support are ready for your team.`
    : `You're on the <strong style="color:#111827">Olyxee Platform waitlist</strong>. We'll notify you the moment access opens, ahead of the general public.`;
  const docsBlock = isApi
    ? `<div style="margin:22px 0;padding:14px 16px;background:#f9fafb;border-radius:10px;font-size:13px;color:#374151;line-height:1.6">The documentation is open while you wait: <a href="https://olyxee.com/docs" style="color:#111827;text-decoration:underline">olyxee.com/docs</a></div>`
    : "";
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:32px 32px 24px">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Olyxee Waitlist</div>
        <h1 style="font-size:22px;color:#111827;font-weight:600;margin:0 0 18px;line-height:1.3">You're on the list</h1>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">${intro}</p>
        ${docsBlock}
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 16px">If anything changes or you'd like to share more about what you're building, just reply to this email.</p>
        <p style="font-size:15px;color:#374151;line-height:1.65;margin:24px 0 4px">Warm regards,</p>
        <p style="font-size:15px;color:#111827;line-height:1.65;margin:0 0 4px;font-weight:600">The Olyxee Team</p>
        <p style="font-size:13px;color:#9ca3af;margin:2px 0 0">olyxee.com</p>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af;line-height:1.5">
        This is an automated confirmation. If you didn't request to join the Olyxee waitlist, you can ignore this email or reach us at <a href="mailto:${escapeHtml(WAITLIST_EMAIL)}" style="color:#6b7280;text-decoration:underline">${escapeHtml(WAITLIST_EMAIL)}</a>.
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ip = getClientIp(req);
    if (!rateLimit(ip)) {
      return res.status(429).json({
        error: "Too many submissions. Please try again in a minute.",
      });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};

    const name = clean(body.name, MAX_LEN.name);
    const email = clean(body.email, MAX_LEN.email).toLowerCase();
    const company = clean(body.company, MAX_LEN.company);
    const business = clean(body.business, MAX_LEN.business);
    const message = clean(body.message, MAX_LEN.message);
    const tool: Tool = body.tool === "api" ? "api" : "general";

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (!name) {
      return res.status(400).json({ error: "Please share your name." });
    }
    if (tool === "api" && !company) {
      return res.status(400).json({ error: "Please share your company name." });
    }

    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({
        error: "Email service is not configured. Please try again later.",
      });
    }

    const args: WaitlistArgs = {
      tool,
      name,
      email,
      company: company || undefined,
      business: business || undefined,
      message: message || undefined,
    };

    const subject = `New waitlist signup: ${toolLabel(tool)} - ${name}`;

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: WAITLIST_EMAIL,
        replyTo: email,
        subject,
        text: buildTeamText(args),
        html: buildTeamHtml(args),
      });
      if (sendErr) {
        console.error("Resend send error", sendErr);
        return res.status(502).json({
          error: "We couldn't add you to the waitlist. Please try again in a moment.",
        });
      }
    } catch (sendErr) {
      console.error("Resend send exception", sendErr);
      return res.status(502).json({
        error: "We couldn't add you to the waitlist. Please try again in a moment.",
      });
    }

    // Confirmation back to the user (fire-and-forget)
    resend.emails
      .send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: WAITLIST_EMAIL,
        subject:
          tool === "api"
            ? "You're on the Olyxee API waitlist"
            : "You're on the Olyxee waitlist",
        text: buildUserText(args),
        html: buildUserHtml(args),
      })
      .then(({ error }) => {
        if (error) console.error("Waitlist confirmation send error", error);
      })
      .catch((err) => console.error("Waitlist confirmation send exception", err));

    return res.status(200).json({
      success: true,
      message: "You're in! We'll be in touch.",
    });
  } catch (err) {
    console.error("Waitlist error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
