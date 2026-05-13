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
  { label: "Logos",         href: "#logos" },
  { label: "Construction",  href: "#construction" },
  { label: "Clear space",   href: "#clear-space" },
  { label: "Tonal",         href: "#tonal" },
  { label: "Divisional",    href: "#divisional" },
  { label: "Type",          href: "#typography" },
  { label: "Voice",         href: "#voice" },
  { label: "Color",         href: "#color" },
  { label: "Usage",         href: "#usage" },
  { label: "Downloads",     href: "#downloads" },
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
  { label: "Olyxee mark · Tonal frame", path: "/brand/olyxee-logo-darkframe.png", format: "PNG" },
  { label: "Olyxee Robotics · Wave mark", path: "/brand/robotics-logo.png", format: "PNG" },
  { label: "Logo construction · Draft", path: "/brand/logo-design-draft.png", format: "PNG" },
  { label: "Ordo mark", path: "/images/ordo-logo.png", format: "PNG" },
  { label: "Addup wordmark", path: "/images/addup-logo.png", format: "PNG" },
];

/* === Logo construction blueprint: real measurements from the design draft === */
const LogoConstruction: FC = () => {
  // unit: x = 4px → 120x = 480px, center at (300, 300), padding for labels
  const cx = 300, cy = 300;
  const Rout = 240;   // 120x / 2
  const Rin = 180;    // 90x  / 2
  const Rtop = 60;    // 30x  / 2  → center y = cy - (Rin - Rtop) = 300 - 120 = 180
  const Rbot = 90;    // 45x  / 2  → center y ≈ cy + 30
  const topCY = cy - (Rin - Rtop);     // 180
  const botCY = cy + 30;
  const Rside = 150;  // 75x  / 2 (illustrative side arcs)

  const dash = "6 6";
  const axis = "#a3a3a3";
  const ink  = "#0a0a0a";
  const dim  = "#737373";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
      {/* Left · original draft photograph */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-[#efe8d6] border-b lg:border-b-0 lg:border-r border-neutral-200/80 flex items-center justify-center overflow-hidden">
        <Image
          src="/brand/logo-design-draft.png"
          alt="Original Olyxee logo construction draft, hand-drawn on paper with dimensions"
          fill
          className="object-contain p-4 sm:p-8"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-700/70">
          Original draft · 24/05/2024
        </span>
      </div>

      {/* Right · clean construction diagram with real measurements */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-white p-4 sm:p-8 flex items-center justify-center">
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full"
          aria-label="Olyxee mark geometric construction diagram with measurements"
          role="img"
        >
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={dim} />
            </marker>
          </defs>

          {/* Cross axes */}
          <line x1={cx} y1={cy - Rout - 30} x2={cx} y2={cy + Rout + 30} stroke={axis} strokeWidth="0.75" strokeDasharray={dash} />
          <line x1={cx - Rout - 30} y1={cy} x2={cx + Rout + 30} y2={cy} stroke={axis} strokeWidth="0.75" strokeDasharray={dash} />

          {/* Outer boundary 120x */}
          <circle cx={cx} cy={cy} r={Rout} fill="none" stroke={axis} strokeWidth="1" strokeDasharray={dash} />
          {/* Inner guide 90x */}
          <circle cx={cx} cy={cy} r={Rin} fill="none" stroke={axis} strokeWidth="0.75" strokeDasharray="3 4" />

          {/* Construction circles filled in ink */}
          <circle cx={cx} cy={topCY} r={Rtop} fill={ink} opacity="0.92" />
          <circle cx={cx} cy={botCY} r={Rbot} fill={ink} opacity="0.92" />

          {/* Side arc guides (75x circles, symmetrical) */}
          <circle cx={cx - 90} cy={cy} r={Rside} fill="none" stroke={ink} strokeWidth="1.25" opacity="0.55" />
          <circle cx={cx + 90} cy={cy} r={Rside} fill="none" stroke={ink} strokeWidth="1.25" opacity="0.55" />

          {/* Tangency dots */}
          {[
            [cx, cy - Rout],
            [cx, cy + Rout],
            [cx - Rout, cy],
            [cx + Rout, cy],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.5} fill={ink} />
          ))}

          {/* TOP dimension · 120x */}
          <g>
            <line x1={cx - Rout} y1={45} x2={cx + Rout} y2={45} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={cx - Rout} y1={40} x2={cx - Rout} y2={cy - Rout} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <line x1={cx + Rout} y1={40} x2={cx + Rout} y2={cy - Rout} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <text x={cx} y={36} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="2">120x</text>
          </g>

          {/* RIGHT dimension · 37.5x + 37.5x = 120x */}
          <g>
            <line x1={555} y1={cy - Rout} x2={555} y2={cy} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={555} y1={cy} x2={555} y2={cy + Rout} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={cx + Rout} y1={cy - Rout} x2={560} y2={cy - Rout} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <line x1={cx + Rout} y1={cy} x2={560} y2={cy} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <line x1={cx + Rout} y1={cy + Rout} x2={560} y2={cy + Rout} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <text x={550} y={cy - Rout / 2 + 4} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="1.5">37.5x</text>
            <text x={550} y={cy + Rout / 2 + 4} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="1.5">37.5x</text>
            {/* Outer 120x bracket */}
            <line x1={580} y1={cy - Rout} x2={580} y2={cy + Rout} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <text x={595} y={cy + 4} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="2" transform={`rotate(90 595 ${cy})`}>120x</text>
          </g>

          {/* BOTTOM dimension · 37.5x | 45x | 37.5x */}
          <g>
            <line x1={cx - Rout} y1={555} x2={cx - Rbot} y2={555} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={cx - Rbot} y1={555} x2={cx + Rbot} y2={555} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={cx + Rbot} y1={555} x2={cx + Rout} y2={555} stroke={dim} strokeWidth="0.75" markerStart="url(#arr)" markerEnd="url(#arr)" />
            <line x1={cx - Rbot} y1={cy + Rout} x2={cx - Rbot} y2={560} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <line x1={cx + Rbot} y1={cy + Rout} x2={cx + Rbot} y2={560} stroke={dim} strokeWidth="0.5" strokeDasharray="2 3" />
            <text x={(cx - Rout + cx - Rbot) / 2} y={573} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="1.5">37.5x</text>
            <text x={cx} y={573} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="1.5">45x</text>
            <text x={(cx + Rout + cx + Rbot) / 2} y={573} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink} letterSpacing="1.5">37.5x</text>
          </g>

          {/* Inner-circle radial label */}
          <text x={cx + Rin * 0.7} y={cy - Rin * 0.7 - 6} fontSize="10" fontFamily="ui-monospace, monospace" fill={dim} letterSpacing="1.2">90x guide</text>
          <text x={cx - 18} y={topCY + 4} fontSize="10" fontFamily="ui-monospace, monospace" fill="#ffffff" letterSpacing="1.2">30x</text>
          <text x={cx - 12} y={botCY + 5} fontSize="11" fontFamily="ui-monospace, monospace" fill="#ffffff" letterSpacing="1.5">45x</text>
        </svg>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
          x = 1 unit · scales proportionally
        </span>
      </div>
    </div>
  );
};

/* === Geometry breakdown: structured spec rows === */
const GEOMETRY = [
  { label: "Outer boundary", value: "120x", note: "Defines the safe boundary circle." },
  { label: "Inner guide",    value: "90x",  note: "Anchors the inner shapes." },
  { label: "Top circle",     value: "30x",  note: "Centered on the vertical axis." },
  { label: "Bottom circle",  value: "45x",  note: "Centered on the vertical axis." },
  { label: "Side arcs",      value: "75x",  note: "Symmetrical, tangent to inner guide." },
  { label: "Clear space",    value: "0.25x", note: "Minimum padding on all four sides." },
];

/* === Clear space spec === */
const ClearSpace: FC = () => (
  <div className="relative w-full max-w-md mx-auto">
    {/* dashed clear-space frame */}
    <div className="relative aspect-square border border-dashed border-neutral-300 p-[18%] bg-neutral-50">
      <div className="relative w-full h-full bg-white ring-1 ring-neutral-200 flex items-center justify-center">
        <Image
          src="/Logo/Olyxee_Logo.png"
          alt="Olyxee mark with minimum clear space"
          width={200}
          height={200}
          className="w-2/3 h-auto object-contain"
        />
      </div>

      {/* Top label */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      {/* Bottom label */}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      {/* Left label */}
      <span className="absolute top-1/2 left-1 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      {/* Right label */}
      <span className="absolute top-1/2 right-1 -translate-y-1/2 rotate-90 origin-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
    </div>
    <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
      Minimum clear space = 0.25x on every side
    </p>
  </div>
);

/* === Tonal range card === */
const TONAL = [
  { name: "Dark shade",  hex: "#0A0A0A", desc: "Primary mark on light surfaces." },
  { name: "Mid shade",   hex: "#262626", desc: "Inner relief, depth, subtle layering." },
  { name: "Light shade", hex: "#404040", desc: "Highlights and tonal separation." },
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

        {/* 02 - Construction */}
        <motion.section
          id="construction"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>02</span>
              <span className="text-neutral-700">Construction · Geometry &amp; ratios</span>
            </div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-white">
              <LogoConstruction />
            </div>

            {/* Geometry breakdown spec rows */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
              <div className="bg-white p-6 sm:p-8 lg:col-span-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">Notes</p>
                <ul className="space-y-2.5 text-sm text-neutral-700 font-light leading-relaxed">
                  <li>· All elements centered on the main axis.</li>
                  <li>· Curves are tangent to each other.</li>
                  <li>· Symmetrical along the vertical axis.</li>
                  <li>· Balanced visual weight across shapes.</li>
                  <li>· Scalable, minimal, optical-first.</li>
                </ul>
              </div>
              <div className="bg-white p-6 sm:p-8 lg:col-span-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">Geometry breakdown</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {GEOMETRY.map((g) => (
                    <div key={g.label} className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-2.5">
                      <span className="text-sm text-neutral-700 font-light">{g.label}</span>
                      <span className="font-mono text-[13px] tracking-wider text-neutral-900">{g.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  x = unit of measurement · example: if 120x = 120mm, then x = 1mm
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 03 - Clear space */}
        <motion.section
          id="clear-space"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>03</span>
              <span className="text-neutral-700">Clear space · Breathing room</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-white">
              <div className="lg:col-span-3 p-6 sm:p-12 lg:p-16 flex items-center justify-center bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-200/80">
                <ClearSpace />
              </div>
              <div className="lg:col-span-2 p-6 sm:p-10 flex flex-col justify-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">The 0.25x rule</p>
                <p className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-5">
                  Always leave at least <em className="not-italic text-orange-500">0.25x</em> of clear space on every side of the mark.
                </p>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Where x is the unit of measurement (typically the width of one construction circle). Never let other elements, type, or imagery enter the clear-space zone.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] font-mono uppercase tracking-[0.25em]">
                  <div className="rounded-lg ring-1 ring-neutral-200 px-3 py-3">
                    <p className="text-neutral-500 mb-1">Min digital size</p>
                    <p className="text-neutral-900 normal-case tracking-normal font-sans text-sm">24 px</p>
                  </div>
                  <div className="rounded-lg ring-1 ring-neutral-200 px-3 py-3">
                    <p className="text-neutral-500 mb-1">Min print size</p>
                    <p className="text-neutral-900 normal-case tracking-normal font-sans text-sm">8 mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 04 - Tonal range */}
        <motion.section
          id="tonal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>04</span>
              <span className="text-neutral-700">Tonal range · Three shades</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80">
              <div className="relative lg:col-span-3 aspect-square lg:aspect-auto bg-neutral-950 min-h-[320px]">
                <Image
                  src="/brand/olyxee-logo-darkframe.png"
                  alt="Olyxee mark in tonal dark study"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60">
                  Tonal study · ink on ink
                </span>
              </div>
              <div className="lg:col-span-2 bg-white p-6 sm:p-10 flex flex-col">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">Layered tonality</p>
                <p className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-6">
                  Three shades give the mark its depth without adding color.
                </p>
                <div className="space-y-3">
                  {TONAL.map((t) => (
                    <div key={t.name} className="flex items-center gap-4 ring-1 ring-neutral-200 rounded-xl p-3">
                      <span
                        className="w-10 h-10 rounded-lg ring-1 ring-black/10 shrink-0"
                        style={{ backgroundColor: t.hex }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-neutral-900 font-medium">{t.name}</p>
                        <p className="text-xs text-neutral-500 font-light">{t.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500">{t.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 05 - Divisional marks · Olyxee Robotics */}
        <motion.section
          id="divisional"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>05</span>
              <span className="text-neutral-700">Divisional marks · Olyxee Robotics</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-white">
              <div className="lg:col-span-3 relative bg-neutral-50 min-h-[360px] sm:min-h-[460px] flex items-center justify-center p-10 sm:p-16 border-b lg:border-b-0 lg:border-r border-neutral-200/80">
                <Image
                  src="/brand/robotics-logo.png"
                  alt="Olyxee Robotics divisional wave mark"
                  width={420}
                  height={420}
                  className="w-44 sm:w-60 lg:w-72 h-auto object-contain drop-shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
                />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  Olyxee Robotics · Wave mark
                </span>
              </div>
              <div className="lg:col-span-2 p-6 sm:p-10 flex flex-col">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">Divisional identity</p>
                <p className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-5">
                  Olyxee Robotics carries its own mark for hardware and embodied AI surfaces.
                </p>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  Layered waves in four blue tones evoke perception, motion, and depth. Use only on robotics-product surfaces &mdash; never as a substitute for the Olyxee corporate mark.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {["#BFDCEB", "#5C9DCB", "#1F5E92", "#0E2C4F"].map((hex) => (
                    <div key={hex} className="text-center">
                      <div className="aspect-square rounded-lg ring-1 ring-black/5" style={{ backgroundColor: hex }} aria-hidden />
                      <p className="mt-2 text-[9px] font-mono tracking-[0.15em] text-neutral-500">{hex}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="/brand/robotics-logo.png"
                  download
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-neutral-700 hover:text-neutral-900 transition-colors w-fit"
                >
                  Download wave mark
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" focusable="false" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 06 - Ordo */}
        <Plate
          num="06"
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

        {/* 07 - Addup */}
        <Plate
          num="07"
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

        {/* 08 - Lockup */}
        <Plate
          num="08"
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

        {/* 09 - Typography */}
        <Plate id="typography" num="09" name="Type · Editorial Serif" bg="bg-white" borderless>
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
              <span>10</span>
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
              <span>11</span>
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
              <span>12</span>
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
              <span>13</span>
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
              <span>14</span>
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
