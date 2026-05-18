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
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ENGAGEMENT_TIERS = [
  {
    name: "Pilot",
    description: "One workflow, live on real data, in weeks.",
    agents: "Up to 3 agents",
    access: "Ordo or Addup (choose one)",
    features: [
      "Discovery workshop",
      "Pilot on real data",
      "Defined acceptance criteria",
    ],
    ctaLabel: "Start a pilot",
    ctaSubject: "Enterprise: Pilot inquiry",
    highlight: false,
  },
  {
    name: "Custom Deployment",
    description: "A tailored Ordo install across your tools and policies.",
    agents: "Up to 15 agents",
    access: "Ordo + Addup (full suite)",
    features: [
      "Everything in Pilot",
      "Native API & ledger integrations",
      "SSO, RBAC, customer-managed keys",
      "Dedicated implementation support",
    ],
    ctaLabel: "Talk to us",
    ctaSubject: "Enterprise: Custom deployment inquiry",
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "Custom, regulated, or multi-region operations.",
    agents: "Unlimited agents",
    access: "Ordo + Addup + early access to new products",
    features: [
      "Everything in Custom Deployment",
      "VPC or on-prem deployment",
      "Custom SLAs & compliance reviews",
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
    deliverables: ["Workflow map", "Success metrics", "Systems audit"],
  },
  {
    week: "Week 2–6",
    title: "Pilot",
    desc: "Stand up a scoped pilot with real data, real approvals, and a single measurable outcome.",
    deliverables: ["Live pilot run", "Approval flows", "Acceptance criteria"],
  },
  {
    week: "Week 4–12",
    title: "Integration",
    desc: "Wire into your tools and ledgers. Add SSO, RBAC, and the audit posture your environment requires.",
    deliverables: ["Native API hooks", "SSO + RBAC", "Audit trail"],
  },
  {
    week: "Ongoing",
    title: "Production",
    desc: "Operate, expand to adjacent workflows, and tune the system as your business evolves.",
    deliverables: ["24/7 monitoring", "Workflow expansion", "Quarterly tuning"],
  },
];

const DOMAINS = [
  {
    icon: Calculator,
    name: "AI Accounting",
    pricing: ["Scoped quote", "Tailored quote", "Custom quote"],
    timeline: ["4–6 weeks", "8–14 weeks", "12+ weeks"],
  },
  {
    icon: Truck,
    name: "AI Logistics",
    pricing: ["Scoped quote", "Tailored quote", "Custom quote"],
    timeline: ["5–7 weeks", "10–16 weeks", "16+ weeks"],
  },
  {
    icon: Workflow,
    name: "Automation & Workflows",
    pricing: ["Scoped quote", "Tailored quote", "Custom quote"],
    timeline: ["4–6 weeks", "10–14 weeks", "14+ weeks"],
  },
  {
    icon: Bot,
    name: "Custom Agents",
    pricing: ["Scoped quote", "Tailored quote", "Custom quote"],
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
  const [activeTier, setActiveTier] = useState(1);
  const industry = DOMAINS[industryIdx];

  return (
    <section
      id="engagement"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-neutral-200/70 bg-neutral-950 text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/3 w-[40rem] h-[40rem] rounded-full opacity-[0.18] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.6) 0%, rgba(125,211,252,0) 60%)",
          filter: "blur(80px) saturate(1.4)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full opacity-[0.15] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.5) 0%, rgba(251,146,60,0) 60%)",
          filter: "blur(80px) saturate(1.4)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mb-14 sm:mb-20 max-w-3xl"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/40 mb-5">
            Engagement
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Three ways in, <em className="text-sky-300 not-italic">scoped to your business.</em>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/55 font-light leading-relaxed max-w-2xl">
            Pick a focus area. We&apos;ll outline the right starting point: a pilot, a custom deployment, or a full enterprise build.
          </p>
        </motion.div>

        {/* Focus area pills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          variants={fadeUp}
          className="mb-10 sm:mb-14 flex flex-wrap gap-2"
        >
          {DOMAINS.map((d, i) => {
            const Icon = d.icon;
            const active = i === industryIdx;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => setIndustryIdx(i)}
                aria-pressed={active}
                className={`group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                  active
                    ? "bg-white text-neutral-900 border-white shadow-lg shadow-white/10"
                    : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon aria-hidden className="w-4 h-4" strokeWidth={1.75} />
                {d.name}
              </button>
            );
          })}
        </motion.div>

        {/* Ledger — horizontal tier rows */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-sm overflow-hidden">
          {ENGAGEMENT_TIERS.map((tier, idx) => {
            const isActive = idx === activeTier;
            const subjectWithIndustry = `${tier.ctaSubject} - ${industry.name}`;
            const price = industry.pricing[idx];
            const timeline = industry.timeline[idx];
            return (
              <motion.div
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={idx}
                variants={fadeUp}
                onMouseEnter={() => setActiveTier(idx)}
                onFocus={() => setActiveTier(idx)}
                className={`relative transition-colors ${
                  idx > 0 ? "border-t border-white/10" : ""
                } ${isActive ? "bg-white/[0.04]" : ""}`}
              >
                {/* Left accent bar */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all ${
                    isActive ? "bg-sky-300" : "bg-transparent"
                  }`}
                />

                <div className="grid grid-cols-12 gap-x-6 gap-y-6 p-6 sm:p-10">
                  {/* Index + name */}
                  <div className="col-span-12 md:col-span-4 flex items-start gap-5">
                    <div className="font-mono text-[11px] tracking-[0.22em] text-white/40 pt-2">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-serif text-2xl sm:text-[1.85rem] tracking-tight leading-tight">
                          {tier.name}
                        </h3>
                        {tier.highlight && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-300/15 text-sky-200 text-[10px] font-medium uppercase tracking-[0.18em] border border-sky-300/30">
                            Most fit
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/55 font-light leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Spec metrics */}
                  <div className="col-span-12 md:col-span-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase mb-2">
                        Investment
                      </p>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={`${industry.name}-${idx}-price`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="font-serif text-lg sm:text-xl text-white leading-tight"
                        >
                          {price}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase mb-2">
                        Timeline
                      </p>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={`${industry.name}-${idx}-timeline`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="font-serif text-lg sm:text-xl text-white leading-tight"
                        >
                          {timeline}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase mb-2">
                        Agents
                      </p>
                      <p className="font-serif text-lg sm:text-xl text-white leading-tight">
                        {tier.agents.replace(/^Up to |^/, "")}
                      </p>
                    </div>
                  </div>

                  {/* Includes + CTA */}
                  <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2.5 text-[13px] text-white/80 font-light leading-relaxed">
                        <Check aria-hidden className="w-3.5 h-3.5 text-sky-300 mt-1 shrink-0" strokeWidth={2.25} />
                        <span>{tier.access}</span>
                      </li>
                      {tier.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[13px] text-white/60 font-light leading-relaxed"
                        >
                          <Check aria-hidden className="w-3.5 h-3.5 text-white/30 mt-1 shrink-0" strokeWidth={2.25} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`mailto:scofield@olyxee.com?subject=${encodeURIComponent(subjectWithIndustry)}`}
                      className={`group inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full text-sm font-medium tracking-wide transition-colors w-full sm:w-auto ${
                        tier.highlight
                          ? "bg-white text-neutral-900 hover:bg-neutral-200"
                          : "bg-white/[0.06] text-white border border-white/15 hover:bg-white/10 hover:border-white/30"
                      }`}
                    >
                      <span>{tier.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-xs text-white/40 font-light leading-relaxed max-w-2xl">
          Pricing and timeline ranges are indicative for <span className="text-white/70">{industry.name}</span>. Every engagement is scoped against your data, integrations, and compliance posture before any commitment.
        </p>
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
      <section className="relative pt-36 sm:pt-48 pb-32 sm:pb-48 lg:pb-56 px-4 sm:px-6 bg-white overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0 -z-0">
          <Image
            src="/images/enterprise/team.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.04] opacity-[0.32] sm:opacity-40"
          />
          {/* Soft white scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>

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

      {/* === PRINCIPLES STRIP === */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28 -mt-8 sm:-mt-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/70 border-y border-neutral-200/70"
          >
            {[
              { k: "01", t: "Scoped, not sold", d: "We start with one workflow and a measurable outcome, never a multi-year contract." },
              { k: "02", t: "Inside your environment", d: "Ordo runs in your cloud, with your data, under your access controls." },
              { k: "03", t: "Built with you", d: "Our engineers ship alongside yours. No reseller hand-off, no implementation partner." },
            ].map((p) => (
              <div key={p.k} className="px-6 sm:px-8 py-8 sm:py-10">
                <p className="font-mono text-[11px] tracking-[0.22em] text-neutral-400 mb-3">{p.k}</p>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight mb-2 leading-tight">
                  {p.t}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{p.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === ENGAGEMENT === */}
      <IndustryEngagement />

      {/* === HOW A DEPLOYMENT WORKS (timeline) === */}
      <section id="how" className="py-20 sm:py-32 bg-gradient-to-b from-neutral-50/60 to-white border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.28em] mb-4"
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

          {/* Large hero image */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16 sm:mb-24"
          >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-neutral-900/10 shadow-xl shadow-neutral-900/10 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
              <Image
                src="/images/enterprise/engineering.png"
                alt="Two engineers collaborating at code monitors during an integration session"
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 02 · Integration session
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Pilot · In production
              </p>
            </figcaption>
          </motion.figure>

          {/* Timeline stages */}
          <div className="relative">
            <div
              aria-hidden
              className="hidden md:block absolute top-5 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 relative">
              {DEPLOYMENT_STAGES.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  variants={fadeUp}
                  className="relative bg-white rounded-xl border border-neutral-200 p-6 sm:p-7 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center font-mono text-[12px] font-semibold text-white shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                      {stage.week}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900 mb-3 tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light mb-5">
                    {stage.desc}
                  </p>
                  <ul className="pt-4 border-t border-neutral-100 space-y-2">
                    {stage.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-[12.5px] text-neutral-700 font-light leading-snug"
                      >
                        <Check
                          aria-hidden="true"
                          focusable="false"
                          className="w-3.5 h-3.5 text-neutral-900 mt-0.5 shrink-0"
                          strokeWidth={2.25}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === DESKTOP SCREENS COLLAGE (playful) === */}
      <DesktopCollage />

      {/* === GET IN TOUCH CTA === */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-[0.22em] mb-5">Get in touch</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Talk to us about your workflows.
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Tell us where AI execution would have the highest impact in your business. We&apos;ll outline a pilot, the integration scope, and how success would be measured.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:scofield@olyxee.com?subject=Enterprise%3A%20Custom%20deployment%20inquiry"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  All contact options
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
