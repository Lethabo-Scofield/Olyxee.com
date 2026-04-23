import { NextResponse } from "next/server";
import { Resend } from "resend";
import { findRoleByTitle } from "@/lib/careers-roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HIRING_EMAIL = process.env.CAREERS_TO_EMAIL || "scofield@olyxee.com";
const FROM_ADDRESS =
  process.env.CAREERS_FROM_EMAIL || "Olyxee Careers <onboarding@resend.dev>";

const MAX_LEN = {
  name: 120,
  email: 200,
  portfolio: 500,
  message: 2000,
  answer: 2000,
  school: 200,
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
const URL_RE = /^https?:\/\/.+\..+/i;

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
  role: { title: string; team: string; type: string };
  full_name: string;
  email: string;
  school?: string;
  portfolio?: string;
  message: string;
  answers?: Array<{ label: string; value: string }>;
}

function buildText(a: BuildArgs): string {
  const lines: string[] = [];
  lines.push(`New application: ${a.role.title}`);
  lines.push(`Team: ${a.role.team}`);
  lines.push(`Type: ${a.role.type}`);
  lines.push("");
  lines.push(`Name: ${a.full_name}`);
  lines.push(`Email: ${a.email}`);
  if (a.school) lines.push(`School: ${a.school}`);
  if (a.portfolio) lines.push(`Portfolio: ${a.portfolio}`);
  if (a.answers && a.answers.length > 0) {
    lines.push("");
    lines.push("Answers:");
    for (const { label, value } of a.answers) {
      lines.push(`  ${label}: ${value || "(no answer)"}`);
    }
  }
  if (a.message) {
    lines.push("");
    lines.push("Why this role:");
    lines.push(a.message);
  }
  return lines.join("\n");
}

function buildApplicantConfirmationHtml(a: BuildArgs): string {
  const firstName = a.full_name.split(" ")[0] || a.full_name;
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:32px 32px 24px">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Olyxee Careers</div>
        <h1 style="font-size:22px;color:#111827;font-weight:600;margin:0 0 16px">We've got your application</h1>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          Thanks for applying to <strong style="color:#111827">${escapeHtml(a.role.title)}</strong> on the ${escapeHtml(a.role.team)} team. Your application has landed safely with us - no further action is needed from you right now.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          Our team reviews every application carefully. If we'd like to take the next step, we'll reach out to this email address within the next two to three weeks. If you don't hear back in that window, we encourage you to apply again for future roles that fit.
        </p>
        ${a.role.type === "internship" ? `<div style="margin:20px 0;padding:14px 16px;background:#f9fafb;border-radius:10px;font-size:13px;color:#6b7280;line-height:1.6">Reminder: this is an unpaid internship designed for hands-on experience, mentorship, and a written reference.</div>` : ""}
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px">
          In the meantime, feel free to follow our work or get in touch if anything changes about your application.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:24px 0 4px">- The Olyxee team</p>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af">
        This is an automated confirmation. You don't need to reply.
      </div>
    </div>
  </body></html>`;
}

function buildApplicantConfirmationText(a: BuildArgs): string {
  const firstName = a.full_name.split(" ")[0] || a.full_name;
  const lines: string[] = [];
  lines.push(`Hi ${firstName},`);
  lines.push("");
  lines.push(`Thanks for applying to ${a.role.title} on the ${a.role.team} team. Your application has landed safely with us - no further action is needed from you right now.`);
  lines.push("");
  lines.push("Our team reviews every application carefully. If we'd like to take the next step, we'll reach out to this email address within the next two to three weeks. If you don't hear back in that window, we encourage you to apply again for future roles that fit.");
  if (a.role.type === "internship") {
    lines.push("");
    lines.push("Reminder: this is an unpaid internship designed for hands-on experience, mentorship, and a written reference.");
  }
  lines.push("");
  lines.push("- The Olyxee team");
  return lines.join("\n");
}

function buildHtml(a: BuildArgs): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:160px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top">${value}</td></tr>`;

  const linkOrText = (v: string) =>
    URL_RE.test(v)
      ? `<a href="${escapeHtml(v)}" style="color:#111827;text-decoration:underline">${escapeHtml(v)}</a>`
      : escapeHtml(v);

  let answersHtml = "";
  if (a.answers && a.answers.length > 0) {
    answersHtml = a.answers
      .map((x) => row(x.label, x.value ? linkOrText(x.value) : '<span style="color:#9ca3af">(no answer)</span>'))
      .join("");
  }

  const messageBlock = a.message
    ? `<div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:12px"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Why this role</div><div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6">${escapeHtml(a.message)}</div></div>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:24px 28px;border-bottom:1px solid #f3f4f6">
        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">New application</div>
        <div style="font-size:22px;color:#111827;font-weight:600">${escapeHtml(a.role.title)}</div>
        <div style="font-size:13px;color:#6b7280;margin-top:4px">${escapeHtml(a.role.team)} · ${escapeHtml(a.role.type)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(a.full_name))}
        ${row("Email", `<a href="mailto:${escapeHtml(a.email)}" style="color:#111827;text-decoration:underline">${escapeHtml(a.email)}</a>`)}
        ${a.school ? row("School", escapeHtml(a.school)) : ""}
        ${a.portfolio ? row("Portfolio", linkOrText(a.portfolio)) : ""}
        ${answersHtml}
      </table>
      <div style="padding:0 28px 24px">${messageBlock}</div>
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

    const requestedRoleTitle = clean(body.role_title, 200);
    const role = findRoleByTitle(requestedRoleTitle);
    if (!role) {
      return NextResponse.json(
        { error: "This role isn't open right now." },
        { status: 400 }
      );
    }

    const full_name = clean(body.full_name, MAX_LEN.name);
    const email = clean(body.email, MAX_LEN.email);
    const message = clean(body.message, MAX_LEN.message);
    const portfolio = clean(body.portfolio, MAX_LEN.portfolio);
    const school = clean(body.school, MAX_LEN.school);

    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Please provide your name and email." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const answersForEmail: Array<{ label: string; value: string }> = [];

    if (role.questions && role.questions.length > 0) {
      const rawAnswers =
        body.answers && typeof body.answers === "object"
          ? (body.answers as Record<string, unknown>)
          : {};
      for (const q of role.questions) {
        const value = clean(rawAnswers[q.id], MAX_LEN.answer);
        if (q.required && !value) {
          return NextResponse.json(
            { error: `Please answer: ${q.label}.` },
            { status: 400 }
          );
        }
        if (value && q.type === "url" && !URL_RE.test(value)) {
          return NextResponse.json(
            { error: `Please enter a valid URL for: ${q.label}.` },
            { status: 400 }
          );
        }
        answersForEmail.push({ label: q.label, value });
      }
    } else {
      if (!portfolio) {
        return NextResponse.json(
          { error: "Please share a link to your portfolio, GitHub, LinkedIn, or CV." },
          { status: 400 }
        );
      }
      if (!URL_RE.test(portfolio)) {
        return NextResponse.json(
          { error: "Please enter a valid URL for your portfolio link." },
          { status: 400 }
        );
      }
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
      role: { title: role.title, team: role.team, type: role.type },
      full_name,
      email,
      school: school || undefined,
      portfolio: role.questions ? undefined : portfolio,
      message,
      answers: role.questions ? answersForEmail : undefined,
    };

    const subject = `New application: ${role.title} - ${full_name}`;

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: HIRING_EMAIL,
        replyTo: email,
        subject,
        text: buildText(args),
        html: buildHtml(args),
      });
      if (sendErr) {
        console.error("Resend send error", sendErr);
        return NextResponse.json(
          { error: "We couldn't deliver your application. Please try again in a moment." },
          { status: 502 }
        );
      }
    } catch (sendErr) {
      console.error("Resend send exception", sendErr);
      return NextResponse.json(
        { error: "We couldn't deliver your application. Please try again in a moment." },
        { status: 502 }
      );
    }

    resend.emails
      .send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: HIRING_EMAIL,
        subject: `We've received your application for ${role.title}`,
        text: buildApplicantConfirmationText(args),
        html: buildApplicantConfirmationHtml(args),
      })
      .then(({ error }) => {
        if (error) console.error("Applicant confirmation send error", error);
      })
      .catch((err) => console.error("Applicant confirmation send exception", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("careers apply error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
