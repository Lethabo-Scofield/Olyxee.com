import { FC, useId } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function HeroWaves() {
  // Refined Stripe-style aurora: silky diagonal ribbons that flow behind the
  // headline rather than across it. Heavy blur, soft pastel palette, low
  // opacity for an editorial, premium feel that doesn't fight the type.
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="wg-aurora-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="600">
            <stop offset="0%"   stopColor="#dbeafe" stopOpacity="0" />
            <stop offset="35%"  stopColor="#93c5fd" />
            <stop offset="70%"  stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wg-aurora-2" gradientUnits="userSpaceOnUse" x1="0" y1="200" x2="1600" y2="800">
            <stop offset="0%"   stopColor="#fed7aa" stopOpacity="0" />
            <stop offset="40%"  stopColor="#fdba74" />
            <stop offset="70%"  stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wg-aurora-3" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="1600" y2="700">
            <stop offset="0%"   stopColor="#bae6fd" stopOpacity="0" />
            <stop offset="50%"  stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
          </linearGradient>
          <filter id="wave-soft-blur" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="50" />
          </filter>
        </defs>

        <g filter="url(#wave-soft-blur)" style={{ mixBlendMode: "multiply" }}>
          <g style={{ transformOrigin: "50% 50%", animation: "wave-flow-a 22s ease-in-out infinite", willChange: "transform" }}>
            <path
              d="M-200,420 C200,260 600,560 1000,360 C1300,210 1500,420 1800,300"
              stroke="url(#wg-aurora-1)"
              strokeWidth="180"
              strokeLinecap="round"
              opacity="0.55"
              fill="none"
            />
          </g>
          <g style={{ transformOrigin: "50% 50%", animation: "wave-flow-b 28s ease-in-out infinite", willChange: "transform" }}>
            <path
              d="M-200,520 C300,380 700,640 1100,460 C1400,330 1600,520 1900,420"
              stroke="url(#wg-aurora-2)"
              strokeWidth="200"
              strokeLinecap="round"
              opacity="0.45"
              fill="none"
            />
          </g>
          <g style={{ transformOrigin: "50% 50%", animation: "wave-flow-c 34s ease-in-out infinite", willChange: "transform" }}>
            <path
              d="M-200,320 C200,200 700,440 1100,260 C1400,140 1600,320 1900,220"
              stroke="url(#wg-aurora-3)"
              strokeWidth="140"
              strokeLinecap="round"
              opacity="0.35"
              fill="none"
            />
          </g>
        </g>
      </svg>
      {/* Soft white wash so the aurora sits behind the type */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white/70" />
      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

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
      iconBg: "#F5F5F4",
      iconStroke: "#404040",
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
      iconBg: "#F5F5F4",
      iconStroke: "#404040",
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
      iconBg: "#F5F5F4",
      iconStroke: "#404040",
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
      iconBg: "#F5F5F4",
      iconStroke: "#404040",
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
      iconBg: "#0a0a0a",
      iconStroke: "#ffffff",
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
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#F4F4F5" />
            </linearGradient>
            <filter id={shadowId} x="-20%" y="-100%" width="140%" height="300%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0a0a0a" floodOpacity="0.06" />
            </filter>
          </defs>

          <rect width={VB_W} height={VB_H} fill={`url(#${gradId})`} />

          <text x={PILL_X} y="40" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2" fill="#737373">USER PROMPT</text>
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
                  stroke="#A3A3A3"
                  strokeWidth="1.25"
                />
                <polygon
                  points={`${startX},${cy1} ${startX + arrowheadDx},${cy1 - 5} ${startX + arrowheadDx},${cy1 + 5}`}
                  fill="#A3A3A3"
                />
              </g>
            );
          })}

          {pills.map((p, i) => {
            const cy = pillCenterY(i);
            const yTop = cy - PILL_H / 2;
            const pillFill = p.isDone ? "#0a0a0a" : "#ffffff";
            const titleFill = p.isDone ? "#ffffff" : "#0a0a0a";
            const serviceFill = p.isDone ? "#A3A3A3" : "#737373";
            return (
              <g key={i}>
                <rect x={PILL_X} y={yTop} width={PILL_W} height={PILL_H} rx={PILL_H / 2} fill={pillFill} stroke={p.isDone ? "#0a0a0a" : "#E5E5E5"} strokeWidth="1" filter={`url(#${shadowId})`} />
                <rect x={PILL_X + 14} y={cy - 16} width="32" height="32" rx="8" fill={p.iconBg} />
                <g transform={`translate(${PILL_X + 18}, ${cy - 12})`} stroke={p.iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {p.icon}
                </g>
                <text x={PILL_X + 60} y={cy - 2} fontSize="14" fontWeight="600" fill={titleFill}>{p.title}</text>
                <text x={PILL_X + 60} y={cy + 16} fontSize="11" fill={serviceFill} fontWeight="400">{p.service}</text>
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


const ORDO_FEATURES = [
  "Plain-English goals turned into multi-step plans",
  "Acts across the apps your team already uses",
  "Audit trail for every decision and tool call",
  "Human approvals at any step you choose",
  "Custom skill packs for your team's workflows",
];

const ORDO_USE_CASES = [
  {
    src: "/images/ordo-vendor-risk.png",
    title: "Third-party risk management",
    body: "Continuously score vendors against your policies and surface high-risk relationships before they become incidents.",
  },
  {
    src: "/images/ordo-checks.png",
    title: "Accelerate compliance checks",
    body: "Run, queue, and validate controls in parallel so evidence is ready before the auditor asks.",
  },
  {
    src: "/images/ordo-frameworks.png",
    title: "Frameworks built in",
    body: "ISO, NIST AI RMF, and the EU AI Act mapped to your controls, with progress tracked end to end.",
  },
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

      {/* === HERO - light, centered, consistent with About / Enterprise === */}
      <section className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 bg-white overflow-hidden">
        <HeroWaves />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
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
                <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-neutral-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image src="/images/ordo-logo.png" alt="Ordo" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.25em]">Compliance and operations</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Goals in. <em className="text-neutral-500 not-italic">Finished work out.</em>
              </h2>

              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                What&apos;s in this version
              </p>
              <ul className="border-t border-neutral-200">
                {ORDO_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="py-3.5 sm:py-4 border-b border-neutral-200 text-sm sm:text-[15px] text-neutral-800 font-light leading-relaxed"
                  >
                    {f}
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

          <div id="ordo-use-cases" className="mt-20 sm:mt-28 pt-10 sm:pt-12 border-t border-neutral-200 scroll-mt-24">
            <div className="flex items-baseline justify-between mb-8 sm:mb-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500">
                Compliance workflows
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-400">
                03 examples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {ORDO_USE_CASES.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="group"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
                    <Image
                      src={uc.src}
                      alt={uc.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-neutral-900 tracking-tight leading-snug">
                    {uc.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-500 font-light leading-relaxed">
                    {uc.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === ADDUP === one canonical product section, features-led === */}
      <section id="addup" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-white">
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
              className="lg:col-span-7 order-2 lg:order-1 relative"
            >
              <div aria-hidden className="absolute -inset-8 -z-10 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 blur-2xl rounded-[2rem]" />
              <div className="relative">
                <Image
                  src="/images/products/financial-close-cards.png"
                  alt="Three Financial Close report templates: P&L Revenues Variance Analysis, Tax Reconciliation, and Payments Reconciliation, each with a Generate Report button"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
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
                <div className="relative w-10 h-10 rounded-lg bg-white ring-1 ring-neutral-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image src="/images/addup-logo.png" alt="Addup" width={32} height={32} className="w-[80%] h-[80%] object-contain" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.25em]">Reconciliation</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Numbers that <em className="text-neutral-500 not-italic">match.</em>
              </h2>

              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-sm font-semibold text-neutral-900">Free version</p>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.2em]">Free</span>
                </div>
                <ul className="border-t border-neutral-200">
                  {ADDUP_FEATURES_FREE.map((f) => (
                    <li
                      key={f}
                      className="py-3.5 border-b border-neutral-200 text-sm sm:text-[15px] text-neutral-800 font-light leading-relaxed"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline justify-between mt-10 mb-3">
                  <p className="text-sm font-semibold text-neutral-900">Upgrade adds</p>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.2em]">Paid</span>
                </div>
                <ul className="border-t border-neutral-200">
                  {ADDUP_FEATURES_UPGRADE.map((f) => (
                    <li
                      key={f}
                      className="py-3.5 border-b border-neutral-200 text-sm sm:text-[15px] text-neutral-500 font-light leading-relaxed"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
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
            <ul className="border-t border-neutral-200 max-w-md">
              {INTEGRATIONS.map((i) => (
                <li
                  key={i}
                  className="py-3.5 border-b border-neutral-200 text-sm sm:text-[15px] text-neutral-800 font-light leading-relaxed"
                >
                  {i}
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

      {/* === BOTTOM CTA - matches enterprise/partnerships dark CTA === */}
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
