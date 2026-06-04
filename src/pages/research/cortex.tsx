import { FC, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const RESEARCH_AREAS = [
  "Organizational memory systems",
  "Persistent contextual reasoning",
  "Multi-agent coordination",
  "Workflow intelligence",
  "Operational state understanding",
  "Long-horizon AI reasoning",
  "Enterprise cognition infrastructure",
];

const CAPABILITIES = [
  "Persistent workflow memory",
  "Operational context retention",
  "Organizational reasoning graphs",
  "Cross-system intelligence coordination",
  "Enterprise memory synchronization",
  "Context-aware execution systems",
  "Long-running workflow intelligence",
  "Multi-agent operational coordination",
];

const REQUIREMENTS = [
  "Operational continuity",
  "Contextual memory",
  "Workflow awareness",
  "Coordinated reasoning",
  "Persistent organizational understanding",
];

const WAITLIST_TOPICS = [
  "Early access programs",
  "Research previews",
  "Enterprise pilots",
  "Infrastructure partnerships",
  "Future API availability",
];

const CODE_SAMPLES = [
  {
    label: "1. Install and connect",
    lang: "bash",
    code: `npm install @olyxee/cortex

export OLYXEE_API_KEY="sk_..."`,
  },
  {
    label: "2. Write organizational context to memory",
    lang: "typescript",
    code: `import { Cortex } from "@olyxee/cortex";

const cortex = new Cortex({ apiKey: process.env.OLYXEE_API_KEY });

await cortex.remember({
  scope: "org",
  content: "Acme moved to net-30 billing terms in Q2.",
  source: "billing-system",
});`,
  },
  {
    label: "3. Recall context inside your agent",
    lang: "typescript",
    code: `const context = await cortex.recall({
  query: "What are Acme's current billing terms?",
  limit: 5,
});

const answer = await llm.chat({
  system: "Use the organizational context provided.",
  context,
  messages,
});`,
  },
];

const CortexPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!name.trim()) return setError("Please share your name.");
    if (!email.trim()) return setError("Please enter your email.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "general",
          name: name.trim(),
          email: email.trim(),
          company: org.trim() || undefined,
          message:
            "Registering interest in Olyxee Cortex. Topics of interest: early access programs, research previews, enterprise pilots, infrastructure partnerships, future API availability.",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error("cortex waitlist error", err);
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Olyxee Cortex"
        description="Persistent Organizational Cognition Infrastructure. Olyxee Cortex is a next-generation enterprise cognition system for memory, coordination, and reasoning across long-running workflows."
        path="/research/cortex"
        keywords={[
          "Olyxee Cortex",
          "Enterprise cognition",
          "Organizational memory",
          "Multi-agent coordination",
          "Workflow intelligence",
          "Persistent AI reasoning",
          "Enterprise AI infrastructure",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Olyxee Cortex: Persistent Organizational Cognition Infrastructure",
          description:
            "Olyxee Cortex is a next-generation enterprise cognition system for memory, coordination, and reasoning across long-running workflows.",
          author: { "@type": "Organization", name: "Olyxee" },
          publisher: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
          url: "https://olyxee.com/research/cortex",
        }}
      />
      <div className="grain" />
      <Header />

      <article className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Article meta */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500"
          >
            <Link href="/research" className="hover:text-neutral-900 transition-colors">
              Olyxee Research
            </Link>
            <span aria-hidden className="text-neutral-300">/</span>
            <span className="text-neutral-700">Cortex</span>
            <span aria-hidden className="text-neutral-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              Active research
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium"
          >
            Olyxee Cortex.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-serif italic text-neutral-500 leading-[1.15]"
          >
            Persistent organizational cognition infrastructure.
          </motion.p>

          {/* Lead */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-10 sm:mt-12 prose-cortex"
          >
            <p className="text-lg sm:text-xl text-neutral-700 font-light leading-relaxed">
              Olyxee Cortex is a next-generation enterprise cognition system designed to help AI systems maintain operational understanding, memory, coordination, and reasoning across long-running workflows.
            </p>
          </motion.div>

          {/* Body */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={0}
            variants={fadeUp}
            className="mt-10 space-y-6 text-[17px] sm:text-lg text-neutral-700 font-light leading-[1.8]"
          >
            <p>
              Unlike traditional AI systems that primarily retrieve information from documents or databases, Cortex is focused on{" "}
              <em className="font-serif italic font-normal text-neutral-900">persistent organizational intelligence</em>, enabling AI systems to continuously evolve their understanding of an organization over time.
            </p>

            <p>
              Cortex is being designed as infrastructure for enterprise AI systems that require:
            </p>
            <ul className="space-y-2 pl-1">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span aria-hidden className="mt-3 inline-block w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <p>
              The system explores how AI can move beyond isolated prompts and temporary sessions into continuously evolving enterprise intelligence systems capable of understanding operational history, organizational context, and long-horizon workflows.
            </p>

            <h2 className="!mt-14 text-2xl sm:text-3xl text-neutral-900 tracking-[-0.015em] font-medium">
              Core research areas
            </h2>
            <ul className="space-y-2 pl-1">
              {RESEARCH_AREAS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span aria-hidden className="mt-3 inline-block w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h2 className="!mt-14 text-2xl sm:text-3xl text-neutral-900 tracking-[-0.015em] font-medium">
              Potential capabilities
            </h2>
            <ul className="space-y-2 pl-1">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span aria-hidden className="mt-3 inline-block w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <blockquote className="!mt-12 border-l-2 border-neutral-300 pl-5 sm:pl-6 py-1">
              <p className="font-serif italic text-xl sm:text-2xl text-neutral-800 leading-snug">
                Cortex is not a chatbot platform.
              </p>
              <p className="mt-3 text-neutral-600">
                It is a research and infrastructure initiative focused on building foundational cognition systems for enterprise AI operations.
              </p>
            </blockquote>

            <h2 className="!mt-14 text-2xl sm:text-3xl text-neutral-900 tracking-[-0.015em] font-medium">
              Long-term vision
            </h2>
            <p>
              The long-term goal of Cortex is to support reliable enterprise AI systems capable of maintaining persistent organizational understanding across operations, workflows, teams, and enterprise infrastructure.
            </p>

            <h2 className="!mt-14 text-2xl sm:text-3xl text-neutral-900 tracking-[-0.015em] font-medium">
              Current status
            </h2>
            <p>
              Olyxee Cortex is currently under active research and infrastructure development. Early access, research partnerships, and enterprise interest registrations will open soon.
            </p>
          </motion.div>
        </div>
      </article>

      {/* === USAGE GUIDE === */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto border-t border-neutral-200 pt-16 sm:pt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              A quick guide
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-[-0.02em] leading-[1.1] font-medium">
              For any team{" "}
              <em className="font-serif italic font-normal text-neutral-500">building AI products.</em>
            </h2>
            <p className="mt-6 text-lg text-neutral-700 font-light leading-relaxed">
              Most AI products forget everything the moment a session ends. For teams building agents, copilots, and automations, that means re-explaining the same context on every call and stitching memory together by hand. Cortex provides the shared, persistent memory layer your AI products read from and write to, so they understand your organization instead of starting over each time.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={1}
            variants={fadeUp}
            className="mt-12"
          >
            <h3 className="text-xl sm:text-2xl text-neutral-900 tracking-[-0.015em] font-medium mb-3">
              How you integrate Cortex
            </h3>
            <p className="text-base text-neutral-600 font-light leading-relaxed mb-8">
              Cortex is a memory API your agents write to and read from. Install the SDK, store context as your systems change, then recall it at inference time so your AI reasons with continuity instead of a cold prompt.
            </p>
            <div className="space-y-5">
              {CODE_SAMPLES.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl bg-neutral-950 ring-1 ring-black/5 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10">
                    <span className="text-[13px] font-medium text-neutral-200">{c.label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                      {c.lang}
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-4 sm:px-5 py-4">
                    <code className="font-mono text-[12.5px] leading-relaxed text-neutral-100 whitespace-pre">
                      {c.code}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base text-neutral-600 font-light leading-relaxed">
              Scoped memory, multi-agent coordination threads, and long-horizon workflow state are part of the early access program. Register below to get an API key and the full reference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === WAITING LIST === */}
      <section id="waitlist" className="scroll-mt-24 px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="rounded-3xl bg-neutral-50/70 ring-1 ring-neutral-200 p-7 sm:p-10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Join the waiting list
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-[-0.02em] leading-[1.1] font-medium">
              Register interest{" "}
              <em className="font-serif italic font-normal text-neutral-500">for Cortex.</em>
            </h2>
            <p className="mt-4 text-base text-neutral-600 font-light leading-relaxed">
              Register interest to receive updates on:
            </p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {WAITLIST_TOPICS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-neutral-700 font-light">
                  <Check className="w-3.5 h-3.5 mt-1 text-neutral-400 shrink-0" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>

            {submitted ? (
              <div className="rounded-2xl bg-white border border-neutral-200 px-5 py-5 text-sm text-neutral-700 leading-relaxed">
                <p className="font-medium text-neutral-900 mb-1">
                  You&apos;re on the list.
                </p>
                We&apos;ve sent a confirmation to{" "}
                <span className="text-neutral-900">{email}</span>. We&apos;ll
                reach out as Cortex programs open.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-300"
                  />
                  <input
                    type="text"
                    autoComplete="organization"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Organization (optional)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-300"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 leading-relaxed" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Registering…" : "Register interest"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-xs text-neutral-500 pt-1">
                  We&apos;ll email a confirmation and reach out as Cortex
                  programs open.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CortexPage;
