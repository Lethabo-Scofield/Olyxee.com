import { FC, useId } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function OrdoArchitecture() {
  const PILL_X = 50;
  const PILL_W = 360;
  const PILL_H = 60;
  const PILL_SPACING = 92;
  const FIRST_PILL_Y = 110;
  const VB_W = 460;
  const VB_H = 600;
  const pillCenterY = (i: number) => FIRST_PILL_Y + i * PILL_SPACING + PILL_H / 2;
  const pillRightX = PILL_X + PILL_W;
  const pillLeftX = PILL_X;

  const reactId = useId();
  const gradId = `ordo-bg-grad-${reactId}`;
  const shadowId = `ordo-pill-shadow-${reactId}`;
  const titleId = `ordo-title-${reactId}`;
  const descId = `ordo-desc-${reactId}`;

  const pills = [
    {
      title: "Pull access logs",
      service: "Okta",
      iconBg: "#EDE9FE",
      iconStroke: "#6D28D9",
      icon: (
        <>
          <rect width="18" height="11" x="3" y="11" rx="2" fill="none" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" />
        </>
      ),
      isDone: false,
    },
    {
      title: "Check controls",
      service: "Vanta",
      iconBg: "#DCFCE7",
      iconStroke: "#15803D",
      icon: (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" />
          <path d="m9 12 2 2 4-4" fill="none" />
        </>
      ),
      isDone: false,
    },
    {
      title: "Build evidence pack",
      service: "Drive",
      iconBg: "#DBEAFE",
      iconStroke: "#1D4ED8",
      icon: (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" />
          <polyline points="14 2 14 8 20 8" fill="none" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </>
      ),
      isDone: false,
    },
    {
      title: "Email audit team",
      service: "Gmail",
      iconBg: "#FFE4E6",
      iconStroke: "#BE123C",
      icon: (
        <>
          <rect width="20" height="16" x="2" y="4" rx="2" fill="none" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </>
      ),
      isDone: false,
    },
    {
      title: "Done",
      service: "Evidence packaged · audit trail saved",
      iconBg: "#BBF7D0",
      iconStroke: "#15803D",
      icon: <polyline points="20 6 9 17 4 12" fill="none" />,
      isDone: true,
    },
  ];

  return (
    <div>
      <div className="relative max-w-[500px] mx-auto rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto block"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>How Ordo executes a SOC 2 access review goal</title>
          <desc id={descId}>
            From the user prompt &ldquo;Run a SOC 2 access review and email findings
            to the audit team,&rdquo; Ordo plans and executes five sequential steps:
            pull access logs from Okta, check controls in Vanta, build an evidence
            pack in Drive, email the audit team in Gmail, and complete with an
            audit trail saved.
          </desc>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE7D6" />
              <stop offset="45%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <filter id={shadowId} x="-20%" y="-100%" width="140%" height="300%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0a0a0a" floodOpacity="0.08" />
            </filter>
          </defs>

          <rect width={VB_W} height={VB_H} fill={`url(#${gradId})`} />

          <text x={PILL_X} y="40" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2" fill="#475569">USER PROMPT</text>
          <text x={PILL_X} y="70" fontSize="15" fill="#0a0a0a" fontFamily="ui-serif, Georgia" fontStyle="italic">&ldquo;Run a SOC 2 access review and</text>
          <text x={PILL_X} y="90" fontSize="15" fill="#0a0a0a" fontFamily="ui-serif, Georgia" fontStyle="italic">email findings to the audit team.&rdquo;</text>

          {[0, 1, 2, 3].map((i) => {
            const isRight = i % 2 === 0;
            const startX = isRight ? pillRightX : pillLeftX;
            const ctrlOffset = 50;
            const ctrlX = isRight ? startX + ctrlOffset : startX - ctrlOffset;
            const arrowheadDx = isRight ? 8 : -8;
            const cy0 = pillCenterY(i);
            const cy1 = pillCenterY(i + 1);
            return (
              <g key={i}>
                <path
                  d={`M ${startX} ${cy0} C ${ctrlX} ${cy0}, ${ctrlX} ${cy1}, ${startX} ${cy1}`}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                <polygon
                  points={`${startX},${cy1} ${startX + arrowheadDx},${cy1 - 5} ${startX + arrowheadDx},${cy1 + 5}`}
                  fill="#94A3B8"
                />
              </g>
            );
          })}

          {pills.map((p, i) => {
            const cy = pillCenterY(i);
            const yTop = cy - PILL_H / 2;
            return (
              <g key={i}>
                <rect x={PILL_X} y={yTop} width={PILL_W} height={PILL_H} rx={PILL_H / 2} fill="#ffffff" filter={`url(#${shadowId})`} />
                <rect x={PILL_X + 14} y={cy - 16} width="32" height="32" rx="8" fill={p.iconBg} />
                <g transform={`translate(${PILL_X + 18}, ${cy - 12})`} stroke={p.iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {p.icon}
                </g>
                <text x={PILL_X + 60} y={cy - 2} fontSize="14" fontWeight="600" fill="#0a0a0a">{p.title}</text>
                <text x={PILL_X + 60} y={cy + 16} fontSize="11" fill={p.isDone ? "#15803D" : "#737373"} fontWeight={p.isDone ? "500" : "400"}>{p.service}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-4 text-center text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
        Worked example · ordo.olyxee.com
      </p>
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
  "Custom skill packs for your team's workflows",
];

const ADDUP_FEATURES_FREE = [
  "Connect bank, card, and ledger sources",
  "Automatic matching with variance detection",
  "Clear explanations for every mismatch",
  "Single-entity, single-currency books",
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

      {/* === HERO — light, centered, consistent with About / Enterprise === */}
      <section className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 bg-white">
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

      {/* === ORDO === one canonical product section, features-led === */}
      <section id="ordo" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between pb-6 sm:pb-8 mb-10 sm:mb-12 border-b border-neutral-200 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
            <span>01</span>
            <span className="text-neutral-700">Ordo · Core system</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-blue-200/70 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image src="/images/ordo-logo.png" alt="Ordo" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                </div>
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.25em]">Compliance and operations</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Goals in. <em className="text-neutral-500 not-italic">Finished work out.</em>
              </h2>

              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                What&apos;s in this version
              </p>
              <ul className="space-y-3 border-t border-neutral-200 pt-5">
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

      {/* === ADDUP === one canonical product section, features-led === */}
      <section id="addup" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between pb-6 sm:pb-8 mb-10 sm:mb-12 border-b border-neutral-200 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
            <span>02</span>
            <span className="text-neutral-700">Addup · Focused application</span>
          </div>

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
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-emerald-200/70 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image src="/images/addup-logo.png" alt="Addup" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                </div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-[0.25em]">Reconciliation</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Numbers that <em className="text-neutral-500 not-italic">match.</em>
              </h2>

              <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-neutral-900">Free version</p>
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
                    <p className="text-sm font-semibold text-neutral-900">Upgrade adds</p>
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
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between pb-6 sm:pb-8 mb-10 sm:mb-12 border-b border-neutral-200 text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
            <span>03</span>
            <span className="text-neutral-700">Integrations</span>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1] mb-8">
              Works with the tools you already use.
            </h2>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
              Connects to
            </p>
            <ul className="space-y-2.5 border-t border-neutral-200 pt-5 max-w-md">
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
