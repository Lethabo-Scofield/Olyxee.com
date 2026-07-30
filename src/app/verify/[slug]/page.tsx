import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import ShareButton from "./share-button";

export const dynamic = "force-dynamic";

const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL || "https://admin.olyxee.com";

interface VerifiedCredential {
  verified: true;
  status: "PUBLISHED";
  credentialNumber: string;
  fullName: string;
  programmeTitle: string;
  skillsDemonstrated: string;
  /** Document availability flags provided by the admin API */
  hasCertificatePreview?: boolean;
  hasCertificatePdf?: boolean;
  hasLetterPdf?: boolean;
}

type CredentialResult =
  | { state: "verified"; data: VerifiedCredential; token: string }
  | { state: "revoked"; credentialNumber: string }
  | { state: "not_found" }
  | { state: "unavailable" };

function extractToken(slug: string): string | null {
  const idx = slug.lastIndexOf("-");
  if (idx === -1 || idx === slug.length - 1) return null;
  return slug.slice(idx + 1);
}

const fetchCredential = cache(async (slug: string): Promise<CredentialResult> => {
  let decoded: string;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    return { state: "not_found" };
  }
  const token = extractToken(decoded);
  if (!token) return { state: "not_found" };

  try {
    const res = await fetch(
      `${ADMIN_API_BASE_URL}/api/public/credentials/${encodeURIComponent(token)}`,
      { cache: "no-store" }
    );

    if (res.status === 404) return { state: "not_found" };
    if (!res.ok) return { state: "unavailable" };

    const data = await res.json();
    if (data.verified === true && data.status === "PUBLISHED") {
      return { state: "verified", data, token };
    }
    if (data.status === "REVOKED") {
      return { state: "revoked", credentialNumber: data.credentialNumber || "" };
    }
    return { state: "not_found" };
  } catch (err) {
    console.error("[verify] credential fetch failed:", err);
    return { state: "unavailable" };
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchCredential(slug);

  if (result.state === "verified") {
    return {
      title: `Verified: ${result.data.fullName} — ${result.data.programmeTitle} | Olyxee`,
      description: `Authoritative verification record for ${result.data.fullName}'s ${result.data.programmeTitle} credential, issued by Olyxee.`,
      robots: { index: false, follow: false },
    };
  }
  if (result.state === "revoked") {
    return {
      title: "Credential Revoked | Olyxee",
      robots: { index: false, follow: false },
    };
  }
  if (result.state === "unavailable") {
    return {
      title: "Verification Temporarily Unavailable | Olyxee",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: "Credential Not Found | Olyxee",
    robots: { index: false, follow: false },
  };
}

function splitList(value: string): string[] {
  return value
    .split(/\r?\n|,(?![^(]*\))/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);
}

export default async function VerifyCredentialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchCredential(slug);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto w-full max-w-[900px] px-5 pb-16 pt-10 sm:pt-14">
        {result.state === "verified" && (
          <VerifiedView data={result.data} token={result.token} />
        )}
        {result.state === "revoked" && (
          <StatusCard
            tone="revoked"
            title="Credential revoked"
            body={`This credential${
              result.credentialNumber ? ` (${result.credentialNumber})` : ""
            } has been revoked and is no longer valid.`}
          />
        )}
        {result.state === "not_found" && (
          <StatusCard
            tone="neutral"
            title="No credential found"
            body="No credential matches this verification code. Check the URL or contact Olyxee."
          />
        )}
        {result.state === "unavailable" && (
          <StatusCard
            tone="warning"
            title="Verification temporarily unavailable"
            body="We couldn't reach the verification service. Please try again shortly."
          />
        )}

        <p className="mt-8 text-center text-sm text-neutral-400">
          For verification inquiries, contact the Olyxee team.
        </p>
      </main>
    </div>
  );
}

function VerifiedView({
  data,
  token,
}: {
  data: VerifiedCredential;
  token: string;
}) {
  const encodedToken = encodeURIComponent(token);
  const certificateDownloadUrl = `${ADMIN_API_BASE_URL}/api/public/credentials/${encodedToken}/certificate?download=1`;
  const letterDownloadUrl = `${ADMIN_API_BASE_URL}/api/public/credentials/${encodedToken}/letter?download=1`;
  const certificatePreviewUrl = `${ADMIN_API_BASE_URL}/api/public/credentials/${encodedToken}/certificate`;
  const skills = data.skillsDemonstrated?.trim()
    ? splitList(data.skillsDemonstrated)
    : [];
  const hasDownloads = !!data.hasCertificatePdf || !!data.hasLetterPdf;

  return (
    <div>
      {/* Verification status */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-3.5 w-3.5 text-emerald-700"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <h1 className="text-lg font-semibold text-neutral-900">
              Credential verified
            </h1>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {data.fullName}
            </h2>
            <p className="mt-1 font-mono text-sm text-neutral-400">
              {data.credentialNumber}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified
            </p>
          </div>
        </div>
        <ShareButton />
      </div>

      <div className="space-y-8 py-8">
        {/* Certificate preview */}
        {data.hasCertificatePreview && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-neutral-500">
              Certificate
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certificatePreviewUrl}
              alt={`Certificate for ${data.fullName}`}
              className="h-auto w-full rounded-xl border border-neutral-200 bg-neutral-50"
            />
          </section>
        )}

        {/* Document downloads */}
        {hasDownloads && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-neutral-500">
              Documents
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              {data.hasCertificatePdf && (
                <a
                  href={certificateDownloadUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                  <DownloadIcon />
                  Download Certificate (PDF)
                </a>
              )}
              {data.hasLetterPdf && (
                <a
                  href={letterDownloadUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                  <DownloadIcon />
                  Download Recommendation Letter (PDF)
                </a>
              )}
            </div>
          </section>
        )}

        {/* Skills demonstrated */}
        {skills.length > 0 && (
          <section className="border-t border-neutral-100 pt-6">
            <h2 className="mb-3 text-sm font-medium text-neutral-500">
              Skills demonstrated
            </h2>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-800"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  );
}

function StatusCard({
  tone,
  title,
  body,
}: {
  tone: "revoked" | "neutral" | "warning";
  title: string;
  body: string;
}) {
  const styles = {
    revoked: {
      card: "border-red-200",
      title: "text-red-700",
      body: "text-red-600",
    },
    neutral: {
      card: "border-neutral-200",
      title: "text-neutral-900",
      body: "text-neutral-500",
    },
    warning: {
      card: "border-amber-200",
      title: "text-amber-800",
      body: "text-amber-700",
    },
  }[tone];

  return (
    <div
      className={`border-t-2 bg-white px-5 py-10 text-center sm:px-10 ${styles.card}`}
    >
      <h1 className={`text-lg font-semibold ${styles.title}`}>{title}</h1>
      <p className={`mx-auto mt-2 max-w-md text-sm leading-relaxed ${styles.body}`}>
        {body}
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors"
      >
        Back to Olyxee
      </Link>
    </div>
  );
}
