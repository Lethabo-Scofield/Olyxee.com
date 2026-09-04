import { FC, useState, useCallback } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const SECTIONS: { label: string; href: string }[] = [
  { label: "Logo", href: "#logos" },
  { label: "Clear space", href: "#clear-space" },
  { label: "Products", href: "#products" },
  { label: "Type", href: "#type" },
  { label: "Color", href: "#color" },
  { label: "Usage", href: "#usage" },
  { label: "Downloads", href: "#downloads" },
];

const COLORS = [
  { name: "Ink", hex: "#0A0A0A", text: "text-white", role: "Primary text and dark surfaces" },
  { name: "Paper", hex: "#FFFFFF", text: "text-neutral-900", role: "Default background", border: true },
  { name: "Mist", hex: "#F5F5F7", text: "text-neutral-900", role: "Page canvas and subtle surfaces", border: true },
  { name: "Slate", hex: "#737373", text: "text-white", role: "Secondary text" },
  { name: "Orgni Blue", hex: "#3B82F6", text: "text-white", role: "Orgni accent, used sparingly" },
];

const DOS = [
  "Use the full Olyxee mark with clear space around it.",
  "Keep contrast accessible: dark mark on light, light mark on dark.",
  "Use the official color tokens for product accents.",
];

const DONTS = [
  "Recolor, stretch, rotate, or add effects to the logo.",
  "Place the logo on busy or low-contrast backgrounds.",
  "Recreate the wordmark in another typeface.",
];

const DOWNLOADS = [
  { label: "Olyxee mark, light", path: "/Logo/Olyxee-White-Logo.png", format: "PNG" },
  { label: "Olyxee mark, dark", path: "/Logo/Olyxee-Black-Logo.png", format: "PNG" },
  { label: "Orgni mark", path: "/images/orgni-logo.png", format: "PNG" },
  { label: "Olyxee Logistics mark", path: "/images/order-loop-logo.png", format: "PNG" },
];

/* Clear-space diagram */
const ClearSpace: FC = () => (
  <div className="relative w-full max-w-xs mx-auto">
    <div className="relative aspect-square rounded-2xl border border-dashed border-neutral-300 p-[18%]">
      <div className="relative w-full h-full rounded-xl bg-white ring-1 ring-neutral-200 flex items-center justify-center">
        <Image src="/Logo/Olyxee-White-Logo.png" alt="Olyxee mark with minimum clear space" width={200} height={200} className="w-2/3 h-auto object-contain" />
      </div>
      {["top-2 left-1/2 -translate-x-1/2", "bottom-2 left-1/2 -translate-x-1/2", "top-1/2 left-2 -translate-y-1/2", "top-1/2 right-2 -translate-y-1/2"].map((pos) => (
        <span key={pos} className={`absolute ${pos} text-[11px] font-medium text-neutral-400`}>0.25x</span>
      ))}
    </div>
  </div>
);

/* Color swatch with click-to-copy */
const ColorSwatch: FC<{ name: string; hex: string; text: string; role: string; border?: boolean }> = ({ name, hex, text, role, border }) => {
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
      className="group text-left rounded-2xl bg-white ring-1 ring-black/[0.06] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70 transition-transform hover:-translate-y-0.5"
    >
      <div
        className={`relative aspect-[4/3] flex items-end p-4 ${text} ${border ? "ring-1 ring-inset ring-black/[0.06]" : ""}`}
        style={{ backgroundColor: hex }}
      >
        <span className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </span>
        <span className="text-[13px] font-medium tabular-nums opacity-90">{copied ? "Copied" : hex}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-[15px] font-semibold text-neutral-900">{name}</p>
        <p className="text-[13px] text-neutral-500 leading-snug">{role}</p>
      </div>
    </button>
  );
};

/* Section header: title + short description */
const SectionHead: FC<{ id: string; title: string; note?: string }> = ({ id, title, note }) => (
  <div id={id} className="scroll-mt-28 mb-6 sm:mb-8">
    <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-tight text-neutral-900">{title}</h2>
    {note && <p className="mt-1.5 text-[15px] text-neutral-500 max-w-xl">{note}</p>}
  </div>
);

const Section: FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUp}
    className="py-12 sm:py-16"
  >
    <div className="max-w-6xl mx-auto px-5 sm:px-8">{children}</div>
  </motion.section>
);

const Card: FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-3xl bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>{children}</div>
);

const Brand: FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F5F7] text-neutral-900">
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
        <Header />

        {/* Hero */}
        <section className="pt-36 sm:pt-44 pb-10 sm:pb-14">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[44px] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.03em] leading-[1.02] text-neutral-900"
            >
              Brand Guidelines
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 max-w-xl text-[17px] sm:text-[19px] text-neutral-500 leading-relaxed"
            >
              The marks, colors, and type that hold Olyxee together, and how to use them.
            </motion.p>
            <motion.nav
              aria-label="On this page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-8 inline-flex flex-wrap gap-1 rounded-full bg-black/[0.05] p-1"
            >
              {SECTIONS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-neutral-700 hover:bg-white hover:text-neutral-900 hover:shadow-sm transition-all"
                >
                  {s.label}
                </a>
              ))}
            </motion.nav>
          </div>
        </section>

        {/* Logo */}
        <Section>
          <SectionHead id="logos" title="Logo" note="One mark, two versions. Use the light version on white and grey, the dark version on black." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center relative">
              <Image src="/Logo/Olyxee-White-Logo.png" alt="Olyxee mark on light" width={320} height={320} className="w-32 sm:w-44 h-auto object-contain" priority />
              <span className="absolute bottom-4 left-5 text-[13px] font-medium text-neutral-400">Light</span>
            </Card>
            <div className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center rounded-3xl bg-neutral-950">
              <Image src="/Logo/Olyxee-Black-Logo.png" alt="Olyxee mark on dark" width={320} height={320} className="w-32 sm:w-44 h-auto object-contain" />
              <span className="absolute bottom-4 left-5 text-[13px] font-medium text-white/50">Dark</span>
            </div>
          </div>
        </Section>

        {/* Clear space */}
        <Section>
          <SectionHead id="clear-space" title="Clear space" />
          <Card className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            <div className="p-8 sm:p-12 flex items-center justify-center bg-[#FAFAFB] lg:rounded-l-3xl">
              <ClearSpace />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <p className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-neutral-900 leading-snug">
                Leave at least 0.25x of clear space on every side.
              </p>
              <p className="mt-3 text-[15px] text-neutral-500 leading-relaxed">
                Where x is the width of the mark. Nothing else enters this zone.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#F5F5F7] px-4 py-3.5">
                  <dt className="text-[13px] text-neutral-500">Minimum on screen</dt>
                  <dd className="mt-0.5 text-[17px] font-semibold text-neutral-900">24 px</dd>
                </div>
                <div className="rounded-2xl bg-[#F5F5F7] px-4 py-3.5">
                  <dt className="text-[13px] text-neutral-500">Minimum in print</dt>
                  <dd className="mt-0.5 text-[17px] font-semibold text-neutral-900">8 mm</dd>
                </div>
              </dl>
            </div>
          </Card>
        </Section>

        {/* Product marks */}
        <Section>
          <SectionHead id="products" title="Product marks" note="Orgni and Olyxee Logistics each carry their own mark. They always sit alongside, never replace, the Olyxee mark." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { src: "/images/orgni-logo.png", name: "Orgni", role: "Operational intelligence" },
              { src: "/images/order-loop-logo.png", name: "Olyxee Logistics", role: "Logistics operations" },
            ].map((p) => (
              <Card key={p.name} className="p-8 sm:p-10 flex flex-col items-center text-center">
                <Image src={p.src} alt={`${p.name} product mark`} width={400} height={400} className="w-36 sm:w-44 h-auto object-contain rounded-2xl mb-6" />
                <p className="text-[17px] font-semibold text-neutral-900">{p.name}</p>
                <p className="text-[13px] text-neutral-500 mt-0.5">{p.role}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Type */}
        <Section>
          <SectionHead id="type" title="Type" note="Three roles, one neutral system." />
          <Card className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.06] overflow-hidden">
            {[
              { label: "Display", sample: "Aa", cls: "font-serif", name: "Editorial serif", use: "Headlines and editorial moments." },
              { label: "Body", sample: "Aa", cls: "", name: "Neutral sans", use: "Interface text, body copy, product surfaces." },
              { label: "Detail", sample: "Aa", cls: "font-mono", name: "Monospace", use: "Labels, metadata, and code." },
            ].map((t) => (
              <div key={t.label} className="p-8 sm:p-10">
                <p className="text-[13px] font-medium text-neutral-500">{t.label}</p>
                <p className={`${t.cls} text-[64px] sm:text-[72px] leading-none tracking-tight text-neutral-900 mt-5 mb-6`}>{t.sample}</p>
                <p className={`${t.cls} text-[17px] text-neutral-900`}>{t.name}</p>
                <p className="text-[14px] text-neutral-500 mt-1">{t.use}</p>
              </div>
            ))}
          </Card>
        </Section>

        {/* Color */}
        <Section>
          <SectionHead id="color" title="Color" note="Mostly white and grey. One accent, used sparingly. Tap a swatch to copy its value." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COLORS.map((c) => (
              <ColorSwatch key={c.name} {...c} />
            ))}
          </div>
        </Section>

        {/* Usage */}
        <Section>
          <SectionHead id="usage" title="Usage" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-8 sm:p-10">
              <p className="text-[15px] font-semibold text-neutral-900 mb-5">Do</p>
              <ul className="space-y-3.5">
                {DOS.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-neutral-700 leading-relaxed">
                    <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-8 sm:p-10">
              <p className="text-[15px] font-semibold text-neutral-900 mb-5">Don&apos;t</p>
              <ul className="space-y-3.5">
                {DONTS.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-neutral-700 leading-relaxed">
                    <span className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 text-[12px] font-bold leading-none">
                      &times;
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* Downloads */}
        <Section>
          <SectionHead id="downloads" title="Downloads" />
          <Card className="overflow-hidden">
            <ul className="divide-y divide-black/[0.06]">
              {DOWNLOADS.map((d) => (
                <li key={d.path}>
                  <a href={d.path} download className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-4 hover:bg-[#FAFAFB] transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5F5F7] text-neutral-700 shrink-0">
                        <Download className="w-4 h-4" />
                      </span>
                      <span className="text-[15px] text-neutral-900 font-medium truncate">{d.label}</span>
                    </div>
                    <span className="text-[13px] text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0">{d.format}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-3xl bg-white ring-1 ring-black/[0.06] px-6 py-5">
            <p className="text-[15px] text-neutral-600">Need vector files or a custom lockup?</p>
            <a
              href="mailto:info@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-neutral-900 hover:bg-black text-white text-[14px] font-medium px-4 py-2 transition-colors"
            >
              Email info@olyxee.com <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Section>

        <div className="h-8" />
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Brand;
