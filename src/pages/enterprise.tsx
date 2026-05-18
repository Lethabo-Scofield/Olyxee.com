import { FC, useState } from "react";
import Image from "next/image";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type Phase = { window: string; title: string; bullets: string[] };
type Outcome = {
  id: string;
  label: string;
  short: string;
  metric: { headline: string; before: string; after: string };
  phases: [Phase, Phase, Phase];
  requires: string[];
};

const OUTCOMES: Outcome[] = [
  {
    id: "close-books",
    label: "Close the books faster",
    short: "Finance",
    metric: {
      headline: "Cut month-end close from 12 days to 3.",
      before: "12 days",
      after: "3 days",
    },
    phases: [
      {
        window: "Days 0–30",
        title: "Reconciliation agent, live",
        bullets: [
          "Ledger sync with QBO or NetSuite",
          "Auto-match 80%+ of transactions",
        ],
      },
      {
        window: "Days 30–60",
        title: "Approvals and exception flows",
        bullets: [
          "Human-in-the-loop queues",
          "Audit trail wired to your warehouse",
        ],
      },
      {
        window: "Days 60–90",
        title: "End-to-end close orchestration",
        bullets: [
          "Cross-entity consolidation",
          "Auto-prepared close packet",
        ],
      },
    ],
    requires: [
      "Read access to your accounting system",
      "One finance lead as owner",
    ],
  },
  {
    id: "shipments",
    label: "Track every shipment, every minute",
    short: "Logistics",
    metric: {
      headline: "Catch 70% more shipment exceptions before they hit the customer.",
      before: "Caught late",
      after: "Caught early",
    },
    phases: [
      {
        window: "Days 0–30",
        title: "Carrier and WMS ingest",
        bullets: [
          "Live tracking from your top carriers",
          "Status normalised across providers",
        ],
      },
      {
        window: "Days 30–60",
        title: "Supplier coordination agent",
        bullets: [
          "Auto-pings on stalled shipments",
          "Daily exception digest per region",
        ],
      },
      {
        window: "Days 60–90",
        title: "Predictive ETA and re-routing",
        bullets: [
          "ETA model on your lane history",
          "Re-route suggestions for at-risk freight",
        ],
      },
    ],
    requires: [
      "TMS or WMS API access",
      "One ops lead as owner",
    ],
  },
  {
    id: "approvals",
    label: "Replace manual approval chains",
    short: "Operations",
    metric: {
      headline: "Drop median approval time from 4 days to 4 hours.",
      before: "4 days",
      after: "4 hours",
    },
    phases: [
      {
        window: "Days 0–30",
        title: "Policy-aware approval agent",
        bullets: [
          "Policy codified as auditable rules",
          "Agent drafts decisions with rationale",
        ],
      },
      {
        window: "Days 30–60",
        title: "Multi-system orchestration",
        bullets: [
          "Wired into Workday, SAP, or Jira",
          "Exportable audit trail per approval",
        ],
      },
      {
        window: "Days 60–90",
        title: "Continuous policy tuning",
        bullets: [
          "Decision-quality dashboard",
          "Quarterly tuning loop owned by Olyxee",
        ],
      },
    ],
    requires: [
      "Current approval policy docs",
      "An operations workflow owner",
    ],
  },
  {
    id: "vendor",
    label: "Replace a third-party AI vendor",
    short: "Migration",
    metric: {
      headline: "Bring a workflow in-house with no functionality loss.",
      before: "Vendor-owned",
      after: "In-house",
    },
    phases: [
      {
        window: "Days 0–30",
        title: "Parity audit",
        bullets: [
          "Map every vendor input and output",
          "Side-by-side accuracy comparison",
        ],
      },
      {
        window: "Days 30–60",
        title: "Shadow deployment",
        bullets: [
          "Ordo runs in shadow in production",
          "Hand-off plan with documented rollback",
        ],
      },
      {
        window: "Days 60–90",
        title: "Cutover and ownership",
        bullets: [
          "Vendor cancellation handover",
          "Internal runbooks and on-call",
        ],
      },
    ],
    requires: [
      "Current vendor contract terms",
      "An engineering point of contact",
    ],
  },
];

type Scope = {
  id: string;
  label: string;
  phaseCount: 1 | 3;
  duration: string;
  ctaSubject: string;
  extras?: string[];
  pricing: string;
};

const SCOPES: Scope[] = [
  {
    id: "pilot",
    label: "Pilot",
    phaseCount: 1,
    duration: "30 days to first production run",
    ctaSubject: "Enterprise: Pilot inquiry",
    pricing: "Fixed-fee pilot",
  },
  {
    id: "custom",
    label: "Custom build",
    phaseCount: 3,
    duration: "90 days to full production",
    ctaSubject: "Enterprise: Custom build inquiry",
    extras: ["SSO + RBAC", "Customer-managed keys", "Dedicated implementation engineer"],
    pricing: "Fixed-fee build + monthly platform",
  },
  {
    id: "embedded",
    label: "Embedded team",
    phaseCount: 3,
    duration: "90-day build, then ongoing",
    ctaSubject: "Enterprise: Embedded team inquiry",
    extras: [
      "VPC or on-prem deployment",
      "Dedicated solutions engineer",
      "Custom SLA and compliance review",
      "Direct line to founding engineering",
    ],
    pricing: "Retainer + platform",
  },
];


const DESKTOP_SCREENS = [
  {
    src: "/images/enterprise/desktops/teamsync.png",
    alt: "Team Sync kanban workflow on a desktop screen",
    rotate: -6,
    delay: 0.1,
    position: "absolute top-0 left-0 sm:left-4 lg:left-8 w-[58%] sm:w-[46%] lg:w-[40%] z-10",
    sizes: "(min-width: 1024px) 480px, 60vw",
    shadow: "shadow-neutral-900/15",
  },
  {
    src: "/images/enterprise/desktops/dashboard.png",
    alt: "Operations dashboard screen with team behind it",
    rotate: 5,
    delay: 0.25,
    position: "absolute top-8 sm:top-4 right-0 sm:right-6 lg:right-12 w-[55%] sm:w-[44%] lg:w-[38%] z-20",
    sizes: "(min-width: 1024px) 460px, 55vw",
    shadow: "shadow-neutral-900/20",
  },
  {
    src: "/images/enterprise/desktops/meeting.png",
    alt: "Distributed team meeting on a desktop video call",
    rotate: -3,
    delay: 0.4,
    position: "absolute bottom-4 left-2 sm:left-12 lg:left-20 w-[60%] sm:w-[46%] lg:w-[42%] z-30",
    sizes: "(min-width: 1024px) 500px, 60vw",
    shadow: "shadow-neutral-900/20",
  },
  {
    src: "/images/enterprise/desktops/absentify.png",
    alt: "Absentify scheduling app on a desktop screen",
    rotate: 7,
    delay: 0.55,
    position: "absolute bottom-0 right-0 sm:right-4 lg:right-8 w-[56%] sm:w-[42%] lg:w-[36%] z-40",
    sizes: "(min-width: 1024px) 440px, 55vw",
    shadow: "shadow-neutral-900/20",
  },
];

const DesktopCollage: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="in-production"
      className="relative px-4 sm:px-6 py-20 sm:py-32 overflow-hidden border-t border-neutral-200/70 scroll-mt-24"
    >
      <div aria-hidden className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/30 blur-3xl" />
      <div aria-hidden className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-sky-200/40 to-emerald-200/30 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-gradient-to-tl from-amber-200/30 to-rose-200/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
            In production
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.1]">
            What it actually looks like.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed">
            Real surfaces, real teams, real workflows running in the background.
          </p>
        </motion.div>

        <div className="relative h-[640px] sm:h-[720px] lg:h-[760px]">
          {DESKTOP_SCREENS.map((screen) => (
            <motion.div
              key={screen.src}
              initial={
                prefersReducedMotion
                  ? { opacity: 0, rotate: screen.rotate }
                  : { opacity: 0, y: 40, rotate: screen.rotate * 1.6 }
              }
              whileInView={{ opacity: 1, y: 0, rotate: screen.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0.4 : 0.8,
                delay: prefersReducedMotion ? 0 : screen.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={screen.position}
            >
              <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ${screen.shadow} ring-1 ring-neutral-900/10 bg-white`}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes={screen.sizes}
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BriefComposer: FC = () => {
  const [outcomeIdx, setOutcomeIdx] = useState(0);
  const [scopeIdx, setScopeIdx] = useState(1);
  const outcome = OUTCOMES[outcomeIdx];
  const scope = SCOPES[scopeIdx];
  const visiblePhases = outcome.phases.slice(0, scope.phaseCount);
  const briefKey = `${outcome.id}-${scope.id}`;
  const subject = `${scope.ctaSubject} - ${outcome.label}`;
  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      id="engagement"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-neutral-200/70 bg-white"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mb-10 sm:mb-14 max-w-3xl"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-400 mb-5">
            Live engagement brief
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.05] tracking-tight">
            Compose your engagement. We build the rest.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
            Pick an outcome and a shape. The brief below rewrites itself.
          </p>
        </motion.div>

        {/* Composer controls */}
        <div className="mb-8 sm:mb-10 space-y-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-3">
              01 · Outcome
            </p>
            <div className="flex flex-wrap gap-2">
              {OUTCOMES.map((o, i) => {
                const active = i === outcomeIdx;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOutcomeIdx(i)}
                    aria-pressed={active}
                    className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-3">
              02 · Shape of work
            </p>
            <div className="flex flex-wrap gap-2">
              {SCOPES.map((s, i) => {
                const active = i === scopeIdx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScopeIdx(i)}
                    aria-pressed={active}
                    className={`group inline-flex items-baseline gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className={`text-[11px] font-mono tracking-tight ${active ? "text-white/55" : "text-neutral-400"}`}>
                      {s.phaseCount === 1 ? "30d" : "90d"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The brief document */}
        <AnimatePresence mode="wait">
          <motion.article
            key={briefKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.18)]"
          >
            {/* Memo header bar */}
            <header className="relative px-6 sm:px-12 pt-8 sm:pt-12 pb-8 sm:pb-10 border-b border-neutral-200 overflow-hidden">
              <Image
                src="/images/gradient-pastel.png"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover opacity-60 pointer-events-none select-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/40 pointer-events-none"
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                  <span>Engagement brief</span>
                  <span className="hidden sm:inline text-neutral-400">/</span>
                  <span className="text-neutral-700">{outcome.short}</span>
                  <span className="hidden sm:inline text-neutral-400">/</span>
                  <span className="text-neutral-700">{scope.label}</span>
                  <span className="ml-auto text-neutral-500">Drafted {todayLabel}</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1] max-w-2xl">
                  {outcome.label}.
                </h3>
              </div>
            </header>

            {/* Outcome metric — the value statement */}
            <section className="px-6 sm:px-12 py-8 sm:py-10 border-b border-neutral-200 bg-neutral-50/40">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-4">
                What changes
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-5 items-stretch">
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-2">Today</p>
                  <p className="font-serif text-xl sm:text-2xl text-neutral-400 leading-tight line-through decoration-neutral-300">
                    {outcome.metric.before}
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-neutral-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="rounded-2xl border border-neutral-900 bg-neutral-900 px-5 py-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50 mb-2">With Olyxee</p>
                  <p className="font-serif text-xl sm:text-2xl text-white leading-tight">
                    {outcome.metric.after}
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery rhythm — phases */}
            <section className="px-6 sm:px-12 py-10 sm:py-12 border-b border-neutral-200">
              <div className="flex items-baseline justify-between gap-4 mb-7">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400">
                  Delivery rhythm
                </p>
                <p className="text-[11px] font-mono text-neutral-500">
                  {scope.duration}
                </p>
              </div>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-neutral-200 via-neutral-200 to-transparent"
                />
                <ol className="relative space-y-7">
                {visiblePhases.map((phase, i) => (
                  <li key={phase.window} className="relative pl-9">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full bg-white border border-neutral-300 flex items-center justify-center font-mono text-[10px] text-neutral-700"
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                        {phase.window}
                      </p>
                      <h4 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-tight">
                        {phase.title}
                      </h4>
                    </div>
                    <ul className="space-y-1.5">
                      {phase.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] text-neutral-600 font-light leading-relaxed"
                        >
                          <Check
                            aria-hidden
                            className="w-3.5 h-3.5 text-neutral-900 mt-1 shrink-0"
                            strokeWidth={2.5}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                {scope.phaseCount === 1 && (
                  <li className="relative pl-9">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full bg-neutral-100 border border-dashed border-neutral-300 flex items-center justify-center font-mono text-[10px] text-neutral-400"
                    >
                      +
                    </span>
                    <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
                      Phases 2 and 3 unlock on extension.
                    </p>
                  </li>
                )}
                </ol>
              </div>
            </section>

            {/* Requirements + extras */}
            <section className="px-6 sm:px-12 py-8 sm:py-10 border-b border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-3">
                  From you
                </p>
                <ul className="space-y-2">
                  {outcome.requires.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-[14px] text-neutral-700 font-light leading-snug"
                    >
                      <span aria-hidden className="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-3">
                  {scope.extras ? "Included" : "Pilot scope"}
                </p>
                {scope.extras ? (
                  <ul className="space-y-2">
                    {scope.extras.map((e) => (
                      <li
                        key={e}
                        className="flex items-start gap-3 text-[14px] text-neutral-700 font-light leading-snug"
                      >
                        <Check
                          aria-hidden
                          className="w-3.5 h-3.5 text-neutral-900 mt-1 shrink-0"
                          strokeWidth={2.5}
                        />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[14px] text-neutral-600 font-light leading-snug">
                    One workflow, fixed fee, fixed timeline. You keep what we ship.
                  </p>
                )}
              </div>
            </section>

            {/* Footer / CTA */}
            <footer className="px-6 sm:px-12 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                {scope.pricing}
              </p>
              <a
                href={`mailto:scofield@olyxee.com?subject=${encodeURIComponent(subject)}`}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors shrink-0"
              >
                Send this brief
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </footer>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Enterprise: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Enterprise"
        description="Custom AI systems for business execution. Olyxee helps companies deploy AI systems that execute workflows, integrate with internal tools, and support real operational decisions."
        path="/enterprise"
        keywords={[
          "Olyxee Enterprise",
          "Custom AI systems",
          "Ordo enterprise deployment",
          "AI workflow automation",
          "AI for business operations",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Olyxee Enterprise",
          provider: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
          },
          description:
            "Custom AI execution systems, pilots, integrations, and dedicated implementation support for enterprises.",
          areaServed: "Global",
          url: "https://olyxee.com/enterprise",
        }}
      />
      <div className="grain" />
      <Header />

      {/* === HERO === */}
      <section className="relative pt-36 sm:pt-48 pb-32 sm:pb-48 lg:pb-56 px-4 sm:px-6 bg-white overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0 -z-0">
          <Image
            src="/images/enterprise/team.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.04] opacity-[0.32] sm:opacity-40"
          />
          {/* Soft white scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6"
          >
            Enterprise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05]"
          >
            Custom AI systems for business execution.
          </motion.h1>
        </div>
      </section>

      {/* === PRINCIPLES STRIP === */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28 -mt-8 sm:-mt-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/70 border-y border-neutral-200/70"
          >
            {[
              { k: "01", t: "Scoped, not sold", d: "We start with one workflow and a measurable outcome, never a multi-year contract." },
              { k: "02", t: "Inside your environment", d: "Ordo runs in your cloud, with your data, under your access controls." },
              { k: "03", t: "Built with you", d: "Our engineers ship alongside yours. No reseller hand-off, no implementation partner." },
            ].map((p) => (
              <div key={p.k} className="px-6 sm:px-8 py-8 sm:py-10">
                <p className="font-mono text-[11px] tracking-[0.22em] text-neutral-400 mb-3">{p.k}</p>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight mb-2 leading-tight">
                  {p.t}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{p.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === ENGAGEMENT === */}
      <BriefComposer />

      {/* === DESKTOP SCREENS COLLAGE (playful) === */}
      <DesktopCollage />

      {/* === GET IN TOUCH CTA === */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
          >
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-[0.22em] mb-5">Get in touch</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
                Talk to us about your workflows.
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
                Tell us where AI execution would have the highest impact in your business. We&apos;ll outline a pilot, the integration scope, and how success would be measured.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:scofield@olyxee.com?subject=Enterprise%3A%20Custom%20deployment%20inquiry"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
                >
                  Contact enterprise <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
                >
                  All contact options
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
