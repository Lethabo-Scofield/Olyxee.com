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
    eyebrow: "AI at the edge",
    title: "How might intelligence work in physical environments?",
    body: "We are exploring how AI systems could interact with connected hardware, sensors and operational settings as part of Olyxee's broader research into Organizational Intelligence.",
    image: "/images/robotics/humanoid-manipulation.png",
    alt: "Connected hardware in an enterprise environment",
    meta: "01 · Edge AI",
  },
  {
    eyebrow: "Physical systems",
    title: "Studying the systems organizations depend on.",
    body: "Industrial, logistics and field environments bring people, processes, software and machines together. We are interested in how these parts might coordinate more effectively.",
    image: "/images/robotics/hardware-design.png",
    alt: "Engineer reviewing infrastructure designs on a monitor",
    meta: "02 · Hardware",
  },
  {
    eyebrow: "Organizational coordination",
    title: "Understanding work across connected systems.",
    body: "Complex environments depend on coordination across people, processes and equipment. Researching how systems can understand that context is part of the long-term challenge.",
    image: "/images/robotics/field-deployment.png",
    alt: "Field deployment of connected enterprise systems",
    meta: "03 · Operations",
  },
  {
    eyebrow: "Human-AI coordination",
    title: "People and machines working toward shared objectives.",
    body: "Olyxee is researching architectures where people, AI agents, software and machines could coordinate toward shared organizational objectives.",
    image: "/images/robotics/gallery/dual-arm-bag.png",
    alt: "Coordinated multi-agent operation across connected hardware",
    meta: "04 · Coordination",
  },
  {
    eyebrow: "Human oversight",
    title: "Keeping people central as systems adapt.",
    body: "As organizational systems become more capable, human objectives, oversight and governance remain important research questions.",
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
      aria-label="Olyxee research themes for connected systems"
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
                    <p className="mt-3 sm:mt-5 text-white/80 text-[13px] sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none">
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
        title="Olyxee | Organizational Intelligence Research in Physical Systems"
        description="Olyxee explores how people, software, AI agents and connected machines might coordinate in complex organizational environments."
        path="/enterprise/robotics"
        keywords={[
          "Organizational Intelligence",
          "adaptive organizations",
          "human-AI coordination",
          "organizational systems",
          "autonomous agents research",
          "connected systems",
          "organizational research",
        ]}
        ogImage="https://olyxee.com/images/robotics/humanoid-manipulation.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Olyxee Organizational Intelligence Research",
            serviceType: "Research and technology",
            provider: {
              "@type": "Organization",
              name: "Olyxee",
              url: "https://olyxee.com",
            },
            areaServed: "Worldwide",
            description:
              "Olyxee researches the foundations of Organizational Intelligence, including how people, software, AI agents and machines might coordinate in complex environments.",
            url: "https://olyxee.com/enterprise/robotics",
            offers: {
              "@type": "Offer",
              url: "https://olyxee.com/contact?subject=Olyxee%20Enterprise%20Hardware%20early%20access",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Olyxee researching in physical systems?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Olyxee is a research and technology company focused on the foundations of Organizational Intelligence. Its research includes how people, software, AI agents and machines might coordinate in complex organizational environments.",
                },
              },
              {
                "@type": "Question",
                name: "How can I discuss this research with Olyxee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Contact Olyxee to discuss its research into Organizational Intelligence.",
                },
              },
              {
                "@type": "Question",
                name: "What is Olyxee's long-term research goal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Olyxee is researching the foundations of Autonomous Adaptive Organizations: organizations capable of learning, adapting and evolving over time. This remains a long-term research direction, not a solved problem.",
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
                  Research in connected systems
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="font-serif text-white leading-[1.02] tracking-tight text-[2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                >
                  Exploring intelligence in physical systems.
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
                    Discuss this research
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </Link>
                  <Link
                    href="/contact?subject=Olyxee%20Enterprise%20Hardware%20partnership"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/15 transition-all text-sm tracking-wide"
                  >
                    Contact Olyxee
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
            Researching Organizational Intelligence
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.1] sm:leading-[1.05] tracking-tight text-neutral-900">
            Olyxee explores how <em className="not-italic text-blue-500">organizations might become intelligent systems</em> through <span className="text-neutral-500">coordination among people, software, AI agents and machines</span>, building toward <em className="not-italic text-orange-400">organizations that learn, adapt and evolve</em>.
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
                Olyxee Research Collaborations
              </p>
              <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05]">
                Exploring intelligence in real-world environments.
              </h2>
              <p className="mt-4 sm:mt-6 text-neutral-600 text-sm sm:text-lg font-normal leading-relaxed">
                Complex real-world environments raise important questions about how information, people, processes and machines coordinate. We are interested in learning from these settings as our research develops.
              </p>
              <div className="mt-6 sm:mt-8">
                <Link
                  href="/contact?subject=Olyxee%20Enterprise%20Accelerator%20application"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm tracking-wide"
                >
                  Discuss a collaboration
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
                  { label: "Organizations", className: "top-[8%] left-[4%]" },
                  { label: "People", className: "top-[40%] right-[2%]" },
                  { label: "Systems", className: "bottom-[10%] left-[18%]" },
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
              Researching complex organizational environments.
            </h3>
            <p className="mt-4 sm:mt-5 text-neutral-600 text-sm sm:text-lg font-normal leading-relaxed">
              Logistics, industrial and field settings offer concrete examples of organizations coordinating information, people, processes and decisions. Olyxee's research considers these environments without claiming to have solved their challenges.
            </p>
            <Link
              href="/contact?subject=Olyxee%20Enterprise%20Hardware%20partnership"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 group"
            >
              Contact Olyxee
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
                Exploring organizational systems in the real world?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-lg font-normal leading-relaxed mb-7 sm:mb-9 max-w-lg mx-auto">
                Olyxee is researching how intelligence might help organizations learn, adapt and coordinate across complex environments.
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
