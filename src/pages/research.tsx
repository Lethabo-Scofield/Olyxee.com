import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const papers = [
  {
    title: "Attention Residuals: Scalable Sparse Attention with Residual Connections for Efficient Long-Context Transformers",
    authors: "S. Rao, K. Müller, A. Desai, N. Ivanov",
    venue: "ICLR 2026",
    year: "2026",
    category: "Architecture",
    description: "A residual-augmented sparse attention mechanism that preserves long-range dependencies at a fraction of the compute cost, enabling efficient inference on sequences over 128K tokens.",
    url: "https://arxiv.org/abs/2603.15031",
  },
  {
    title: "Reducing Hallucinations in Production AI Applications Through Real-Time Verification Pipelines",
    authors: "J. Chen, M. Patel, S. Liu",
    venue: "NeurIPS 2025",
    year: "2025",
    category: "Verification",
    description: "A lightweight verification layer that catches factual inconsistencies before they reach the user. Reduces hallucination rates by up to 62% in RAG applications without adding meaningful latency.",
    url: "https://arxiv.org/abs/2510.22751",
  },
  {
    title: "Continuous Evaluation Frameworks for AI-Powered Applications in Production",
    authors: "R. Kumar, A. Zhang, T. Nakamura",
    venue: "ICML 2025",
    year: "2025",
    category: "Evaluation",
    description: "An always-on evaluation system that scores accuracy, consistency, and safety on every response, so teams catch quality drift in minutes instead of waiting for user complaints.",
    url: "https://arxiv.org/abs/2603.26718",
  },
  {
    title: "Observability Infrastructure for Agentic AI Workflows",
    authors: "L. Wang, D. Fischer, P. Okonkwo",
    venue: "AAAI 2026",
    year: "2026",
    category: "Monitoring",
    description: "An observability stack for multi-step agent workflows, with trace-level visibility into every decision, tool call, and retrieval step running in production.",
    url: "https://arxiv.org/abs/2512.08769",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Architecture: "bg-violet-50 text-violet-700",
  Verification: "bg-emerald-50 text-emerald-700",
  Evaluation: "bg-amber-50 text-amber-700",
  Monitoring: "bg-blue-50 text-blue-700",
};

const TABS = [
  { id: "research", label: "Research" },
  { id: "robotics", label: "Robotics" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ROBOTICS_FIGURES = [
  {
    src: "/images/robotics/humanoid-manipulation.png",
    alt: "Humanoid robot manipulating objects on a table",
    label: "Humanoid manipulation",
    meta: "Embodied intelligence · 01",
  },
  {
    src: "/images/robotics/foundation-partnerships.png",
    alt: "Boston Dynamics and Google DeepMind on stage",
    label: "Foundation partnerships",
    meta: "Ecosystem · 02",
  },
  {
    src: "/images/robotics/hardware-design.png",
    alt: "Engineer reviewing CAD blueprints on a monitor",
    label: "Hardware design",
    meta: "Engineering · 03",
  },
  {
    src: "/images/robotics/field-deployment.png",
    alt: "Students and engineers around a solar-powered vehicle prototype",
    label: "Field deployment",
    meta: "Real-world programs · 04",
  },
];

const ResearchView: FC = () => {
  const featured = papers[0];
  const rest = papers.slice(1);

  return (
    <>
      {/* Hero line — single sentence */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-2">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1] max-w-3xl">
            Papers shaping verification, evaluation, and observability for AI in production.
          </h1>
        </div>
      </section>

      {/* Featured paper */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
            Featured paper
          </div>
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-wrap items-center gap-2 mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
              <span>{featured.venue}</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span>{featured.year}</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide normal-case ${
                  CATEGORY_COLORS[featured.category] ?? "bg-neutral-100 text-neutral-700"
                }`}
              >
                {featured.category}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-[1.15] mb-4 group-hover:text-blue-700 transition-colors">
              {featured.title}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed font-light max-w-3xl mb-6">
              {featured.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-neutral-200/80">
              <p className="text-sm text-neutral-500 font-light">{featured.authors}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 group-hover:text-blue-700 transition-colors">
                Read paper
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                  focusable="false"
                />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* More papers */}
      <section className="pb-20 sm:pb-28 pt-8 sm:pt-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-5">
            More from the field
          </p>

          <ul className="rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200 bg-white">
            {rest.map((paper) => (
              <li key={paper.title}>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 px-5 sm:px-6 py-6 sm:py-8 hover:bg-neutral-50/60 transition-colors"
                >
                  <div className="flex md:flex-col flex-wrap items-start gap-2 md:gap-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-700">
                      {paper.venue} <span className="text-neutral-500">· {paper.year}</span>
                    </p>
                    <span
                      className={`inline-flex items-center md:mt-3 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide ${
                        CATEGORY_COLORS[paper.category] ?? "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {paper.category}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-light max-w-3xl mb-4">
                      {paper.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-100">
                      <p className="text-xs sm:text-sm text-neutral-500 font-light">{paper.authors}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-blue-700 transition-colors">
                        Read paper
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                          focusable="false"
                        />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

const RoboticsView: FC = () => (
  <>
    {/* Hero line — single sentence + one supporting line */}
    <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1] max-w-3xl">
          Embodied intelligence: AI systems that perceive and act in the physical world.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
          A small program inside Olyxee working on perception, manipulation, and hardware-integrated systems with academic and industry partners.
        </p>
      </div>
    </section>

    {/* Editorial mosaic */}
    <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-20 sm:pb-28">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between mb-5">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            Fig. 01 · Field log
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
            Olyxee Robotics · 2025
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:min-h-[560px] xl:min-h-[620px]">
          <figure className="lg:flex-[1.4] group flex flex-col">
            <div className="relative flex-1 min-h-0 aspect-[4/3] lg:aspect-auto overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
              <Image
                src={ROBOTICS_FIGURES[0].src}
                alt={ROBOTICS_FIGURES[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="flex items-baseline justify-between mt-3 px-1">
              <span className="text-sm font-medium text-neutral-700">{ROBOTICS_FIGURES[0].label}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                {ROBOTICS_FIGURES[0].meta}
              </span>
            </figcaption>
          </figure>

          <div className="lg:flex-1 flex flex-col gap-4 sm:gap-5">
            {[ROBOTICS_FIGURES[1], ROBOTICS_FIGURES[2]].map((fig, idx) => (
              <figure key={fig.src} className="group flex-1 flex flex-col">
                <div
                  className={`relative flex-1 min-h-0 aspect-[16/10] lg:aspect-auto overflow-hidden rounded-2xl ring-1 ring-neutral-200/80 ${
                    idx === 0 ? "bg-neutral-900" : "bg-neutral-100"
                  }`}
                >
                  <Image
                    src={fig.src}
                    alt={fig.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between mt-3 px-1">
                  <span className="text-sm font-medium text-neutral-700">{fig.label}</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                    {fig.meta}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <figure className="group mt-4 sm:mt-5">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
            <Image
              src={ROBOTICS_FIGURES[3].src}
              alt={ROBOTICS_FIGURES[3].alt}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.02]"
            />
          </div>
          <figcaption className="flex items-baseline justify-between mt-3 px-1">
            <span className="text-sm font-medium text-neutral-700">{ROBOTICS_FIGURES[3].label}</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
              {ROBOTICS_FIGURES[3].meta}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  </>
);

const isTabId = (v: unknown): v is TabId =>
  v === "research" || v === "robotics";

const Research: FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("research");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    research: null,
    robotics: null,
  });
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const isUserSwitchRef = useRef(false);

  // Initialize from URL on first client render and keep in sync with back/forward.
  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query.tab;
    const next = Array.isArray(q) ? q[0] : q;
    if (isTabId(next) && next !== tab) {
      setTab(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.tab]);

  // When the user switches a tab, push to the URL (shallow) and scroll panel into view.
  const handleSelect = (next: TabId, focus = true) => {
    if (next === tab) return;
    isUserSwitchRef.current = true;
    setTab(next);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, tab: next } },
      undefined,
      { shallow: true, scroll: false },
    );
    if (focus) {
      // Move keyboard focus to the newly selected tab (roving tabindex pattern).
      requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  };

  // After the new panel mounts, scroll its top into view to avoid jank when
  // switching between panels of different heights.
  useEffect(() => {
    if (!isUserSwitchRef.current) return;
    isUserSwitchRef.current = false;
    const top = panelTopRef.current;
    if (!top) return;
    const rect = top.getBoundingClientRect();
    if (rect.top < 0) {
      const y = window.scrollY + rect.top - 16;
      window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
    }
  }, [tab]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const ids = TABS.map((t) => t.id);
    const idx = ids.indexOf(tab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleSelect(ids[(idx + 1) % ids.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleSelect(ids[(idx - 1 + ids.length) % ids.length]);
    } else if (e.key === "Home") {
      e.preventDefault();
      handleSelect(ids[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      handleSelect(ids[ids.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Research We Follow"
        description="Key papers and publications shaping AI verification, evaluation, and observability. Research that informs how Olyxee builds infrastructure for reliable AI applications."
        path="/research"
      />
      <div className="grain" />
      <Header />

      {/* === TAB BAR === */}
      <section className="pt-32 sm:pt-40 pb-6 sm:pb-8 px-4 sm:px-6 border-b border-neutral-200/70 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/Logo/Olyxee_Logo.png"
              alt="Olyxee"
              width={28}
              height={28}
              className="w-7 h-7"
              priority
            />
            <span className="font-semibold text-neutral-900 text-[17px] tracking-tight">
              Olyxee
            </span>
            <span aria-hidden className="text-neutral-300 mx-1">
              /
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              {tab === "research" ? "Research" : "Robotics"}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Section"
            className="inline-flex self-start sm:self-auto rounded-full bg-neutral-100 p-1"
          >
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="research-tabpanel"
                  id={`tab-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelect(t.id, false)}
                  onKeyDown={onTabKeyDown}
                  className={`relative px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 ${
                    isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="research-tab-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm ring-1 ring-neutral-200/70"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* === TAB CONTENT === */}
      <div ref={panelTopRef} aria-hidden className="scroll-mt-24" />
      <div
        id="research-tabpanel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {tab === "research" ? <ResearchView /> : <RoboticsView />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* === BOTTOM CTA === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
            {tab === "research"
              ? "Want to collaborate on research?"
              : "Building in the physical world?"}
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg max-w-lg mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
            {tab === "research"
              ? "We work with teams building AI applications who want to improve reliability, accuracy, and observability."
              : "We partner on embodied AI, perception, and hardware-integrated systems."}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
          >
            Get in touch
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
