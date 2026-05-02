import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Truck,
  Workflow,
  Bot,
  Check,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const STATS = [
  { value: "Stateful", label: "Long-running, multi-step workflows" },
  { value: "Auditable", label: "Every action, traced and replayable" },
  { value: "Integrated", label: "Native connections to your tools" },
  { value: "Owned", label: "Your data, your policies, your environment" },
];

const ENGAGEMENT_TIERS = [
  {
    name: "Pilot",
    kicker: "Scoped pilot",
    description: "Move a single high-value workflow from manual to AI-executed, with measurable outcomes in weeks.",
    features: [
      "Discovery workshop with your team",
      "Workflow mapping and success metrics",
      "Pilot run on real data with real approvals",
      "Defined acceptance criteria",
      "Four to six week scope",
    ],
    ctaLabel: "Talk to us",
    ctaSubject: "Enterprise: Pilot inquiry",
    highlight: false,
  },
  {
    name: "Custom Deployment",
    kicker: "Production AI",
    description: "Tailored Ordo install configured around your data, tools, and operational policies.",
    features: [
      "Everything in Pilot",
      "Tailored Ordo deployment",
      "Native integrations with your APIs and ledgers",
      "Human approval layers and audit logs",
      "RBAC, SSO, and customer-managed keys",
      "Dedicated implementation support",
    ],
    ctaLabel: "Talk to us",
    ctaSubject: "Enterprise: Custom deployment inquiry",
    highlight: true,
  },
  {
    name: "Enterprise",
    kicker: "Full custom",
    description: "For organizations with custom requirements, regulated environments, or multi-region operations.",
    features: [
      "Everything in Custom Deployment",
      "Dedicated implementation team",
      "VPC or on-prem deployment",
      "Custom SLAs and compliance reviews",
      "Quarterly roadmap input",
      "Direct line to engineering",
    ],
    ctaLabel: "Talk to us",
    ctaSubject: "Enterprise: Full custom inquiry",
    highlight: false,
  },
];

const DEPLOYMENT_STAGES = [
  {
    week: "Week 1–2",
    title: "Discovery",
    desc: "Map a high-impact workflow, define success metrics, and identify the systems and policies involved.",
  },
  {
    week: "Week 2–6",
    title: "Pilot",
    desc: "Stand up a scoped pilot with real data, real approvals, and a single measurable outcome.",
  },
  {
    week: "Week 4–12",
    title: "Integration",
    desc: "Wire into your tools and ledgers. Add SSO, RBAC, and the audit posture your environment requires.",
  },
  {
    week: "Ongoing",
    title: "Production",
    desc: "Operate, expand to adjacent workflows, and tune the system as your business evolves.",
  },
];

const TRUST_LOGOS = [
  { name: "OpenAI", src: "/logos/collaborators/openai.svg" },
  { name: "Anthropic", src: "/logos/collaborators/anthropic.svg" },
  { name: "Google", src: "/logos/collaborators/google.svg" },
  { name: "Microsoft", src: "/logos/collaborators/microsoft.svg" },
  { name: "Meta", src: "/logos/collaborators/meta.svg" },
  { name: "NVIDIA", src: "/logos/collaborators/nvidia.svg" },
  { name: "Stripe", src: "/logos/collaborators/stripe.svg" },
];

const DOMAINS = [
  {
    icon: Calculator,
    name: "AI Accounting",
    description:
      "Automate reconciliations, invoice processing, expense categorisation, and financial reporting. AI that reads your ledgers, flags anomalies, and closes the books faster.",
    examples: ["AP/AR automation", "Reconciliation agents", "Anomaly detection", "Financial close workflows"],
    pricing: ["From $18K", "From $65K", "Custom"],
    timeline: ["4–6 weeks", "8–14 weeks", "12+ weeks"],
  },
  {
    icon: Truck,
    name: "AI Logistics",
    description:
      "Intelligent agents that track shipments, optimise routes, manage supplier communications, and surface exceptions before they become delays.",
    examples: ["Shipment tracking & alerts", "Supplier coordination", "Route optimisation", "Exception management"],
    pricing: ["From $28K", "From $95K", "Custom"],
    timeline: ["5–7 weeks", "10–16 weeks", "16+ weeks"],
  },
  {
    icon: Workflow,
    name: "Automation & Workflows",
    description:
      "End-to-end workflow automation that connects your systems, enforces approval chains, and executes multi-step processes without manual handoffs.",
    examples: ["Multi-step process automation", "Human-in-the-loop approvals", "Cross-system orchestration", "Scheduled & event-driven runs"],
    pricing: ["From $22K", "From $80K", "Custom"],
    timeline: ["4–6 weeks", "10–14 weeks", "14+ weeks"],
  },
  {
    icon: Bot,
    name: "Custom Agents",
    description:
      "Purpose-built AI agents scoped to your operations — from internal copilots to fully autonomous executors that act within the boundaries you define.",
    examples: ["Domain-specific copilots", "Autonomous execution agents", "Policy-aware decision agents", "Embedded agents in existing tools"],
    pricing: ["From $35K", "From $120K", "Custom"],
    timeline: ["6–8 weeks", "12–18 weeks", "18+ weeks"],
  },
];


const DESKTOP_SCREENS = [
  {
    src: "/images/enterprise/desktops/teamsync.png",
    alt: "Team Sync kanban workflow on a desktop screen",
    rotate: -6,
    delay: 0.1,
    position: "absolute top-0 left-0 sm:left-4 lg:left-8 w-[58%] sm:w-[46%] lg:w-[40%] z-10",
    sizes: "(min-width: 1024px) 480px, 60vw",
    shadow: "shadow-neutral-900/15",
  },
  {
    src: "/images/enterprise/desktops/dashboard.png",
    alt: "Operations dashboard screen with team behind it",
    rotate: 5,
    delay: 0.25,
    position: "absolute top-8 sm:top-4 right-0 sm:right-6 lg:right-12 w-[55%] sm:w-[44%] lg:w-[38%] z-20",
    sizes: "(min-width: 1024px) 460px, 55vw",
    shadow: "shadow-neutral-900/20",
  },
  {
    src: "/images/enterprise/desktops/meeting.png",
    alt: "Distributed team meeting on a desktop video call",
    rotate: -3,
    delay: 0.4,
    position: "absolute bottom-4 left-2 sm:left-12 lg:left-20 w-[60%] sm:w-[46%] lg:w-[42%] z-30",
    sizes: "(min-width: 1024px) 500px, 60vw",
    shadow: "shadow-neutral-900/20",
  },
  {
    src: "/images/enterprise/desktops/absentify.png",
    alt: "Absentify scheduling app on a desktop screen",
    rotate: 7,
    delay: 0.55,
    position: "absolute bottom-0 right-0 sm:right-4 lg:right-8 w-[56%] sm:w-[42%] lg:w-[36%] z-40",
    sizes: "(min-width: 1024px) 440px, 55vw",
    shadow: "shadow-neutral-900/20",
  },
];

const DesktopCollage: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="in-production"
      className="relative px-4 sm:px-6 py-20 sm:py-32 overflow-hidden border-t border-neutral-200/70 scroll-mt-24"
    >
      <div aria-hidden className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/30 blur-3xl" />
      <div aria-hidden className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-sky-200/40 to-emerald-200/30 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-gradient-to-tl from-amber-200/30 to-rose-200/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
            In production
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
            What it actually looks like.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
            Real surfaces, real teams, real workflows running in the background.
          </p>
        </motion.div>

        <div className="relative h-[640px] sm:h-[720px] lg:h-[760px]">
          {DESKTOP_SCREENS.map((screen) => (
            <motion.div
              key={screen.src}
              initial={
                prefersReducedMotion
                  ? { opacity: 0, rotate: screen.rotate }
                  : { opacity: 0, y: 40, rotate: screen.rotate * 1.6 }
              }
              whileInView={{ opacity: 1, y: 0, rotate: screen.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0.4 : 0.8,
                delay: prefersReducedMotion ? 0 : screen.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={screen.position}
            >
              <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ${screen.shadow} ring-1 ring-neutral-900/10 bg-white`}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes={screen.sizes}
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustryEngagement: FC = () => {
  const [industryIdx, setIndustryIdx] = useState(0);
  const industry = DOMAINS[industryIdx];
  const IndustryIcon = industry.icon;

  return (
    <section id="engagement" className="pb-20 sm:pb-32 border-t border-neutral-200/70 pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mb-10 sm:mb-14 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
            Engagement
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-snug tracking-tight">
            Three ways to start, all scoped to your business.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
            Every engagement is custom-priced based on scope. Pick the focus area for your business and we&apos;ll outline the right starting point and a quote.
          </p>
        </motion.div>

        {/* Industry selector + offering panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          variants={fadeUp}
          className="mb-10 sm:mb-14 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10 items-start">
            <div>
              <label htmlFor="industry-select" className="block text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                Your focus area
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center pointer-events-none">
                  <IndustryIcon aria-hidden="true" focusable="false" className="w-4 h-4 text-white" strokeWidth={1.75} />
                </div>
                <select
                  id="industry-select"
                  value={industryIdx}
                  onChange={(e) => setIndustryIdx(Number(e.target.value))}
                  className="w-full appearance-none bg-white border border-neutral-300 rounded-xl pl-16 pr-11 py-3.5 text-sm sm:text-[15px] font-medium text-neutral-900 cursor-pointer hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                >
                  {DOMAINS.map((d, i) => (
                    <option key={d.name} value={i}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" focusable="false" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight mb-3">
                {industry.name}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-light leading-relaxed mb-5 max-w-2xl">
                {industry.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {industry.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-[13px] sm:text-sm text-neutral-700 font-light leading-relaxed">
                    <Check aria-hidden="true" focusable="false" className="w-3.5 h-3.5 text-neutral-900 mt-1 shrink-0" strokeWidth={2.25} />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr_1fr] gap-4 sm:gap-5 lg:items-start">
          {ENGAGEMENT_TIERS.map((tier, idx) => {
            const isDark = tier.highlight;
            const subjectWithIndustry = `${tier.ctaSubject} — ${industry.name}`;
            const price = industry.pricing[idx];
            const timeline = industry.timeline[idx];
            return (
              <motion.div
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl border transition-colors ${
                  isDark
                    ? "bg-neutral-950 text-white border-neutral-950 p-8 sm:p-10 lg:-mt-6 lg:-mb-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
                    : "bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300 p-7 sm:p-8"
                }`}
              >
                {isDark && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-neutral-950 text-[10px] font-mono uppercase tracking-[0.22em] shadow-sm ring-1 ring-neutral-900/10">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      Most chosen
                    </span>
                  </div>
                )}

                <p
                  className={`text-[10px] font-mono uppercase tracking-[0.28em] mb-5 ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {tier.kicker}
                </p>

                <h3
                  className={`font-serif tracking-tight leading-tight mb-3 ${
                    isDark
                      ? "text-white text-[1.85rem] sm:text-[2.1rem]"
                      : "text-neutral-900 text-2xl sm:text-[1.75rem]"
                  }`}
                >
                  {tier.name}
                </h3>

                <p
                  className={`text-sm font-light leading-relaxed mb-6 ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {tier.description}
                </p>

                <div
                  className="mb-6 min-h-[96px]"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${industry.name}-${idx}`}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <p
                        className={`font-serif tracking-tight leading-none ${
                          isDark
                            ? "text-white text-[2.5rem] sm:text-[2.75rem]"
                            : "text-neutral-900 text-[2rem] sm:text-[2.25rem]"
                        }`}
                      >
                        {price}
                      </p>
                      <div
                        className={`mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] font-mono uppercase tracking-[0.18em] ${
                          isDark ? "text-neutral-300" : "text-neutral-500"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
                            isDark
                              ? "bg-white/10 text-white"
                              : "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          <IndustryIcon aria-hidden="true" focusable="false" className="w-3 h-3 shrink-0" strokeWidth={2} />
                          <span className="truncate">{industry.name}</span>
                        </span>
                        <span aria-hidden="true" className={isDark ? "text-neutral-500" : "text-neutral-400"}>·</span>
                        <span>{timeline}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <a
                  href={`mailto:scofield@olyxee.com?subject=${encodeURIComponent(subjectWithIndustry)}`}
                  className={`group inline-flex w-full items-center justify-center gap-2 py-3 rounded-md text-sm font-medium tracking-wide transition-colors ${
                    isDark
                      ? "bg-white text-neutral-950 hover:bg-neutral-100"
                      : "bg-neutral-900 text-white hover:bg-black"
                  }`}
                >
                  {tier.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <ul className="mt-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`py-3 text-sm font-light leading-relaxed border-b ${
                        isDark
                          ? "border-white/10 text-neutral-300"
                          : "border-neutral-200 text-neutral-700"
                      } first:border-t ${isDark ? "first:border-white/10" : "first:border-neutral-200"}`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Enterprise: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Enterprise"
        description="Custom AI systems for business execution. Olyxee helps companies deploy AI systems that execute workflows, integrate with internal tools, and support real operational decisions."
        path="/enterprise"
        keywords={[
          "Olyxee Enterprise",
          "Custom AI systems",
          "Ordo enterprise deployment",
          "AI workflow automation",
          "AI for business operations",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Olyxee Enterprise",
          provider: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
          description:
            "Custom AI execution systems, pilots, integrations, and dedicated implementation support for enterprises.",
          areaServed: "Global",
          url: "https://olyxee.com/enterprise",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-48 pb-24 sm:pb-32 px-4 sm:px-6 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6"
          >
            Enterprise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05]"
          >
            Custom AI systems for business execution.
          </motion.h1>
        </div>
      </section>

      {/* === TRUSTED BY === */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20 -mt-8 sm:-mt-12">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-center text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-neutral-500 mb-8 sm:mb-10"
          >
            Trusted by teams building with
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-8 sm:gap-x-12 gap-y-8 items-center justify-items-center"
          >
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="relative h-7 sm:h-8 w-full max-w-[140px] opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="140px"
                  className="object-contain grayscale brightness-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === EDITORIAL PHOTO 01 === */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24 -mt-4 sm:-mt-8">
        <div className="max-w-6xl mx-auto">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden rounded-xl ring-1 ring-neutral-900/10 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
              <Image
                src="/images/enterprise/team.png"
                alt="A cross-functional team reviewing operational metrics around a conference table"
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover grayscale contrast-[1.04]"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 01 · Operations review with a customer team
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Discovery
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* === STATS BAND === */}
      <section id="stats" className="relative border-y border-neutral-200/80 bg-neutral-50/50 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.value}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                variants={fadeUp}
              >
                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight mb-3 leading-none">
                  {s.value}
                </p>
                <p className="text-[13px] sm:text-sm text-neutral-500 leading-snug font-light max-w-[14rem]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === ENGAGEMENT === */}
      <IndustryEngagement />

      {/* === HOW A DEPLOYMENT WORKS (timeline) === */}
      <section id="how" className="py-20 sm:py-32 bg-gradient-to-b from-neutral-50/60 to-white border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-end">
            <div className="max-w-3xl">
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4"
              >
                How a deployment works
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={1}
                variants={fadeUp}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]"
              >
                From discovery to production in a quarter, not a year.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={2}
                variants={fadeUp}
                className="mt-6 text-base sm:text-lg text-neutral-500 leading-relaxed font-light"
              >
                Each engagement starts narrow, ships fast, and expands as trust compounds. No multi-year procurement cycles, no vaporware roadmaps.
              </motion.p>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
            >
              <div className="relative overflow-hidden rounded-xl ring-1 ring-neutral-900/10 aspect-[4/3] bg-neutral-100">
                <Image
                  src="/images/enterprise/engineering.png"
                  alt="Two engineers collaborating at code monitors during an integration session"
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                  Fig. 02 · Integration session
                </p>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                  Pilot
                </p>
              </figcaption>
            </motion.figure>
          </div>

          <div className="mt-16 sm:mt-20 relative">
            <div
              aria-hidden
              className="hidden md:block absolute top-5 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
              {DEPLOYMENT_STAGES.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  variants={fadeUp}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-mono text-[13px] font-semibold text-neutral-900 shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                      {stage.week}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900 mb-3 tracking-tight">{stage.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{stage.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === DESKTOP SCREENS COLLAGE (playful) === */}
      <DesktopCollage />

      {/* === DARK CTA === */}
      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-6">Get in touch</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              Talk to us about your workflows.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
              Tell us where AI execution would have the highest impact in your business. We&apos;ll outline a pilot, the integration scope, and how success would be measured.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:scofield@olyxee.com?subject=Enterprise%20%E2%80%94%20Custom%20deployment%20inquiry"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
              >
                All contact options
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
