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

const JOURNEY_LEAD: string[] = [
  "Olyxee was founded by Lethabo Innocent ScoField in Johannesburg, South Africa.",
  "Before founding Olyxee, Lethabo worked as an AI Engineer. During the rise of modern AI, he experienced a problem that many organizations were beginning to face: companies wanted to adopt AI, but their internal systems were not ready for it.",
  "The problem was not only the AI models. The models were becoming more powerful, more accessible, and more capable. The real challenge was inside the organizations trying to use them.",
  "Business knowledge was scattered across documents, spreadsheets, emails, legacy systems, finance records, approval processes, and people\u2019s memory. AI systems could generate answers, but they often lacked the operational context needed to support real work.",
  "They did not fully understand how a specific business operated, which rules applied, who approved what, which documents were trusted, how finance exceptions were handled, or how decisions should be traced.",
  "That experience became the foundation of Olyxee.",
  "Olyxee was created to build the infrastructure layer organizations need before AI can operate reliably inside real business environments. The company focuses on context, structure, memory, document integrity, workflow control, finance operations, integration, and operational visibility.",
  "This work led to Orgni, Olyxee\u2019s core organizational intelligence platform.",
  "Orgni helps organizations capture and preserve how they operate. It structures business knowledge such as processes, roles, departments, rules, documents, approvals, exceptions, decisions, and case history. The goal is to give AI systems the context they need to support business execution with control and a clear trail.",
  "As Olyxee developed, the company expanded into focused infrastructure systems.",
];

const JOURNEY_LAYERS: string[] = [
  "Orgni Workflows supports processes, approvals, tasks, case handling, coordination, and operational exceptions.",
  "Orgni Finance supports reconciliation, transaction review, finance exceptions, and financial workflow support.",
  "Olyxee Document Integrity supports document understanding, classification, extraction, validation, verification, and auditability. It helps organizations know whether a document is complete, consistent, relevant, and reliable before it is used in a workflow or decision.",
  "Order Loop supports customer communication around orders, deliveries, collections, and service status updates.",
  "Togent is Olyxee\u2019s ongoing research into AI integration and agent tooling, focused on how AI systems connect with APIs, tools, workflows, and operational environments.",
];

const JOURNEY_CLOSE: string[] = [
  "Olyxee\u2019s journey is rooted in a practical lesson from AI engineering: organizations do not only need access to powerful AI models. They need infrastructure that makes their operations understandable to AI.",
  "Founded in Johannesburg, South Africa, Olyxee is building for global infrastructure.",
  "The company exists to help organizations move from AI experiments to reliable AI execution.",
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
            {/* Hero card: Enterprise AI banner (heading baked into image) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden rounded-3xl ring-1 ring-neutral-900/10 shadow-2xl shadow-neutral-900/10 bg-white aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
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
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {aboutView === tab.key && (
                      <motion.span
                        layoutId="about-toggle-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-sm shadow-neutral-900/10 ring-1 ring-neutral-900/5"
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

                  <div className="mt-12 sm:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
                      {JOURNEY_LAYERS.map((layer, i) => (
                        <div key={i} className="bg-white p-6 sm:p-7">
                          <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed">
                            {layer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 sm:mt-16 space-y-5 max-w-3xl">
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
