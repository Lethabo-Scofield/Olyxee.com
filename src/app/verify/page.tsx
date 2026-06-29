"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InternshipResult {
  code: string;
  full_name: string;
  role_title: string;
  start_date: string;
  end_date: string;
  status: string;
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InternshipResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const adminRes = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: trimmed }),
      });
      if (adminRes.ok) {
        router.push("/admin");
        return;
      }
    } catch {
      // not an admin secret, fall through to code verification
    }

    try {
      const res = await fetch(
        `/api/verify?code=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();
      if (data.valid) {
        setResult(data.internship);
      } else {
        setError(data.error || "Invalid Code");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col items-center px-6 py-20">
      <div className="w-full max-w-xl">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Back to Olyxee
          </Link>
          <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
            Verify a role.
          </h1>
          <p className="mt-4 text-lg text-neutral-500 font-light">
            Enter an Olyxee code to confirm authenticity.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="OLX-XXXXXXXX"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-2xl bg-neutral-100 border border-transparent px-6 py-5 text-lg text-center tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-300 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full rounded-full bg-neutral-900 text-white font-medium py-4 hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
        </form>

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-center text-red-600 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium uppercase tracking-widest mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified
            </div>
            <dl className="space-y-4">
              <Row label="Full name" value={result.full_name} />
              <Row label="Role" value={result.role_title} />
              <Row label="Start date" value={formatDate(result.start_date)} />
              <Row label="End date" value={formatDate(result.end_date)} />
              <Row
                label="Status"
                value={<span className="capitalize">{result.status}</span>}
              />
              <Row
                label="Code"
                value={
                  <span className="font-mono text-neutral-500">
                    {result.code}
                  </span>
                }
              />
            </dl>
          </div>
        )}

        <p className="mt-16 text-center text-xs text-neutral-400">
          For verification inquiries, contact the Olyxee team.
        </p>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
      <dt className="text-neutral-500 text-sm">{label}</dt>
      <dd className="text-neutral-900 text-sm text-right font-medium">
        {value}
      </dd>
    </div>
  );
}
