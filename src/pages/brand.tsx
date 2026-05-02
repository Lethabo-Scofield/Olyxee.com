import { FC, ReactNode } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, X as XIcon, Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const COLORS = [
  { name: "Ink", hex: "#0A0A0A", token: "neutral-950", text: "text-white", role: "Primary text and dark surfaces" },
  { name: "Paper", hex: "#FFFFFF", token: "white", text: "text-neutral-900", role: "Default background", border: true },
  { name: "Mist", hex: "#F5F5F5", token: "neutral-100", text: "text-neutral-900", role: "Subtle surfaces and dividers", border: true },
  { name: "Slate", hex: "#737373", token: "neutral-500", text: "text-white", role: "Secondary text" },
  { name: "Ordo Blue", hex: "#3B82F6", token: "blue-500", text: "text-white", role: "Ordo product accent" },
  { name: "Addup Green", hex: "#10B981", token: "emerald-500", text: "text-white", role: "Addup product accent" },
];

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
      <section className="pt-32 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05]"
          >
            Brand Guidelines
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10 flex justify-center"
          >
            <a
              href="mailto:scofield@olyxee.com?subject=Olyxee%20Brand%3A%20Press%20inquiry"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Contact
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

        {/* 07 - Color */}
        <section id="color" className="border-t border-neutral-200 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>06</span>
              <span className="text-neutral-700">Color · Palette</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl overflow-hidden ring-1 ring-neutral-200/80"
            >
              {COLORS.map((c) => (
                <div
                  key={c.name}
                  className={`flex flex-col justify-end aspect-[3/4] sm:aspect-[2/3] p-4 sm:p-5 ${c.text} ${
                    c.border ? "ring-1 ring-inset ring-neutral-200" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  <p className="font-serif text-xl sm:text-2xl tracking-tight leading-none mb-2">{c.name}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">{c.hex}</p>
                </div>
              ))}
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3 py-4">
              {COLORS.map((c) => (
                <p key={c.name} className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 leading-relaxed">
                  <span className="text-neutral-700">{c.token}</span>
                  <br />
                  <span className="font-sans normal-case tracking-normal text-neutral-500">{c.role}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 08 - Usage */}
        <section id="usage" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>07</span>
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

        {/* 09 - Downloads */}
        <section id="downloads" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>08</span>
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

        {/* 10 - Press */}
        <section id="press" className="border-t border-neutral-200 scroll-mt-24 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
              <span>09</span>
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
  );
};

export default Brand;
