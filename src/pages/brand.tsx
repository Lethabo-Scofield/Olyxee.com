import { FC, ReactNode, useState, useCallback } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, Check, X as XIcon, Download, Copy } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const COLORS = [
  { name: "Ink", hex: "#0A0A0A", token: "neutral-950", text: "text-white", role: "Primary text and dark surfaces" },
  { name: "Paper", hex: "#FFFFFF", token: "white", text: "text-neutral-900", role: "Default background", border: true },
  { name: "Mist", hex: "#F5F5F5", token: "neutral-100", text: "text-neutral-900", role: "Subtle surfaces and dividers", border: true },
  { name: "Slate", hex: "#737373", token: "neutral-500", text: "text-white", role: "Secondary text" },
  { name: "Ember", hex: "#F97316", token: "orange-500", text: "text-white", role: "Editorial accent and highlights" },
  { name: "Ordo Blue", hex: "#3B82F6", token: "blue-500", text: "text-white", role: "Ordo product accent" },
  { name: "Addup Green", hex: "#10B981", token: "emerald-500", text: "text-white", role: "Addup product accent" },
];

const SECTIONS: { label: string; href: string }[] = [
  { label: "Logos",     href: "#logos" },
  { label: "Type",      href: "#typography" },
  { label: "Voice",     href: "#voice" },
  { label: "Color",     href: "#color" },
  { label: "Usage",     href: "#usage" },
  { label: "Downloads", href: "#downloads" },
];

const VOICE: { word: string; rule: string; sample: string }[] = [
  {
    word: "Calm.",
    rule: "Lower the volume. We don't shout to be heard.",
    sample: "Reconciles in seconds, not days.",
  },
  {
    word: "Direct.",
    rule: "Short sentences. Specific verbs. No filler.",
    sample: "Ordo executes. Addup reconciles.",
  },
  {
    word: "Useful.",
    rule: "Every line carries information. Cut adjectives.",
    sample: "Pulls your ledgers. Matches the entries. Files the report.",
  },
];

function BrandAurora() {
  // Subtle painterly gradient anchored to the upper-right of the hero,
  // brand-cohesive with the /products aurora. Heavily blurred, decorative.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 right-0 h-[120%] w-[70%] sm:w-[55%] lg:w-[45%] overflow-visible"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="brand-aurora-warm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fbbf24" />
            <stop offset="50%"  stopColor="#f97316" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="brand-aurora-cool" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#3b82f6" />
            <stop offset="50%"  stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="brand-aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <g filter="url(#brand-aurora-blur)" style={{ mixBlendMode: "multiply" }}>
          <path
            d="M 660,-40 C 480,180 360,360 380,560 C 400,720 540,820 700,780 C 840,740 860,540 820,360 C 780,200 740,80 660,-40 Z"
            fill="url(#brand-aurora-cool)"
            opacity="0.45"
          />
          <path
            d="M 580,-20 C 460,160 380,340 460,520 C 540,680 700,720 800,580 C 880,460 880,300 820,180 C 760,80 660,20 580,-20 Z"
            fill="url(#brand-aurora-warm)"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}

const DOS = [
  "Use the full Olyxee mark with adequate clear space",
  "Pair the wordmark with the official symbol when both are needed",
  "Keep contrast accessible: dark mark on light, light mark on dark",
  "Use the official color tokens for product accents",
];

const DONTS = [
  "Recolor, stretch, rotate, or add effects to the logo",
  "Place the logo on busy or low-contrast backgrounds",
  "Recreate the wordmark in another typeface",
  "Combine the Olyxee mark with another company or product name",
];

const DOWNLOADS = [
  { label: "Olyxee mark · Light", path: "/Logo/Olyxee_Logo.png", format: "PNG" },
  { label: "Olyxee mark · Dark", path: "/Logo/Olyxee_trans.png", format: "PNG" },
  { label: "Ordo mark", path: "/images/ordo-logo.png", format: "PNG" },
  { label: "Addup wordmark", path: "/images/addup-logo.png", format: "PNG" },
];

/* === Color swatch: tap to copy hex === */
const ColorSwatch: FC<{
  name: string;
  hex: string;
  text: string;
  border?: boolean;
}> = ({ name, hex, text, border }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hex);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok && typeof document !== "undefined") {
      // Legacy fallback for browsers without the async Clipboard API
      try {
        const ta = document.createElement("textarea");
        ta.value = hex;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1100);
    }
  }, [hex]);
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${name} hex value ${hex}`}
      className={`group relative flex flex-col justify-end aspect-[3/4] sm:aspect-[2/3] p-4 sm:p-5 text-left ${text} ${
        border ? "ring-1 ring-inset ring-neutral-200" : ""
      } transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70`}
      style={{ backgroundColor: hex }}
    >
      <span className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
        ) : (
          <Copy className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
        )}
      </span>
      <p className="font-serif text-xl sm:text-2xl tracking-tight leading-none mb-2">{name}</p>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">
        {copied ? "Copied" : hex}
      </p>
    </button>
  );
};

/* === Aurora gradient swatch (marketing only) === */
const AuroraSwatch: FC = () => (
  <div
    aria-label="Aurora gradient swatch, marketing surfaces only"
    className="relative flex flex-col justify-end aspect-[3/4] sm:aspect-[2/3] p-4 sm:p-5 text-white overflow-hidden"
    style={{
      background:
        "conic-gradient(from 200deg at 70% 30%, #fbbf24, #f97316, #ec4899, #a855f7, #3b82f6, #fbbf24)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-black/15" />
    <p className="relative font-serif text-xl sm:text-2xl tracking-tight leading-none mb-2">
      Aurora
    </p>
    <p className="relative text-[10px] font-mono uppercase tracking-[0.2em] opacity-90">
      Gradient · marketing
    </p>
  </div>
);

/* === Specimen plate: full-width figure with corner metadata === */
const Plate: FC<{
  id?: string;
  num: string;
  name: string;
  bg?: string;
  borderless?: boolean;
  caption?: ReactNode;
  children: ReactNode;
}> = ({ id, num, name, bg = "bg-neutral-50", borderless, caption, children }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className="border-t border-neutral-200 scroll-mt-24"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
        <span>{num}</span>
        <span className="text-neutral-700">{name}</span>
      </div>
      <div
        className={`relative ${bg} ${
          borderless ? "" : "ring-1 ring-neutral-200/80 rounded-2xl"
        } overflow-hidden`}
      >
        <div className="min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex items-center justify-center px-6 py-16 sm:py-24">
          {children}
        </div>
      </div>
      {caption ? (
        <div className="flex items-center justify-between gap-4 py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
          {caption}
        </div>
      ) : (
        <div className="h-3 sm:h-4" />
      )}
    </div>
  </motion.section>
);

const Brand: FC = () => {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Brand Guidelines"
        description="Olyxee brand guidelines: logos for Olyxee, Ordo, and Addup, plus color, typography, and usage rules. Download official assets and learn how to reference our identity."
        path="/brand"
        keywords={[
          "Olyxee brand",
          "Olyxee logo",
          "Ordo logo",
          "Addup logo",
          "Olyxee brand guidelines",
          "Olyxee press kit",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Olyxee Brand Guidelines",
          url: "https://olyxee.com/brand",
          description:
            "Official Olyxee brand guidelines covering logos for Olyxee, Ordo, and Addup, plus color, typography, and usage rules.",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-32 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <BrandAurora />
        <div className="relative max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.32em] text-neutral-500 mb-6"
          >
            Vol. 01 · Identity system · Rev. 2026.05
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-7xl lg:text-[6.5rem] text-neutral-900 tracking-tight leading-[1.02]"
          >
            Brand <em className="not-italic text-orange-500">Guidelines</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 max-w-2xl text-lg sm:text-xl text-neutral-600 font-light leading-relaxed"
          >
            How Olyxee looks, sounds, and behaves &mdash; the marks, the colors, the type, and the
            tone of voice that hold the system together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur-sm ring-1 ring-neutral-900/10 hover:ring-neutral-900/30 hover:bg-white text-neutral-800 text-xs font-mono uppercase tracking-[0.2em] px-3.5 py-1.5 transition-all"
              >
                {s.label}
              </a>
            ))}
            <a
              href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-[0.2em] px-3.5 py-1.5 transition-colors ml-auto"
            >
              Press
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* === SPECIMEN PLATES === */}
      <div className="pb-8">
        {/* 01 - Olyxee mark, split light + dark */}
        <motion.section
          id="logos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>01</span>
              <span className="text-neutral-700">Olyxee · Mark</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80">
              <div className="relative bg-neutral-50 min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center px-6 py-16 sm:py-24">
                <Image
                  src="/Logo/Olyxee_Logo.png"
                  alt="Olyxee mark on light"
                  width={320}
                  height={320}
                  className="w-32 sm:w-44 lg:w-56 h-auto object-contain"
                  priority
                />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  Light
                </span>
              </div>
              <div className="relative bg-neutral-950 min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center px-6 py-16 sm:py-24">
                <Image
                  src="/Logo/Olyxee_trans.png"
                  alt="Olyxee mark on dark"
                  width={320}
                  height={320}
                  className="w-32 sm:w-44 lg:w-56 h-auto object-contain"
                />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  Dark
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              <span>Light + dark surfaces</span>
              <span className="flex items-center gap-4">
                <a
                  href="/Logo/Olyxee_Logo.png"
                  download
                  className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Light PNG
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
                </a>
                <a
                  href="/Logo/Olyxee_trans.png"
                  download
                  className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Dark PNG
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
                </a>
              </span>
            </div>
          </div>
        </motion.section>

        {/* 02 - Ordo */}
        <Plate
          num="02"
          name="Ordo · Product mark"
          bg="bg-neutral-50"
          caption={
            <>
              <span>Ordo Blue · #3B82F6</span>
              <a
                href="/images/ordo-logo.png"
                download
                className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Download PNG
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
              </a>
            </>
          }
        >
          <Image
            src="/images/ordo-logo.png"
            alt="Ordo product mark"
            width={320}
            height={320}
            className="w-40 sm:w-56 lg:w-72 h-auto object-contain"
          />
        </Plate>

        {/* 03 - Addup */}
        <Plate
          num="03"
          name="Addup · Wordmark"
          bg="bg-neutral-50"
          caption={
            <>
              <span>Addup Green · #10B981</span>
              <a
                href="/images/addup-logo.png"
                download
                className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Download PNG
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
              </a>
            </>
          }
        >
          <Image
            src="/images/addup-logo.png"
            alt="Addup wordmark"
            width={400}
            height={120}
            className="w-56 sm:w-72 lg:w-96 h-auto object-contain"
          />
        </Plate>

        {/* 04 - Lockup */}
        <Plate
          num="04"
          name="Olyxee · Lockup"
          bg="bg-neutral-50"
          caption={
            <>
              <span>Mark and wordmark together</span>
              <a
                href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Logo%20vector%20request"
                className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Request SVG
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
              </a>
            </>
          }
        >
          <div className="flex items-center gap-6 sm:gap-10">
            <Image
              src="/Logo/Olyxee_Logo.png"
              alt="Olyxee lockup"
              width={120}
              height={120}
              className="w-16 sm:w-20 lg:w-24 h-auto object-contain"
            />
            <span className="font-serif text-5xl sm:text-7xl lg:text-[6rem] tracking-tight text-neutral-900 leading-none">
              Olyxee
            </span>
          </div>
        </Plate>

        {/* 05 - Typography */}
        <Plate id="typography" num="05" name="Type · Editorial Serif" bg="bg-white" borderless>
          <span
            aria-hidden="true"
            style={{ fontSize: "clamp(7rem, 28vw, 26rem)" }}
            className="font-serif leading-none tracking-tight text-neutral-900 select-none"
          >
            Aa
          </span>
          <span className="sr-only">Editorial serif typeface specimen, displaying the letters A and a.</span>
        </Plate>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2 sm:-mt-4 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 border-t border-neutral-200 pt-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">Display</p>
              <p className="font-serif text-2xl text-neutral-900">Editorial serif</p>
              <p className="text-sm text-neutral-500 font-light mt-1">Headlines and editorial moments.</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">Body</p>
              <p className="text-2xl font-light text-neutral-900 tracking-tight">Neutral sans</p>
              <p className="text-sm text-neutral-500 font-light mt-1">UI text, body copy, product surfaces.</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">Detail</p>
              <p className="font-mono text-xl text-neutral-900 tracking-tight">Monospace</p>
              <p className="text-sm text-neutral-500 font-light mt-1">Labels, metadata, and code.</p>
            </div>
          </div>
        </div>

        {/* 07 - Voice */}
        <section id="voice" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>06</span>
              <span className="text-neutral-700">Voice · How we sound</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200"
            >
              {VOICE.map((v) => (
                <div key={v.word} className="bg-white p-8 sm:p-10 flex flex-col">
                  <p className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 leading-none mb-6">
                    {v.word}
                  </p>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mb-8">{v.rule}</p>
                  <div className="mt-auto pt-6 border-t border-neutral-200">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">
                      Like this
                    </p>
                    <p className="font-serif text-lg sm:text-xl text-neutral-900 leading-snug italic">
                      &ldquo;{v.sample}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Marquee · System in motion (borderless interlude) */}
        <section
          aria-hidden="true"
          className="border-t border-neutral-200 mt-4 py-10 sm:py-14 overflow-hidden"
        >
          <div className="brand-marquee flex whitespace-nowrap will-change-transform">
            {[0, 1].map((rep) => (
              <div
                key={rep}
                className="flex shrink-0 items-center font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-900 leading-none"
              >
                <span className="pr-12 sm:pr-16">Olyxee</span>
                <span className="pr-12 sm:pr-16 text-orange-500">&bull;</span>
                <span className="pr-12 sm:pr-16">Ordo</span>
                <span className="pr-12 sm:pr-16 text-orange-500">&bull;</span>
                <span className="pr-12 sm:pr-16">Addup</span>
                <span className="pr-12 sm:pr-16 text-orange-500">&bull;</span>
                <span className="pr-12 sm:pr-16 italic text-neutral-400">Built for execution</span>
                <span className="pr-12 sm:pr-16 text-orange-500">&bull;</span>
              </div>
            ))}
          </div>
        </section>

        {/* 08 - Color */}
        <section id="color" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>07</span>
              <span className="text-neutral-700">Color · Palette</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80"
            >
              {COLORS.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
              <AuroraSwatch />
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-x-4 gap-y-3 py-4">
              {COLORS.map((c) => (
                <p key={c.name} className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 leading-relaxed">
                  <span className="text-neutral-700">{c.token}</span>
                  <br />
                  <span className="font-sans normal-case tracking-normal text-neutral-500">{c.role}</span>
                </p>
              ))}
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 leading-relaxed">
                <span className="text-neutral-700">aurora</span>
                <br />
                <span className="font-sans normal-case tracking-normal text-neutral-500">
                  Marketing moments and brand backdrops only
                </span>
              </p>
            </div>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
              Tap a swatch to copy the hex
            </p>
          </div>
        </section>

        {/* 09 - Usage */}
        <section id="usage" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>08</span>
              <span className="text-neutral-700">Usage · Do &amp; don&apos;t</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200"
            >
              <div className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-700">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                  Do
                </div>
                <ul className="space-y-4">
                  {DOS.map((d) => (
                    <li
                      key={d}
                      className="flex items-baseline gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed"
                    >
                      <span aria-hidden className="text-emerald-500 text-[11px] leading-none translate-y-[1px]">
                        ●
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.25em] text-rose-700">
                  <XIcon className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                  Don&apos;t
                </div>
                <ul className="space-y-4">
                  {DONTS.map((d) => (
                    <li
                      key={d}
                      className="flex items-baseline gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed"
                    >
                      <span aria-hidden className="text-rose-500 text-[11px] leading-none translate-y-[1px]">
                        ●
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 10 - Downloads */}
        <section id="downloads" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>09</span>
              <span className="text-neutral-700">Downloads · Asset library</span>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden ring-1 ring-neutral-200 divide-y divide-neutral-200 bg-white"
            >
              {DOWNLOADS.map((d) => (
                <li key={d.path}>
                  <a
                    href={d.path}
                    download
                    className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-700 shrink-0">
                        <Download className="w-4 h-4" aria-hidden="true" focusable="false" />
                      </span>
                      <span className="text-sm sm:text-base text-neutral-900 font-medium truncate">{d.label}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 group-hover:text-neutral-900 transition-colors shrink-0">
                      {d.format}
                    </span>
                  </a>
                </li>
              ))}
            </motion.ul>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Need SVG, EPS, or a custom lockup? Request from the press contact below.
            </p>
          </div>
        </section>

        {/* 11 - Press */}
        <section id="press" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>10</span>
              <span className="text-neutral-700">Press · Contact</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="rounded-2xl ring-1 ring-neutral-200 bg-neutral-50/60 px-6 sm:px-10 py-12 sm:py-16 text-center"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">
                Press, brand, partnerships
              </p>
              <p className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight mb-6">
                scofield@olyxee.com
              </p>
              <a
                href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 transition-colors"
              >
                Open email
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
              </a>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
    </MotionConfig>
  );
};

export default Brand;
