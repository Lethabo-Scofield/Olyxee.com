import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function OrdoArchitecture() {
  const steps = [
    { n: 1, y: 90,  app: "Stripe",     desc: "Pull all Q1 payments",   icon: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128" },
    { n: 2, y: 175, app: "QuickBooks", desc: "Match against invoices", icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128" },
    { n: 3, y: 260, app: "Sheets",     desc: "Build summary report",   icon: "https://www.google.com/s2/favicons?domain=sheets.google.com&sz=128" },
    { n: 4, y: 345, app: "Gmail",      desc: "Email it to leadership", icon: "https://www.google.com/s2/favicons?domain=gmail.com&sz=128" },
  ];

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Worked example</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">ordo.olyxee.com</span>
      </div>

      <div className="w-full">
        <svg viewBox="0 0 860 480" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="20" y="170" width="220" height="140" rx="16" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" />
            <text x="36" y="198" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">YOU SAY:</text>
            <text x="36" y="226" fontSize="15" fill="#0a0a0a" fontWeight="600">&ldquo;Reconcile our</text>
            <text x="36" y="248" fontSize="15" fill="#0a0a0a" fontWeight="600">Q1 finances and</text>
            <text x="36" y="270" fontSize="15" fill="#0a0a0a" fontWeight="600">email leadership</text>
            <text x="36" y="292" fontSize="15" fill="#0a0a0a" fontWeight="600">the summary.&rdquo;</text>
            <path d="M 240 232 L 256 240 L 240 248 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" />
          </g>

          <g>
            <rect x="270" y="180" width="140" height="120" rx="18" fill="#0a0a0a" />
            <rect x="316" y="194" width="48" height="48" rx="12" fill="#ffffff" />
            <image href="/images/ordo-logo.png" x="320" y="198" width="40" height="40" />
            <text x="340" y="266" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700" fontFamily="ui-serif, Georgia">Ordo</text>
            <text x="340" y="284" textAnchor="middle" fontSize="10" fill="#a3a3a3" fontFamily="ui-monospace, monospace">plans 4 steps →</text>
          </g>

          <path d="M 256 240 L 270 240" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          <line x1="445" y1="60" x2="445" y2="375" stroke="#e5e5e5" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 410 240 C 425 240, 435 90, 445 90" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />

          <circle r="6" fill="#3b82f6">
            <animate attributeName="cx" values="445;445;445;445;445" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="90;175;260;345;90" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
          </circle>

          {steps.map((s) => (
            <g key={s.n}>
              <circle cx="445" cy={s.y} r="14" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
              <text x="445" y={s.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0a0a0a">{s.n}</text>
              <rect x="475" y={s.y - 24} width="370" height="48" rx="10" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.25" />
              <rect x="487" y={s.y - 14} width="104" height="28" rx="7" fill="#f8fafc" stroke="#e5e5e5" />
              <image href={s.icon} x={495} y={s.y - 9} width="18" height="18" />
              <text x={518} y={s.y + 4} fontSize="12" fill="#262626" fontWeight="600">{s.app}</text>
              <text x={605} y={s.y + 4} fontSize="13" fill="#404040" fontWeight="500">{s.desc}</text>
            </g>
          ))}

          <g>
            <rect x="475" y="410" width="370" height="50" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
            <circle cx="500" cy="435" r="13" fill="#15803d" />
            <path d="M 494 435 L 499 440 L 507 431" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x={524} y="431" fontSize="13" fill="#14532d" fontWeight="700">Done</text>
            <text x={524} y="448" fontSize="11" fill="#166534">Reconciled report sent to 3 leaders · audit trail saved</text>
          </g>

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
  const rows = [
    { y: 90,  bank: { src: "Stripe payout",   amt: "$12,480.00" }, ledger: { ref: "INV-2031", amt: "$12,480.00" }, status: "match" as const },
    { y: 175, bank: { src: "Bank deposit",    amt: "$  4,250.00" }, ledger: { ref: "INV-2032", amt: "$  4,250.00" }, status: "match" as const },
    { y: 260, bank: { src: "Wire — Acme Co.", amt: "$  9,800.00" }, ledger: { ref: "INV-2033", amt: "$  9,820.00" }, status: "fixed" as const },
    { y: 345, bank: { src: "Card settlement", amt: "$  2,140.00" }, ledger: { ref: "INV-2034", amt: "$  2,140.00" }, status: "match" as const },
  ];

  const colorFor = (s: "match" | "fixed") => (s === "match" ? "#15803d" : "#0369a1");
  const fillFor  = (s: "match" | "fixed") => (s === "match" ? "#f0fdf4" : "#eff6ff");
  const ringFor  = (s: "match" | "fixed") => (s === "match" ? "#86efac" : "#bae6fd");

  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 overflow-hidden shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Worked example</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">addup.olyxee.com</span>
      </div>

      <div className="w-full">
        <svg viewBox="0 0 860 480" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="56" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">BANK & SOURCES</text>
          {rows.map((r, i) => (
            <g key={`b-${i}`}>
              <rect x="20" y={r.y - 24} width="240" height="48" rx="10" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1.25" />
              <text x="32" y={r.y - 4} fontSize="12" fill="#404040" fontWeight="600">{r.bank.src}</text>
              <text x="32" y={r.y + 14} fontSize="13" fill="#0a0a0a" fontFamily="ui-monospace, monospace">{r.bank.amt}</text>
              <path d={`M 260 ${r.y} L 296 ${r.y}`} fill="none" stroke="#0a0a0a" strokeWidth="1.25" />
            </g>
          ))}

          <g>
            <rect x="296" y="180" width="170" height="120" rx="18" fill="#0a0a0a" />
            <rect x="346" y="194" width="70" height="48" rx="10" fill="#ffffff" />
            <image href="/images/addup-logo.png" x="350" y="200" width="62" height="36" preserveAspectRatio="xMidYMid meet" />
            <text x="381" y="266" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700" fontFamily="ui-serif, Georgia">Addup</text>
            <text x="381" y="284" textAnchor="middle" fontSize="10" fill="#a3a3a3" fontFamily="ui-monospace, monospace">matches & verifies →</text>
          </g>

          {rows.map((r, i) => (
            <path key={`o-${i}`} d={`M 466 240 C 480 240, 490 ${r.y}, 510 ${r.y}`} fill="none" stroke="#0a0a0a" strokeWidth="1.25" />
          ))}

          <circle r="6" fill="#3b82f6">
            <animate attributeName="cx" values="510;510;510;510;510" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="90;175;260;345;90" keyTimes="0;0.25;0.5;0.75;1" dur="6s" repeatCount="indefinite" />
          </circle>

          <text x="510" y="56" fontSize="10" fill="#94a3b8" fontFamily="ui-monospace, monospace" letterSpacing="1">LEDGER · RECONCILED</text>
          {rows.map((r, i) => (
            <g key={`l-${i}`}>
              <rect x="510" y={r.y - 24} width="335" height="48" rx="10" fill={fillFor(r.status)} stroke={ringFor(r.status)} strokeWidth="1.5" />
              <circle cx="535" cy={r.y} r="13" fill={colorFor(r.status)} />
              {r.status === "match" ? (
                <path d={`M 529 ${r.y} L 534 ${r.y + 5} L 542 ${r.y - 4}`} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <line x1="530" y1={r.y - 4} x2="540" y2={r.y - 4} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="530" y1={r.y + 4} x2="540" y2={r.y + 4} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}
              <text x="558" y={r.y - 4} fontSize="12" fill="#262626" fontWeight="600">{r.ledger.ref}</text>
              <text x="558" y={r.y + 14} fontSize="11" fill={colorFor(r.status)} fontWeight="600" fontFamily="ui-monospace, monospace">
                {r.status === "match" ? "matched" : "auto-fixed · variance flagged"}
              </text>
              <text x="833" y={r.y + 4} textAnchor="end" fontSize="13" fill="#0a0a0a" fontFamily="ui-monospace, monospace" fontWeight="600">{r.ledger.amt}</text>
            </g>
          ))}

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

const ORDO_FEATURES = [
  "Plain-English goals turned into multi-step plans",
  "Acts across the apps your team already uses",
  "Audit trail for every decision and tool call",
  "Human approvals at any step you choose",
];

const ADDUP_FEATURES_FREE = [
  "Connect bank, card, and ledger sources",
  "Automatic matching with variance detection",
  "Clear explanations for every mismatch",
];

const ADDUP_FEATURES_UPGRADE = [
  "Higher transaction volumes",
  "Multi-entity and multi-currency",
  "Team workspaces with roles and approvals",
  "Priority support and dedicated onboarding",
];

const INTEGRATIONS = [
  "Microsoft 365, Outlook, Office",
  "Salesforce, Zendesk, Freshdesk",
  "Xero, QuickBooks, Stripe",
  "Slack, Teams, Notion, Sheets",
];

const ProductsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Products"
        description="Olyxee builds AI execution systems for real business operations. Ordo is the core AI execution system. Addup is our first focused application, starting with accounting reconciliation."
        path="/products"
        keywords={[
          "Olyxee products",
          "Ordo AI execution",
          "Addup reconciliation",
          "AI workflow automation",
          "AI for accounting",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Ordo",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Cloud",
            description:
              "Ordo is the core Olyxee AI execution system. It turns goals into completed multi-step workflows across the tools your team already uses, with full audit trails.",
            url: "https://ordo.olyxee.com/",
            creator: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Addup",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Cloud",
            description:
              "Addup is the first focused Olyxee application. It applies AI execution to accounting, starting with reconciliation and mismatch explanation. Free to use, with paid upgrades.",
            url: "https://addup.olyxee.com/",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free to use, with optional paid upgrades for higher volume and team features.",
            },
            creator: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
          },
        ]}
      />
      <div className="grain" />
      <Header />

      {/* === HERO — light, centered, consistent with About / Enterprise / Partnerships === */}
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
            Products
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            AI systems that <em className="text-neutral-500 not-italic">execute</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Ordo is our core AI execution system. Addup is our first focused application, starting with accounting reconciliation.
          </motion.p>
        </div>
      </section>

      {/* === PRODUCT OVERVIEW CARDS === */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ordo card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="relative p-8 sm:p-10 border border-neutral-200 rounded-2xl bg-white hover:border-neutral-300 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-blue-200/70 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image src="/images/ordo-logo.png" alt="Ordo" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                </div>
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.25em]">Core system</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight mb-3">Ordo</h2>
              <p className="text-base text-neutral-500 font-light leading-relaxed mb-8">
                The core Olyxee AI execution system. Tell Ordo a goal in plain English. It plans the steps, calls the right tools, and ships the finished work — with a clear trail of what it did and why.
              </p>
              <div className="mt-auto flex items-center gap-4">
                <a
                  href="https://ordo.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-5 py-2.5 rounded-full transition-colors"
                >
                  Visit Ordo
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#ordo" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                  See how it works
                </a>
              </div>
            </motion.div>

            {/* Addup card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="relative p-8 sm:p-10 border border-neutral-200 rounded-2xl bg-white hover:border-neutral-300 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-emerald-200/70 shadow-sm flex items-center justify-center overflow-hidden">
                    <Image src="/images/addup-logo.png" alt="Addup" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-[0.25em]">Focused application</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold tracking-wide border border-emerald-200/70">
                  Free
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight mb-3">Addup</h2>
              <p className="text-base text-neutral-500 font-light leading-relaxed mb-8">
                Our first focused application, starting with accounting reconciliation. Ingests source-of-truth data from banks and ledgers, reconciles every line, and explains what doesn&apos;t agree. Free to use, with paid upgrades for advanced features.
              </p>
              <div className="mt-auto flex items-center gap-4">
                <a
                  href="https://addup.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-5 py-2.5 rounded-full transition-colors"
                >
                  Try Addup free
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#addup" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                  See how it works
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === ORDO DEEP DIVE === */}
      <section id="ordo" className="py-20 sm:py-32 px-4 sm:px-6 border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.25em] mb-5">Ordo · Core AI execution system</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
                Goals in. <em className="text-neutral-500 not-italic">Finished work out.</em>
              </h2>
              <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed mb-10 max-w-md">
                Ordo runs end-to-end business workflows across your existing tools. Every step is auditable, every action is reviewable, and human approvals can be added wherever they&apos;re needed.
              </p>

              <ul className="space-y-3 border-t border-neutral-200 pt-6">
                {ORDO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 font-light">
                    <Check className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://ordo.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
                >
                  Visit Ordo
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <Link href="/enterprise" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                  Custom deployments →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <OrdoArchitecture />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === ADDUP DEEP DIVE === */}
      <section id="addup" className="py-20 sm:py-32 px-4 sm:px-6 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <AddupReconciliation />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.25em] mb-5">Addup · Reconciliation</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
                Numbers that <em className="text-neutral-500 not-italic">match.</em>
              </h2>
              <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed mb-10 max-w-md">
                Addup applies the Olyxee execution model to accounting. Connect your sources, and Addup matches every line and explains every mismatch — so finance teams close books in hours, not days.
              </p>

              <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-neutral-900">Free</p>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold tracking-wide border border-emerald-200/70">
                      Get started
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {ADDUP_FEATURES_FREE.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700 font-light">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-neutral-50/60">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-neutral-900">Upgrade for more features</p>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.2em]">Paid</span>
                  </div>
                  <ul className="space-y-2.5">
                    {ADDUP_FEATURES_UPGRADE.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700 font-light">
                        <span className="text-base leading-none text-neutral-400 shrink-0 mt-0.5">+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://addup.olyxee.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
                >
                  Try Addup free
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="mailto:scofield@olyxee.com?subject=Addup%20%E2%80%94%20Upgrade%20inquiry"
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Talk to us about upgrading →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === INTEGRATIONS === */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em] mb-5">Integrations</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1] mb-6">
              Works with the tools you already use.
            </h2>
            <p className="text-base text-neutral-500 font-light leading-relaxed mb-8 max-w-md">
              No rip and replace. Connect the systems your team already runs on, and Olyxee handles the work between them.
            </p>
            <ul className="space-y-2.5 border-t border-neutral-200 pt-6 max-w-md">
              {INTEGRATIONS.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 font-light">
                  <Check className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{i}</span>
                </li>
              ))}
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
                alt="Integration logos including Microsoft 365, Salesforce, Xero, Outlook, Zendesk and others that Olyxee connects to."
                width={970}
                height={550}
                className="relative w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* === BOTTOM CTA — matches enterprise/partnerships dark CTA === */}
      <section className="py-20 sm:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.25em] mb-6">Get started</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              Put Olyxee to work in your business.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
              Try Addup for free, or talk to us about a custom Ordo deployment for your team&apos;s workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://addup.olyxee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Try Addup free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/enterprise"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
              >
                Talk to enterprise
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
