import { FC, ReactNode } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, EyeOff } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const OBJECTIVES = [
  "Make AI execute, not just advise - across real systems and real workflows.",
  "Give every action an audit trail so teams can trust what runs in production.",
  "Hide infrastructure complexity behind clear outcomes and simple controls.",
  "Reach a thousand operating teams running on Olyxee by 2027.",
];

const VALUES = [
  {
    name: "Verified by default",
    text: "Every output, action, and decision is logged and reviewable. Trust is earned by being checkable.",
  },
  {
    name: "Outcomes over noise",
    text: "We measure ourselves by what runs in the background, not by how loudly we announce it.",
  },
  {
    name: "Narrow, then deep",
    text: "We earn the right to do more by making the first thing work end-to-end.",
  },
  {
    name: "Build for operators",
    text: "Real users, real workflows, real consequences. We design for the people on the hook.",
  },
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
          className="text-white/80 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white/60 transition-colors"
        >
          logistics
        </a>{" "}
        and{" "}
        <Link
          href="/products/addup"
          className="text-white/80 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white/60 transition-colors"
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
      <div className="grain" />
      <Header />

      <main>
      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 bg-white">
        <div className="relative max-w-6xl mx-auto">
          {/* Hero card: team image with just the headline overlaid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 shadow-2xl shadow-neutral-900/10 bg-neutral-950 aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
          >
            <Image
              src="/images/olyxee-team-2026.png"
              alt="The Olyxee team in their Johannesburg office"
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover object-center"
            />
            {/* Single soft scrim on the left — clean, no extra layers */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* Headline only — lower-left */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-xl lg:max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2 }}
                className="font-serif text-white text-[2.25rem] sm:text-5xl lg:text-[4rem] tracking-tight leading-[1.05]"
              >
                Building the infrastructure for AI that{" "}
                <em className="text-white/55 not-italic">operates</em>.
              </motion.h1>
            </div>
          </motion.div>

          {/* Quiet sub-copy below the card */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 sm:mt-12 text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl"
          >
            Olyxee is an AI infrastructure company. We build systems that let
            organizations put AI to work across their operations - reliably,
            transparently, and at scale.
          </motion.p>
        </div>
      </section>

      {/* === MANIFESTO: Mission / Vision / Objectives === */}
      <section className="relative bg-neutral-950 text-white overflow-hidden">
        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,191,36,0.35), rgba(59,130,246,0.18) 45%, transparent 75%)",
            filter: "blur(80px) saturate(1.4)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-36">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-16 sm:mb-24"
          >
            ⟶ The Manifesto
          </motion.p>

          {/* MOVEMENT 01 — MISSION */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start pb-20 sm:pb-28 border-b border-white/10"
          >
            <div className="col-span-12 sm:col-span-4 lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400 mb-3">
                01 · MISSION
              </p>
              <span
                aria-hidden="true"
                className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(251,191,36,0.55)" }}
              >
                M.
              </span>
            </div>
            <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6">
              <p className="font-serif text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] tracking-tight mb-8">
                Most AI today <em className="italic text-white/40 not-italic">advises.</em>{" "}
                We&apos;re building one that <em className="italic text-amber-400">executes.</em>
              </p>
              <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light max-w-xl">
                Close the gap between what AI understands and what it actually does inside a company. Stop teams from translating AI recommendations into manual work.
              </p>
            </div>
          </motion.article>

          {/* MOVEMENT 02 — VISION */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start py-20 sm:py-28 border-b border-white/10"
          >
            <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6 order-2 sm:order-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] tracking-tight mb-8">
                A world where AI <em className="italic text-sky-400">quietly runs</em> the operations that move organizations forward.
              </p>
              <p className="text-base sm:text-lg text-white/55 leading-relaxed font-light max-w-xl">
                Reconciling, coordinating, deciding, executing — happening on infrastructure any team can trust, audit, and direct in their own words.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-4 lg:col-span-5 order-1 sm:order-2 sm:text-right">
              <p className="font-mono text-[11px] tracking-[0.3em] text-sky-400 mb-3">
                02 · VISION
              </p>
              <span
                aria-hidden="true"
                className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(56,189,248,0.55)" }}
              >
                V.
              </span>
            </div>
          </motion.article>

          {/* MOVEMENT 03 — OBJECTIVES */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative grid grid-cols-12 gap-y-6 gap-x-6 sm:gap-x-10 items-start pt-20 sm:pt-28"
          >
            <div className="col-span-12 sm:col-span-4 lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.3em] text-emerald-400 mb-3">
                03 · OBJECTIVES
              </p>
              <span
                aria-hidden="true"
                className="block font-serif italic text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-[0.78] tracking-[-0.05em] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(52,211,153,0.55)" }}
              >
                O.
              </span>
            </div>
            <div className="col-span-12 sm:col-span-8 lg:col-span-7 lg:pt-6">
              <p className="font-serif text-3xl sm:text-4xl lg:text-[3rem] leading-[1.08] tracking-tight mb-10">
                What we&apos;re <em className="italic text-emerald-400">working toward.</em>
              </p>
              <ol className="space-y-0">
                {OBJECTIVES.map((obj, i) => (
                  <motion.li
                    key={obj}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    className="group grid grid-cols-[3.25rem_1fr] gap-4 sm:gap-6 py-5 border-t border-white/10 last:border-b items-baseline"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-emerald-400/80">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light group-hover:text-white transition-colors">
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
      <section className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              In the field
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
              Bringing our work to the rooms where{" "}
              <em className="italic text-blue-500">decisions get made.</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Large landscape — Tech talk */}
            <motion.figure
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-8 group"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 bg-neutral-100">
                <Image
                  src="/images/olyxee-tech-talk.png"
                  alt="Olyxee speaker presenting at TechWeek"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                <p className="text-[15px] sm:text-base text-neutral-900 font-light leading-snug max-w-md">
                  Sharing how we think about reliable AI infrastructure at TechWeek.
                </p>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 shrink-0">
                  TechWeek · 2026
                </span>
              </figcaption>
            </motion.figure>

            {/* Portrait companion — Boardroom briefing */}
            <motion.figure
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-4 group"
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 bg-neutral-100">
                <Image
                  src="/images/olyxee-presentation.png"
                  alt="Olyxee team briefing a client on the product suite"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                <p className="text-[15px] sm:text-base text-neutral-900 font-light leading-snug max-w-xs">
                  Walking partners through the product suite, in the room.
                </p>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 shrink-0">
                  Briefing
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* === VALUES === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="mb-12 sm:mb-16 max-w-3xl"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              Values
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1]">
              How we behave when no one&apos;s watching.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-14">
            {VALUES.map((item, idx) => (
              <motion.div
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="border-t border-neutral-200 pt-6"
              >
                <h3 className="font-serif text-xl sm:text-[1.4rem] text-neutral-900 mb-3 leading-snug tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-[15px] text-neutral-500 leading-relaxed font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === PRINCIPLES === */}
      <section className="py-20 sm:py-32 bg-neutral-50/60 border-t border-b border-neutral-200/70">
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
              The principles behind how we build, ship, and operate.
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
                  {/* Print-style plate: gradient with huge serif numeral, no rounded chrome around it */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
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
                    {/* Top hairline meta strip */}
                    <div className="absolute top-0 inset-x-0 px-5 pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-white/85">
                      <span>Principle</span>
                      <span>{String(idx + 1).padStart(2, "0")} / 03</span>
                    </div>
                    {/* The numeral, lower-left, oversized serif italic */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between">
                      <span className="font-serif italic text-white leading-none tracking-tight text-[6rem] sm:text-[7rem] lg:text-[8rem] [text-shadow:0_2px_24px_rgba(0,0,0,0.18)]">
                        {numeral}
                      </span>
                      <span className="font-mono uppercase tracking-[0.26em] text-[10px] text-white/85 pb-2 sm:pb-3 [writing-mode:vertical-rl] rotate-180">
                        {item.label}
                      </span>
                    </div>
                  </div>

                  {/* Editorial text block — print-style, no card outline */}
                  <div className="mt-6 sm:mt-7">
                    <h3 className="font-serif text-2xl sm:text-[1.7rem] text-neutral-900 leading-[1.15] tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-neutral-500 leading-relaxed font-light max-w-[34ch]">
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
      <section className="relative py-24 sm:py-36 bg-neutral-950 text-white overflow-hidden">
        {/* Ambient gradient glow */}
        <div
          aria-hidden
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-[0.18] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.55) 0%, rgba(0,0,0,0) 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.15] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(0,0,0,0) 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mb-12 sm:mb-16"
          >
            <span className="inline-block w-6 h-px bg-white/30 align-middle mr-3" />
            From the founder
          </motion.p>

          {/* Quote — message-first */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl"
          >
            {/* Decorative quote glyph */}
            <span
              aria-hidden
              className="font-serif italic text-white/15 text-[7rem] sm:text-[10rem] leading-none block -mb-10 sm:-mb-16 -ml-1"
            >
              &ldquo;
            </span>
            <blockquote className="font-serif text-[1.85rem] sm:text-4xl lg:text-[3.25rem] text-white leading-[1.12] tracking-tight">
              We started Olyxee because the hardest part of AI isn&apos;t
              intelligence. It&apos;s getting that intelligence to actually{" "}
              <em className="not-italic text-white/55">do something useful</em>.
            </blockquote>
            <p className="mt-10 text-base sm:text-lg text-white/55 leading-relaxed font-light max-w-2xl">
              The models are smart enough. What&apos;s missing is the
              infrastructure that lets them operate, connecting to real systems,
              executing real workflows, and doing it in a way teams can trust.
            </p>

            {/* Signature row — profile-size avatar + name + LinkedIn arrow */}
            <div className="mt-12 sm:mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-y-5 gap-x-6">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-1 ring-white/15">
                  <Image
                    src="/images/lethabo-scofield.png"
                    alt="Lethabo Scofield, Founder and CEO of Olyxee"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif italic text-lg sm:text-xl text-white tracking-tight leading-tight">
                    Lethabo Scofield
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-white/45 mt-1">
                    Founder &amp; CEO
                  </p>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
              >
                Connect on LinkedIn
                <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors">
                  <ArrowUpRight
                    aria-hidden="true"
                    focusable="false"
                    className="w-4 h-4 text-white group-hover:text-neutral-900 transition-colors"
                    strokeWidth={1.75}
                  />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Horizontal timeline strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 sm:mt-24 pt-10 border-t border-white/10"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mb-6">
              Where we are
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              {TIMELINE.map((item, i) => (
                <li key={item.year} className="relative pl-6 sm:pl-0 sm:pt-6 sm:border-t border-white/15">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 sm:top-0 sm:left-0 sm:-translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60"
                  />
                  <p className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-none mb-2">
                    {item.year}
                  </p>
                  <p className="text-sm text-white/50 font-light leading-snug max-w-xs">
                    {item.label}
                  </p>
                  <span className="absolute right-0 top-0 hidden sm:block text-[10px] font-mono uppercase tracking-[0.22em] text-white/30 pt-6">
                    {String(i + 1).padStart(2, "0")} / 0{TIMELINE.length}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* === JOIN US === */}
      <section className="py-24 sm:py-36">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-6">
              Join us
            </p>
            <h3 className="font-serif text-3xl sm:text-5xl tracking-tight mb-5 text-neutral-900 leading-[1.05]">
              Build AI that actually works.
            </h3>
            <p className="text-base sm:text-lg text-neutral-500 mb-10 max-w-xl mx-auto leading-relaxed font-light">
              We&apos;re building a team of people who want to make AI work in the real world - not just in demos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/careers"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
              >
                View open roles{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
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
