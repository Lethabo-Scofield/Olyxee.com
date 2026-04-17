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

const ADMIN_SECRET = "admin@olyxee--hard";

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

    if (trimmed === ADMIN_SECRET) {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret: trimmed }),
        });
        if (res.ok) {
          router.push("/admin");
          return;
        }
      } catch {
        // fall through to error
      }
      setLoading(false);
      setError("Admin access denied");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            ← Back to Olyxee
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            Internship Verification
          </h1>
          <p className="mt-3 text-white/60">
            Enter an Olyxee internship code to verify its authenticity.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. OLX-XXXXXXXX"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 text-lg text-center tracking-wider focus:outline-none focus:border-white/40 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full rounded-xl bg-white text-black font-medium py-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Verified Internship
            </div>
            <dl className="space-y-3">
              <Row label="Full Name" value={result.full_name} />
              <Row label="Role" value={result.role_title} />
              <Row label="Start Date" value={formatDate(result.start_date)} />
              <Row label="End Date" value={formatDate(result.end_date)} />
              <Row
                label="Status"
                value={
                  <span className="capitalize">{result.status}</span>
                }
              />
              <Row label="Code" value={result.code} />
            </dl>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-white/30">
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
    <div className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <dt className="text-white/50 text-sm">{label}</dt>
      <dd className="text-white text-sm text-right">{value}</dd>
    </div>
  );
}
