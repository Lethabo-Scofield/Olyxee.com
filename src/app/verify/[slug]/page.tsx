import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="verify-page min-h-[100dvh] overflow-hidden bg-[#11191b] text-[#f5f0e8]">
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(#c9a875_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      <main className="relative mx-auto w-full max-w-[1060px] px-5 pb-12 pt-5 sm:px-8 sm:pt-8">
        <header className="mb-14 flex items-center justify-between border-b border-[#e8dfd2]/15 pb-5 sm:mb-20">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm text-[#f5f0e8] outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-[#d4ad71]"
            aria-label="Olyxee home"
          >
            <Image
              src="/Logo/Olyxee_Logo_Knockout.png"
              alt="Olyxee logo"
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 select-none"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">
              Olyxee
            </span>
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8b5ac]">
            Credential registry
          </span>
        </header>

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

        <p className="mt-16 text-center text-xs tracking-wide text-[#b8b5ac]">
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
    <div className="animate-[verify-reveal_700ms_ease-out_both]">
      {/* Verification status */}
      <section className="relative overflow-hidden border border-[#d4ad71]/45 bg-[#f5f0e8] px-6 py-8 text-[#172123] shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:px-12 sm:py-11">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full border border-[#b68b50]/30" />
        <div className="absolute bottom-0 left-0 h-px w-2/3 bg-[#b68b50]" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="hidden shrink-0 sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/olyxee-corporate-seal-transparent.png"
                alt="Olyxee corporate seal"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div>
              <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#81623a]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#315b4e] text-[#f5f0e8]">
                  <CheckIcon />
                </span>
                Authentic record
              </div>
              <h1 className="max-w-xl text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Credential verified
              </h1>
              <h2 className="mt-5 text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                {data.fullName}
              </h2>
              <p className="mt-3 font-mono text-xs tracking-[0.14em] text-[#6b716c]">
                {data.credentialNumber}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 border-l-2 border-[#315b4e] pl-3 text-sm font-semibold text-[#315b4e]">
                <span className="h-2 w-2 rounded-full bg-[#315b4e]" />
                Verified status
              </p>
            </div>
          </div>
          <ShareButton />
        </div>
      </section>

      <div className="space-y-12 py-10 sm:py-14">
        {/* Certificate preview */}
        {data.hasCertificatePreview && (
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#d4ad71]">01</span>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8dfd2]">
                Certificate preview
              </h2>
            </div>
            <div className="border border-[#e8dfd2]/20 bg-[#f5f0e8] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.2)] sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificatePreviewUrl}
                alt={`Certificate for ${data.fullName}`}
                className="h-auto w-full object-contain"
              />
            </div>
          </section>
        )}

        {/* Document downloads */}
        {hasDownloads && (
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#d4ad71]">02</span>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8dfd2]">
                Official documents
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.hasCertificatePdf && (
                <a
                  href={certificateDownloadUrl}
                  className="group inline-flex items-center justify-between border border-[#d4ad71] bg-[#d4ad71] px-5 py-4 text-sm font-semibold text-[#172123] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f0e8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11191b]"
                >
                  <span>Certificate PDF</span>
                  <DownloadIcon />
                </a>
              )}
              {data.hasLetterPdf && (
                <a
                  href={letterDownloadUrl}
                  className="group inline-flex items-center justify-between border border-[#e8dfd2]/35 bg-transparent px-5 py-4 text-sm font-semibold text-[#f5f0e8] transition-colors hover:border-[#d4ad71] hover:text-[#d4ad71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f0e8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11191b]"
                >
                  <span>Recommendation letter PDF</span>
                  <DownloadIcon />
                </a>
              )}
            </div>
          </section>
        )}

        {/* Skills demonstrated */}
        {skills.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#d4ad71]">03</span>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8dfd2]">
                Skills demonstrated
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="border border-[#e8dfd2]/25 px-3 py-2 text-sm text-[#e8dfd2]"
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

function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
    revoked: { mark: "×", accent: "#b85c50", label: "Record invalidated" },
    neutral: { mark: "—", accent: "#d4ad71", label: "Registry lookup" },
    warning: { mark: "!", accent: "#d4ad71", label: "Service notice" },
  }[tone];

  return (
    <section className="animate-[verify-reveal_700ms_ease-out_both] border border-[#e8dfd2]/20 bg-[#192426] px-6 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-16 sm:py-16">
      <div className="max-w-xl">
        <div className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: styles.accent }}>
          <span className="grid h-8 w-8 place-items-center border" style={{ borderColor: styles.accent }}>
            {styles.mark}
          </span>
          {styles.label}
        </div>
        <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#f5f0e8] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-[#b8b5ac]">{body}</p>
        <Link
          href="/"
          className="mt-10 inline-flex border-b border-[#d4ad71] pb-1 text-sm font-semibold text-[#f5f0e8] transition-colors hover:text-[#d4ad71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ad71] focus-visible:ring-offset-4 focus-visible:ring-offset-[#192426]"
        >
          Back to Olyxee
        </Link>
      </div>
    </section>
  );
}
