import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const HIGHLIGHTS = [
  {
    eyebrow: "Edge intelligence",
    title: "AI execution at the edge of the enterprise.",
    body: "On-device intelligence tuned for deterministic latency, deployed across connected hardware, sensors, and operational endpoints. Systems that adapt to new environments and workflows without rebuilding from scratch.",
    image: "/images/robotics/humanoid-manipulation.png",
    alt: "Edge AI execution across connected enterprise hardware",
    meta: "01 · Edge AI",
  },
  {
    eyebrow: "Hardware infrastructure",
    title: "Connected hardware, built for production environments.",
    body: "Compute, sensing, and integration platforms co-developed with our partners across industrial, logistics, and field deployments. Open SDKs from instrumentation to autonomous execution.",
    image: "/images/robotics/hardware-design.png",
    alt: "Engineer reviewing infrastructure designs on a monitor",
    meta: "02 · Hardware",
  },
  {
    eyebrow: "Fleet operations",
    title: "Deploy, monitor, and update at scale.",
    body: "Roll out new policies across thousands of endpoints with rollback-safe delivery, live observability, and OTA updates verified by Orgni's operational workflows before they reach a production system.",
    image: "/images/robotics/field-deployment.png",
    alt: "Field deployment of connected enterprise systems",
    meta: "03 · Operations",
  },
  {
    eyebrow: "Multi-agent coordination",
    title: "Many systems, one operational intent.",
    body: "Coordinated control across fleets of agents and devices handles complex, contact-rich, and contingent workflows, packing, routing, assembling, that single-endpoint systems cannot solve reliably.",
    image: "/images/robotics/gallery/dual-arm-bag.png",
    alt: "Coordinated multi-agent operation across connected hardware",
    meta: "04 · Coordination",
  },
  {
    eyebrow: "Human-in-the-loop",
    title: "Autonomy with operators in control.",
    body: "Tooling, dashboards, and approval flows that keep human decision-making at the center of automated operations, so teams can trust, audit, and intervene in every execution.",
    image: "/images/robotics/gallery/students-lego.png",
    alt: "Operators collaborating around a connected hardware workstation",
    meta: "05 · Human-in-the-loop",
  },
];

const HighlightsSlider: FC = () => {
  const [index, setIndex] = useState(0);
  const total = HIGHLIGHTS.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION_MS = 4000;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, DURATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  return (
    <section
      className="relative w-full bg-white py-10 sm:py-16"
      aria-roledescription="carousel"
      aria-label="Olyxee Enterprise Hardware pillars"
    >
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-stretch"
          style={{ paddingLeft: "6vw", paddingRight: "6vw", gap: "2vw" }}
          animate={{ x: `calc(${-index} * (88vw + 2vw))` }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {HIGHLIGHTS.map((h, i) => {
            const isActive = i === index;
            return (
              <button
                key={h.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}: ${h.meta}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative shrink-0 w-[88vw] h-[48vh] min-h-[340px] sm:h-[58vh] sm:min-h-[420px] lg:h-[62vh] lg:min-h-[480px] rounded-[20px] sm:rounded-[28px] overflow-hidden text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/60"
              >
                <Image
                  src={h.image}
                  alt={h.alt}
                  fill
                  priority={i === 0}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  sizes="88vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)",
                    opacity: isActive ? 1 : 0.85,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    opacity: isActive ? 0 : 1,
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 px-5 sm:px-12 lg:px-16 pb-8 sm:pb-16">
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 8 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-3xl"
                  >
                    <p className="text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-3 sm:mb-5">
                      {h.meta}
                    </p>
                    <h3 className="font-serif text-[1.65rem] sm:text-4xl lg:text-[3rem] leading-[1.08] sm:leading-[1.05] tracking-tight">
                      {h.title}
                    </h3>
                    <p className="mt-3 sm:mt-5 text-white/80 text-[13px] sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none">
                      {h.body}
                    </p>
                  </motion.div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Progress + indicator */}
      <div className="mt-6 sm:mt-10 px-[6vw] flex items-center gap-2 sm:gap-3">
        {HIGHLIGHTS.map((h, i) => {
          const isActive = i === index;
          return (
            <button
              key={h.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${h.meta}`}
              className="group relative flex-1 max-w-[80px] sm:max-w-[120px] h-[3px] rounded-full bg-neutral-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40"
            >
              <span
                key={`${index}-${i}`}
                className="absolute inset-y-0 left-0 bg-neutral-900"
                style={{
                  width: isActive ? "0%" : i < index ? "100%" : "0%",
                  animation: isActive
                    ? `slide-progress ${DURATION_MS}ms linear forwards`
                    : undefined,
                }}
              />
            </button>
          );
        })}
        <span className="ml-2 sm:ml-4 text-[10px] sm:text-[11px] font-medium text-neutral-500 tracking-[0.16em] sm:tracking-[0.18em] uppercase tabular-nums whitespace-nowrap">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <style jsx>{`
        @keyframes slide-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

const Robotics: FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Olyxee Enterprise Hardware, Operational Intelligence in Motion"
        description="Olyxee develops enterprise hardware and intelligent execution infrastructure for autonomous operations, connected systems, and real-world enterprise environments, with edge AI, fleet operations, and verified deployment at scale."
        path="/enterprise/robotics"
        keywords={[
          "enterprise hardware",
          "operational intelligence",
          "edge AI",
          "AI execution infrastructure",
          "connected hardware",
          "autonomous workflows",
          "industrial automation",
          "multi-agent coordination",
          "robotics infrastructure",
          "fleet operations",
          "human-in-the-loop operations",
          "enterprise orchestration",
          "on-device AI",
          "OTA updates",
          "Orgni operational workflows",
        ]}
        ogImage="https://olyxee.com/images/robotics/humanoid-manipulation.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Olyxee Enterprise Hardware",
            serviceType: "Enterprise Hardware and AI Execution Infrastructure",
            provider: {
              "@type": "Organization",
              name: "Olyxee",
              url: "https://olyxee.com",
            },
            areaServed: "Worldwide",
            description:
              "Olyxee Enterprise Hardware builds intelligent execution infrastructure, edge AI systems, and connected hardware for autonomous operations and real-world enterprise environments.",
            url: "https://olyxee.com/enterprise/robotics",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
              url: "https://olyxee.com/contact?subject=Olyxee%20Enterprise%20Hardware%20early%20access",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Olyxee Enterprise Hardware?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Olyxee Enterprise Hardware is the operational infrastructure division of Olyxee, focused on intelligent execution systems, edge AI, connected hardware, and fleet operations for autonomous enterprise environments.",
                },
              },
              {
                "@type": "Question",
                name: "How do I get early access to Olyxee Enterprise Hardware?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Join the early access waitlist or contact the enterprise team through the Olyxee contact page to discuss pilots, partnerships, or program participation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Olyxee Enterprise Accelerator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Olyxee Enterprise Accelerator backs early-stage teams shipping intelligent execution infrastructure with mentorship, compute, and access to connected hardware platforms.",
                },
              },
            ],
          },
        ]}
      />
      <div className="grain" />
      <Header />

      {/* === HERO (heading inside a large video card) === */}
      <section
        ref={heroRef}
        aria-label="Hero"
        className="relative w-full px-3 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[1500px] mx-auto"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
            WebkitFilter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
          }}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-neutral-950 min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-end transform-gpu">
            {/* Video background */}
            <video
              src="/videos/robotics-hero.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/robotics/humanoid-manipulation.png"
              aria-hidden
            />
            {/* Cinematic scrim for legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)",
              }}
            />
            {/* Inner highlight ring */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />

            {/* Content inside the card */}
            <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-20">
              <div className="max-w-5xl">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/65 mb-6 sm:mb-8"
                >
                  Enterprise Hardware
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="font-serif text-white leading-[1.02] tracking-tight text-[2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                >
                  Operational Intelligence in Motion.
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
                >
                  <Link
                    href="/contact?subject=Olyxee%20Enterprise%20Hardware%20early%20access"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
                  >
                    Join waitlist for early access
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </Link>
                  <Link
                    href="/contact?subject=Olyxee%20Enterprise%20Hardware%20partnership"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/15 transition-all text-sm tracking-wide"
                  >
                    Talk to the enterprise team
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Credit chip, bottom-right inside the card */}
            <a
              href="https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-white/65 hover:text-white transition-colors bg-black/35 backdrop-blur-md px-2.5 py-1.5 rounded-full ring-1 ring-white/10"
            >
              <span>Video</span>
              <span className="w-3 h-px bg-white/30" aria-hidden />
              <span>Gemini Robotics</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* === STATEMENT === */}
      <section className="px-4 sm:px-8 lg:px-12 py-16 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Execution infrastructure for the enterprise
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.1] sm:leading-[1.05] tracking-tight text-neutral-900">
            Olyxee develops <em className="not-italic text-blue-500">intelligent execution systems</em> that connect <span className="text-neutral-500">AI, enterprise workflows, hardware, and human decision-making</span> into <em className="not-italic text-orange-400">reliable operational environments</em>.
          </h2>
        </motion.div>
      </section>

      {/* === HIGHLIGHTS === */}
      <HighlightsSlider />

      {/* === ACCELERATOR === */}
      <section className="relative px-4 sm:px-8 lg:px-12 py-16 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-neutral-900/5 px-5 sm:px-12 lg:px-16 py-10 sm:py-20 lg:py-24 bg-neutral-50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="text-[11px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-3 sm:mb-4">
                Olyxee Enterprise Accelerator
              </p>
              <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05]">
                Backing the next wave of operational intelligence.
              </h2>
              <p className="mt-4 sm:mt-6 text-neutral-600 text-sm sm:text-lg font-light leading-relaxed">
                Mentorship, compute, and connected hardware for early-stage teams shipping AI execution infrastructure into real enterprise environments.
              </p>
              <div className="mt-6 sm:mt-8">
                <Link
                  href="/contact?subject=Olyxee%20Enterprise%20Accelerator%20application"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm tracking-wide"
                >
                  Apply to the program
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/robotics/accelerator-pointcloud.png"
                  alt="Abstract point cloud rendering of a connected operational system"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />

                {[
                  { label: "Mentorship", className: "top-[8%] left-[4%]" },
                  { label: "Compute", className: "top-[40%] right-[2%]" },
                  { label: "Hardware", className: "bottom-[10%] left-[18%]" },
                ].map((tag, i) => (
                  <motion.span
                    key={tag.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className={`inline-flex absolute ${tag.className} items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white text-[10px] sm:text-[11px] font-medium text-neutral-700 tracking-wide ring-1 ring-neutral-900/5 shadow-sm`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" aria-hidden />
                    {tag.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === PARTNERSHIPS / ECOSYSTEM === */}
      <section className="px-4 sm:px-8 lg:px-12 py-16 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-3 sm:mb-4">
              04 · Ecosystem
            </p>
            <h3 className="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.1]">
              Built with leading enterprise and infrastructure teams.
            </h3>
            <p className="mt-4 sm:mt-5 text-neutral-600 text-sm sm:text-lg font-light leading-relaxed">
              We partner with hardware OEMs, foundation model labs, and operations teams to bring reliable AI execution from research into real enterprise environments.
            </p>
            <Link
              href="/contact?subject=Olyxee%20Enterprise%20Hardware%20partnership"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 group"
            >
              Become a partner
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-neutral-900/5">
              <Image
                src="/images/robotics/foundation-partnerships.png"
                alt="Partnerships across enterprise infrastructure and hardware platforms"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="relative py-16 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="relative rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200/70 px-5 sm:px-12 lg:px-20 py-10 sm:py-20 lg:py-24 overflow-hidden">
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-[1.85rem] sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4 sm:mb-5 leading-[1.1] sm:leading-[1.05]">
                Building real-world operational systems?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-lg font-light leading-relaxed mb-7 sm:mb-9 max-w-lg mx-auto">
                We partner on edge AI, execution infrastructure, and hardware-integrated deployments, from pilot to fleet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact?subject=Olyxee%20Enterprise%20Hardware%20inquiry"
                  className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </Link>
                <Link
                  href="/enterprise"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-neutral-900 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  Enterprise Software
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Robotics;
