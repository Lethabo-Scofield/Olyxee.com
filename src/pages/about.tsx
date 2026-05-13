import { FC } from "react";
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

const TIMELINE = [
  { year: "2025", label: "Olyxee founded in Johannesburg" },
  { year: "2026", label: "First production deployments across logistics and finance" },
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
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-white">
        <div className="relative max-w-6xl mx-auto">
          {/* Hero card: team image with hero text overlaid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 shadow-2xl shadow-neutral-900/10 bg-neutral-950 min-h-[560px] sm:min-h-[620px] lg:min-h-[680px]"
          >
            <Image
              src="/images/olyxee-team.png"
              alt="The Olyxee team collaborating around a laptop in their Johannesburg office"
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover object-right"
            />
            {/* Scrim — strong on left so the headline reads, soft on right */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)",
              }}
            />
            {/* Bottom fade so the meta strip reads */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-40"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* Subtle grain inside the card */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Top status pill */}
            <div className="absolute top-6 sm:top-8 left-6 sm:left-10 flex items-center gap-3">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden
              />
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-white/70">
                Olyxee HQ · Johannesburg, ZA
              </p>
            </div>

            {/* Top-right registration mark */}
            <div className="absolute top-6 sm:top-8 right-6 sm:right-10 hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/45">
              <span className="w-6 h-px bg-white/30" aria-hidden />
              <span>Fig. 01 · The team</span>
            </div>

            {/* Hero copy — overlaid, lower-left */}
            <div className="relative z-10 flex flex-col justify-end h-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] p-6 sm:p-12 lg:p-16 max-w-2xl lg:max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-white/55 mb-6"
              >
                About Olyxee
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.25 }}
                className="font-serif text-white text-[2.25rem] sm:text-5xl lg:text-[4.25rem] tracking-tight leading-[1.04]"
              >
                Building the infrastructure for AI that{" "}
                <em className="text-white/55 not-italic">operates</em>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.4 }}
                className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed font-light max-w-xl"
              >
                Olyxee is an AI infrastructure company. We build systems that
                let organizations put AI to work across their operations -
                reliably, transparently, and at scale.
              </motion.p>

              {/* In-card meta strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-8 sm:mt-12 pt-6 border-t border-white/15 flex flex-wrap gap-x-10 gap-y-4 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em]"
              >
                <div>
                  <p className="text-white/40 mb-1.5">Founded</p>
                  <p className="text-white">2025</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1.5">Headquarters</p>
                  <p className="text-white">Johannesburg, ZA</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1.5">Reach</p>
                  <p className="text-white">Global</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1.5">Flagship</p>
                  <p className="text-white">Ordo</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === MISSION === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 lg:pt-3">
                Mission
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-[1.15] tracking-tight mb-8">
                Most AI today advises. We believe it should{" "}
                <em className="text-neutral-400 not-italic">execute</em>.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Our mission is to close the gap between what AI can understand and what it can actually do inside an organization. Teams everywhere are stuck translating AI recommendations into manual work. We&apos;re building the layer that removes that gap entirely.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === VISION === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 lg:pt-3">
                Vision
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-[1.15] tracking-tight mb-8">
                A world where AI quietly{" "}
                <em className="text-neutral-400 not-italic">runs</em> the operations that move organizations forward.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                We see a future where the work of running a company - reconciling, coordinating, deciding, executing - happens on top of an AI infrastructure that any team can trust, audit, and direct in their own words.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === OBJECTIVES === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 lg:pt-3">
                Objectives
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-[1.15] tracking-tight mb-10">
                What we&apos;re working toward.
              </p>
              <ul className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                {OBJECTIVES.map((obj, i) => (
                  <li
                    key={obj}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 items-baseline"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base sm:text-[17px] text-neutral-800 leading-relaxed font-light">
                      {obj}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
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
      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-8">
                From the founder
              </p>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-white leading-[1.2] mb-8 tracking-tight">
                &ldquo;We started Olyxee because the hardest part of AI isn&apos;t intelligence. It&apos;s getting that intelligence to actually do something useful.&rdquo;
              </blockquote>
              <p className="text-base text-neutral-400 leading-relaxed font-light mb-10 max-w-2xl">
                The models are smart enough. What&apos;s missing is the infrastructure that lets them operate - connecting to real systems, executing real workflows, and doing it in a way teams can trust.
              </p>
              <a
                href="https://www.linkedin.com/in/lethabo-scofield-17b37a257/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/lethabo-scofield.png"
                  alt="Lethabo Scofield"
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-neutral-800"
                />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors inline-flex items-center gap-1.5">
                    Lethabo Scofield
                    <ArrowUpRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                  </p>
                  <p className="text-xs text-neutral-500">Founder &amp; CEO</p>
                </div>
              </a>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:pt-3"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-6">
                Where we are
              </p>
              <ol className="relative border-l border-neutral-800 pl-6 space-y-7">
                {TIMELINE.map((item) => (
                  <li key={item.year} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-700 ring-4 ring-neutral-950"
                    />
                    <p className="font-serif text-2xl text-white tracking-tight leading-none mb-1">
                      {item.year}
                    </p>
                    <p className="text-sm text-neutral-400 font-light leading-snug">
                      {item.label}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
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
