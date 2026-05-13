import { FC, useId } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Link2,
  Layers,
  CircleDollarSign,
  Users,
  Headphones,
  Check,
} from "lucide-react";

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


const ADDUP_FREE = [
  "Connect bank, card, and ledger sources",
  "Automatic matching with variance detection",
  "Clear explanations for every mismatch",
  "Single-entity, single-currency books",
];

const ADDUP_PRO = [
  { icon: Layers, label: "Higher transaction volumes" },
  { icon: CircleDollarSign, label: "Multi-entity, multi-currency" },
  { icon: Users, label: "Team workspaces with roles" },
  { icon: Headphones, label: "Priority support and onboarding" },
];

const INTEGRATION_CHIPS = [
  "Microsoft 365", "Outlook", "Salesforce", "Zendesk", "Freshdesk",
  "Xero", "QuickBooks", "Stripe", "Slack", "Teams", "Notion", "Google Sheets",
  "Okta", "Vanta", "Drive", "Gmail",
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

      {/* === HERO - clean, catchy === */}
      <section className="relative pt-40 sm:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 bg-white">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-8"
          >
            Products
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.02]"
          >
            Just ask. <em className="text-neutral-400 not-italic">It&apos;s done.</em>
          </motion.h1>
        </div>
      </section>

      {/* === ORDO === one canonical product section, features-led === */}
      <section id="ordo" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70">
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
              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.28em] mb-6">
                Ordo
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
                Goals in. <em className="text-neutral-400 not-italic">Finished work out.</em>
              </h2>

              <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-md mb-10">
                Describe what you need. Ordo plans the steps, runs the work across your tools, and shows you the trail.
              </p>

              <div className="flex flex-wrap items-center gap-4">
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
      <section id="addup" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-white">
        <div className="max-w-6xl mx-auto">
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

              {/* Plan cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* FREE plan card */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-white ring-1 ring-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-900">Free</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-[0.18em]">
                        Live
                      </span>
                    </div>
                    <span className="font-serif text-2xl text-neutral-900">$0</span>
                  </div>
                  <ul className="space-y-2">
                    {ADDUP_FREE.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] text-neutral-700 font-light leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRO plan card */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-950 text-white ring-1 ring-neutral-900 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)" }}
                  />
                  <div className="relative flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">Pro</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono uppercase tracking-[0.18em]">
                        Upgrade
                      </span>
                    </div>
                    <span className="font-serif text-sm text-white/60 italic">Talk to us</span>
                  </div>
                  <div className="relative grid grid-cols-1 gap-y-3">
                    {ADDUP_PRO.map((p) => {
                      const Icon = p.icon;
                      return (
                        <div key={p.label} className="flex items-start gap-2">
                          <div className="w-7 h-7 rounded-lg bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-white/70" strokeWidth={1.75} />
                          </div>
                          <p className="text-[12px] text-white/80 font-light leading-snug pt-1">{p.label}</p>
                        </div>
                      );
                    })}
                  </div>
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
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-neutral-200/70 bg-neutral-50/50 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(165,180,252,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-neutral-500 mb-5 inline-flex items-center gap-2"
          >
            <Link2 className="w-3 h-3" aria-hidden /> Integrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-12 max-w-3xl mx-auto"
          >
            Plugs into the tools you <em className="text-neutral-500 not-italic">already use.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto"
          >
            {INTEGRATION_CHIPS.map((name, i) => (
              <span
                key={name}
                className="px-3.5 sm:px-4 py-2 rounded-full bg-white ring-1 ring-neutral-200 shadow-sm text-xs sm:text-sm font-medium text-neutral-800"
              >
                {name}
              </span>
            ))}
            <span className="px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-medium">
              + your stack
            </span>
          </motion.div>
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
