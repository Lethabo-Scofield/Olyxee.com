import { FC, ReactNode } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, EyeOff, MapPin, Calendar, Workflow, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const OBJECTIVES = [
  "Make AI execute, not just advise, across real systems and real workflows.",
  "Give every action an audit trail so teams can trust what runs in production.",
  "Hide infrastructure complexity behind clear outcomes and simple controls.",
  "Reach a thousand operating teams running on Olyxee by 2027.",
];

const APPROACH = [
  {
    icon: Compass,
    label: "How we ship",
    title: "Narrow first, then expand",
    text: "Every engagement starts with a single workflow. We earn the right to do more by proving the first one works.",
    gradient: "/images/gradient-orange-pink.png",
  },
  {
    icon: ShieldCheck,
    label: "How we build",
    title: "Verify before you trust",
    text: "Every action an Olyxee agent takes is logged, traceable, and reviewable. Production AI without an audit trail is not production AI.",
    gradient: "/images/gradient-blue.png",
  },
  {
    icon: EyeOff,
    label: "How we operate",
    title: "Quiet by default",
    text: "We measure success by what runs in the background, not by how loud we are. The work speaks for itself.",
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
          href="/products/addup"
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600 transition-colors"
        >
          finance
        </Link>
      </>
    ),
  },
];

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="About"
        description="Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations: reliably, transparently, and at scale."
        path="/about"
        keywords={["About Olyxee", "AI infrastructure company", "Olyxee team", "AI reliability mission", "Lethabo Scofield"]}
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
              "Olyxee is an AI infrastructure company building verification, evaluation, and monitoring systems for production AI.",
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
              Olyxee is an AI infrastructure company. We build systems that let
              organizations put AI to work across their operations, reliably,
              transparently, and at scale.
            </motion.p>
          </div>
        </section>

        {/* === MANIFESTO: Mission / Vision / Objectives === */}
        <section className="relative bg-white overflow-hidden border-t border-neutral-200/70">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-36">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-16 sm:mb-24"
            >
              The Manifesto
            </motion.p>

            {/* 01 — MISSION */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start pb-20 sm:pb-28 border-b border-neutral-200"
            >
              <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.3em] text-amber-600 mb-3">
                  01 · MISSION
                </p>
                <span
                  aria-hidden="true"
                  className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(217,119,6,0.55)" }}
                >
                  M.
                </span>
              </div>
              <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6">
                <p className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-8 text-neutral-900">
                  Most AI today <span className="text-neutral-400">advises.</span>{" "}
                  We&apos;re building one that <em className="font-serif italic font-normal text-neutral-500">executes.</em>
                </p>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
                  Close the gap between what AI understands and what it actually does inside a company. Stop teams from translating AI recommendations into manual work.
                </p>
              </div>
            </motion.article>

            {/* 02 — VISION */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start py-20 sm:py-28 border-b border-neutral-200"
            >
              <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6 order-2 sm:order-1">
                <p className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-8 text-neutral-900">
                  A world where AI <em className="font-serif italic font-normal text-neutral-500">quietly runs</em> the operations that move organizations forward.
                </p>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
                  Reconciling, coordinating, deciding, executing, all happening on infrastructure any team can trust, audit, and direct in their own words.
                </p>
              </div>
              <div className="col-span-12 sm:col-span-4 lg:col-span-5 order-1 sm:order-2 sm:text-right">
                <p className="font-mono text-[11px] tracking-[0.3em] text-blue-600 mb-3">
                  02 · VISION
                </p>
                <span
                  aria-hidden="true"
                  className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(37,99,235,0.55)" }}
                >
                  V.
                </span>
              </div>
            </motion.article>

            {/* 03 — OBJECTIVES */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start pt-20 sm:pt-28"
            >
              <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.3em] text-emerald-600 mb-3">
                  03 · OBJECTIVES
                </p>
                <span
                  aria-hidden="true"
                  className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(5,150,105,0.55)" }}
                >
                  O.
                </span>
              </div>
              <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6">
                <p className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] font-medium mb-10 text-neutral-900">
                  What we&apos;re <em className="font-serif italic font-normal text-neutral-500">working toward.</em>
                </p>
                <ol className="space-y-0">
                  {OBJECTIVES.map((obj, i) => (
                    <motion.li
                      key={obj}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      className="group grid grid-cols-[3.25rem_1fr] gap-4 sm:gap-6 py-5 border-t border-neutral-200 last:border-b items-baseline"
                    >
                      <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-500">
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">
                        {obj}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.article>
          </div>
        </section>

        {/* === IN THE FIELD === */}
        <section className="relative py-20 sm:py-28 lg:py-36 bg-neutral-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="max-w-3xl mb-12 sm:mb-16"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/50 mb-4">
                In the field
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em] leading-[1.05] font-medium">
                Bringing our work to the rooms where{" "}
                <em className="font-serif italic font-normal text-white/50">decisions get made.</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              <motion.figure
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
                variants={fadeUp}
                className="lg:col-span-8 group"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10 bg-neutral-900">
                  <Image
                    src="/images/olyxee-tech-talk.png"
                    alt="Olyxee speaker presenting at TechWeek"
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                  <p className="text-[15px] sm:text-base text-white leading-snug max-w-md">
                    Sharing how we think about reliable AI infrastructure at TechWeek.
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 shrink-0">
                    TechWeek · 2026
                  </span>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={1}
                variants={fadeUp}
                className="lg:col-span-4 group"
              >
                <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-white/10 bg-neutral-900">
                  <Image
                    src="/images/olyxee-presentation.png"
                    alt="Olyxee team briefing a client on the product suite"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                  <p className="text-[15px] sm:text-base text-white leading-snug max-w-xs">
                    Walking partners through the product suite, in the room.
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 shrink-0">
                    Briefing
                  </span>
                </figcaption>
              </motion.figure>
            </div>
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

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-20 sm:mt-28 pt-12 border-t border-neutral-200"
            >
              {/* Section label + framing line */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 mb-10 sm:mb-14">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
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
                by design, building the infrastructure underneath every customer
                workflow before we add more on top.
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
                      body: "Get the first cohort of operating teams running real workflows on Olyxee, end-to-end, with no babysitting.",
                    },
                    {
                      n: "02",
                      title: "Trace every action.",
                      body: "Make every step an Olyxee agent takes inspectable, reviewable, and reproducible by default.",
                    },
                    {
                      n: "03",
                      title: "Quietly compound.",
                      body: "Tighten the platform underneath, ship fewer features louder, and keep our footprint small while the work grows.",
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
