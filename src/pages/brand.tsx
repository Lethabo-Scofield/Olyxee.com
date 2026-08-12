import { FC, useState, useCallback } from "react";
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

const SECTIONS: { label: string; href: string }[] = [
  { label: "Logos",      href: "#logos" },
  { label: "Clear space", href: "#clear-space" },
  { label: "Products",   href: "#products" },
  { label: "Type",       href: "#type" },
  { label: "Color",      href: "#color" },
  { label: "Voice",      href: "#voice" },
  { label: "Usage",      href: "#usage" },
  { label: "Downloads",  href: "#downloads" },
];

const COLORS = [
  { name: "Ink",         hex: "#0A0A0A", text: "text-white",         role: "Primary text and dark surfaces" },
  { name: "Paper",       hex: "#FFFFFF", text: "text-neutral-900",   role: "Default background", border: true },
  { name: "Mist",        hex: "#F5F5F5", text: "text-neutral-900",   role: "Subtle surfaces", border: true },
  { name: "Slate",       hex: "#737373", text: "text-white",         role: "Secondary text" },
  { name: "Orgni Blue",   hex: "#3B82F6", text: "text-white",         role: "Orgni accent, operational workflows" },
  { name: "Orgni Green", hex: "#10B981", text: "text-white",         role: "Orgni accent, financial operations" },
];

const VOICE = [
  { word: "Calm.",   rule: "Lower the volume. We don't shout to be heard.",      sample: "Reconciles in seconds, not days." },
  { word: "Direct.", rule: "Short sentences. Specific verbs. No filler.",        sample: "Orgni executes operations. Orgni reconciles finance." },
  { word: "Useful.", rule: "Every line carries information. Cut adjectives.",     sample: "Pulls your ledgers. Matches the entries. Files the report." },
];

const DOS = [
  "Use the full Olyxee mark with clear space around it",
  "Keep contrast accessible — dark mark on light, light mark on dark",
  "Use the official color tokens for product accents",
];

const DONTS = [
  "Recolor, stretch, rotate, or add effects to the logo",
  "Place the logo on busy or low-contrast backgrounds",
  "Recreate the wordmark in another typeface",
];

const DOWNLOADS = [
  { label: "Olyxee mark · Light",     path: "/Logo/Olyxee-White-Logo.png",  format: "PNG" },
  { label: "Olyxee mark · Dark",      path: "/Logo/Olyxee-Black-Logo.png",  format: "PNG" },
  { label: "Olyxee Robotics · Wave",  path: "/brand/robotics-logo.png",     format: "PNG" },
  { label: "Orgni mark",              path: "/images/orgni-logo.png",          format: "PNG" },
  { label: "Orgni · Financial operations mark",      path: "/images/orgni-finance-logo.png",  format: "PNG" },
  { label: "Orgni · Operational workflows mark",    path: "/images/orgni-workflow-logo.png", format: "PNG" },
  { label: "Olyxee Logistics mark",         path: "/images/order-loop-logo.png",     format: "PNG" },
];

function BrandAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 right-0 h-[120%] w-[70%] sm:w-[55%] lg:w-[45%] overflow-visible"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="brand-aurora-warm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#818cf8" />
            <stop offset="50%"  stopColor="#a855f7" />
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
          <path d="M 660,-40 C 480,180 360,360 380,560 C 400,720 540,820 700,780 C 840,740 860,540 820,360 C 780,200 740,80 660,-40 Z" fill="url(#brand-aurora-cool)" opacity="0.45" />
          <path d="M 580,-20 C 460,160 380,340 460,520 C 540,680 700,720 800,580 C 880,460 880,300 820,180 C 760,80 660,20 580,-20 Z" fill="url(#brand-aurora-warm)" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

/* Clear-space diagram */
const ClearSpace: FC = () => (
  <div className="relative w-full max-w-sm mx-auto">
    <div className="relative aspect-square border border-dashed border-neutral-300 p-[18%] bg-neutral-50">
      <div className="relative w-full h-full bg-white ring-1 ring-neutral-200 flex items-center justify-center">
        <Image src="/Logo/Olyxee-White-Logo.png" alt="Olyxee mark with minimum clear space" width={200} height={200} className="w-2/3 h-auto object-contain" />
      </div>
      <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      <span className="absolute top-1/2 left-1 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
      <span className="absolute top-1/2 right-1 -translate-y-1/2 rotate-90 origin-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">0.25x</span>
    </div>
  </div>
);

/* Color swatch with click-to-copy */
const ColorSwatch: FC<{ name: string; hex: string; text: string; border?: boolean }> = ({ name, hex, text, border }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hex);
        ok = true;
      }
    } catch { ok = false; }
    if (!ok && typeof document !== "undefined") {
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
      } catch { ok = false; }
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
      className={`group relative flex flex-col justify-end aspect-[3/4] sm:aspect-[2/3] p-4 sm:p-5 text-left ${text} ${border ? "ring-1 ring-inset ring-neutral-200" : ""} focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70`}
      style={{ backgroundColor: hex }}
    >
      <span className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </span>
      <p className="font-serif text-xl sm:text-2xl tracking-tight leading-none mb-2">{name}</p>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">{copied ? "Copied" : hex}</p>
    </button>
  );
};

/* Section header strip: tiny number + label */
const SectionHead: FC<{ num: string; label: string }> = ({ num, label }) => (
  <div className="flex items-center justify-between py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
    <span aria-hidden="true">{num}</span>
    <h2 className="text-neutral-700 font-mono text-[10px] uppercase tracking-[0.28em] font-normal">{label}</h2>
  </div>
);

const Brand: FC = () => {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Brand Guidelines"
        description="Olyxee brand guidelines: logos for Olyxee, Orgni, and Olyxee Logistics, plus color, typography, and usage rules. Download official assets."
        path="/brand"
        keywords={["Olyxee brand", "Olyxee logo", "Orgni logo", "Olyxee Logistics logo", "Olyxee press kit"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Olyxee Brand Guidelines",
          url: "https://olyxee.com/brand",
          description: "Official Olyxee brand guidelines: logos, color, typography, and usage rules.",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <BrandAurora />
        <div className="relative max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-7xl lg:text-[6.5rem] text-neutral-900 tracking-tight leading-[1.02]"
          >
            Brand <em className="not-italic text-neutral-900">Guidelines</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 max-w-2xl text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed"
          >
            How Olyxee looks, sounds, and behaves. The marks, the colors, the type, and the tone of voice that hold the system together.
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
                className="inline-flex items-center rounded-full bg-white/70 backdrop-blur-sm ring-1 ring-neutral-900/10 hover:ring-neutral-900/30 hover:bg-white text-neutral-800 text-xs font-mono uppercase tracking-[0.2em] px-3.5 py-1.5 transition-all"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="pb-12">
        {/* === 01 · LOGOS === */}
        <motion.section
          id="logos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="01" label="Logo · Light & dark" />
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80">
              <div className="relative bg-neutral-50 min-h-[320px] sm:min-h-[420px] flex items-center justify-center px-6 py-16 sm:py-20">
                <Image src="/Logo/Olyxee-White-Logo.png" alt="Olyxee mark on light" width={320} height={320} className="w-32 sm:w-44 lg:w-52 h-auto object-contain" priority />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">Light</span>
              </div>
              <div className="relative bg-neutral-950 min-h-[320px] sm:min-h-[420px] flex items-center justify-center px-6 py-16 sm:py-20">
                <Image src="/Logo/Olyxee-Black-Logo.png" alt="Olyxee mark on dark" width={320} height={320} className="w-32 sm:w-44 lg:w-52 h-auto object-contain" />
                <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60">Dark</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              <a href="/Logo/Olyxee-White-Logo.png" download className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors">
                Light PNG <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="/Logo/Olyxee-Black-Logo.png" download className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 transition-colors">
                Dark PNG <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* === 02 · CLEAR SPACE === */}
        <motion.section
          id="clear-space"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="02" label="Clear space · The 0.25x rule" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-white">
              <div className="lg:col-span-3 p-6 sm:p-12 lg:p-14 flex items-center justify-center bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-200/80">
                <ClearSpace />
              </div>
              <div className="lg:col-span-2 p-6 sm:p-10 flex flex-col justify-center">
                <p className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug tracking-tight mb-4">
                  Leave at least <em className="not-italic text-neutral-900 font-medium">0.25x</em> of clear space on every side.
                </p>
                <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                  Where x is the width of one construction circle. Nothing else enters this zone.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg ring-1 ring-neutral-200 px-3 py-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">Min digital</p>
                    <p className="text-neutral-900 text-sm">24 px</p>
                  </div>
                  <div className="rounded-lg ring-1 ring-neutral-200 px-3 py-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">Min print</p>
                    <p className="text-neutral-900 text-sm">8 mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === 03 · PRODUCT MARKS === */}
        <motion.section
          id="products"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="03" label="Product marks · Orgni, Olyxee Logistics & Olyxee Robotics" />
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-neutral-50">
              <div className="relative min-h-[300px] sm:min-h-[360px] flex flex-col items-center justify-center px-6 py-14 border-b sm:border-r border-neutral-200/80">
                <Image src="/images/orgni-logo.png" alt="Orgni product mark" width={400} height={400} className="w-44 sm:w-52 lg:w-60 h-auto object-contain mb-8 rounded-xl" />
                <div className="text-center">
                  <p className="text-sm text-neutral-700 font-medium">Orgni</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mt-1">Core platform</p>
                </div>
                <a href="/images/orgni-logo.png" download className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors">
                  PNG <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="relative min-h-[300px] sm:min-h-[360px] flex flex-col items-center justify-center px-6 py-14 border-b border-neutral-200/80">
                <Image src="/images/order-loop-logo.png" alt="Olyxee Logistics product mark" width={400} height={400} className="w-44 sm:w-52 lg:w-60 h-auto object-contain mb-8 rounded-xl" />
                <div className="text-center">
                  <p className="text-sm text-neutral-700 font-medium">Olyxee Logistics</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mt-1">Logistics</p>
                </div>
                <a href="/images/order-loop-logo.png" download className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors">
                  PNG <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="relative min-h-[300px] sm:min-h-[360px] flex flex-col items-center justify-center px-6 py-14 border-b sm:border-b-0 sm:border-r border-neutral-200/80">
                <Image src="/images/orgni-finance-logo.png" alt="Orgni financial operations mark" width={320} height={320} className="w-28 sm:w-32 lg:w-36 h-auto object-contain mb-8" />
                <div className="text-center">
                  <p className="text-sm text-neutral-700 font-medium">Orgni · Financial operations</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mt-1">#10B981 · Financial operations</p>
                </div>
                <a href="/images/orgni-finance-logo.png" download className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors">
                  PNG <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="relative min-h-[300px] sm:min-h-[360px] flex flex-col items-center justify-center px-6 py-14">
                <Image src="/images/orgni-workflow-logo.png" alt="Orgni operational workflows mark" width={320} height={320} className="w-28 sm:w-32 lg:w-36 h-auto object-contain mb-8" />
                <div className="text-center">
                  <p className="text-sm text-neutral-700 font-medium">Orgni · Operational workflows</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mt-1">Operational workflows</p>
                </div>
                <a href="/images/orgni-workflow-logo.png" download className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors">
                  PNG <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Olyxee Robotics, compact row */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 bg-white items-center">
              <div className="flex items-center gap-6 sm:gap-10 px-6 sm:px-10 py-8 sm:py-10">
                <Image src="/brand/robotics-logo.png" alt="Olyxee Robotics wave mark" width={200} height={200} className="w-16 sm:w-20 h-auto object-contain shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-neutral-900 font-medium">Olyxee Robotics</p>
                  <p className="text-xs text-neutral-500 font-normal mt-1 leading-relaxed">
                    Divisional wave mark for hardware and embodied AI surfaces. Use on robotics-product surfaces only.
                  </p>
                </div>
              </div>
              <a href="/brand/robotics-logo.png" download className="px-6 sm:px-10 py-5 md:py-8 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors border-t md:border-t-0 md:border-l border-neutral-200/80 inline-flex items-center gap-1.5 justify-center md:justify-start">
                Download PNG <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* === 04 · TYPOGRAPHY === */}
        <motion.section
          id="type"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="04" label="Type · Three roles" />
            <div className="rounded-2xl ring-1 ring-neutral-200/80 overflow-hidden bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
                <div className="p-8 sm:p-10 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">Display</p>
                  <p className="font-serif text-6xl sm:text-7xl text-neutral-900 leading-none tracking-tight mb-6">Aa</p>
                  <p className="font-serif text-xl text-neutral-900 mb-1">Editorial serif</p>
                  <p className="text-sm text-neutral-500 font-normal">Headlines and editorial moments.</p>
                </div>
                <div className="p-8 sm:p-10 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">Body</p>
                  <p className="text-6xl sm:text-7xl font-normal text-neutral-900 leading-none tracking-tight mb-6">Aa</p>
                  <p className="text-xl font-normal text-neutral-900 mb-1">Neutral sans</p>
                  <p className="text-sm text-neutral-500 font-normal">UI text, body copy, product surfaces.</p>
                </div>
                <div className="p-8 sm:p-10 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">Detail</p>
                  <p className="font-mono text-5xl sm:text-6xl text-neutral-900 leading-none tracking-tight mb-6">Aa</p>
                  <p className="font-mono text-lg text-neutral-900 mb-1">Monospace</p>
                  <p className="text-sm text-neutral-500 font-normal">Labels, metadata, and code.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === 05 · COLOR === */}
        <motion.section
          id="color"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="05" label="Color · Tap to copy" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80">
              {COLORS.map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-4 gap-y-2 py-4">
              {COLORS.map((c) => (
                <p key={c.name} className="text-xs text-neutral-500 font-normal leading-snug">
                  <span className="text-neutral-800">{c.name}</span> · {c.role}
                </p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* === 06 · VOICE === */}
        <motion.section
          id="voice"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="06" label="Voice · How we sound" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
              {VOICE.map((v) => (
                <div key={v.word} className="bg-white p-8 sm:p-10 flex flex-col">
                  <p className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 leading-none mb-5">{v.word}</p>
                  <p className="text-sm text-neutral-600 font-normal leading-relaxed mb-6">{v.rule}</p>
                  <p className="mt-auto pt-5 border-t border-neutral-200 font-serif text-base sm:text-lg text-neutral-900 leading-snug italic">
                    &ldquo;{v.sample}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* === 07 · USAGE === */}
        <motion.section
          id="usage"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="07" label="Usage · Do & don't" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
              <div className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-700">
                  <Check className="w-3.5 h-3.5" /> Do
                </div>
                <ul className="space-y-4">
                  {DOS.map((d) => (
                    <li key={d} className="flex items-baseline gap-3 text-sm sm:text-base text-neutral-700 font-normal leading-relaxed">
                      <span aria-hidden className="text-emerald-500 text-[11px] leading-none translate-y-[1px]">●</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.25em] text-rose-700">
                  <XIcon className="w-3.5 h-3.5" /> Don&apos;t
                </div>
                <ul className="space-y-4">
                  {DONTS.map((d) => (
                    <li key={d} className="flex items-baseline gap-3 text-sm sm:text-base text-neutral-700 font-normal leading-relaxed">
                      <span aria-hidden className="text-rose-500 text-[11px] leading-none translate-y-[1px]">●</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === 08 · DOWNLOADS === */}
        <motion.section
          id="downloads"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead num="08" label="Downloads · Asset library" />
            <ul className="rounded-2xl overflow-hidden ring-1 ring-neutral-200 divide-y divide-neutral-200 bg-white">
              {DOWNLOADS.map((d) => (
                <li key={d.path}>
                  <a href={d.path} download className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-700 shrink-0">
                        <Download className="w-4 h-4" />
                      </span>
                      <span className="text-sm sm:text-base text-neutral-900 font-medium truncate">{d.label}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 group-hover:text-neutral-900 transition-colors shrink-0">{d.format}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Need SVG, EPS, or a custom lockup? Email press below.
            </p>
          </div>
        </motion.section>

        {/* === PRESS === */}
        <motion.section
          id="press"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="border-t border-neutral-200 scroll-mt-24 mt-4"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl ring-1 ring-neutral-200 bg-neutral-50/60 px-6 sm:px-10 py-12 sm:py-16 text-center mt-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">Press, brand, partnerships</p>
              <p className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight mb-6">info@olyxee.com</p>
              <a
                href="mailto:info@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 transition-colors"
              >
                Open email <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
    </MotionConfig>
  );
};

export default Brand;
