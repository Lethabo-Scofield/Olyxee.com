import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, X as XIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const COLORS = [
  { name: "Ink", hex: "#0A0A0A", token: "neutral-950", text: "text-white", role: "Primary text and dark surfaces" },
  { name: "Paper", hex: "#FFFFFF", token: "white", text: "text-neutral-900", role: "Default background", border: true },
  { name: "Mist", hex: "#F5F5F5", token: "neutral-100", text: "text-neutral-900", role: "Subtle surfaces and dividers", border: true },
  { name: "Slate", hex: "#737373", token: "neutral-500", text: "text-white", role: "Secondary text" },
  { name: "Ordo Blue", hex: "#3B82F6", token: "blue-500", text: "text-white", role: "Ordo accent" },
  { name: "Addup Green", hex: "#10B981", token: "emerald-500", text: "text-white", role: "Addup accent" },
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
  "Don't recolor, stretch, rotate, or add effects to the logo",
  "Don't place the logo on busy or low-contrast backgrounds",
  "Don't recreate the wordmark in another typeface",
  "Don't combine the Olyxee mark with another company's logo or product name",
];

const Brand: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Brand Guidelines"
        description="Olyxee brand guidelines: logo, wordmark, color, typography, and usage rules. Download official assets and learn how to use the Olyxee identity."
        path="/brand"
        keywords={[
          "Olyxee brand",
          "Olyxee logo",
          "Olyxee brand guidelines",
          "Olyxee press kit",
          "Olyxee identity",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Olyxee Brand Guidelines",
          url: "https://olyxee.com/brand",
          description:
            "Official Olyxee brand guidelines covering logo, wordmark, color, typography, and usage rules.",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gradient-abstract-blue.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-6"
          >
            Brand Guidelines
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            How to use the <em className="text-neutral-500 not-italic">Olyxee identity</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Logo, color, and typography for partners, press, and anyone referencing Olyxee in their work.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="/Logo/Olyxee_Logo.png"
              download
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Download logo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="mailto:scofield@olyxee.com?subject=Brand%20Guidelines%20%E2%80%94%20Press%20%26%20brand%20inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Press & brand inquiries
            </a>
          </motion.div>
        </div>
      </section>

      {/* === LOGO === */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Logo</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-6">
                The mark and the wordmark.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                The Olyxee mark can be used on its own or paired with the wordmark. Always preserve clear space and never alter the proportions.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
            >
              <div className="h-56 sm:h-72 flex items-center justify-center bg-neutral-50">
                <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee mark on light background" width={120} height={120} />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-neutral-200">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Mark · Light</p>
                  <p className="text-xs text-neutral-500 font-light">For light backgrounds</p>
                </div>
                <a
                  href="/Logo/Olyxee_Logo.png"
                  download
                  className="text-xs font-medium text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
                >
                  Download
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
            >
              <div className="h-56 sm:h-72 flex items-center justify-center bg-neutral-950">
                <Image src="/Logo/Olyxee_trans.png" alt="Olyxee mark on dark background" width={120} height={120} />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-neutral-200">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Mark · Dark</p>
                  <p className="text-xs text-neutral-500 font-light">For dark backgrounds</p>
                </div>
                <a
                  href="/Logo/Olyxee_trans.png"
                  download
                  className="text-xs font-medium text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
                >
                  Download
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
            variants={fadeUp}
            className="mt-6 rounded-2xl border border-neutral-200 bg-white overflow-hidden"
          >
            <div className="h-40 sm:h-48 flex items-center justify-center bg-neutral-50 gap-5">
              <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee logo" width={64} height={64} />
              <span className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">Olyxee</span>
            </div>
            <div className="p-5 flex items-center justify-between border-t border-neutral-200">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Lockup · Mark + Wordmark</p>
                <p className="text-xs text-neutral-500 font-light">Use when both elements are needed together</p>
              </div>
              <a
                href="mailto:scofield@olyxee.com?subject=Brand%20Guidelines%20%E2%80%94%20Logo%20vector%20%2F%20asset%20request"
                className="text-xs font-medium text-neutral-700 hover:text-neutral-900 inline-flex items-center gap-1"
              >
                Request SVG
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === COLOR === */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Color</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-6">
                A neutral palette with two product accents.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Olyxee leads with neutral surfaces and editorial typography. Color accents are reserved for products: blue for Ordo, green for Addup.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-[0.2em] mb-1">{c.token}</p>
                  <p className="text-sm text-neutral-700 font-light leading-snug">{c.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TYPOGRAPHY === */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Typography</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-6">
                Editorial serif, clean sans, technical mono.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Headlines lead with a high-contrast serif. Body and UI use a neutral sans. Labels and metadata use a monospace face.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
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
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-2">{t.label}</p>
                <p className="text-sm text-neutral-700 font-light leading-snug">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === USAGE === */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-[0.2em] lg:pt-2 mb-2">Usage</p>
              <div className="w-12 h-px bg-neutral-200" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] text-neutral-900 leading-snug tracking-tight mb-6">
                A few simple rules.
              </p>
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
                Following these keeps the Olyxee identity consistent across surfaces and partners.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="p-8 sm:p-10 border border-neutral-200 rounded-2xl bg-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/70">
                  <Check className="w-4 h-4" />
                </span>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-600">Do</p>
              </div>
              <ul className="space-y-3">
                {DOS.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
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
              className="p-8 sm:p-10 border border-neutral-200 rounded-2xl bg-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 border border-rose-200/70">
                  <XIcon className="w-4 h-4" />
                </span>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-600">Don&apos;t</p>
              </div>
              <ul className="space-y-3">
                {DONTS.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                    <XIcon className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-6">Press & brand</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              Need something specific?
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
              For vector files, custom lockups, or press inquiries, get in touch and we&apos;ll send what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:scofield@olyxee.com?subject=Brand%20Guidelines%20%E2%80%94%20Press%20%26%20brand%20inquiry"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Contact press & brand <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
              >
                All contact options
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brand;
