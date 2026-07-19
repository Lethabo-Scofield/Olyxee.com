import { FC, useState } from "react";
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

// Matches the three triangle marks in the pillars animation
const PILLAR_COLORS = ["#B49B7E", "#17311F", "#92A9BD"];

const APPROACH = [
  {
    icon: Compass,
    label: "How we ship",
    title: "Earn scope in production",
    text: "We start with one real problem inside a live operation and prove our work under real conditions. Every expansion is earned by results, never promised on a roadmap.",
    gradient: "/images/gradient-pink-cyan.png",
  },
  {
    icon: ShieldCheck,
    label: "How we build",
    title: "Infrastructure before intelligence",
    text: "We believe systems should understand a business before they act inside it. We build the infrastructure layer first: live context, operational memory, and a clear trail, so teams stay in control.",
    gradient: "/images/gradient-blue.png",
  },
  {
    icon: EyeOff,
    label: "How we operate",
    title: "Judged by what runs",
    text: "Our work is meant to disappear into reliable operations, not demos. We measure ourselves by what holds up in the background, day after day.",
    gradient: "/images/gradient-purple.png",
  },
];

const JOURNEY_LEAD: string[] = [
  "Olyxee was founded by Lethabo Innocent Makonto, widely known as Lethabo Scofield, in Johannesburg, South Africa.",
  "Before founding Olyxee, Lethabo worked as an AI Engineer. During the rise of modern AI, he experienced a problem that many organizations were beginning to face: companies wanted to adopt AI, but their internal systems were not ready for it.",
  "The problem was not only the AI models. The models were becoming more powerful, more accessible, and more capable. The real challenge was inside the organizations trying to use them.",
  "Business knowledge was scattered across documents, spreadsheets, emails, legacy systems, finance records, approval processes, and people\u2019s memory. AI systems could generate answers, but they often lacked the operational context needed to support real work.",
  "They did not fully understand how a specific business operated, which rules applied, who approved what, which documents were trusted, how finance exceptions were handled, or how decisions should be traced.",
  "That experience became the foundation of Olyxee.",
  "Olyxee was created to build the infrastructure layer organizations need before intelligent systems can operate reliably inside real business environments. The company focuses on operational intelligence: live business context, operational memory, decision history, document integrity, and operational visibility.",
  "This work led to Orgni, Olyxee\u2019s flagship platform for building live business context.",
  "Orgni connects how an organization actually works into one living operational context. It structures business knowledge such as processes, roles, departments, rules, documents, approvals, exceptions, decisions, permissions, and outcomes. The goal is to give intelligent systems the context they need to support real operations with control and a clear trail.",
  "As one platform, Orgni brings these capabilities together.",
];

const JOURNEY_LAYERS: string[] = [
  "Operational workflows: processes, approvals, tasks, case handling, coordination, and operational exceptions.",
  "Financial operations: reconciliation, transaction review, finance exceptions, and financial workflow support.",
  "Business memory and document integrity: document understanding, classification, extraction, validation, verification, and auditability, so organizations know whether a document is complete, consistent, relevant, and reliable before it is used in a decision.",
  "Alongside Orgni, Order Loop supports customer communication around orders, deliveries, collections, and service status updates.",
  "Orgni also carries Olyxee\u2019s ongoing research into AI integration and agent tooling, focused on how intelligent systems connect with APIs, tools, workflows, and operational environments.",
];

const JOURNEY_CLOSE: string[] = [
  "Olyxee\u2019s journey is rooted in a practical lesson from AI engineering: organizations do not only need access to powerful AI models. They need the infrastructure and live business context that makes their operations understandable to intelligent systems.",
  "Founded in Johannesburg, South Africa, Olyxee is building for global infrastructure.",
  "The company exists to help organizations survive Digital Darwinism: the reality that organisations unable to adapt to technological and societal change risk becoming irrelevant, regardless of their history, size, or previous success. Olyxee is building toward a world where businesses can understand themselves, adapt faster, preserve human agency, and evolve alongside increasingly capable AI.",
];

const About: FC = () => {
  const [aboutView, setAboutView] = useState<"vision" | "journey">("vision");

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="About"
        description="Olyxee is a research and infrastructure company helping businesses adapt to AI. We study the challenges organisations face when adopting AI, then build the infrastructure required to turn advanced intelligence into reliable organisational capability."
        path="/about"
        keywords={["About Olyxee", "operational intelligence", "AI infrastructure company", "Olyxee Research", "Orgni", "Lethabo Scofield"]}
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
              "Olyxee is a research and infrastructure company helping businesses adapt to AI, with Orgni, its core platform, creating a living operational model of an organisation.",
          },
        }}
      />
      <Header />

      <main>
        {/* === HERO === */}
        <section className="relative pt-36 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 bg-white">
          <div className="relative max-w-6xl mx-auto">
            {/* Hero card: Enterprise AI banner (heading baked into image) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 shadow-2xl shadow-neutral-900/10 bg-white aspect-[16/9] sm:aspect-[16/10] lg:aspect-[21/9]"
            >
              <Image
                src="/images/hero-enterprise-ai.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover object-center"
              />
              <h1 className="sr-only">Building the infrastructure for Enterprise AI</h1>
            </motion.div>
          </div>
        </section>

        {/* === OUR VISION / OUR JOURNEY === */}
        <section id="mission" className="relative bg-white overflow-hidden border-t border-neutral-200/70 scroll-mt-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-36">
            {/* Toggle */}
            <div className="flex justify-center mb-16 sm:mb-24">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-100 ring-1 ring-inset ring-neutral-200/80 shadow-inner"
              >
                {([
                  { key: "vision", label: "Our Vision" },
                  { key: "journey", label: "Our Journey" },
                ] as const).map((tab) => (
                  <motion.button
                    key={tab.key}
                    type="button"
                    onClick={() => setAboutView(tab.key)}
                    aria-pressed={aboutView === tab.key}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`relative px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] transition-colors duration-200 ${
                      aboutView === tab.key
                        ? "text-white"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {aboutView === tab.key && (
                      <motion.span
                        layoutId="about-toggle-pill"
                        className="absolute inset-0 rounded-full bg-neutral-900 shadow-sm shadow-neutral-900/20"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {aboutView === "vision" ? (
                <motion.article
                  key="vision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative max-w-3xl mx-auto text-center"
                >
                  <p className="font-serif text-3xl sm:text-4xl lg:text-[3rem] leading-[1.12] tracking-tight mb-8 text-neutral-900">
                    A future where organisations do not merely use intelligent tools, but <em className="italic text-neutral-500">become more intelligent</em> themselves.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
                    In this future, knowledge is not fragmented across documents and disconnected systems. Processes are not invisible. Decisions are not separated from their context. People and intelligent systems work through a shared operational model that can be understood, governed, audited, and continuously improved.
                  </p>
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
                  <div className="space-y-5 max-w-3xl">
                    {JOURNEY_LEAD.map((para, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-lg text-neutral-700 leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 space-y-5 max-w-3xl">
                    {JOURNEY_LAYERS.map((layer, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-lg text-neutral-700 leading-relaxed"
                      >
                        {layer}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 space-y-5 max-w-3xl">
                    {JOURNEY_CLOSE.map((para, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-lg text-neutral-700 leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
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
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.08]">
                Three pillars.{" "}
                <em className="italic text-neutral-500">One unfair advantage.</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="flex justify-center"
              >
                <video
                  src="/videos/pillars.mp4"
                  className="w-72 sm:w-96 lg:w-full max-w-lg aspect-square object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Animated illustration of three connected pillars forming one whole"
                />
              </motion.div>

              <div className="space-y-10 sm:space-y-12">
                {APPROACH.map((item, idx) => (
                  <motion.article
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={idx}
                    variants={fadeUp}
                    className="flex items-start gap-5"
                  >
                    <span
                      aria-hidden
                      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-900/80"
                    >
                      <span
                        className="block h-3.5 w-3.5"
                        style={{
                          backgroundColor: PILLAR_COLORS[idx],
                          clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                      />
                    </span>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-neutral-500 mb-2">
                        {item.label}
                      </p>
                      <h3 className="font-serif text-xl sm:text-[1.5rem] text-neutral-900 leading-[1.2] tracking-tight mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-neutral-700 leading-relaxed max-w-[48ch]">
                        {item.text}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
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
              <blockquote className="font-serif text-[1.75rem] sm:text-4xl lg:text-[3rem] text-neutral-900 leading-[1.18] tracking-tight">
                We started Olyxee because the hardest part of AI isn&apos;t
                intelligence. It&apos;s getting that intelligence to actually{" "}
                <em className="italic text-neutral-500">do something useful</em>.
              </blockquote>

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
              <h3 className="font-serif text-3xl sm:text-5xl tracking-tight mb-5 text-neutral-900 leading-[1.08]">
                Build AI that <em className="italic text-neutral-500">actually works.</em>
              </h3>
              <p className="text-base sm:text-lg text-neutral-600 font-light mb-10 max-w-xl mx-auto leading-relaxed">
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
