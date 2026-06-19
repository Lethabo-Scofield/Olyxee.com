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
