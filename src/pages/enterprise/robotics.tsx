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
    eyebrow: "Embodied intelligence",
    title: "Perceive, reason, and act in the real world.",
    body: "Foundation models tuned for spatial reasoning and dexterous control, deployed on-device with deterministic latency. Robots that adapt to new objects, environments, and tasks without retraining from scratch.",
    image: "/images/robotics/humanoid-manipulation.png",
    alt: "Humanoid robot manipulating objects on a workbench",
    meta: "01 · Models",
  },
  {
    eyebrow: "Hardware design",
    title: "Reference platforms, built for production.",
    body: "Mechanical, electrical, and compute designs co-developed with our partners across arms, mobile bases, and humanoids. Open SDKs from teleop to autonomy.",
    image: "/images/robotics/hardware-design.png",
    alt: "Engineer reviewing CAD blueprints on a monitor",
    meta: "02 · Hardware",
  },
  {
    eyebrow: "Fleet operations",
    title: "Deploy, monitor, and update at scale.",
    body: "Roll out new policies to thousands of robots with rollback-safe delivery, live observability, and OTA updates verified by Ordo before they ever touch a physical system.",
    image: "/images/robotics/field-deployment.png",
    alt: "Field deployment of robotic systems",
    meta: "03 · Operations",
  },
  {
    eyebrow: "Education",
    title: "Building the next generation of roboticists.",
    body: "From classrooms in Johannesburg to global STEM programs, we partner with schools to put real robotics hardware and curriculum in the hands of students who will define the next decade.",
    image: "/images/robotics/gallery/students-cars.png",
    alt: "Students smiling with robotic cars on a desk",
    meta: "04 · Education",
  },
  {
    eyebrow: "Manipulation",
    title: "Dexterous skills, learned from real-world data.",
    body: "Folding cloth, sorting parts, picking from clutter. Olyxee Robotics policies generalize across grippers and embodiments, learned from millions of teleoperated and autonomous trajectories.",
    image: "/images/robotics/gallery/manipulation-grid.png",
    alt: "Grid of robot arms performing manipulation tasks",
    meta: "05 · Manipulation",
  },
  {
    eyebrow: "Bimanual",
    title: "Two arms, one intent.",
    body: "Coordinated bimanual control lets robots handle deformable, asymmetric, and contact-rich tasks, bagging, threading, assembling, that single-arm systems cannot solve reliably.",
    image: "/images/robotics/gallery/dual-arm-bag.png",
    alt: "Two robotic arms loading items into a bag",
    meta: "06 · Bimanual",
  },
  {
    eyebrow: "Language to action",
    title: "From a sentence to a working object.",
    body: "Natural-language prompts compile down to motion plans, fabrication steps, and verified executions. Tell a robot what you want, watch it build it.",
    image: "/images/robotics/gallery/stool-prompt.png",
    alt: "Robot interpreting the prompt 'I want a simple stool' and building a structure",
    meta: "07 · Language → Action",
  },
  {
    eyebrow: "Engineering",
    title: "Built by engineers, for the field.",
    body: "Mechatronics, perception, and control engineers iterating on real hardware, in real labs. Every policy ships only after it survives the bench.",
    image: "/images/robotics/gallery/engineer-build.png",
    alt: "Engineer assembling a robot in a lab",
    meta: "08 · Engineering",
  },
  {
    eyebrow: "Community",
    title: "Open access to robotics, from day one.",
    body: "Workshops, kits, and open SDKs that lower the barrier to building real robots, so curiosity in a classroom can compound into a career in the field.",
    image: "/images/robotics/gallery/students-lego.png",
    alt: "Young students collaborating on a robotics kit",
    meta: "09 · Community",
  },
];

const HighlightsSlider: FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = HIGHLIGHTS.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION_MS = 4000;

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, DURATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, total]);

  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  return (
    <section
      className="relative w-full bg-white py-10 sm:py-16"
      aria-roledescription="carousel"
      aria-label="Olyxee Robotics foundation pillars"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
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
                className="group relative shrink-0 w-[88vw] h-[70vh] min-h-[460px] sm:h-[78vh] sm:min-h-[560px] rounded-[20px] sm:rounded-[28px] overflow-hidden text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/60"
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
                  animationPlayState: isPaused ? "paused" : "running",
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
        title="Olyxee Robotics, Enterprise Hardware for Embodied AI"
        description="Olyxee Robotics powers an era of physical agents, embodied AI for industrial, logistics, and field operations with on-device intelligence, hardware integration, and verified fleet deployment at scale."
        path="/enterprise/robotics"
        keywords={[
          "Olyxee Robotics",
          "embodied AI",
          "physical AI",
          "robotics foundation models",
          "humanoid robots",
          "industrial robotics",
          "fleet operations",
          "edge AI",
          "robotic perception",
          "robot deployment",
          "robotics accelerator",
          "enterprise robotics",
          "on-device AI",
          "OTA robot updates",
          "Ordo verification",
        ]}
        ogImage="https://olyxee.com/images/robotics/humanoid-manipulation.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Olyxee Robotics",
            serviceType: "Embodied AI and Robotics Platform",
            provider: {
              "@type": "Organization",
              name: "Olyxee",
              url: "https://olyxee.com",
            },
            areaServed: "Worldwide",
            description:
              "Olyxee Robotics builds foundation models, hardware reference designs, and fleet operations tooling for physical agents that perceive, reason, and act in the real world.",
            url: "https://olyxee.com/enterprise/robotics",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/PreOrder",
              url: "https://olyxee.com/contact?subject=Olyxee%20Robotics%20early%20access",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Olyxee Robotics?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Olyxee Robotics is the enterprise hardware division of Olyxee, focused on embodied AI: foundation models, reference hardware platforms, and fleet operations for physical agents in industrial, logistics, and field environments.",
                },
              },
              {
                "@type": "Question",
                name: "How do I get early access to Olyxee Robotics?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Join the early access waitlist or contact the robotics team through the Olyxee contact page to discuss pilots, partnerships, or accelerator participation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Olyxee Robotics Accelerator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Olyxee Robotics Accelerator backs early-stage teams shipping embodied AI with mentorship, compute, and access to robotic hardware platforms.",
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
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] ring-1 ring-neutral-900/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)] bg-neutral-950 min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-end">
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
            <div className="absolute inset-0 rounded-2xl sm:rounded-[36px] pointer-events-none ring-1 ring-inset ring-white/10" />

            {/* Content inside the card */}
            <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-20">
              <div className="max-w-5xl">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/65 mb-6 sm:mb-8"
                >
                  Olyxee Robotics
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="font-serif text-white leading-[1.02] tracking-tight text-[2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                >
                  Robotics for the physical world.
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
                >
                  <Link
                    href="/contact?subject=Olyxee%20Robotics%20early%20access"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
                  >
                    Join waitlist for early access
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </Link>
                  <Link
                    href="/contact?subject=Olyxee%20Robotics%20partnership"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/15 transition-all text-sm tracking-wide"
                  >
                    Talk to robotics team
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Credit chip — bottom-right inside the card */}
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
            Foundation models for the physical world
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.1] sm:leading-[1.05] tracking-tight text-neutral-900">
            Robots of any shape and size, perceiving, reasoning, and using tools in the world around them.
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
                Olyxee Robotics Accelerator
              </p>
              <h2 className="font-serif text-[1.75rem] sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-[1.1] sm:leading-[1.05]">
                Backing the next wave of physical AI.
              </h2>
              <p className="mt-4 sm:mt-6 text-neutral-600 text-sm sm:text-lg font-light leading-relaxed">
                Mentorship, compute, and robots for early-stage teams shipping embodied AI into the real world.
              </p>
              <div className="mt-6 sm:mt-8">
                <Link
                  href="/contact?subject=Olyxee%20Robotics%20Accelerator%20application"
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
                  alt="Point cloud rendering of a robotic figure"
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
              Built with the leading robotics teams.
            </h3>
            <p className="mt-4 sm:mt-5 text-neutral-600 text-sm sm:text-lg font-light leading-relaxed">
              We partner with hardware OEMs, foundation model labs, and field operators to bring reliable embodied AI from research into production.
            </p>
            <Link
              href="/contact?subject=Olyxee%20Robotics%20partnership"
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
                alt="Partnerships across robotics labs and platforms"
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
                Building in the physical world?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-lg font-light leading-relaxed mb-7 sm:mb-9 max-w-lg mx-auto">
                We partner on embodied AI, perception stacks, and hardware-integrated deployments, from pilot to fleet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact?subject=Olyxee%20Robotics%20inquiry"
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
