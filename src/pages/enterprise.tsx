import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import EnterpriseTierModal from "../components/EnterpriseTierModal";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Wallet, Workflow, Truck, Brain, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type SolutionCategory = {
  icon: typeof Workflow;
  name: string;
  tagline: string;
  capabilities: string[];
  poweredBy: string[];
  bgImage: string;
};

const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    icon: Wallet,
    name: "Financial Operations",
    tagline: "Reconciliation, integrity, and audit intelligence.",
    capabilities: ["Reconciliation", "Integrity systems", "Validation", "Audit intelligence"],
    poweredBy: ["Addup", "ODI"],
    bgImage: "/images/gradient-blue-pink.png",
  },
  {
    icon: Workflow,
    name: "Enterprise Workflow Automation",
    tagline: "Execution, approvals, and system coordination.",
    capabilities: ["Workflow execution", "Approvals", "Operational coordination", "System integrations"],
    poweredBy: ["Ordo"],
    bgImage: "/images/gradient-orange-pink.png",
  },
  {
    icon: Truck,
    name: "Logistics & Delivery Operations",
    tagline: "Dispatch, routing, and delivery intelligence.",
    capabilities: ["Dispatch systems", "Operational coordination", "Delivery intelligence", "Workflow automation"],
    poweredBy: ["Courier Loop"],
    bgImage: "/images/gradient-yellow-green.png",
  },
  {
    icon: Brain,
    name: "Organizational Intelligence",
    tagline: "Memory, context, and persistent cognition.",
    capabilities: ["Memory systems", "Contextual reasoning", "Operational cognition", "Long-running workflows"],
    poweredBy: ["Cortex"],
    bgImage: "/images/gradient-purple.png",
  },
];

type PricingTier = {
  name: string;
  audience: string;
  description: string;
  includes: string[];
  emphasis?: boolean;
};

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter Infrastructure",
    audience: "Small businesses and growing operations",
    description: "A baseline operational stack to get core workflows running on Olyxee.",
    includes: ["Addup access", "Basic automation", "Reporting", "Standard integrations"],
  },
  {
    name: "Operational Systems",
    audience: "Operational teams that need coordination and automation",
    description: "Workflow execution and integrations across your operational stack.",
    includes: [
      "Ordo capabilities",
      "Operational workflows",
      "API integrations",
      "Enterprise automation",
      "Support",
    ],
    emphasis: true,
  },
  {
    name: "Enterprise Intelligence",
    audience: "Custom enterprise intelligence infrastructure",
    description: "A bespoke deployment built around Cortex, ODI, and multi-agent coordination.",
    includes: [
      "Cortex-based systems",
      "ODI integrations",
      "Operational cognition",
      "Multi-agent workflows",
      "Custom enterprise architecture",
      "Dedicated infrastructure",
    ],
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

        <div className="relative h-[420px] xs:h-[500px] sm:h-[720px] lg:h-[760px]">
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

const Enterprise: FC = () => {
  const [openTier, setOpenTier] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Enterprise Systems"
        description="Olyxee designs enterprise AI systems for workflow execution, operational intelligence, financial integrity, logistics coordination, and persistent organizational cognition."
        path="/enterprise"
        keywords={[
          "Olyxee Enterprise",
          "Enterprise AI systems",
          "Operational intelligence",
          "Workflow automation",
          "Reconciliation",
          "Logistics coordination",
          "Organizational cognition",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Olyxee Enterprise Systems",
          provider: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
          description:
            "Enterprise AI systems for workflow execution, financial integrity, logistics coordination, and organizational cognition.",
          areaServed: "Global",
          url: "https://olyxee.com/enterprise",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-48 pb-28 sm:pb-40 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium"
          >
            Built for{" "}
            <em className="font-serif italic font-normal text-neutral-500">
              the enterprise.
            </em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="#solutions"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
            >
              Explore Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="mailto:scofield@olyxee.com?subject=Enterprise%3A%20Build%20With%20Olyxee"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Contact Enterprise Team
            </a>
          </motion.div>
        </div>
      </section>

      {/* === SOLUTION CATEGORIES === */}
      <section id="solutions" className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 border-t border-neutral-200/70 scroll-mt-24">
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
              What we build
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              Solutions for{" "}
              <em className="font-serif italic font-normal text-neutral-500">
                operational teams.
              </em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              Four core problem spaces where Olyxee deploys systems, each one powered by a product in our stack.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {SOLUTION_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.article
                  key={cat.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={idx}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-3xl ring-1 ring-neutral-200 hover:ring-neutral-300 hover:shadow-sm transition-all p-7 sm:p-9 flex flex-col isolate"
                >
                  <Image
                    src={cat.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    aria-hidden
                    className="absolute inset-0 -z-10 object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-white/55 to-white/90" />
                  <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm ring-1 ring-white/80 flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-5 h-5 text-neutral-900" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-neutral-950 tracking-[-0.015em] font-semibold mb-2 leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-neutral-800 font-normal leading-relaxed mb-5">
                    {cat.tagline}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {cat.capabilities.map((c) => (
                      <li key={c} className="flex items-baseline gap-2.5 text-[13px] text-neutral-800 font-normal">
                        <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-neutral-700 translate-y-[-2px]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 border-t border-neutral-900/10 flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-700 font-semibold">
                      Powered by
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.poweredBy.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-medium tracking-tight"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* === ENGAGEMENT MODEL / PRICING === */}
      <section id="engagement" className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 bg-neutral-50/70 border-t border-neutral-200/70">
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
              Engagement model
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
              Three ways to{" "}
              <em className="font-serif italic font-normal text-neutral-500">
                build with us.
              </em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              Olyxee delivers systems and infrastructure, not packaged SaaS. Engagements scale with operational complexity and the depth of the systems you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {PRICING_TIERS.map((tier, idx) => (
              <motion.article
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={idx}
                variants={fadeUp}
                className={`relative rounded-3xl p-7 sm:p-9 flex flex-col h-full ${
                  tier.emphasis
                    ? "bg-neutral-900 text-white ring-1 ring-neutral-900 shadow-xl shadow-neutral-900/15"
                    : "bg-white ring-1 ring-neutral-200"
                }`}
              >
                {tier.emphasis && (
                  <span className="absolute -top-3 left-7 sm:left-9 inline-flex px-2.5 py-1 rounded-full bg-white text-neutral-900 text-[10px] font-mono uppercase tracking-[0.22em] ring-1 ring-neutral-200">
                    Most common
                  </span>
                )}
                <p
                  className={`text-[10px] font-mono uppercase tracking-[0.22em] mb-4 ${
                    tier.emphasis ? "text-white/55" : "text-neutral-400"
                  }`}
                >
                  Tier 0{idx + 1}
                </p>
                <h3
                  className={`text-xl sm:text-2xl tracking-[-0.015em] font-medium mb-2 leading-snug ${
                    tier.emphasis ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-[13px] font-light leading-relaxed mb-3 ${
                    tier.emphasis ? "text-white/65" : "text-neutral-500"
                  }`}
                >
                  {tier.audience}.
                </p>
                <p
                  className={`text-sm font-light leading-relaxed mb-6 ${
                    tier.emphasis ? "text-white/80" : "text-neutral-600"
                  }`}
                >
                  {tier.description}
                </p>
                <p
                  className={`text-[10px] font-mono uppercase tracking-[0.22em] mb-3 ${
                    tier.emphasis ? "text-white/45" : "text-neutral-400"
                  }`}
                >
                  Includes
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm font-light ${
                        tier.emphasis ? "text-white/85" : "text-neutral-700"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 mt-1 shrink-0 ${
                          tier.emphasis ? "text-white/60" : "text-neutral-400"
                        }`}
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setOpenTier(tier.name)}
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium tracking-wide transition-colors ${
                    tier.emphasis
                      ? "bg-white text-neutral-900 hover:bg-neutral-100"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  Discuss this tier
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.article>
            ))}
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
            variants={fadeUp}
            className="mt-10 sm:mt-12 max-w-3xl text-sm text-neutral-500 font-light leading-relaxed"
          >
            Solutions vary depending on industry requirements, operational complexity, integrations, and infrastructure needs. Most engagements combine packaged products with custom architecture, integration work, and a defined operating model.
          </motion.p>
        </div>
      </section>

      {/* === IN PRODUCTION (UNTOUCHED) === */}
      <DesktopCollage />

      {/* === BUILD WITH OLYXEE === */}
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
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 mb-5">
                Enterprise inquiry
              </p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-[-0.025em] text-neutral-900 mb-5 leading-[1.05] font-medium">
                Build With <em className="font-serif italic font-normal text-neutral-500">Olyxee.</em>
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Work with Olyxee to design operational intelligence systems tailored to your organization. Tell us about your workflows, integrations, and operating environment, and we will scope the engagement with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:scofield@olyxee.com?subject=Enterprise%3A%20Build%20With%20Olyxee"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Request a consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  Enterprise inquiry form
                </Link>
              </div>
              <p className="mt-6 text-xs text-neutral-500">
                Or email us directly at{" "}
                <a href="mailto:enterprise@olyxee.com" className="text-neutral-900 underline underline-offset-4 hover:no-underline">
                  enterprise@olyxee.com
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <EnterpriseTierModal
        open={openTier !== null}
        onClose={() => setOpenTier(null)}
        tierName={openTier ?? ""}
      />
    </div>
  );
};

export default Enterprise;
