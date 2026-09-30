"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function AccountForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/platform/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please try again.");
      router.replace("/platform");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
      setBusy(false);
    }
  }

  const signingUp = mode === "signup";
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900 px-5 py-12 flex flex-col">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-neutral-900 text-white text-xs">O</span>
          Olyxee <span className="text-neutral-400 font-normal">/ API platform</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center py-16">
        <section className="w-full max-w-[430px] rounded-xl border border-neutral-200 bg-white px-7 py-9 sm:px-10 sm:py-10 shadow-[0_10px_40px_rgba(0,0,0,0.035)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Olyxee API platform</p>
          <h1 className="mt-3 text-[28px] font-semibold tracking-tight">{signingUp ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
            {signingUp ? "Set up a profile to access your platform workspace." : "Sign in to your platform workspace."}
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {signingUp && (
              <>
                <Field label="Full name" value={name} onChange={setName} autoComplete="name" required maxLength={120} />
                <Field label="Company (optional)" value={company} onChange={setCompany} autoComplete="organization" maxLength={120} />
              </>
            )}
            <Field label="Email address" type="email" value={email} onChange={setEmail} autoComplete="email" required maxLength={254} />
            <Field label="Password" type="password" value={password} onChange={setPassword}
              autoComplete={signingUp ? "new-password" : "current-password"} required minLength={signingUp ? 12 : undefined}
              maxLength={128} hint={signingUp ? "At least 12 characters" : undefined} />
            {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button disabled={busy} className="w-full h-11 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 disabled:opacity-60 flex items-center justify-center gap-2">
              {busy ? <LoaderCircle size={16} className="animate-spin" /> : null}
              {signingUp ? "Create account" : "Sign in"} {!busy && <ArrowRight size={15} />}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-500">
            {signingUp ? "Already have an account?" : "New to Olyxee?"}{" "}
            <Link className="font-medium text-neutral-900 underline underline-offset-4" href={signingUp ? "/platform/login" : "/platform/signup"}>
              {signingUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </section>
      </div>
      <p className="mx-auto text-xs text-neutral-400">© Olyxee · <Link href="/privacy" className="hover:text-neutral-700">Privacy</Link></p>
    </main>
  );
}

function Field({ label, value, onChange, hint, type = "text", ...props }: {
  label: string; value: string; onChange: (value: string) => void; hint?: string; type?: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "autoComplete" | "required" | "minLength" | "maxLength">) {
  return (
    <label className="block text-[13px] font-medium text-neutral-700">
      {label}
      <input {...props} type={type} value={value} onChange={event => onChange(event.target.value)}
        className="mt-1.5 w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-neutral-700 focus:ring-2 focus:ring-neutral-200" />
      {hint && <span className="block mt-1.5 text-xs font-normal text-neutral-400">{hint}</span>}
    </label>
  );
}