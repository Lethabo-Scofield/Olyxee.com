import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../../components/header";
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
  position: string;
  startDate: string;
  completionDate: string;
  projectsCompleted: string;
  skillsDemonstrated: string;
  publicRecommendation: string;
  supervisorName: string;
  issueDate: string;
  issuer: { name: string; website: string };
  /** Optional recruiter-facing fields — rendered only when the admin API provides them */
  linkedinUrl?: string;
  references?: Array<{
    name: string;
    role?: string;
    relationship?: string;
    linkedinUrl?: string;
    email?: string;
  }>;
}

type CredentialResult =
  | { state: "verified"; data: VerifiedCredential }
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
      return { state: "verified", data };
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

function safeIssuerWebsite(url: string | undefined): string {
  if (url && /^https?:\/\//i.test(url)) return url;
  return "https://olyxee.com";
}

function isSafeHttpUrl(url: string | undefined): url is string {
  return !!url && /^https?:\/\//i.test(url);
}

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
      robots: { index: true, follow: true },
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

function formatDate(d: string) {
  try {
    const date = new Date(d + (d.length === 10 ? "T00:00:00" : ""));
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

function splitList(value: string): string[] {
  return value
    .split(/\r?\n|,(?![^(]*\))/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);
}

function ListSection({ title, value }: { title: string; value: string }) {
  if (!value || !value.trim()) return null;
  const items = splitList(value);
  return (
    <section className="border-t border-neutral-100 pt-6">
      <h2 className="text-sm font-medium text-neutral-500 mb-3">{title}</h2>
      {items.length > 1 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-neutral-800 leading-relaxed"
            >
              <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-800 leading-relaxed">
          {value.trim()}
        </p>
      )}
    </section>
  );
}

export default async function VerifyCredentialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchCredential(slug);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <Header />
      <main className="mx-auto w-full max-w-[900px] px-5 pb-16 pt-28 sm:pt-32">
        {result.state === "verified" && <VerifiedView data={result.data} />}
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

function VerifiedView({ data }: { data: VerifiedCredential }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Status header */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 px-5 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-10">
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
            <p className="mt-1 text-sm text-neutral-500">
              This credential was issued by Olyxee (Pty) Ltd.
            </p>
            <p className="mt-1 font-mono text-sm text-neutral-400">
              {data.credentialNumber}
            </p>
          </div>
        </div>
        <ShareButton />
      </div>

      <div className="px-5 py-8 sm:px-10">
        {/* Identity */}
        <section>
          <p className="text-sm font-medium text-neutral-500">
            Credential holder
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            {data.fullName}
          </h2>
          <p className="mt-1 text-base text-neutral-700">
            {data.programmeTitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm text-neutral-500">{data.position}</p>
            {isSafeHttpUrl(data.linkedinUrl) && (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-sky-700 underline underline-offset-4 hover:text-sky-900 transition-colors"
              >
                LinkedIn profile
              </a>
            )}
          </div>
        </section>

        {/* Dates row */}
        <dl className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-neutral-500">Internship period</dt>
            <dd className="mt-0.5 text-sm font-medium text-neutral-900">
              {formatDate(data.startDate)} – {formatDate(data.completionDate)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500">Issue date</dt>
            <dd className="mt-0.5 text-sm font-medium text-neutral-900">
              {formatDate(data.issueDate)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500">Status</dt>
            <dd className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified
            </dd>
          </div>
        </dl>

        {/* Content sections */}
        <div className="mt-8 space-y-6">
          <ListSection
            title="Areas of contribution"
            value={data.projectsCompleted}
          />
          <ListSection
            title="Skills demonstrated"
            value={data.skillsDemonstrated}
          />

          {data.publicRecommendation?.trim() && (
            <section className="border-t border-neutral-100 pt-6">
              <h2 className="text-sm font-medium text-neutral-500 mb-3">
                Recommendation
              </h2>
              <div className="border-l-2 border-neutral-300 bg-neutral-50 px-5 py-4">
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {data.publicRecommendation.trim()}
                </p>
                {data.supervisorName?.trim() && (
                  <p className="mt-3 text-sm text-neutral-500">
                    {data.supervisorName}, Supervisor
                  </p>
                )}
              </div>
            </section>
          )}

          {data.references && data.references.length > 0 && (
            <section className="border-t border-neutral-100 pt-6">
              <h2 className="text-sm font-medium text-neutral-500 mb-3">
                References
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.references.map((ref, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4"
                  >
                    <p className="text-sm font-medium text-neutral-900">
                      {ref.name}
                    </p>
                    {(ref.role || ref.relationship) && (
                      <p className="mt-0.5 text-sm text-neutral-500">
                        {[ref.role, ref.relationship]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3">
                      {isSafeHttpUrl(ref.linkedinUrl) && (
                        <a
                          href={ref.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-sky-700 underline underline-offset-4 hover:text-sky-900 transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                      {ref.email && (
                        <a
                          href={`mailto:${ref.email}`}
                          className="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900 transition-colors"
                        >
                          {ref.email}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Record footer */}
      <div className="flex flex-col gap-4 border-t border-neutral-100 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-4">
          <Image
            src="/images/olyxee-corporate-seal-transparent.png"
            alt="Olyxee (Pty) Ltd corporate seal"
            width={48}
            height={48}
            className="h-12 w-12 select-none"
          />
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Issued by Olyxee (Pty) Ltd.
            </p>
            <p className="mt-0.5 text-sm text-neutral-500">
              This is the authoritative online record for this credential.
            </p>
          </div>
        </div>
        <a
          href={safeIssuerWebsite(data.issuer?.website)}
          className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors"
        >
          olyxee.com
        </a>
      </div>
    </div>
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
      className={`rounded-2xl border bg-white px-5 py-10 text-center shadow-sm sm:px-10 ${styles.card}`}
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
