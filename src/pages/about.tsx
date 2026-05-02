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

const BELIEFS = [
  {
    num: "01",
    title: "AI should do work, not just generate answers",
    text: "The most valuable AI connects to your systems, understands your goals, and completes tasks end-to-end.",
  },
  {
    num: "02",
    title: "Trust is built through transparency",
    text: "In high-stakes environments, every step must be auditable. We design for organizations that need to verify.",
  },
  {
    num: "03",
    title: "Infrastructure should disappear",
    text: "Teams should describe outcomes and get results, without worrying about orchestration underneath.",
  },
];

const APPROACH = [
  {
    icon: Compass,
    label: "How we ship",
    title: "Narrow first, then expand",
    text: "Every engagement starts with a single workflow. We earn the right to do more by proving the first one works.",
  },
  {
    icon: ShieldCheck,
    label: "How we build",
    title: "Verify before you trust",
    text: "Every action an Olyxee agent takes is logged, traceable, and reviewable. Production AI without an audit trail is not production AI.",
  },
  {
    icon: EyeOff,
    label: "How we operate",
    title: "Quiet by default",
    text: "We measure success by what runs in the background, not by how loud we are. The work speaks for itself.",
  },
];

const TIMELINE = [
  { year: "2024", label: "Olyxee founded in Johannesburg" },
  { year: "2025", label: "First production deployments" },
  { year: "2026", label: "Scaling across logistics and finance" },
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
      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 bg-white">
        <div className="relative max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-6"
          >
            About Olyxee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-[5rem] text-neutral-900 tracking-tight leading-[1.02] max-w-4xl"
          >
            Building the infrastructure for AI that{" "}
            <em className="text-neutral-400 not-italic">operates</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl"
          >
            Olyxee is an AI infrastructure company. We build systems that let organizations put AI to work across their operations — reliably, transparently, and at scale.
          </motion.p>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap gap-x-10 gap-y-4 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500"
          >
            <div>
              <p className="text-neutral-400 mb-1.5">Founded</p>
              <p className="text-neutral-900">2024</p>
            </div>
            <div>
              <p className="text-neutral-400 mb-1.5">Headquarters</p>
              <p className="text-neutral-900">Johannesburg, ZA</p>
            </div>
            <div>
              <p className="text-neutral-400 mb-1.5">Reach</p>
              <p className="text-neutral-900">Global</p>
            </div>
            <div>
              <p className="text-neutral-400 mb-1.5">Flagship</p>
              <p className="text-neutral-900">Ordo</p>
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

      {/* === HERO IMAGE === */}
      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-neutral-900/10 shadow-xl shadow-neutral-900/10 aspect-[16/9] sm:aspect-[21/9] bg-neutral-100">
              <Image
                src="/images/about-hero.png"
                alt="Olyxee team building AI infrastructure together"
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-neutral-900/55 via-neutral-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <p className="text-white font-serif text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight max-w-2xl">
                  Building from Johannesburg, for the world.
                </p>
              </div>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                Fig. 01 · Olyxee HQ
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Johannesburg, ZA
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* === WHAT WE BELIEVE === */}
      <section className="py-20 sm:py-32">
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
              What we believe
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
              Three convictions that shape every product decision.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
            {BELIEFS.map((item, idx) => (
              <motion.div
                key={item.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="bg-white p-8 sm:p-10 hover:bg-neutral-50/60 transition-colors"
              >
                <span className="inline-block text-[11px] font-mono text-neutral-400 tracking-[0.22em] mb-8">
                  {item.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-4 leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW WE WORK === */}
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
              How we work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
              The principles behind how we build, ship, and operate.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {APPROACH.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className="bg-white rounded-xl border border-neutral-200 p-7 sm:p-8 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                      <Icon
                        aria-hidden="true"
                        focusable="false"
                        className="w-4 h-4 text-white"
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-[1.4rem] text-neutral-900 mb-3 leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">
                    {item.text}
                  </p>
                </motion.div>
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
                The models are smart enough. What&apos;s missing is the infrastructure that lets them operate — connecting to real systems, executing real workflows, and doing it in a way teams can trust.
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
              We&apos;re building a team of people who want to make AI work in the real world — not just in demos.
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
