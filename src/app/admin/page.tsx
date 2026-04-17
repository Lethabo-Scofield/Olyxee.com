"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

interface Intern {
  code: string;
  full_name: string;
  role_title: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

const ROLE_OPTIONS = [
  "AI/ML Engineering Intern",
  "AI Research Intern",
  "AI Engineering Intern",
  "Software Engineering Intern",
  "Product Intern",
  "Design Intern",
  "Other",
];

export default function AdminPage() {
  const [fullName, setFullName] = useState("");
  const [roleTitle, setRoleTitle] = useState(ROLE_OPTIONS[0]);
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  async function loadInterns() {
    setLoadingList(true);
    try {
      const res = await fetch("/api/interns");
      if (res.status === 401) {
        window.location.href = "/verify";
        return;
      }
      const data = await res.json();
      setInterns(data.interns || []);
    } catch {
      // ignore
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadInterns();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/interns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          role_title: roleTitle,
          code: code.trim() || undefined,
          start_date: startDate,
          end_date: endDate,
          status,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: `Intern created. Code: ${data.internship.code}`,
        });
        setFullName("");
        setCode("");
        setStartDate("");
        setEndDate("");
        setStatus("active");
        loadInterns();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to create intern",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/verify"
              className="text-sm text-white/60 hover:text-white"
            >
              ← Verification
            </Link>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-white/60 mt-1 text-sm">
              Create and manage internship records.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-lg font-medium mb-5">Create Intern</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Full Name">
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <Field label="Role Title">
                <select
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className={inputCls}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r} className="bg-black">
                      {r}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Internship Code (leave blank to auto-generate)">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="OLX-XXXXXXXX"
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Start Date">
                  <input
                    required
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="End Date">
                  <input
                    required
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputCls}
                >
                  <option value="active" className="bg-black">
                    active
                  </option>
                  <option value="completed" className="bg-black">
                    completed
                  </option>
                  <option value="revoked" className="bg-black">
                    revoked
                  </option>
                </select>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-white text-black font-medium py-3 hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Intern"}
              </button>

              {message && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    message.type === "success"
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-lg font-medium mb-5">
              Existing Interns{" "}
              <span className="text-white/40 text-sm">
                ({interns.length})
              </span>
            </h2>
            {loadingList ? (
              <p className="text-white/50 text-sm">Loading...</p>
            ) : interns.length === 0 ? (
              <p className="text-white/50 text-sm">No interns yet.</p>
            ) : (
              <ul className="space-y-3 max-h-[600px] overflow-auto pr-2">
                {interns.map((i) => (
                  <li
                    key={i.code}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <p className="font-medium">{i.full_name}</p>
                        <p className="text-sm text-white/60">{i.role_title}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          i.status === "active"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {i.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-white/40">
                      <span className="font-mono">{i.code}</span>
                      <span>
                        {new Date(i.start_date).toLocaleDateString()} –{" "}
                        {new Date(i.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-white/40 transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
