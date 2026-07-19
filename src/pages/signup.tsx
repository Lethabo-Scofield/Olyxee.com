import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

type Tool = "api" | "general";

type ToolConfig = {
  kicker: string;
  headline: string;
  subhead: string;
  features: string[];
  ctaLabel: string;
  successTitle: string;
  successBody: string;
  redirect?: { href: string; label: string; delayMs: number };
  seoTitle: string;
  seoDescription: string;
};

const TOOL_CONFIG: Record<Tool, ToolConfig> = {
  api: {
    kicker: "API access",
    headline: "Build with Olyxee.",
    subhead:
      "API access is rolling out in waves. Join the waitlist for early keys, sandbox quotas, and integration support.",
    features: [
      "REST and Python SDK for Orgni, including operational workflows and financial operations",
      "Webhooks for run completions and reconciliations",
      "Sandbox keys with generous test quotas",
      "Direct channel with the integrations team",
    ],
    ctaLabel: "Join the API waitlist",
    successTitle: "You're on the API waitlist.",
    successBody: "Taking you to the documentation now.",
    redirect: { href: "/docs", label: "Go to documentation", delayMs: 1500 },
    seoTitle: "API access waitlist",
    seoDescription:
      "Join the Olyxee API integrations waitlist. Get early API keys for Orgni, including operational workflows and financial operations, plus integration support. Read the docs while you wait.",
  },
  general: {
    kicker: "Get started",
    headline: "Join the waitlist.",
    subhead:
      "The Olyxee Platform is coming soon. Be among the first to get access.",
    features: [
      "Real-time verification for AI outputs",
      "Continuous evaluation and quality scoring",
      "Production monitoring and drift detection",
      "Team dashboards and reporting",
    ],
    ctaLabel: "Join waitlist",
    successTitle: "You're on the waitlist.",
    successBody: "We'll notify you as soon as the platform is ready.",
    seoTitle: "Join the Waitlist",
    seoDescription:
      "Join the Olyxee Platform waitlist. Be the first to get access to AI verification, evaluation, and monitoring tools.",
  },
};

const SignUp: FC = () => {
  const router = useRouter();
  const tool: Tool = router.query.tool === "api" ? "api" : "general";
  const config = useMemo(() => TOOL_CONFIG[tool], [tool]);

  const [formData, setFormData] = useState({ name: "", email: "", company: "", business: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "success" || !config.redirect) return;
    const t = setTimeout(() => {
      router.push(config.redirect!.href);
    }, config.redirect.delayMs);
    return () => clearTimeout(t);
  }, [status, config, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          business: formData.business,
          tool,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      if (data?.message && typeof data.message === "string") {
        setServerMessage(data.message);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const submitted = status === "success";
  const submitting = status === "submitting";

  const inputClass =
    "w-full px-3.5 py-3 bg-white border border-neutral-300 rounded-md text-[15px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors disabled:opacity-60";

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title={config.seoTitle} description={config.seoDescription} path="/signup" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-5">
            {config.kicker}
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1] mb-5">
            {config.headline}
          </h1>

          <p className="text-[15px] sm:text-base text-neutral-500 leading-relaxed font-normal mb-10">
            {config.subhead}
          </p>

          {submitted ? (
            <div role="status" aria-live="polite" className="border-t border-neutral-200 pt-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">{config.successTitle}</h2>
              {serverMessage && (
                <p className="text-sm text-neutral-700 mb-1">{serverMessage}</p>
              )}
              <p className="text-sm text-neutral-500 mb-6">{config.successBody}</p>
              {config.redirect ? (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  <Link href={config.redirect.href} className="underline underline-offset-4 hover:text-neutral-900 transition-colors">
                    {config.redirect.label}
                  </Link>
                </div>
              ) : (
                <Link href="/" className="text-sm text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors">
                  Back to home
                </Link>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={submitting} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-[13px] font-medium text-neutral-800 mb-1.5">
                  Full name <span className="text-neutral-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  disabled={submitting}
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[13px] font-medium text-neutral-800 mb-1.5">
                  Email <span className="text-neutral-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={submitting}
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>

              {tool === "api" && (
                <>
                  <div>
                    <label htmlFor="company" className="block text-[13px] font-medium text-neutral-800 mb-1.5">
                      Company <span className="text-neutral-400">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      disabled={submitting}
                      value={formData.company}
                      onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className={inputClass}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-[13px] font-medium text-neutral-800 mb-1.5">
                      Tell us about your business <span className="text-neutral-400">*</span>
                    </label>
                    <textarea
                      id="business"
                      required
                      disabled={submitting}
                      rows={4}
                      value={formData.business}
                      onChange={e => setFormData(prev => ({ ...prev, business: e.target.value }))}
                      className={`${inputClass} resize-none`}
                      placeholder="What you do, what you'd build with the API, and any integrations you need."
                    />
                  </div>
                </>
              )}

              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 mt-1 bg-neutral-900 text-white rounded-md font-medium hover:bg-black transition-colors text-sm tracking-wide flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Submitting
                  </>
                ) : (
                  <>
                    {config.ctaLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[12px] text-neutral-500 leading-relaxed">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-900 transition-colors">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-900 transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}

          {!submitted && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                What you get
              </p>
              <ul>
                {config.features.map((feature) => (
                  <li
                    key={feature}
                    className="py-3 border-b border-neutral-200 text-sm text-neutral-700 font-normal leading-relaxed"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              {tool === "api" && (
                <Link
                  href="/docs"
                  className="group inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Read the docs while you wait
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SignUp;
