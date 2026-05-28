import { FC, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Network, Workflow, Clock, Layers, GitMerge, Database, Check } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const RESEARCH_AREAS = [
  { icon: Database, label: "Organizational memory systems" },
  { icon: Brain, label: "Persistent contextual reasoning" },
  { icon: Network, label: "Multi-agent coordination" },
  { icon: Workflow, label: "Workflow intelligence" },
  { icon: Layers, label: "Operational state understanding" },
  { icon: Clock, label: "Long-horizon AI reasoning" },
  { icon: GitMerge, label: "Enterprise cognition infrastructure" },
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

const CortexPage: FC = () => {
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Cortex waiting list registration");
    const body = encodeURIComponent(
      `Please add me to the Olyxee Cortex waiting list.\n\nEmail: ${email}\nOrganization: ${org || "(not provided)"}\n\nI am interested in updates on early access programs, research previews, enterprise pilots, infrastructure partnerships, and future API availability.`,
    );
    window.location.href = `mailto:scofield@olyxee.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
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
          "@type": "SoftwareApplication",
          name: "Olyxee Cortex",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Persistent organizational cognition infrastructure for enterprise AI systems, focused on memory, coordination, workflow intelligence, and long-horizon reasoning.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/PreOrder" },
          url: "https://olyxee.com/research/cortex",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-48 pb-24 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-sky-200/40 via-indigo-200/30 to-transparent blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 right-0 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tl from-violet-200/35 via-blue-100/30 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-6"
          >
            Olyxee Research · Cortex
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium max-w-4xl"
          >
            Olyxee Cortex.{" "}
            <em className="font-serif italic font-normal text-neutral-500">
              Persistent organizational cognition infrastructure.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 max-w-2xl text-base sm:text-lg text-neutral-500 font-light leading-relaxed"
          >
            Olyxee Cortex is a next-generation enterprise cognition system designed to help AI maintain operational understanding, memory, coordination, and reasoning across long-running workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
            >
              Join the waiting list
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Enterprise inquiry
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-600"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            Active research and infrastructure development
          </motion.div>
        </div>
      </section>

      {/* === BEYOND RETRIEVAL === */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 border-t border-neutral-200/70">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Beyond retrieval
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              Not retrieval.{" "}
              <em className="font-serif italic font-normal text-neutral-500">Cognition.</em>
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            variants={fadeUp}
            className="lg:col-span-7 space-y-5"
          >
            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              Unlike traditional AI systems that primarily retrieve information from documents or databases, Cortex is focused on <em className="font-serif italic font-normal text-neutral-900">persistent organizational intelligence</em>, enabling AI systems to continuously evolve their understanding of an organization over time.
            </p>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              The system explores how AI can move beyond isolated prompts and temporary sessions into continuously evolving enterprise intelligence systems, capable of understanding operational history, organizational context, and long-horizon workflows.
            </p>
            <div className="pt-6 mt-6 border-t border-neutral-200">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-4">
                Designed as infrastructure for systems that require
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-neutral-700 font-light">
                    <Check className="w-3.5 h-3.5 mt-1 text-neutral-400 shrink-0" strokeWidth={2} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === RESEARCH AREAS === */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 bg-neutral-50/70 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Core research areas
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              The questions{" "}
              <em className="font-serif italic font-normal text-neutral-500">we are studying.</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {RESEARCH_AREAS.map((area, idx) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={idx}
                  variants={fadeUp}
                  className="group flex items-center gap-4 rounded-2xl bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 transition-all p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-neutral-700" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-neutral-800 font-medium tracking-[-0.005em]">
                    {area.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === POTENTIAL CAPABILITIES === */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Potential capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              What Cortex could{" "}
              <em className="font-serif italic font-normal text-neutral-500">enable.</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              Cortex is not a chatbot platform. It is a research and infrastructure initiative focused on building foundational cognition systems for enterprise AI operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CAPABILITIES.map((cap, idx) => (
              <motion.div
                key={cap}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl bg-white ring-1 ring-neutral-200 p-5 sm:p-6 h-full flex flex-col"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-3">
                  0{idx + 1}
                </span>
                <p className="text-[15px] text-neutral-800 font-medium tracking-[-0.005em] leading-snug">
                  {cap}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === LONG TERM VISION === */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900">
        <div aria-hidden className="absolute -top-32 left-1/3 w-[36rem] h-[36rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(80px) saturate(1.5)" }} />
        <div aria-hidden className="absolute -bottom-40 -right-20 w-[32rem] h-[32rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(80px) saturate(1.5)" }} />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/50 mb-5">
              Long-term vision
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-[1.05] font-medium max-w-4xl">
              Reliable enterprise AI{" "}
              <em className="font-serif italic font-normal text-white/55">
                that understands the organization it works in.
              </em>
            </h2>
            <p className="mt-8 max-w-2xl text-base sm:text-lg text-white/65 font-light leading-relaxed">
              The long-term goal of Cortex is to support reliable enterprise AI systems capable of maintaining persistent organizational understanding across operations, workflows, teams, and enterprise infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === WAITLIST === */}
      <section id="waitlist" className="scroll-mt-24 px-4 sm:px-6 py-20 sm:py-28 lg:py-32 bg-white border-t border-neutral-200/70">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Current status · Active research
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              Join the{" "}
              <em className="font-serif italic font-normal text-neutral-500">waiting list.</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              Olyxee Cortex is currently under active research and infrastructure development. Early access, research partnerships, and enterprise interest registrations will open soon.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            variants={fadeUp}
            className="rounded-3xl bg-neutral-50/70 ring-1 ring-neutral-200 p-7 sm:p-10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 mb-4">
              Register interest to receive updates on
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {WAITLIST_TOPICS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-neutral-700 font-light">
                  <Check className="w-3.5 h-3.5 mt-1 text-neutral-400 shrink-0" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>

            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                Your email client has been opened. Send the message to complete your registration. We will reach out as Cortex programs open.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-300"
                  />
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Organization (optional)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-300"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
                >
                  Register interest
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-xs text-neutral-500 pt-1">
                  Submitting opens your email client with a pre-filled message to{" "}
                  <span className="text-neutral-700">scofield@olyxee.com</span>.
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
