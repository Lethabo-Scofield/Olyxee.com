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
  position: string;
  startDate: string;
  completionDate: string;
  projectsCompleted: string;
  skillsDemonstrated: string;
  publicRecommendation: string;
  supervisorName: string;
  issueDate: string;
  issuer: { name: string; website: string };
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
  } catch {
    return { state: "unavailable" };
  }
});

function safeIssuerWebsite(url: string | undefined): string {
  if (url && /^https?:\/\//i.test(url)) return url;
  return "https://olyxee.com";
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
  const parts = value
    .split(/\r?\n|,(?![^(]*\))/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);
  return parts;
}

function ListSection({ title, value }: { title: string; value: string }) {
  if (!value || !value.trim()) return null;
  const items = splitList(value);
  return (
    <section>
      <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
        {title}
      </h2>
      {items.length > 1 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-700 leading-relaxed">{value.trim()}</p>
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
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col items-center px-4 sm:px-6 py-12 sm:py-20">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Back to Olyxee
          </Link>
        </div>

        {result.state === "verified" && <VerifiedView data={result.data} />}
        {result.state === "revoked" && (
          <RevokedView credentialNumber={result.credentialNumber} />
        )}
        {result.state === "not_found" && <NotFoundView />}
        {result.state === "unavailable" && <UnavailableView />}

        <p className="mt-12 sm:mt-16 text-center text-xs text-neutral-400">
          For verification inquiries, contact the Olyxee team.
        </p>
      </div>
    </main>
  );
}

function VerifiedView({ data }: { data: VerifiedCredential }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-emerald-700 text-sm font-medium">
            <svg
              className="h-4 w-4"
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
            Verified Credential
          </div>
          <p className="mt-2 text-xs font-mono text-neutral-400 tracking-wide">
            {data.credentialNumber}
          </p>
        </div>
        <ShareButton />
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
        {data.fullName}
      </h1>
      <p className="mt-2 text-lg text-neutral-600">{data.programmeTitle}</p>
      <p className="mt-1 text-sm text-neutral-500">{data.position}</p>

      <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-neutral-100 py-6">
        <div>
          <dt className="text-xs uppercase tracking-widest text-neutral-400">
            Internship period
          </dt>
          <dd className="mt-1 text-sm font-medium text-neutral-900">
            {formatDate(data.startDate)} → {formatDate(data.completionDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-neutral-400">
            Issue date
          </dt>
          <dd className="mt-1 text-sm font-medium text-neutral-900">
            {formatDate(data.issueDate)}
          </dd>
        </div>
      </dl>

      <div className="mt-8 space-y-8">
        <ListSection title="Projects Completed" value={data.projectsCompleted} />
        <ListSection
          title="Skills Demonstrated"
          value={data.skillsDemonstrated}
        />

        {data.publicRecommendation?.trim() && (
          <section>
            <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-3">
              Recommendation
            </h2>
            <blockquote className="rounded-2xl bg-neutral-50 border border-neutral-100 px-5 py-4">
              <p className="text-sm text-neutral-700 leading-relaxed italic">
                “{data.publicRecommendation.trim()}”
              </p>
              {data.supervisorName?.trim() && (
                <footer className="mt-3 text-xs text-neutral-500">
                  — {data.supervisorName}, Supervisor
                </footer>
              )}
            </blockquote>
          </section>
        )}
      </div>

      <div className="mt-10 border-t border-neutral-100 pt-6">
        <p className="text-sm text-neutral-600">
          Issued by{" "}
          <a
            href={safeIssuerWebsite(data.issuer?.website)}
            className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
          >
            {data.issuer?.name || "Olyxee"}
          </a>
        </p>
        <p className="mt-2 text-xs text-neutral-400">
          This page is the authoritative verification record for this
          credential.
        </p>
      </div>
    </div>
  );
}

function RevokedView({ credentialNumber }: { credentialNumber: string }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 px-6 sm:px-10 py-10 text-center">
      <h1 className="text-xl font-semibold text-red-700">
        Credential revoked
      </h1>
      <p className="mt-3 text-sm text-red-600 leading-relaxed">
        This credential{credentialNumber ? ` (${credentialNumber})` : ""} has
        been revoked and is no longer valid.
      </p>
    </div>
  );
}

function NotFoundView() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 sm:px-10 py-10 text-center">
      <h1 className="text-xl font-semibold text-neutral-900">
        No credential found
      </h1>
      <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
        No credential matches this verification code. Check the URL or contact
        Olyxee.
      </p>
    </div>
  );
}

function UnavailableView() {
  return (
    <div className="rounded-3xl border border-amber-100 bg-amber-50 px-6 sm:px-10 py-10 text-center">
      <h1 className="text-xl font-semibold text-amber-800">
        Verification temporarily unavailable
      </h1>
      <p className="mt-3 text-sm text-amber-700 leading-relaxed">
        We couldn&apos;t reach the verification service. Please try again
        shortly.
      </p>
    </div>
  );
}
