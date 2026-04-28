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

function AddupSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-14 sm:mt-20"
    >
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-blue-100/60 blur-xl" aria-hidden />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/addup-logo.png"
                alt="Addup"
                width={80}
                height={80}
                className="w-[88%] h-[88%] object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 leading-none">Addup</h2>
            <p className="text-sm text-neutral-500 mt-2 font-mono">addup.olyxee.com</p>
          </div>
        </div>
        <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
          Addup cleans, matches, and verifies financial data so teams close books faster with less manual work.
        </p>
        <a
          href="https://addup.olyxee.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-colors"
        >
          Visit Addup <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="lg:col-span-7">
        <AddupReconciliation />
      </div>
    </motion.div>
  );
}

function OrdoSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-14 sm:mt-20"
    >
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-blue-100/60 blur-xl" aria-hidden />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/ordo-logo.png"
                alt="Ordo"
                width={80}
                height={80}
                className="w-[88%] h-[88%] object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 leading-none">Ordo</h2>
            <p className="text-sm text-neutral-500 mt-2 font-mono">ordo.olyxee.com</p>
          </div>
        </div>
        <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
          Tell Ordo a goal in plain English. It plans the steps, uses your apps, and ships the finished work.
        </p>
        <a
          href="https://ordo.olyxee.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-colors"
        >
          Visit Ordo <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="lg:col-span-7">
        <OrdoArchitecture />
      </div>
    </motion.div>
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

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
          >
            <Image
              src="/images/products-hero-bg-v2.jpeg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

            <div className="relative px-6 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-xs font-semibold text-blue-300 uppercase tracking-[0.25em] mb-5"
              >
                Products
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
              >
                Research, shipped as <span className="text-blue-300 italic font-normal">working systems</span>.
              </motion.h1>
            </div>
          </motion.div>

          <OrdoSpotlight />
          <AddupSpotlight />
        </div>
      </section>

      <ProductGallery />

      <IntegrationsSection />


      <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="rounded-2xl sm:rounded-3xl bg-neutral-100 px-6 sm:px-12 py-16 sm:py-24 text-center"
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.25em] mb-5">What comes next</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
              AI needs <span className="text-blue-600">better foundations</span>.
            </h2>
            <p className="text-base sm:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              We are building those foundations. Join us on the journey.
            </p>
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-6 py-3 rounded-full transition-colors duration-200">
              View open roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
