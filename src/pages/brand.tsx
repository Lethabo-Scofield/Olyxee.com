import { FC, useEffect, useState, ReactNode } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, X as XIcon, Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "logos", label: "Logos" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "usage", label: "Usage" },
  { id: "downloads", label: "Downloads" },
  { id: "press", label: "Press" },
];

const PRINCIPLES = [
  { title: "Editorial", body: "We lead with serif type, generous whitespace, and a calm tone. The page should feel printed, not glossy." },
  { title: "Restrained", body: "Color is reserved for products. Olyxee itself stays in neutrals so Ordo and Addup can carry their own accents." },
  { title: "Honest", body: "Plain language, real screenshots, accurate claims. We do not overstate the system." },
];

const LOGOS = [
  {
    key: "olyxee",
    name: "Olyxee",
    role: "The parent brand mark. Used for the company itself and any cross-product surface.",
    accent: "Neutral",
    accentClass: "text-neutral-900",
    swatch: "bg-neutral-900",
    files: [
      { label: "Mark · Light", path: "/Logo/Olyxee_Logo.png", bg: "bg-neutral-50", note: "For light backgrounds" },
      { label: "Mark · Dark", path: "/Logo/Olyxee_trans.png", bg: "bg-neutral-950", note: "For dark backgrounds" },
    ],
  },
  {
    key: "ordo",
    name: "Ordo",
    role: "Our core AI execution system. The navy symbol pairs with the Ordo Blue accent in product UI.",
    accent: "Ordo Blue",
    accentClass: "text-blue-700",
    swatch: "bg-blue-600",
    files: [
      { label: "Mark · Light", path: "/images/ordo-logo.png", bg: "bg-neutral-50", note: "Primary product mark" },
    ],
  },
  {
    key: "addup",
    name: "Addup",
    role: "Our first focused application. The blue wordmark stands on its own and does not need the Olyxee mark beside it.",
    accent: "Addup Blue",
    accentClass: "text-blue-600",
    swatch: "bg-blue-500",
    files: [
      { label: "Wordmark · Light", path: "/images/addup-logo.png", bg: "bg-neutral-50", note: "Primary product wordmark" },
    ],
  },
];

const COLORS = [
  { name: "Ink", hex: "#0A0A0A", token: "neutral-950", text: "text-white", role: "Primary text and dark surfaces" },
  { name: "Paper", hex: "#FFFFFF", token: "white", text: "text-neutral-900", role: "Default background", border: true },
  { name: "Mist", hex: "#F5F5F5", token: "neutral-100", text: "text-neutral-900", role: "Subtle surfaces and dividers", border: true },
  { name: "Slate", hex: "#737373", token: "neutral-500", text: "text-white", role: "Secondary text" },
  { name: "Ordo Blue", hex: "#3B82F6", token: "blue-500", text: "text-white", role: "Ordo product accent" },
  { name: "Addup Green", hex: "#10B981", token: "emerald-500", text: "text-white", role: "Addup product accent" },
];

const TYPE_SCALE = [
  { label: "Display Serif", sample: "Aa", role: "Headlines and editorial moments", className: "font-serif text-6xl tracking-tight" },
  { label: "Sans", sample: "Aa", role: "UI text, body copy, and product surfaces", className: "text-6xl font-light tracking-tight" },
  { label: "Mono", sample: "Aa", role: "Labels, metadata, and code", className: "font-mono text-6xl tracking-tight" },
];

const DOS = [
  "Use the full Olyxee mark with adequate clear space around it",
  "Pair the wordmark with the official symbol when both are needed",
  "Keep contrast accessible: dark mark on light, light mark on dark",
  "Use the official color tokens for product accents",
];

const DONTS = [
  "Do not recolor, stretch, rotate, or add effects to the logo",
  "Do not place the logo on busy or low-contrast backgrounds",
  "Do not recreate the wordmark in another typeface",
  "Do not combine the Olyxee mark with another company or product name",
];

const DOWNLOADS = [
  { label: "Olyxee mark · Light PNG", path: "/Logo/Olyxee_Logo.png" },
  { label: "Olyxee mark · Dark PNG", path: "/Logo/Olyxee_trans.png" },
  { label: "Ordo mark · PNG", path: "/images/ordo-logo.png" },
  { label: "Addup wordmark · PNG", path: "/images/addup-logo.png" },
];

function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

const SectionLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">{children}</p>
);

const Brand: FC = () => {
  const active = useActiveSection();

  return (
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

      {/* === DOCUMENT HEADER === */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 border-b border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.25em] mb-5"
          >
            Olyxee · Brand
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-neutral-900 tracking-tight leading-[1.1] mb-5"
          >
            Brand guidelines.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl"
          >
            Logos, color, and typography for the Olyxee parent brand and our products, Ordo and Addup. For partners, press, and anyone referencing us in their work.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-neutral-500 font-mono uppercase tracking-[0.2em]"
          >
            <span>Updated April 2026</span>
            <span aria-hidden className="text-neutral-300">·</span>
            <a href="#downloads" className="text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline">
              Jump to downloads
            </a>
          </motion.div>
        </div>
      </section>

      {/* === DOCUMENT BODY === */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            <p className="hidden lg:block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
              On this page
            </p>
            <nav aria-label="Brand guidelines sections">
              <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible whitespace-nowrap lg:whitespace-normal">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id} className="shrink-0 lg:shrink">
                      <a
                        href={`#${s.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`group relative inline-flex items-center text-sm font-light tracking-wide py-1.5 px-3 lg:px-3 lg:py-2 rounded-md transition-colors ${
                          isActive
                            ? "text-neutral-900 lg:bg-neutral-100"
                            : "text-neutral-500 hover:text-neutral-900 lg:hover:bg-neutral-50"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`hidden lg:inline-block w-1 h-1 rounded-full mr-2.5 transition-colors ${
                            isActive ? "bg-neutral-900" : "bg-neutral-300 group-hover:bg-neutral-500"
                          }`}
                        />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-w-0 space-y-20 sm:space-y-24 scroll-smooth">

            {/* === OVERVIEW === */}
            <section id="overview" className="scroll-mt-28">
              <SectionLabel>Overview</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                A simple, editorial identity.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Olyxee is a parent brand that holds two products: Ordo, our AI execution system, and Addup, our first focused application. The identity is intentionally calm so the products can speak for themselves.
              </motion.p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {PRINCIPLES.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i}
                    variants={fadeUp}
                    className="p-5 sm:p-6 rounded-xl border border-neutral-200 bg-white"
                  >
                    <p className="font-serif text-lg text-neutral-900 mb-2">{p.title}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed font-light">{p.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* === LOGOS === */}
            <section id="logos" className="scroll-mt-28">
              <SectionLabel>Logos</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                The Olyxee mark and product logos.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Three marks live in the Olyxee system: the parent symbol, the Ordo product mark, and the Addup wordmark. Always preserve clear space and never alter the proportions.
              </motion.p>

              <div className="mt-10 space-y-12">
                {LOGOS.map((logo, logoIdx) => (
                  <motion.div
                    key={logo.key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={logoIdx}
                    variants={fadeUp}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className={`font-serif text-xl sm:text-2xl tracking-tight ${logo.accentClass}`}>{logo.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                        <span aria-hidden className={`inline-block w-2 h-2 rounded-full ${logo.swatch}`} />
                        {logo.accent}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-2xl mb-5">
                      {logo.role}
                    </p>
                    <div className={`grid grid-cols-1 ${logo.files.length > 1 ? "md:grid-cols-2" : ""} gap-4`}>
                      {logo.files.map((f) => (
                        <div key={f.path} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                          <div className={`h-48 sm:h-56 flex items-center justify-center ${f.bg}`}>
                            <Image src={f.path} alt={`${logo.name} ${f.label}`} width={140} height={140} className="object-contain max-h-32 w-auto" />
                          </div>
                          <div className="p-4 flex items-center justify-between border-t border-neutral-200">
                            <div>
                              <p className="text-sm font-semibold text-neutral-900">{f.label}</p>
                              <p className="text-xs text-neutral-500 font-light">{f.note}</p>
                            </div>
                            <a
                              href={f.path}
                              download
                              className="text-xs font-medium text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
                            >
                              Download
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Lockup */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={4}
                variants={fadeUp}
                className="mt-12 rounded-2xl border border-neutral-200 bg-white overflow-hidden"
              >
                <div className="h-40 sm:h-48 flex items-center justify-center bg-neutral-50 gap-5">
                  <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee logo" width={64} height={64} />
                  <span className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">Olyxee</span>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-neutral-200">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Lockup · Mark and wordmark</p>
                    <p className="text-xs text-neutral-500 font-light">Use when both elements are needed together</p>
                  </div>
                  <a
                    href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Logo%20vector%20request"
                    className="text-xs font-medium text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
                  >
                    Request SVG
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                  </a>
                </div>
              </motion.div>
            </section>

            {/* === COLOR === */}
            <section id="color" className="scroll-mt-28">
              <SectionLabel>Color</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                A neutral palette with two product accents.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Olyxee leads with neutral surfaces and editorial typography. Color accents are reserved for products: blue for Ordo, green for Addup.
              </motion.p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {COLORS.map((c, idx) => (
                  <motion.div
                    key={c.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={idx}
                    variants={fadeUp}
                    className="rounded-2xl overflow-hidden border border-neutral-200 bg-white"
                  >
                    <div
                      className={`h-28 sm:h-36 flex items-end justify-between p-4 ${c.text} ${c.border ? "border-b border-neutral-200" : ""}`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className="font-serif text-xl sm:text-2xl tracking-tight">{c.name}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">{c.hex}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mb-1">{c.token}</p>
                      <p className="text-sm text-neutral-700 font-light leading-snug">{c.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* === TYPOGRAPHY === */}
            <section id="typography" className="scroll-mt-28">
              <SectionLabel>Typography</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                Editorial serif, clean sans, technical mono.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Headlines lead with a high-contrast serif. Body and UI use a neutral sans. Labels and metadata use a monospace face.
              </motion.p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                {TYPE_SCALE.map((t, idx) => (
                  <motion.div
                    key={t.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={idx}
                    variants={fadeUp}
                    className={`p-8 sm:p-10 ${idx < TYPE_SCALE.length - 1 ? "md:border-r border-b md:border-b-0 border-neutral-200" : ""}`}
                  >
                    <span className={`block text-neutral-900 leading-none mb-6 ${t.className}`}>{t.sample}</span>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 mb-2">{t.label}</p>
                    <p className="text-sm text-neutral-700 font-light leading-snug">{t.role}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* === USAGE === */}
            <section id="usage" className="scroll-mt-28">
              <SectionLabel>Usage</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                A few simple rules.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Following these keeps the Olyxee identity consistent across surfaces and partners.
              </motion.p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={0}
                  variants={fadeUp}
                  className="p-6 sm:p-8 border border-neutral-200 rounded-2xl bg-white"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      <Check className="w-4 h-4" aria-hidden="true" focusable="false" />
                    </span>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-700">Do</p>
                  </div>
                  <ul className="space-y-3">
                    {DOS.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" aria-hidden="true" focusable="false" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={1}
                  variants={fadeUp}
                  className="p-6 sm:p-8 border border-neutral-200 rounded-2xl bg-white"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70">
                      <XIcon className="w-4 h-4" aria-hidden="true" focusable="false" />
                    </span>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-700">Don&apos;t</p>
                  </div>
                  <ul className="space-y-3">
                    {DONTS.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                        <XIcon className="w-4 h-4 text-rose-500 shrink-0 mt-1" aria-hidden="true" focusable="false" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>

            {/* === DOWNLOADS === */}
            <section id="downloads" className="scroll-mt-28">
              <SectionLabel>Downloads</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                Get every official asset.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                PNG assets are available below. For SVG, EPS, or custom lockups, request directly from the press contact.
              </motion.p>

              <ul className="mt-10 divide-y divide-neutral-200 border border-neutral-200 rounded-2xl bg-white overflow-hidden">
                {DOWNLOADS.map((d, i) => (
                  <motion.li
                    key={d.path}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i}
                    variants={fadeUp}
                  >
                    <a
                      href={d.path}
                      download
                      className="flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-700 shrink-0">
                          <Download className="w-4 h-4" aria-hidden="true" focusable="false" />
                        </span>
                        <span className="text-sm sm:text-base text-neutral-900 font-medium truncate">{d.label}</span>
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 transition-colors shrink-0 ml-3">
                        PNG
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* === PRESS === */}
            <section id="press" className="scroll-mt-28">
              <SectionLabel>Press</SectionLabel>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-snug mb-5"
              >
                Press and brand inquiries.
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={fadeUp}
                className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                For vector files, custom lockups, founder bios, or anything not listed above, reach out directly. We aim to respond within two business days.
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={2}
                variants={fadeUp}
                className="mt-8 p-6 sm:p-8 rounded-2xl border border-neutral-200 bg-neutral-50/60"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">Contact</p>
                <p className="font-serif text-xl sm:text-2xl text-neutral-900 mb-1">scofield@olyxee.com</p>
                <p className="text-sm text-neutral-600 font-light mb-5">Press, brand, partnerships, and asset requests.</p>
                <a
                  href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm"
                >
                  Open email
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" focusable="false" />
                </a>
              </motion.div>
            </section>

          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brand;
