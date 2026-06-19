import { FC, ReactNode, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, EyeOff, MapPin, Calendar, Workflow, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const APPROACH = [
  {
    icon: Compass,
    label: "How we ship",
    title: "Narrow first, then expand",
    text: "Every deployment starts with a single workflow on Orgni. We earn the right to do more by proving the first one works in production.",
    gradient: "/images/gradient-orange-pink.png",
  },
  {
    icon: ShieldCheck,
    label: "How we build",
    title: "Context before action",
    text: "Orgni gives AI the business context and memory to act with judgment, and logs every action so teams can review, trust, and direct what runs.",
    gradient: "/images/gradient-blue.png",
  },
  {
    icon: EyeOff,
    label: "How we operate",
    title: "Quiet by default",
    text: "We measure success by the work that runs reliably in the background, not by how loud we are. The operations speak for themselves.",
    gradient: "/images/gradient-purple.png",
  },
];

const TIMELINE: { year: string; label: ReactNode }[] = [
  { year: "2025", label: "Olyxee founded in Johannesburg" },
  {
    year: "2026",
    label: (
      <>
        First production deployments across{" "}
        <a
          href="https://logistics.olyxee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600 transition-colors"
        >
          logistics
        </a>{" "}
        and{" "}
        <Link
          href="/enterprise"
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600 transition-colors"
        >
          finance
        </Link>
      </>
    ),
  },
];

const JOURNEY_LEAD: string[] = [
  "Olyxee is an AI infrastructure company founded in Johannesburg, South Africa, created to build practical infrastructure for organizations adopting artificial intelligence.",
  "We began with a clear problem: AI models keep getting more capable, but most organizations aren't operationally ready to use them. Their knowledge is scattered across documents, spreadsheets, emails, legacy systems, approval chains, finance records, and employee memory, leaving a gap between AI potential and real execution. Olyxee was founded to close that gap.",
  "From the start we focused on infrastructure, not surface-level demos, studying how organizations actually operate. That research across logistics, finance operations, document validation, workflow systems, and reconciliation revealed a common need: organizations don't only need AI models, they need systems that prepare their operations for AI. This led to Orgni, our core organizational intelligence platform.",
];

const JOURNEY_LAYERS: { name: string; text: string }[] = [
  {
    name: "Orgni",
    text: "Our core organizational intelligence platform. It captures the processes, rules, roles, departments, documents, approval paths, exceptions, and case history that explain how a business works, giving AI the context to support real work with control and a clear trail.",
  },
  {
    name: "Orgni Workflows",
    text: "Business processes, approvals, tasks, case handling, operational coordination, and exception management.",
  },
  {
    name: "Orgni Finance",
    text: "Finance operations, reconciliation, transaction review, finance exceptions, and financial workflow support.",
  },
  {
    name: "Olyxee Document Integrity",
    text: "Document understanding, classification, extraction, validation, and verification, so teams know a document is complete, consistent, and reliable before acting on it.",
  },
  {
    name: "Order Loop",
    text: "Customer notifications for orders, deliveries, collections, and service status, without building a full logistics platform.",
  },
  {
    name: "Togent",
    text: "Ongoing research into AI integration and agent tooling, exploring how AI connects with APIs, tools, workflows, and operational environments.",
  },
];

const About: FC = () => {
  const [aboutView, setAboutView] = useState<"vision" | "journey">("vision");

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="About"
        description="Olyxee builds research and infrastructure for artificial intelligence. Through Olyxee Research, we turn insights into infrastructure products that help organizations adopt AI across real operations."
        path="/about"
        keywords={["About Olyxee", "AI infrastructure company", "Olyxee Research", "Orgni", "Lethabo Scofield"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Olyxee",
          url: "https://olyxee.com/about",
          mainEntity: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
            logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
            description:
              "Olyxee builds research and infrastructure for artificial intelligence, with Orgni at the center of how organizations adopt AI across real operations.",
          },
        }}
      />
      <Header />

      <main>
        {/* === HERO === */}
        <section className="relative pt-36 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 bg-white">
          <div className="relative max-w-6xl mx-auto">
            {/* Hero card: team image with headline overlaid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 shadow-2xl shadow-neutral-900/10 bg-neutral-950 aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
            >
              <Image
                src="/images/olyxee-team-banner.png"
                alt="The Olyxee team in their Johannesburg office"
                fill
                priority
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover object-center opacity-70"
              />
              {/* Single soft scrim on the left for readability */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              {/* Headline overlay, lower-left */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-xl lg:max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.2 }}
                  className="text-white text-[2.25rem] sm:text-5xl lg:text-[4rem] tracking-[-0.025em] leading-[1.05] font-medium"
                >
                  Building the infrastructure for AI that{" "}
                  <em className="font-serif italic font-normal text-white/70">operates</em>.
                </motion.h1>
              </div>
            </motion.div>

            {/* Quiet sub-copy below the card */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 sm:mt-12 text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-2xl"
            >
              Olyxee builds research and infrastructure for artificial
              intelligence. At the center is Orgni, the infrastructure layer that
              helps organizations adopt AI across real business operations.
            </motion.p>
          </div>
        </section>

        {/* === OUR VISION / OUR JOURNEY === */}
        <section id="mission" className="relative bg-white overflow-hidden border-t border-neutral-200/70 scroll-mt-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-36">
            {/* Toggle */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-neutral-200 bg-neutral-50 mb-16 sm:mb-24">
              {([
                { key: "vision", label: "Our Vision" },
                { key: "journey", label: "Our Journey" },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setAboutView(tab.key)}
                  aria-pressed={aboutView === tab.key}
                  className={`relative px-5 py-2 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] transition-colors ${
                    aboutView === tab.key
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {aboutView === tab.key && (
                    <motion.span
                      layoutId="about-toggle-pill"
                      className="absolute inset-0 rounded-full bg-neutral-900"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {aboutView === "vision" ? (
                <motion.article
                  key="vision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start"
                >
                  <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6 order-2 sm:order-1">
                    <p className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-8 text-neutral-900">
                      A world where AI <em className="font-serif italic font-normal text-neutral-500">quietly runs</em> the operations that move organizations forward.
                    </p>
                    <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
                      Documents, workflows, finance, logistics, and decisions, all coordinated on one platform any team can trust, audit, and direct in their own words.
                    </p>
                  </div>
                  <div className="col-span-12 sm:col-span-4 lg:col-span-5 order-1 sm:order-2 sm:text-right">
                    <span
                      aria-hidden="true"
                      className="block font-serif italic text-[6rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(37,99,235,0.55)" }}
                    >
                      V.
                    </span>
                  </div>
                </motion.article>
              ) : (
                <motion.div
                  key="journey"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  <div className="grid grid-cols-12 gap-y-8 gap-x-6 sm:gap-x-10 items-start">
                    <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
                      <p className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-8 text-neutral-900">
                        Closing the gap between AI potential and{" "}
                        <em className="font-serif italic font-normal text-neutral-500">real execution.</em>
                      </p>
                      <div className="space-y-5 max-w-2xl">
                        {JOURNEY_LEAD.map((para, i) => (
                          <p
                            key={i}
                            className="text-base sm:text-lg text-neutral-700 leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 lg:text-right">
                      <span
                        aria-hidden="true"
                        className="block font-serif italic text-[6rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                        style={{ WebkitTextStroke: "1px rgba(5,150,105,0.55)" }}
                      >
                        J.
                      </span>
                    </div>
                  </div>

                  <div className="mt-16 sm:mt-20">
                    <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-8">
                      The layers we build
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
                      {JOURNEY_LAYERS.map((layer) => (
                        <div key={layer.name} className="bg-white p-6 sm:p-7">
                          <p className="text-base sm:text-lg text-neutral-900 font-medium tracking-[-0.01em] mb-2">
                            {layer.name}
                          </p>
                          <p className="text-[14px] sm:text-[15px] text-neutral-700 leading-relaxed">
                            {layer.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-12 sm:mt-14 max-w-3xl text-base sm:text-lg text-neutral-700 leading-relaxed">
                    The next phase of AI adoption won&apos;t be solved by chatbots alone. It takes operational memory, workflow understanding, document integrity, finance control, and integration layers that understand how organizations work over time.{" "}
                    <span className="text-neutral-900">Olyxee exists to make organizations AI-ready.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* === PRINCIPLES === */}
        <section className="py-20 sm:py-32 bg-white border-t border-neutral-200/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="max-w-3xl mb-12 sm:mb-16"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
                Principles
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium">
                The principles behind how we{" "}
                <em className="font-serif italic font-normal text-neutral-500">build, ship, and operate.</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 sm:gap-y-16">
              {APPROACH.map((item, idx) => {
                const numeral = ["I", "II", "III"][idx] ?? String(idx + 1);
                return (
                  <motion.article
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={idx}
                    variants={fadeUp}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                      <Image
                        src={item.gradient}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        aria-hidden
                      />
                      {/* Soft vignette so the numeral always reads */}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.18) 100%)",
                        }}
                      />
                      <div className="absolute top-0 inset-x-0 px-5 pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-white/85">
                        <span>Principle</span>
                        <span>{String(idx + 1).padStart(2, "0")} / 03</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between">
                        <span className="font-serif italic text-white leading-none tracking-tight text-[6rem] sm:text-[7rem] lg:text-[8rem] [text-shadow:0_2px_24px_rgba(0,0,0,0.18)]">
                          {numeral}
                        </span>
                        <span className="font-mono uppercase tracking-[0.26em] text-[10px] text-white/85 pb-2 sm:pb-3 [writing-mode:vertical-rl] rotate-180">
                          {item.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-7">
                      <h3 className="text-xl sm:text-[1.4rem] text-neutral-900 leading-[1.2] tracking-[-0.015em] font-medium mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-neutral-700 leading-relaxed max-w-[34ch]">
                        {item.text}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* === FROM THE FOUNDER === */}
        <section className="relative py-24 sm:py-36 bg-neutral-50/60 border-t border-neutral-200/70">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-12 sm:mb-16"
            >
              <span className="inline-block w-6 h-px bg-neutral-300 align-middle mr-3" />
              From the founder
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl"
            >
              <span
                aria-hidden
                className="font-serif italic text-neutral-200 text-[7rem] sm:text-[10rem] leading-none block -mb-10 sm:-mb-16 -ml-1"
              >
                &ldquo;
              </span>
              <blockquote className="text-[1.75rem] sm:text-4xl lg:text-[3rem] text-neutral-900 leading-[1.15] tracking-[-0.02em] font-medium">
                We started Olyxee because the hardest part of AI isn&apos;t
                intelligence. It&apos;s getting that intelligence to actually{" "}
                <em className="font-serif italic font-normal text-neutral-500">do something useful</em>.
              </blockquote>
              <p className="mt-10 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                The models are smart enough. What&apos;s missing is the
                infrastructure that lets them operate, connecting to real systems,
                executing real workflows, and doing it in a way teams can trust.
              </p>

              <div className="mt-12 sm:mt-14 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-y-5 gap-x-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-1 ring-neutral-200">
                    <Image
                      src="/images/lethabo-scofield.jpg"
                      alt="Lethabo Scofield, Founder and CEO of Olyxee"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-neutral-900 tracking-tight leading-tight font-medium">
                      Lethabo Scofield
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 mt-1">
                      Founder &amp; CEO
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Connect on LinkedIn
                  <span className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-colors">
                    <ArrowUpRight
                      aria-hidden="true"
                      focusable="false"
                      className="w-4 h-4 text-neutral-700 group-hover:text-white transition-colors"
                      strokeWidth={1.75}
                    />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === WHERE WE ARE === */}
        <section className="relative py-24 sm:py-36 bg-white border-t border-neutral-200/70">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {/* Section label + framing line */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 mb-10 sm:mb-14">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500" suppressHydrationWarning>
                  <span className="inline-block w-6 h-px bg-neutral-300 align-middle mr-3" />
                  Where we are · {new Date().getFullYear()}
                </p>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                  Year 02 · Operating
                </p>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] tracking-[-0.025em] leading-[1.08] font-medium text-neutral-900 max-w-3xl mb-6">
                We&apos;re early. The work is{" "}
                <em className="font-serif italic font-normal text-neutral-500">real, shipped, and in production.</em>
              </h3>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-14 sm:mb-16">
                Olyxee was founded in Johannesburg in 2025 and turned on its
                first production deployments inside a year. We are still small
                by design, building Orgni, the core platform underneath every
                customer workflow, before we add more on top.
              </p>

              {/* Snapshot grid — facts about where we are now */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200 mb-16 sm:mb-20">
                {[
                  {
                    icon: Calendar,
                    label: "Founded",
                    value: "2025",
                    hint: "Independent, founder-led",
                  },
                  {
                    icon: MapPin,
                    label: "Headquarters",
                    value: "Johannesburg",
                    hint: "Operating across South Africa",
                  },
                  {
                    icon: Users,
                    label: "Team",
                    value: "Small, senior, hands-on",
                    hint: "Hiring deliberately",
                  },
                  {
                    icon: Workflow,
                    label: "In production",
                    value: "Logistics · Finance",
                    hint: "First customer workflows live",
                  },
                ].map(({ icon: Icon, label, value, hint }) => (
                  <div
                    key={label}
                    className="bg-white p-6 sm:p-7 flex flex-col"
                  >
                    <div className="flex items-center gap-2.5 mb-5">
                      <Icon
                        className="w-3.5 h-3.5 text-neutral-400"
                        strokeWidth={1.75}
                      />
                      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-neutral-900 font-medium leading-snug tracking-[-0.01em] mb-2">
                      {value}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-neutral-700 leading-snug mt-auto">
                      {hint}
                    </p>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-10 mb-16 sm:mb-20">
                <div className="lg:col-span-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                    Milestones
                  </p>
                  <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed max-w-xs">
                    The short version of how we got here, dated and verifiable.
                  </p>
                </div>
                <ol className="lg:col-span-8 relative">
                  {TIMELINE.map((item, i) => (
                    <motion.li
                      key={item.year}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="grid grid-cols-[5rem_1fr] sm:grid-cols-[7rem_1fr] gap-x-6 sm:gap-x-10 py-6 border-t border-neutral-200 last:border-b items-baseline"
                    >
                      <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500">
                        {item.year}
                      </p>
                      <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed">
                        {item.label}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* What we're focused on this year */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-10">
                <div className="lg:col-span-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                    What we&apos;re focused on
                  </p>
                  <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed max-w-xs">
                    Three priorities are getting all of our attention right now.
                    Everything else waits.
                  </p>
                </div>
                <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                  {[
                    {
                      n: "01",
                      title: "Earn the next ten teams.",
                      body: "Get the first cohort of operating teams running real workflows on Orgni, end-to-end, with no babysitting.",
                    },
                    {
                      n: "02",
                      title: "Trace every action.",
                      body: "Make every step Orgni takes inspectable, reviewable, and reproducible by default.",
                    },
                    {
                      n: "03",
                      title: "Quietly compound.",
                      body: "Tighten Orgni underneath, ship fewer features louder, and keep our footprint small while the work grows.",
                    },
                  ].map((f) => (
                    <li
                      key={f.n}
                      className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7"
                    >
                      <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 mb-5">
                        / {f.n}
                      </p>
                      <p className="text-base sm:text-[1.05rem] text-neutral-900 font-medium leading-snug tracking-[-0.01em] mb-3">
                        {f.title}
                      </p>
                      <p className="text-[13.5px] text-neutral-700 leading-relaxed">
                        {f.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === JOIN US === */}
        <section className="py-20 sm:py-28 bg-white border-t border-neutral-200/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="relative rounded-3xl bg-neutral-100 ring-1 ring-neutral-200 px-6 py-16 sm:px-12 sm:py-24 lg:py-28 text-center overflow-hidden"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-6">
                Join us
              </p>
              <h3 className="text-3xl sm:text-5xl tracking-[-0.025em] mb-5 text-neutral-900 leading-[1.05] font-medium">
                Build AI that <em className="font-serif italic font-normal text-neutral-500">actually works.</em>
              </h3>
              <p className="text-base sm:text-lg text-neutral-700 mb-10 max-w-xl mx-auto leading-relaxed">
                We&apos;re building a team of people who want to make AI work in the real world, not just in demos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/careers"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
                >
                  View open roles{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
