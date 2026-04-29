import { FC } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Rocket,
  Plug,
  ShieldCheck,
  Headphones,
  Key,
  Lock,
  Server,
  Eye,
  CheckCheck,
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

const ENTERPRISE_BLOCKS = [
  {
    num: "01",
    icon: Boxes,
    iconBg: "bg-blue-50",
    iconText: "text-blue-700",
    title: "Custom Ordo deployments",
    text: "Tailored installations of our AI execution system, configured around your data, tools, and operational policies.",
  },
  {
    num: "02",
    icon: Rocket,
    iconBg: "bg-violet-50",
    iconText: "text-violet-700",
    title: "Pilot projects for business workflows",
    text: "Scoped engagements that move a single high-value workflow from manual to AI-executed, with measurable outcomes.",
  },
  {
    num: "03",
    icon: Plug,
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-700",
    title: "Integration with APIs, databases, and internal systems",
    text: "Native connections to the systems your teams already rely on, including ERPs, CRMs, ledgers, and proprietary tools.",
  },
  {
    num: "04",
    icon: ShieldCheck,
    iconBg: "bg-amber-50",
    iconText: "text-amber-700",
    title: "Human approval layers and audit logs",
    text: "Configurable checkpoints, role-based controls, and complete audit trails so every action is reviewable and defensible.",
  },
  {
    num: "05",
    icon: Headphones,
    iconBg: "bg-rose-50",
    iconText: "text-rose-700",
    title: "Dedicated implementation support",
    text: "A direct line to our engineering team during rollout, integration, and ongoing operation.",
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

const TRUST_FEATURES = [
  { icon: ShieldCheck, title: "SOC 2 Type II", subtitle: "Controls in progress" },
  { icon: Key, title: "Customer-managed keys", subtitle: "BYOK encryption for enterprise deployments" },
  { icon: Lock, title: "RBAC + SSO", subtitle: "Integrates with Okta, Azure AD, Google Workspace" },
  { icon: Server, title: "VPC or on-prem", subtitle: "Deploy where your workloads run" },
  { icon: Eye, title: "Full audit trail", subtitle: "Every action logged and reviewable on demand" },
  { icon: CheckCheck, title: "Approval workflows", subtitle: "Configurable human-in-the-loop checkpoints" },
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
            Custom AI systems for{" "}
            <em className="text-neutral-500 not-italic">business execution</em>.
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
                Built around your systems, your policies, and your teams.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Enterprise engagements with Olyxee are scoped, measurable, and delivered with the operational guardrails that production environments require.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CAPABILITIES (with icons + colors) === */}
      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            {ENTERPRISE_BLOCKS.map((item, idx) => {
              const Icon = item.icon;
              const isLastOdd = idx === ENTERPRISE_BLOCKS.length - 1 && ENTERPRISE_BLOCKS.length % 2 !== 0;
              const borderRight = idx % 2 === 0 && !isLastOdd ? "md:border-r" : "";
              const borderBottom = idx < ENTERPRISE_BLOCKS.length - 1 ? "border-b md:border-b" : "";
              const lastRowStart = ENTERPRISE_BLOCKS.length - (ENTERPRISE_BLOCKS.length % 2 === 0 ? 2 : 1);
              const noBottomOnLastRow = idx >= lastRowStart ? "md:border-b-0" : "";
              return (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className={`group relative p-8 sm:p-10 border-neutral-200 transition-colors hover:bg-neutral-50/40 ${borderRight} ${borderBottom} ${noBottomOnLastRow} ${isLastOdd ? "md:col-span-2" : ""}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`inline-flex w-11 h-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconText}`}>
                      <Icon aria-hidden="true" focusable="false" className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-mono text-neutral-300 tracking-wider">{item.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 leading-snug">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.text}</p>
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
                From discovery to production in a quarter,{" "}
                <em className="text-neutral-500 not-italic">not a year</em>.
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

      {/* === BUILT FOR PRODUCTION (trust pills) === */}
      <section id="security" className="py-20 sm:py-32 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4"
            >
              Built for production
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]"
            >
              Enterprise-grade security, identity,{" "}
              <em className="text-neutral-500 not-italic">and auditability</em>.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
              variants={fadeUp}
              className="mt-6 text-base sm:text-lg text-neutral-500 leading-relaxed font-light"
            >
              Every Olyxee deployment ships with the controls compliance, security, and operations teams expect from production AI systems.
            </motion.p>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {TRUST_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  variants={fadeUp}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60 transition-all"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center group-hover:bg-black transition-colors">
                    <Icon aria-hidden="true" focusable="false" className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 leading-tight">{f.title}</p>
                    <p className="text-[13px] text-neutral-500 mt-1 leading-snug font-light">{f.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === EDITORIAL PHOTO 05 === */}
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
                src="/images/enterprise/operations.png"
                alt="A scheduling and approvals view used to coordinate operations across teams"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 05 · Scheduling and approvals across the organization
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Operations
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
