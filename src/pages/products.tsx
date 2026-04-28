import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const galleryImages = [
  { src: "/images/products-fintech-agents.png", label: "Fintech Agents" },
  { src: "/images/products-multi-agent.png", label: "Multi-Agent Systems" },
  { src: "/images/products-financial-ops.png", label: "Financial Operations" },
  { src: "/images/product-clustering.png", label: "Visual Embeddings" },
  { src: "/images/product-classifier.png", label: "Classifier Alignment" },
  { src: "/images/product-pipeline.png", label: "Pipeline Architecture" },
];

function OrdoArchitecture() {
  // ONE concrete worked example — sequential steps Ordo executes for the spoken goal
  const steps = [
    { n: 1, y: 90,  app: "Stripe",     desc: "Pull all Q1 payments",        icon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128" },
    { n: 2, y: 175, app: "QuickBooks", desc: "Match against invoices",      icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128" },
    { n: 3, y: 260, app: "Sheets",     desc: "Build summary report",        icon: "https://www.google.com/s2/favicons?domain=sheets.google.com&sz=128" },
    { n: 4, y: 345, app: "Gmail",      desc: "Email it to leadership",      icon: "https://www.google.com/s2/favicons?domain=gmail.com&sz=128" },
  ];

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">A real example</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">ordo.olyxee.com</span>
      </div>

      <div className="w-full">
      <svg viewBox="0 0 860 480" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
        {/* === LEFT: speech bubble (the goal) === */}
        <g>
          <rect x="20" y="170" width="220" height="140" rx="16" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="36" y="198" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">YOU SAY:</text>
          <text x="36" y="226" fontSize="15" fill="#0a0a0a" fontWeight="600">“Reconcile our</text>
          <text x="36" y="248" fontSize="15" fill="#0a0a0a" fontWeight="600">Q1 finances and</text>
          <text x="36" y="270" fontSize="15" fill="#0a0a0a" fontWeight="600">email leadership</text>
          <text x="36" y="292" fontSize="15" fill="#0a0a0a" fontWeight="600">the summary.”</text>
          {/* tail pointing right */}
          <path d="M 240 232 L 256 240 L 240 248 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" />
        </g>

        {/* === MIDDLE: Ordo black box === */}
        <g>
          <rect x="270" y="180" width="140" height="120" rx="18" fill="#0a0a0a" />
          {/* white badge so the navy avatar reads clearly on the black box */}
          <rect x="316" y="194" width="48" height="48" rx="12" fill="#ffffff" />
          <image href="/images/ordo-logo.png" x="320" y="198" width="40" height="40" />
          <text x="340" y="266" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700" fontFamily="ui-serif, Georgia">Ordo</text>
          <text x="340" y="284" textAnchor="middle" fontSize="10" fill="#a3a3a3" fontFamily="ui-monospace, monospace">plans 4 steps →</text>
        </g>

        {/* arrow from speech bubble into Ordo */}
        <path id="p-in" d="M 256 240 L 270 240" fill="none" stroke="#0a0a0a" strokeWidth="2" />

        {/* === RIGHT: numbered ordered list of what Ordo does === */}
        {/* vertical spine */}
        <line x1="445" y1="60" x2="445" y2="375" stroke="#e5e5e5" strokeWidth="2" strokeDasharray="4 4" />

        {/* arrow from Ordo to first step */}
        <path d="M 410 240 C 425 240, 435 90, 445 90" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />

        {/* animated single dot that travels DOWN the spine in order */}
        <circle r="6" fill="#3b82f6">
          <animate attributeName="cx" values="445;445;445;445;445" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="90;175;260;345;90" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
        </circle>

        {steps.map((s) => (
          <g key={s.n}>
            {/* numbered badge on the spine */}
            <circle cx="445" cy={s.y} r="14" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
            <text x="445" y={s.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0a0a0a">{s.n}</text>

            {/* row card to the right of the spine */}
            <rect x="475" y={s.y - 24} width="370" height="48" rx="10" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.25" />
            {/* app chip */}
            <rect x="487" y={s.y - 14} width="104" height="28" rx="7" fill="#f8fafc" stroke="#e5e5e5" />
            <image href={s.icon} x={495} y={s.y - 9} width="18" height="18" />
            <text x={518} y={s.y + 4} fontSize="12" fill="#262626" fontWeight="600">{s.app}</text>
            {/* description */}
            <text x={605} y={s.y + 4} fontSize="13" fill="#404040" fontWeight="500">{s.desc}</text>
          </g>
        ))}

        {/* === FINAL OUTPUT row at bottom === */}
        <g>
          <rect x="475" y="410" width="370" height="50" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
          <circle cx="500" cy="435" r="13" fill="#15803d" />
          <path d="M 494 435 L 499 440 L 507 431" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x={524} y="431" fontSize="13" fill="#14532d" fontWeight="700">Done</text>
          <text x={524} y="448" fontSize="11" fill="#166534">Reconciled report sent to 3 leaders · audit trail saved</text>
        </g>

        {/* connector from last step down to "Done" */}
        <line x1="445" y1="360" x2="445" y2="435" stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 445 435 L 475 435" fill="none" stroke="#86efac" strokeWidth="2" />
      </svg>
      </div>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-neutral-500">
        <span className="font-medium">One goal in → 4 steps planned → finished work out</span>
        <span className="hidden sm:inline font-mono text-neutral-400">stateful · auditable</span>
      </div>
    </div>
  );
}

function AddupReconciliation() {
  // ONE concrete worked example — Addup reconciles bank rows against ledger entries
  const rows = [
    { y: 90,  bank: { src: "Stripe payout",      amt: "$12,480.00" }, ledger: { ref: "INV-2031",   amt: "$12,480.00" }, status: "match"    as const },
    { y: 175, bank: { src: "Bank deposit",       amt: "$  4,250.00" }, ledger: { ref: "INV-2032",   amt: "$  4,250.00" }, status: "match"    as const },
    { y: 260, bank: { src: "Wire — Acme Co.",    amt: "$  9,800.00" }, ledger: { ref: "INV-2033",   amt: "$  9,820.00" }, status: "fixed"    as const },
    { y: 345, bank: { src: "Card settlement",    amt: "$  2,140.00" }, ledger: { ref: "INV-2034",   amt: "$  2,140.00" }, status: "match"    as const },
  ];

  const colorFor = (s: "match" | "fixed") => (s === "match" ? "#15803d" : "#0369a1");
  const fillFor  = (s: "match" | "fixed") => (s === "match" ? "#f0fdf4" : "#eff6ff");
  const ringFor  = (s: "match" | "fixed") => (s === "match" ? "#86efac" : "#bae6fd");

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/80 p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">A real example</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">addup.olyxee.com</span>
      </div>

      <div className="w-full">
      <svg viewBox="0 0 860 480" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
        {/* === LEFT column header: bank/source rows === */}
        <text x="20" y="56" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">BANK & SOURCES</text>
        {rows.map((r, i) => (
          <g key={`b-${i}`}>
            <rect x="20" y={r.y - 24} width="240" height="48" rx="10" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.25" />
            <text x="32" y={r.y - 4} fontSize="12" fill="#404040" fontWeight="600">{r.bank.src}</text>
            <text x="32" y={r.y + 14} fontSize="13" fill="#0a0a0a" fontFamily="ui-monospace, monospace">{r.bank.amt}</text>
            {/* arrow into Addup */}
            <path d={`M 260 ${r.y} L 296 ${r.y}`} fill="none" stroke="#0a0a0a" strokeWidth="1.25" />
          </g>
        ))}

        {/* === MIDDLE: Addup black box === */}
        <g>
          <rect x="296" y="180" width="170" height="120" rx="18" fill="#0a0a0a" />
          <rect x="346" y="194" width="70" height="48" rx="10" fill="#ffffff" />
          <image href="/images/addup-logo.png" x="350" y="200" width="62" height="36" preserveAspectRatio="xMidYMid meet" />
          <text x="381" y="266" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700" fontFamily="ui-serif, Georgia">Addup</text>
          <text x="381" y="284" textAnchor="middle" fontSize="10" fill="#a3a3a3" fontFamily="ui-monospace, monospace">matches & verifies →</text>
        </g>

        {/* arrows from Addup out to each ledger row */}
        {rows.map((r, i) => (
          <path key={`o-${i}`} d={`M 466 240 C 480 240, 490 ${r.y}, 510 ${r.y}`} fill="none" stroke="#0a0a0a" strokeWidth="1.25" />
        ))}

        {/* animated dot moving down ledger column */}
        <circle r="6" fill="#3b82f6">
          <animate attributeName="cx" values="510;510;510;510;510" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="90;175;260;345;90" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* === RIGHT column: matched ledger entries === */}
        <text x="510" y="56" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">LEDGER · RECONCILED</text>
        {rows.map((r, i) => (
          <g key={`l-${i}`}>
            <rect x="510" y={r.y - 24} width="335" height="48" rx="10" fill={fillFor(r.status)} stroke={ringFor(r.status)} strokeWidth="1.5" />
            {/* status badge */}
            <circle cx="535" cy={r.y} r="13" fill={colorFor(r.status)} />
            {r.status === "match" ? (
              <path d={`M 529 ${r.y} L 534 ${r.y + 5} L 542 ${r.y - 4}`} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <line x1="530" y1={r.y - 4} x2="540" y2={r.y - 4} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="530" y1={r.y + 4} x2="540" y2={r.y + 4} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
            {/* invoice ref */}
            <text x="558" y={r.y - 4} fontSize="12" fill="#262626" fontWeight="600">{r.ledger.ref}</text>
            <text x="558" y={r.y + 14} fontSize="11" fill={colorFor(r.status)} fontWeight="600" fontFamily="ui-monospace, monospace">
              {r.status === "match" ? "matched" : "auto-fixed · $20 fee"}
            </text>
            {/* amount */}
            <text x="833" y={r.y + 4} textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="ui-monospace, monospace" fontWeight="600">{r.ledger.amt}</text>
          </g>
        ))}

        {/* === FINAL OUTPUT row at bottom === */}
        <g>
          <rect x="20" y="410" width="825" height="50" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
          <circle cx="46" cy="435" r="13" fill="#15803d" />
          <path d="M 40 435 L 45 440 L 53 431" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="70" y="431" fontSize="13" fill="#14532d" fontWeight="700">Books closed</text>
          <text x="70" y="448" fontSize="11" fill="#166534">4 of 4 reconciled · 1 variance auto-resolved · audit trail saved</text>
        </g>
      </svg>
      </div>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-neutral-500">
        <span className="font-medium">Messy ledgers in → matched, verified records out</span>
        <span className="hidden sm:inline font-mono text-neutral-400">auditable · close-ready</span>
      </div>
    </div>
  );
}

type AccentTheme = {
  text: string;
  ring: string;
  bgWash: string;
  watermark: string;
  marker: string;
  caption: string;
  rule: string;
};

const ORDO_ACCENT: AccentTheme = {
  text: "text-blue-700",
  ring: "ring-blue-200/70",
  bgWash: "bg-[radial-gradient(ellipse_at_top_left,#dbeafe_0%,#eff6ff_30%,#ffffff_75%)]",
  watermark: "text-blue-100/60",
  marker: "text-blue-500",
  caption: "text-blue-700",
  rule: "bg-blue-300/60",
};

const ADDUP_ACCENT: AccentTheme = {
  text: "text-emerald-700",
  ring: "ring-emerald-200/70",
  bgWash: "bg-[radial-gradient(ellipse_at_top_right,#d1fae5_0%,#ecfdf5_30%,#ffffff_75%)]",
  watermark: "text-emerald-100/60",
  marker: "text-emerald-500",
  caption: "text-emerald-700",
  rule: "bg-emerald-300/60",
};

type SpecRow = { k: string; v: string };

type ProductFeatureProps = {
  index: string;
  label: string;
  name: string;
  tagline: React.ReactNode;
  description: string;
  features: string[];
  specs: SpecRow[];
  fig: string;
  figCaption: string;
  url: string;
  domain: string;
  logoSrc: string;
  accent: AccentTheme;
  visual: React.ReactNode;
  flip?: boolean;
};

function ProductFeature({
  index,
  label,
  name,
  tagline,
  description,
  features,
  specs,
  fig,
  figCaption,
  url,
  domain,
  logoSrc,
  accent,
  visual,
  flip = false,
}: ProductFeatureProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className={`relative ${accent.bgWash} border-y border-neutral-200/60 overflow-hidden`}
    >
      {/* metadata strip — full-width header */}
      <div className="relative z-10 border-b border-neutral-200/70 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 flex-wrap text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
          <span className={`font-semibold ${accent.text}`}>Product {index}</span>
          <span className="text-neutral-300">·</span>
          <span className="text-neutral-700">{name}</span>
          <span className="text-neutral-300">·</span>
          <span>{label}</span>
          <span className="text-neutral-300 hidden sm:inline">·</span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-neutral-500">Live · 2025</span>
          </span>
          <span className="text-neutral-300 hidden md:inline">·</span>
          <span className="hidden md:inline normal-case tracking-normal font-sans text-neutral-500 lowercase">
            {domain}
          </span>
        </div>
      </div>

      {/* watermark product name — huge outlined stencil, bleeds off edge */}
      <div
        aria-hidden
        className={`pointer-events-none select-none absolute inset-x-0 top-10 sm:top-16 font-serif font-light leading-[0.85] tracking-[-0.04em] text-[28vw] lg:text-[22vw] ${flip ? "text-right" : "text-left"} px-4 sm:px-6 whitespace-nowrap`}
        style={{
          color: "transparent",
          WebkitTextStroke: `1px ${accent === ORDO_ACCENT ? "rgba(59,130,246,0.18)" : "rgba(16,185,129,0.18)"}`,
        }}
      >
        {name.toLowerCase()}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          {/* TEXT COLUMN */}
          <div className="lg:col-span-5 space-y-8 lg:pt-10">
            {/* logo */}
            <div className="flex items-center gap-4">
              <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white ring-1 ${accent.ring} shadow-sm flex items-center justify-center overflow-hidden`}>
                <Image
                  src={logoSrc}
                  alt={name}
                  width={56}
                  height={56}
                  className="w-[86%] h-[86%] object-contain"
                />
              </div>
              <span className={`h-px w-10 ${accent.rule}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                {label}
              </span>
            </div>

            {/* display name */}
            <h2 className="font-serif text-[clamp(3.5rem,10vw,7rem)] leading-[0.92] tracking-[-0.025em] text-neutral-900">
              {name}.
            </h2>

            {/* italic tagline */}
            <p className="font-serif text-2xl sm:text-3xl leading-[1.15] text-neutral-700 italic font-light -mt-3">
              {tagline}
            </p>

            {/* description with drop cap */}
            <p className="text-base sm:text-[17px] text-neutral-700 leading-[1.65] font-light max-w-md">
              <span className={`float-left font-serif ${accent.caption} text-[3.5rem] leading-[0.85] mr-2 mt-1`}>
                {description.charAt(0)}
              </span>
              {description.slice(1)}
            </p>

            {/* feature list */}
            <ul className="space-y-3 pt-4 border-t border-neutral-300/60 max-w-md">
              {features.map((f) => (
                <li key={f} className="flex items-baseline gap-3 text-sm sm:text-[15px] text-neutral-700 font-light">
                  <span className={`text-base leading-none ${accent.marker} shrink-0`}>+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* SPEC table */}
            <dl className="pt-4 border-t border-neutral-300/60 max-w-md grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {specs.map((s) => (
                <div key={s.k} className="flex flex-col">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-1">
                    {s.k}
                  </dt>
                  <dd className="text-sm font-medium text-neutral-800">{s.v}</dd>
                </div>
              ))}
            </dl>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-6 py-3 rounded-full transition-colors"
              >
                Visit {name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 text-sm font-medium ${accent.text} hover:opacity-80 transition-opacity`}
              >
                <span className="underline underline-offset-4 decoration-current/40">
                  See how it works
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* VISUAL COLUMN — framed as a magazine plate */}
          <div className="lg:col-span-7">
            <figure className="relative">
              {/* fig caption above */}
              <figcaption className="flex items-baseline justify-between mb-3 px-1">
                <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${accent.text}`}>
                  Fig. {fig}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                  {figCaption}
                </span>
              </figcaption>
              <div className="relative">
                {/* offset accent shadow plate */}
                <div className={`absolute inset-0 translate-x-2 translate-y-2 rounded-2xl ring-1 ${accent.ring}`} aria-hidden />
                <div className="relative">{visual}</div>
              </div>
              <div className="flex items-baseline justify-between mt-3 px-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                  Recorded from {domain}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                  /{index}
                </span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ManifestoStrip() {
  const tiles = [
    { k: "Products", v: "02", note: "Live & shipping" },
    { k: "Built for", v: "Operators", note: "Not just researchers" },
    { k: "Promise", v: "Receipts", note: "Every action, audited" },
    { k: "Status", v: "2025", note: "Public roadmap" },
  ];
  return (
    <section className="bg-neutral-950 text-white border-y border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-neutral-800 lg:divide-y-0 lg:divide-x lg:divide-neutral-800">
          {tiles.map((t, i) => (
            <motion.div
              key={t.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="px-4 sm:px-6 py-6 lg:py-2 first:pt-0 lg:first:pl-0 last:pb-0 lg:last:pr-0"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-3">
                {t.k}
              </p>
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-none mb-2 tracking-tight">
                {t.v}
              </p>
              <p className="text-xs text-neutral-400 font-light">{t.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchRoadmap() {
  const stations = [
    { x: 80, y: 320, title: "Execution Architectures", code: "R-01", note: "How AI systems run, not just think", labelPos: "below" as const },
    { x: 240, y: 180, title: "Multi-step Coordination", code: "R-02", note: "Sequencing decisions across tools", labelPos: "above" as const },
    { x: 410, y: 300, title: "Stateful Systems", code: "R-03", note: "Memory that survives across runs", labelPos: "below" as const },
    { x: 600, y: 160, title: "Tool & Environment Integration", code: "R-04", note: "Wiring AI into real software", labelPos: "above" as const },
    { x: 800, y: 280, title: "Reliability in Autonomy", code: "R-05", note: "Verifiable, auditable execution", labelPos: "below" as const },
  ] as const;

  const pathD = "M 80 320 C 150 320, 180 180, 240 180 S 350 380, 410 300 S 540 80, 600 160 S 740 360, 800 280";

  return (
    <section className="py-20 sm:py-32 border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          variants={fadeUp}
          className="mb-10 sm:mb-14 max-w-2xl"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-4">Research Roadmap</p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-4">
            The route from <em className="text-blue-500">intelligence</em> to <em className="text-blue-700">execution</em>
          </h2>
          <p className="text-base text-neutral-500 font-light leading-relaxed">
            Each station marks a research area we are actively shipping into Olyxee products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-neutral-200 bg-white p-4 sm:p-8 overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest z-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            you are here
          </div>

          <div className="w-full">
          <svg viewBox="0 0 880 420" className="w-full h-auto block relative">
            <defs>
              <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <filter id="soft-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g opacity="0.5" stroke="#d4d4d4" strokeWidth="0.5" fill="none">
              <path d="M 0 60 Q 220 100 440 70 T 880 90" />
              <path d="M 0 380 Q 240 360 480 390 T 880 370" />
            </g>

            <g opacity="0.35" fill="#a3a3a3" fontFamily="ui-monospace, monospace" fontSize="8">
              <text x="20" y="30">N</text>
              <text x="20" y="42">↑</text>
            </g>

            <path id="research-route" d={pathD} fill="none" stroke="#e5e5e5" strokeWidth="6" strokeLinecap="round" />
            <path d={pathD} fill="none" stroke="url(#route-grad)" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" filter="url(#soft-glow)" />

            <circle r="7" fill="#1e3a8a" filter="url(#soft-glow)">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                <mpath href="#research-route" />
              </animateMotion>
            </circle>
            <circle r="3" fill="#ffffff">
              <animateMotion dur="14s" repeatCount="indefinite">
                <mpath href="#research-route" />
              </animateMotion>
            </circle>

            {stations.map((s, i) => {
              const above = s.labelPos === "above";
              const blockY = above ? s.y - 78 : s.y + 24;
              const tickY1 = above ? s.y - 14 : s.y + 14;
              const tickY2 = above ? s.y - 24 : s.y + 24;
              return (
                <g key={s.code}>
                  <line x1={s.x} y1={tickY1} x2={s.x} y2={tickY2} stroke="#d4d4d4" strokeWidth="1" strokeDasharray="2 2" />

                  <g transform={`translate(${s.x - 90}, ${blockY})`}>
                    <rect width="180" height="54" rx="10" fill="#ffffff" stroke={i === 2 ? "#3b82f6" : "#e5e5e5"} strokeWidth={i === 2 ? 1.5 : 1} />
                    <text x="10" y="18" fontSize="9" fontFamily="ui-monospace, monospace" fill="#a3a3a3">{s.code}{i === 2 ? "  ·  ACTIVE" : ""}</text>
                    <text x="10" y="33" fontSize="11" fontWeight="600" fill="#0a0a0a">{s.title}</text>
                    <text x="10" y="47" fontSize="9" fill="#737373">{s.note}</text>
                  </g>

                  <circle cx={s.x} cy={s.y} r="14" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.5" />
                  <circle cx={s.x} cy={s.y} r="6" fill={i === 2 ? "#3b82f6" : "#0a0a0a"} />
                  {i === 2 && (
                    <circle cx={s.x} cy={s.y} r="14" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" from="14" to="26" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50/60">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.25em] mb-5">Integrations</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            Works with the tools you already use.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
            Ordo plugs into your existing stack — no rip and replace. Connect your finance, sales, support and productivity tools, and Ordo handles the rest.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex gap-2"><span className="text-blue-500">•</span> Microsoft 365, Office, Outlook</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Salesforce, Zendesk, Freshdesk</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Xero, QuickBooks, Stripe</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> Slack, Teams, Notion, Sheets</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100/40 blur-3xl rounded-full" aria-hidden />
            <Image
              src="/images/integrations-cluster.png"
              alt="A floating cluster of integration logos including Microsoft 365, Salesforce, Xero, Outlook, Zendesk and others that Ordo connects to."
              width={970}
              height={550}
              className="relative w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductGallery() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Inside the system</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-[1.1]">
            How the pieces fit together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: Math.min(idx * 0.06, 0.3) }}
              className="group rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 hover:border-neutral-200 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                />
              </div>
              <figcaption className="px-5 py-4 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{img.label}</span>
                <span className="text-xs font-mono text-neutral-300">0{idx + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const ProductsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Products"
        description="Systems built from Olyxee research for real-world AI operation. Ordo is an AI execution system that converts goals into completed workflows."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Ordo",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Cloud",
          description: "AI execution system that converts high-level goals into completed operational workflows across tools and data sources.",
          creator: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO: editorial magazine cover === */}
      <section className="relative bg-neutral-950 text-white overflow-hidden pt-32 sm:pt-40 pb-24 sm:pb-32">
        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />
        {/* radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(59,130,246,0.18), transparent 60%)",
          }}
          aria-hidden
        />
        {/* ghost outlined word */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-x-0 -bottom-6 sm:-bottom-10 lg:-bottom-16 font-serif font-light leading-[0.85] tracking-[-0.04em] text-[36vw] lg:text-[26vw] whitespace-nowrap text-center"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          }}
        >
          products
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* top issue masthead */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-between mb-12 sm:mb-16 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-white/60"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span>Olyxee · Issue 02</span>
            </div>
            <span className="hidden sm:inline">Two systems · One thesis</span>
            <span>2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-white tracking-[-0.025em] leading-[0.9] text-[clamp(3.5rem,11vw,8.5rem)]"
          >
            Research,
            <br />
            shipped as
            <br />
            <em className="font-normal text-blue-300">working systems</em>
            <span className="text-blue-300">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end"
          >
            <p className="lg:col-span-7 text-lg sm:text-xl text-white/70 font-light leading-[1.55] max-w-2xl">
              Two products. One thesis: AI is most useful when it does the work,
              end to end — and shows you the receipts. Below: the systems we
              ship, and the research that powers them.
            </p>
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.28em] text-white/50">
                <span>Scroll</span>
                <span className="h-px w-12 bg-white/30" />
                <span>Spread 01</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ManifestoStrip />

      <ProductFeature
        index="01"
        label="Execution"
        name="Ordo"
        tagline={<>Goals, in. <span className="not-italic">Finished work, out.</span></>}
        description="Tell Ordo a goal in plain English. It plans the steps, calls the right tools, and ships the finished work — with a clear trail of what it did and why."
        features={[
          "Plain-English goals → multi-step plans",
          "Acts across the apps your team already uses",
          "Audit trail for every decision and tool call",
        ]}
        specs={[
          { k: "Status", v: "Live" },
          { k: "Category", v: "Execution agent" },
          { k: "Built for", v: "Operators & teams" },
          { k: "Surface", v: "Web · API" },
        ]}
        fig="01 — Worked example"
        figCaption="Q1 reconciliation, end to end"
        url="https://ordo.olyxee.com/"
        domain="ordo.olyxee.com"
        logoSrc="/images/ordo-logo.png"
        accent={ORDO_ACCENT}
        visual={<OrdoArchitecture />}
      />

      <ProductFeature
        index="02"
        label="Reconciliation"
        name="Addup"
        tagline={<>Numbers that <span className="not-italic">match.</span></>}
        description="Addup ingests source-of-truth data from banks and ledgers, reconciles every line, and flags what doesn't agree — so finance teams close books in hours, not days."
        features={[
          "Bank, card, and ledger ingestion out of the box",
          "Auto-matching with explainable variance fixes",
          "Books-closed view with one-click drill-down",
        ]}
        specs={[
          { k: "Status", v: "Live" },
          { k: "Category", v: "Financial reconciliation" },
          { k: "Built for", v: "Finance & ops" },
          { k: "Surface", v: "Web · CSV · API" },
        ]}
        fig="02 — Worked example"
        figCaption="Bank rows ↔ ledger entries"
        url="https://addup.olyxee.com/"
        domain="addup.olyxee.com"
        logoSrc="/images/addup-logo.png"
        accent={ADDUP_ACCENT}
        visual={<AddupReconciliation />}
        flip
      />

      <ProductGallery />

      <IntegrationsSection />

      {/* === BOTTOM CTA — editorial reprise === */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-neutral-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-blue-300/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-200/90">
              Colophon · What comes next
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-white max-w-3xl">
            AI needs <em className="font-normal text-blue-300">better foundations</em>.
          </h2>
          <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl mt-8">
            We are building those foundations — system by system, paper by paper. If you want to help build them, the door is open.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-10">
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-950 bg-white hover:bg-neutral-200 px-6 py-3 rounded-full transition-colors"
            >
              View open roles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/research"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:opacity-80"
            >
              <span className="underline underline-offset-4 decoration-blue-300/40">Read the research</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
