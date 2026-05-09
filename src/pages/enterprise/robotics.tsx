import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
];

const HighlightsSlider: FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = HIGHLIGHTS.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION_MS = 3000;

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
  const active = HIGHLIGHTS[index];

  return (
    <section
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-neutral-950 text-white"
      aria-roledescription="carousel"
      aria-label="Olyxee Robotics foundation pillars"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={active.title}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={active.image}
            alt={active.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-20 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title + "-text"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.2em] mb-5">
              {active.meta}
            </p>
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight">
              {active.title}
            </h3>
            <p className="mt-5 text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              {active.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bars */}
        <div className="mt-10 sm:mt-14 flex items-center gap-3">
          {HIGHLIGHTS.map((h, i) => {
            const isActive = i === index;
            return (
              <button
                key={h.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}: ${h.meta}`}
                className="group relative flex-1 max-w-[120px] h-[3px] rounded-full bg-white/15 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span
                  key={`${index}-${i}-${isPaused}`}
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{
                    width: isActive ? "100%" : i < index ? "100%" : "0%",
                    animation:
                      isActive && !isPaused
                        ? `slide-progress ${DURATION_MS}ms linear forwards`
                        : undefined,
                  }}
                />
              </button>
            );
          })}
          <span className="ml-4 text-[11px] font-medium text-white/50 tracking-[0.18em] uppercase tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
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
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Olyxee Robotics · Enterprise Hardware"
        description="Olyxee Robotics powers an era of physical agents, embodied AI for industrial, logistics, and field operations with on-device intelligence, hardware integration, and verified fleet deployment."
        path="/enterprise/robotics"
      />
      <div className="grain" />
      <Header />

      {/* === CINEMATIC HERO === */}
      <section className="relative w-full bg-white text-white pt-20 sm:pt-24 pb-6 sm:pb-8 px-3 sm:px-5">
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: 32,
            minHeight: "min(88vh, 880px)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <video
            src="/videos/robotics-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/robotics/humanoid-manipulation.png"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(59,130,246,0.18), transparent 65%)",
              filter: "blur(60px) saturate(1.4)",
            }}
          />

        <div className="relative z-10 min-h-[inherit] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-20 text-center" style={{ minHeight: "min(88vh, 880px)" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-[3rem] sm:text-7xl lg:text-[8rem] leading-[0.95] tracking-tight"
          >
            Olyxee{" "}
            <span
              className="font-handwritten text-blue-400 font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-handwritten), cursive" }}
            >
              Robotics
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 text-base sm:text-xl text-white/70 font-light max-w-2xl leading-relaxed"
          >
            Powering an era of physical agents, embodied AI that perceives, reasons, and acts reliably in the real world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact?subject=Olyxee%20Robotics%20early%20access"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
            >
              Join waitlist for early access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
            <Link
              href="/contact?subject=Olyxee%20Robotics%20partnership"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white rounded-full font-medium hover:bg-white/15 transition-all text-sm tracking-wide backdrop-blur-md ring-1 ring-white/15"
            >
              Talk to robotics team
            </Link>
          </motion.div>
        </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[11px] uppercase tracking-[0.28em] text-white/50">
            Explore the latest
          </div>
        </div>
      </section>

      {/* === MARQUEE STATEMENT === */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
            Foundation models for the physical world
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-neutral-900">
            Robots of{" "}
            <span
              className="font-handwritten text-blue-600 font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-handwritten), cursive" }}
            >
              any shape and size
            </span>
            , perceiving, reasoning, and using tools in the world around them.
          </h2>
        </motion.div>
      </section>

      {/* === HIGHLIGHTS (Fullscreen auto-advancing slider) === */}
      <HighlightsSlider />

      {/* === ACCELERATOR === */}
      <section className="relative px-4 sm:px-8 lg:px-12 py-20 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden ring-1 ring-neutral-900/5 px-6 sm:px-12 lg:px-16 py-14 sm:py-20 lg:py-24"
          style={{
            background:
              "radial-gradient(120% 90% at 80% 20%, #eaf3ff 0%, #f5f9ff 45%, #ffffff 80%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                Olyxee Robotics Accelerator
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-[1.05]">
                Backing the next wave of{" "}
                <span
                  className="font-handwritten text-blue-600 font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-handwritten), cursive" }}
                >
                  physical AI
                </span>
                .
              </h2>
              <p className="mt-6 text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
                Mentorship, compute, and robots for early-stage teams shipping embodied AI into the real world.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact?subject=Olyxee%20Robotics%20Accelerator%20application"
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm tracking-wide"
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
                    className={`hidden sm:inline-flex absolute ${tag.className} items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[11px] font-medium text-neutral-700 tracking-wide ring-1 ring-neutral-900/5 shadow-sm`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden />
                    {tag.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === PARTNERSHIPS / ECOSYSTEM === */}
      <section className="px-4 sm:px-8 lg:px-12 py-20 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">
              04 · Ecosystem
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.1]">
              Built with the{" "}
              <span
                className="font-handwritten text-blue-600 font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-handwritten), cursive" }}
              >
                leading
              </span>{" "}
              robotics teams.
            </h3>
            <p className="mt-5 text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
              We partner with hardware OEMs, foundation model labs, and field operators to bring reliable embodied AI from research into production.
            </p>
            <Link
              href="/contact?subject=Olyxee%20Robotics%20partnership"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 group"
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
      <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden">
            <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Building in the{" "}
                <span
                  className="font-handwritten text-blue-600 font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-handwritten), cursive" }}
                >
                  physical world
                </span>
                ?
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                We partner on embodied AI, perception stacks, and hardware-integrated deployments, from pilot to fleet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact?subject=Olyxee%20Robotics%20inquiry"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </Link>
                <Link
                  href="/enterprise"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
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
