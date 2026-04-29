import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

type Tool = "api" | "general";

type ToolConfig = {
  kicker: string;
  headline: string;
  emphasis: string;
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
    headline: "Build with",
    emphasis: "Olyxee",
    subhead:
      "API access is rolling out in waves. Join the waitlist for early keys, sandbox quotas, and integration support. Documentation is open while you wait.",
    features: [
      "REST + Python SDK for Ordo and Addup",
      "Webhooks for run completions and reconciliations",
      "Sandbox keys with generous test quotas",
      "Direct Slack channel with the integrations team",
    ],
    ctaLabel: "Join the API waitlist",
    successTitle: "You're on the API waitlist",
    successBody: "Taking you to the documentation now.",
    redirect: { href: "/docs", label: "Go to documentation", delayMs: 1500 },
    seoTitle: "API access waitlist",
    seoDescription:
      "Join the Olyxee API integrations waitlist. Get early API keys for Ordo and Addup, plus integration support. Read the docs while you wait.",
  },
  general: {
    kicker: "Get started",
    headline: "Join the",
    emphasis: "waitlist",
    subhead:
      "The Olyxee Platform is coming soon. Join the waitlist to be the first to get access to tools that make your AI applications more reliable, accurate, and observable.",
    features: [
      "Real-time verification for AI outputs",
      "Continuous evaluation and quality scoring",
      "Production monitoring and drift detection",
      "Team dashboards and reporting",
    ],
    ctaLabel: "Join waitlist",
    successTitle: "You're on the waitlist",
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

  const [formData, setFormData] = useState({ name: "", email: "" });
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
          message: formData.name ? `Name: ${formData.name}` : "",
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

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title={config.seoTitle} description={config.seoDescription} path="/signup" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div custom={0} variants={fadeUp} className="flex items-center gap-2 mb-8">
                <span className="accent-dot" />
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
                  {config.kicker}
                </span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                {config.headline}{" "}
                <em className="text-blue-500">{config.emphasis}</em>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-neutral-500 leading-relaxed mb-12 font-light">
                {config.subhead}
              </motion.p>

              <div className="space-y-5">
                {config.features.map((feature, idx) => (
                  <motion.div key={feature} custom={idx + 3} variants={fadeUp} className="flex gap-3 items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {tool === "api" && (
                <motion.div custom={config.features.length + 3} variants={fadeUp} className="mt-10 pt-6 border-t border-neutral-200">
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
                  >
                    Read the docs while you wait
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {submitted ? (
                <div
                  className="bg-neutral-50 rounded-2xl p-10 border border-neutral-200 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-neutral-900">{config.successTitle}</h2>
                  {serverMessage && (
                    <p className="text-sm text-neutral-700 mb-2">{serverMessage}</p>
                  )}
                  <p className="text-neutral-500 mb-6">{config.successBody}</p>
                  {config.redirect ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                      <Link href={config.redirect.href} className="text-blue-500 hover:text-blue-600 transition-colors underline-offset-4 hover:underline">
                        {config.redirect.label}
                      </Link>
                    </div>
                  ) : (
                    <Link href="/" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      Back to home
                    </Link>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  aria-busy={submitting}
                  className="bg-neutral-50 rounded-2xl p-8 sm:p-10 border border-neutral-200 space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      disabled={submitting}
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={submitting}
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all disabled:opacity-60"
                      placeholder="you@company.com"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-sm text-red-600" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium hover:bg-black transition-all text-sm tracking-wide flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Submitting...
                      </>
                    ) : (
                      <>
                        {config.ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-neutral-400 text-center leading-relaxed">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-neutral-600 transition-colors">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-neutral-600 transition-colors">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SignUp;
