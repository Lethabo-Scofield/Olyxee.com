import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import EnterpriseTierModal from "../components/EnterpriseTierModal";
import TalkToEnterprise from "../components/EnterpriseContactModal";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Settings,
  Plug,
  FileText,
  BarChart3,
  MessageCircle,
  Network,
  Link2,
  ClipboardCheck,
  Brain,
  Globe,
  Users,
  Cpu,
  Bot,
  Wrench,
  ShieldCheck,
  Headset,
  type LucideIcon,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type TierFeature = {
  icon: LucideIcon;
  text: string;
};

type PricingTier = {
  name: string;
  audience: string;
  description: string;
  inheritsFrom?: string;
  includes: TierFeature[];
  emphasis?: boolean;
};

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter Infrastructure",
    audience: "For teams that need one focused system or workflow",
    description:
      "A simple infrastructure setup to help an organization start using Olyxee for a specific operational need.",
    includes: [
      { icon: Rocket, text: "One focused system deployment" },
      { icon: Settings, text: "Operational workflow execution" },
      { icon: Plug, text: "Standard integrations" },
      { icon: FileText, text: "Data and document handling" },
      { icon: BarChart3, text: "Reporting" },
      { icon: MessageCircle, text: "Light support" },
    ],
  },
  {
    name: "Operational Infrastructure",
    audience: "For teams that need connected systems across their operations",
    description:
      "A deeper deployment that connects workflows, data, documents, approvals, and internal tools into one operating layer.",
    inheritsFrom: "Starter",
    includes: [
      { icon: Network, text: "Operational system design" },
      { icon: Link2, text: "API and database integrations" },
      { icon: ClipboardCheck, text: "Business rules and human approval flows" },
      { icon: Brain, text: "Business memory and document integrity" },
      { icon: Globe, text: "Orgni live business context layer" },
      { icon: Users, text: "Togent access for team and system integration" },
    ],
    emphasis: true,
  },
  {
    name: "Enterprise AI Infrastructure",
    audience:
      "For organizations that need custom AI infrastructure across multiple systems, teams, and workflows",
    description:
      "A bespoke deployment where Olyxee becomes part of the organization's internal operating infrastructure.",
    inheritsFrom: "Operational",
    includes: [
      { icon: Cpu, text: "Custom AI infrastructure deployment" },
      { icon: Bot, text: "Multi-agent and advanced workflows" },
      { icon: Wrench, text: "Custom APIs and integrations" },
      { icon: ShieldCheck, text: "System monitoring and audit trails" },
      { icon: Headset, text: "Dedicated architecture and infrastructure support" },
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
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05]"
          >
            Built for{" "}
            <em className="text-neutral-500 not-italic">
              the enterprise.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-xl mx-auto"
          >
Every deployment runs on Orgni, connecting your context, systems, and decisions into one operating layer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="#engagement"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
            >
              Explore Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <TalkToEnterprise
              label="Contact Enterprise Team"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 sm:mt-20 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-300/40"
        >
          <video
            src="/videos/research-areas.mp4"
            className="w-full aspect-video object-cover block"
            autoPlay loop muted playsInline preload="metadata"
            aria-label="The Orgni platform connecting financial operations, operational workflows, and business memory into one operating layer."
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-[85%] sm:w-[65%] h-[70%] sm:h-[60%] pointer-events-none"
            style={{ background: "radial-gradient(120% 120% at 0% 100%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 75%)" }}
          />
          <div className="absolute bottom-0 left-0 max-w-2xl p-6 sm:p-10 text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/70 mb-3">
              One operating layer
            </p>
            <h3 className="font-serif text-2xl sm:text-4xl text-white tracking-tight leading-[1.1] max-w-2xl">
              Your context, systems, and decisions, running as one.
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl">
              Orgni connects financial operations, operational workflows, and business memory so intelligent systems can act with full context.
            </p>
          </div>
          <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
        </motion.div>
      </section>

      {/* === ENGAGEMENT MODEL / PRICING === */}
      <section id="engagement" className="px-4 sm:px-6 py-20 sm:py-28 lg:py-32 bg-[#f5f5f7] border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Engagement model
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.05]">
              Three ways to{" "}
              <em className="text-neutral-500 not-italic">
                build with us.
              </em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
              We deliver systems and infrastructure, not packaged SaaS. Pick the depth that matches your operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {PRICING_TIERS.map((tier, idx) => (
              <motion.article
                key={tier.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={idx}
                variants={fadeUp}
                className={`relative rounded-2xl bg-white flex flex-col h-full p-6 sm:p-7 transition-shadow ${
                  tier.emphasis
                    ? "ring-2 ring-neutral-900"
                    : "ring-1 ring-neutral-200"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="text-[26px] sm:text-[28px] tracking-[-0.02em] font-semibold text-neutral-900 leading-snug">
                    {tier.name.replace(" Infrastructure", "")}
                  </h3>
                  {tier.emphasis && (
                    <span className="inline-flex items-center rounded-full bg-neutral-900 text-white text-[11px] font-medium px-2.5 py-1">
                      Most common
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-6">
                  {tier.audience.replace(/^For teams/, "Best for teams").replace(/^For organizations/, "Best for organizations")}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenTier(tier.name)}
                  className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium tracking-tight transition-all active:scale-[0.98] bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  Discuss this tier
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-6 pb-4 border-b border-neutral-200">
                  {tier.inheritsFrom ? (
                    <p className="flex items-center gap-2.5 text-[14px] font-semibold text-neutral-900">
                      <span aria-hidden className="text-[15px] leading-none">✦</span>
                      Everything in {tier.inheritsFrom} and:
                    </p>
                  ) : (
                    <p className="text-[14px] font-semibold text-neutral-900">
                      {tier.description}
                    </p>
                  )}
                </div>

                <ul className="mt-4 flex flex-col gap-3.5">
                  {tier.includes.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-[14px] text-neutral-800 leading-snug"
                    >
                      <item.icon
                        aria-hidden
                        className="w-[18px] h-[18px] mt-px shrink-0 text-neutral-500"
                        strokeWidth={1.75}
                      />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
            variants={fadeUp}
            className="mt-10 sm:mt-12 max-w-3xl text-[15px] text-neutral-600 leading-relaxed"
          >
            Every solution is shaped by your industry, operational complexity, integrations, and infrastructure needs. Most engagements combine packaged products with custom architecture, integration work, and a clear operating model.
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
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Build With <em className="text-neutral-500 not-italic">Olyxee.</em>
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
Tell us about your workflows and operating environment, and we will scope the engagement with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <TalkToEnterprise label="Request a consultation" />
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
