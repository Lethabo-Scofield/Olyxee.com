import { FC } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Truck,
  Workflow,
  Bot,
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

const DOMAINS = [
  {
    icon: Calculator,
    name: "AI Accounting",
    description:
      "Automate reconciliations, invoice processing, expense categorisation, and financial reporting. AI that reads your ledgers, flags anomalies, and closes the books faster.",
    examples: ["AP/AR automation", "Reconciliation agents", "Anomaly detection", "Financial close workflows"],
  },
  {
    icon: Truck,
    name: "AI Logistics",
    description:
      "Intelligent agents that track shipments, optimise routes, manage supplier communications, and surface exceptions before they become delays.",
    examples: ["Shipment tracking & alerts", "Supplier coordination", "Route optimisation", "Exception management"],
  },
  {
    icon: Workflow,
    name: "Automation & Workflows",
    description:
      "End-to-end workflow automation that connects your systems, enforces approval chains, and executes multi-step processes without manual handoffs.",
    examples: ["Multi-step process automation", "Human-in-the-loop approvals", "Cross-system orchestration", "Scheduled & event-driven runs"],
  },
  {
    icon: Bot,
    name: "Custom Agents",
    description:
      "Purpose-built AI agents scoped to your operations — from internal copilots to fully autonomous executors that act within the boundaries you define.",
    examples: ["Domain-specific copilots", "Autonomous execution agents", "Policy-aware decision agents", "Embedded agents in existing tools"],
  },
];


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
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            Custom AI systems for business execution.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Olyxee helps companies deploy AI systems that execute workflows, integrate with internal tools, and support real operational decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="mailto:scofield@olyxee.com?subject=Enterprise%20%E2%80%94%20Custom%20deployment%20inquiry"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Explore the products
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 text-[11px] font-mono text-neutral-500 tracking-wider"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              ACCEPTING NEW PILOT ENGAGEMENTS · Q2&nbsp;2026
            </span>
          </motion.p>
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

      {/* === WHAT WE DELIVER (intro) === */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] lg:pt-2 mb-2">What we deliver</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-8">
                Custom AI agents and systems, built for your business.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Olyxee builds bespoke AI for your operations. Agents that execute end-to-end workflows. Systems that connect to the tools you already run. Engagements scoped to ship in weeks, not quarters.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === DOMAINS (Accounting, Logistics, Automation, Custom Agents) === */}
      <section id="domains" className="pb-20 sm:pb-32 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 mb-14 sm:mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] lg:pt-2 mb-2">What we build</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-6">
                AI across the operations that move your business.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                We deploy purpose-built AI in the functions where manual work compounds — accounting, logistics, cross-system workflows, and custom agents tailored to how your teams operate.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="group flex flex-col p-7 sm:p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60 transition-all"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-neutral-900 flex items-center justify-center mb-5 group-hover:bg-black transition-colors">
                    <Icon aria-hidden="true" focusable="false" className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight mb-3">{d.name}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">{d.description}</p>
                  <ul className="mt-auto space-y-2">
                    {d.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-[13px] text-neutral-500 font-light">
                        <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === ENGAGEMENT (pricing-style tiers, contact instead of numbers) === */}
      <section id="engagement" className="pb-20 sm:pb-32">
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
              Every engagement is custom-priced based on scope. Talk to us and we&apos;ll outline the right starting point and a quote.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {ENGAGEMENT_TIERS.map((tier, idx) => {
              const isDark = tier.highlight;
              return (
                <motion.div
                  key={tier.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                  className={`relative flex flex-col p-7 sm:p-8 rounded-2xl border transition-colors ${
                    isDark
                      ? "bg-neutral-950 text-white border-neutral-950"
                      : "bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <p
                    className={`text-[10px] font-mono uppercase tracking-[0.28em] mb-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {tier.kicker}
                  </p>

                  <h3
                    className={`font-serif text-2xl sm:text-[1.75rem] tracking-tight leading-tight mb-3 ${
                      isDark ? "text-white" : "text-neutral-900"
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

                  <div className="mb-6">
                    <p
                      className={`text-[2rem] sm:text-[2.25rem] font-serif tracking-tight leading-none ${
                        isDark ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      Custom
                    </p>
                    <p
                      className={`mt-1.5 text-[12px] font-mono uppercase tracking-[0.18em] ${
                        isDark ? "text-neutral-500" : "text-neutral-400"
                      }`}
                    >
                      Quoted on scope
                    </p>
                  </div>

                  <a
                    href={`mailto:scofield@olyxee.com?subject=${encodeURIComponent(tier.ctaSubject)}`}
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

      {/* === EDITORIAL PHOTO 03 === */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden rounded-xl ring-1 ring-neutral-900/10 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
              <Image
                src="/images/enterprise/sync.png"
                alt="Distributed team on a video call reviewing a project together"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 03 · Distributed customer review
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Sync
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </section>

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

      {/* === EDITORIAL PHOTO 04 === */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden rounded-xl ring-1 ring-neutral-900/10 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
              <Image
                src="/images/enterprise/planning.png"
                alt="A team mapping out a workflow on a digital kanban board"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 04 · Workflow mapping with a customer team
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Planning
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </section>

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
