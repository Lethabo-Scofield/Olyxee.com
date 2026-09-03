"use client";

import type { FC, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Github,
  Package,
  ShieldCheck,
} from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const TITLE =
  "FinIR: A financial intermediate representation for AI-native computation";
const DESCRIPTION =
  "A finance-typed compiler and incremental execution runtime that turns structured financial intent into deterministic, auditable financial computation.";

const sections = [
  ["problem", "The problem"],
  ["boundary", "The boundary"],
  ["ir", "Financial IR"],
  ["types", "Type semantics"],
  ["compiler", "Compiler flow"],
  ["runtime", "Incremental runtime"],
  ["evidence", "Evidence"],
  ["limits", "Limitations"],
  ["start", "Get started"],
  ["resources", "References"],
] as const;

const people = [
  { "@type": "Person", name: "Lethabo Innocent ScoField" },
  { "@type": "Person", name: "Alisha Fatima" },
];

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#171717]">
      {children}
    </p>
  );
}

function Section({
  id,
  number,
  title,
  children,
  className = "",
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`finir-section scroll-mt-28 border-b border-[#d2d8d7] py-16 ${className}`}>
      <Label>{number} / {title}</Label>
      <div className="finir-prose mt-5 max-w-3xl">
        <h2 className="text-4xl leading-tight sm:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Resource({
  href,
  title,
  detail,
  icon,
}: {
  href: string;
  title: string;
  detail: string;
  icon: "github" | "package" | "book";
}) {
  const Icon = icon === "github" ? Github : icon === "package" ? Package : BookOpen;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="finir-resource flex items-center justify-between gap-5 border-b border-[#d5dcda] px-4 py-5"
    >
      <span className="flex items-center gap-4">
        <Icon className="h-4 w-4 text-[#171717]" aria-hidden />
        <span>
          <strong className="block text-sm font-semibold text-[#172126]">{title}</strong>
          <span className="mt-1 block text-xs text-[#697578]">{detail}</span>
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#171717]" aria-hidden />
    </a>
  );
}

function FlowDiagram() {
  const flow = [
    "Natural language",
    "AI / FinIR-Intent",
    "Canonical Financial Intent",
    "FinIR",
    "Deterministic Financial Execution",
    "Financial Result",
  ];
  return (
    <div className="finir-diagram mt-12 p-5 sm:p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]">
        <div className="grid justify-items-center gap-2">
          {flow.map((item, index) => (
            <div className="contents" key={item}>
              <div className={`finir-node w-full max-w-[270px] ${item === "FinIR" ? "finir-node--active" : ""}`}>
                {item}
              </div>
              {index < flow.length - 1 && <span className="text-[#171717]">↓</span>}
            </div>
          ))}
        </div>
        <div className="hidden text-center text-xs font-semibold text-[#526064] lg:block">
          Financial<br />intent →
        </div>
        <div className="border border-[#9eaaa9] bg-[#f9faf8] p-4">
          <p className="mb-3 text-center text-xs font-bold text-[#263438]">Inside FinIR</p>
          {["Typed Financial Graph", "Dependency Analysis", "Compiler Passes", "Incremental Runtime"].map((item) => (
            <div className="finir-node mb-2 last:mb-0" key={item}>{item}</div>
          ))}
          <div className="my-3 text-center text-[#171717]">↓</div>
          <div className="finir-node">CPU · SIMD · GPU</div>
        </div>
      </div>
    </div>
  );
}

function CompanyGraph() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="border border-[#d2d8d7] bg-[#fbfcfa] p-5">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#526064]">Canonical company model</p>
        <pre className="mt-5 overflow-x-auto border border-[#dfe4e2] bg-[#f1f3f1] p-4 font-mono text-xs leading-6 text-[#263438]">{`model company {
  input revenue: money[ZAR]
  input cogs: money[ZAR]
  input opex: money[ZAR]

  gross_profit = revenue - cogs
  gross_margin = gross_profit / revenue
  ebitda = gross_profit - opex
}`}</pre>
      </div>
      <div className="border border-[#d2d8d7] bg-[#fbfcfa] p-5">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#526064]">Dependency graph</p>
        <div className="mt-8 grid gap-6 text-xs">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <div className="finir-node">Revenue</div>
            <span className="finir-flow-arrow">−</span>
            <div className="finir-node">COGS</div>
            <span className="finir-flow-arrow">→</span>
            <div className="finir-node">Gross Profit</div>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <div className="finir-node">Gross Profit</div>
            <span className="finir-flow-arrow">÷</span>
            <div className="finir-node">Revenue</div>
            <span className="finir-flow-arrow">→</span>
            <div className="finir-node">Gross Margin</div>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <div className="finir-node">Gross Profit</div>
            <span className="finir-flow-arrow">−</span>
            <div className="finir-node">Opex</div>
            <span className="finir-flow-arrow">→</span>
            <div className="finir-node">EBITDA</div>
          </div>
        </div>
        <p className="mt-8 text-sm leading-6 text-[#526064]">Gross profit is revenue minus COGS. EBITDA is gross profit minus opex; gross margin is gross profit divided by revenue.</p>
      </div>
    </div>
  );
}

const FinIR: FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "ScholarlyArticle"],
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-09-03",
    dateModified: "2026-09-03",
    mainEntityOfPage: "https://olyxee.com/research/finir",
    author: people,
    publisher: {
      "@type": "Organization",
      name: "Olyxee",
      url: "https://olyxee.com",
      logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
    },
    inLanguage: "en",
  };

  return (
    <div className="finir-page min-h-[100dvh] finir-sans">
      <SEO title={TITLE} description={DESCRIPTION} path="/research/finir" ogType="article" keywords={["FinIR", "financial computation", "financial intermediate representation", "incremental execution", "AI infrastructure"]} jsonLd={jsonLd} />
      <Header />
      <main>
        <article>
          <header className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
            <Link href="/research" className="mb-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#526064] transition-colors hover:text-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717]">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />Research &amp; releases
            </Link>
            <div className="border-y border-[#ccd3d1] py-4 text-[11px] font-semibold uppercase tracking-[.16em] text-[#526064]">
              <span>September 3, 2026</span><span className="mx-3 text-[#a4adac]">/</span><span className="text-[#171717]">Research · Release</span>
            </div>
            <div className="mt-10 max-w-5xl">
              <h1 className="finir-display text-[3.5rem] leading-[.91] text-[#172126] sm:text-7xl lg:text-[6.4rem]">{TITLE}</h1>
              <p className="mt-9 max-w-3xl text-xl leading-8 text-[#526064] sm:text-2xl sm:leading-9">{DESCRIPTION}</p>
              <p className="mt-8 text-sm font-semibold text-[#263438]">By Lethabo Innocent ScoField and Alisha Fatima</p>
            </div>
          </header>

          <div className="border-y border-[#ccd3d1] bg-[#f5f5f5] px-5 py-5 sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-[#526064]">
              <a href="https://github.com/Olyxee/finir" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#171717]"><Github className="h-4 w-4" />GitHub</a>
              <a href="https://pypi.org/project/finir/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#171717]"><Package className="h-4 w-4" />PyPI</a>
              <a href="https://github.com/Olyxee/finir/releases/tag/v0.1.0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#171717]"><ShieldCheck className="h-4 w-4" />v0.1.0</a>
              <a href="https://huggingface.co/Olyxee/FinIR-Intent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#171717]"><BookOpen className="h-4 w-4" />FinIR-Intent</a>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:py-24">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav className="finir-anchor" aria-label="On this page">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
            </aside>
            <div className="min-w-0">
              <Section id="problem" number="01" title="The problem">
                <p className="mt-7">AI systems can interpret financial instructions. Reliable financial execution needs to be deterministic, typed, incremental, auditable, and independent from probabilistic code generation.</p>
                <p className="mt-5">Generated execution logic can be inconsistent. Full recomputation is unnecessary. Weak financial type guarantees make errors harder to catch; caching, provenance, and auditing become difficult when AI-generated code is the execution environment.</p>
                <p className="finir-display mt-12 max-w-xl border-l-2 border-[#171717] pl-6 text-3xl leading-snug text-[#172126] sm:text-4xl">AI interprets. FinIR validates, compiles, and computes.</p>
              </Section>

              <Section id="boundary" number="02" title="A computational boundary">
                <p className="mt-7">FinIR separates probabilistic interpretation from deterministic financial execution. Financial intent is made canonical before it reaches the compiler and runtime.</p>
                <FlowDiagram />
              </Section>

              <Section id="ir" number="03" title="The Financial IR">
                <p className="mt-7">The repository describes a typed computation graph with an expression AST, a textual <code>.finir</code> format, JSON interchange, parsing, and validation. The graph is the stable representation between intent and evaluation.</p>
                <CompanyGraph />
              </Section>

              <Section id="types" number="04" title="Finance-aware type semantics">
                <p className="mt-7">FinIR assigns every value a finance-aware type and validates operations before execution. The release includes money, percentage, ratio, days, quantity, rate, series, scenario, scalar, and boolean types.</p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2"><div className="finir-node">money[ZAR] − money[ZAR] → money[ZAR]</div><div className="finir-node">money ÷ money → ratio</div><div className="finir-node">money × percentage → money</div><div className="finir-node">money + days → TypeCheckError</div><div className="finir-node">USD + ZAR → CurrencyError</div><div className="finir-node">days ÷ scalar → days</div></div>
                <p className="mt-7">Money subtraction requires the same currency; mixing currencies raises a currency error, while invalid operations raise a type-check error. This makes an expression such as revenue plus receivable days fail loudly rather than produce a numeric result with the wrong meaning.</p>
              </Section>

              <Section id="compiler" number="05" title="Compiler and evaluate flow">
                <p className="mt-7">A model validates and type-checks its module before an incremental engine evaluates requested targets. The engine computes needed nodes in dependency order and sends arithmetic to a backend.</p>
                <p className="mt-5">The compiler also defines analysis and transformation passes: validation, type checking, constant folding, common-subexpression elimination, dead-node elimination, dependency pruning, scenario-vectorization analysis, fusion analysis, and cache planning. The ahead-of-time <code>finir compile</code> path can show these passes; interactive models retain queryable user node names and run validation plus type checking.</p>
                <div className="finir-diagram mt-10 p-5 text-center text-xs font-semibold text-[#526064] sm:p-8">validate → type-check → plan dependencies → evaluate targets → return values and runtime statistics</div>
              </Section>

              <Section id="runtime" number="06" title="Incremental runtime">
                <p className="mt-7">The runtime maintains a value store and validity set. Changing an input invalidates its downstream cone using precomputed dependents. Evaluation walks needed nodes in dependency order: valid nodes are reused by lookup; invalid nodes are recomputed and marked valid.</p>
                <p className="mt-5">For the company model, if COGS changes by 4%, gross profit, gross margin, and EBITDA are downstream defined nodes and are recomputed. Unrelated nodes are reused from the cache. The repository also exposes transient what-if evaluation, state snapshots, and cache-hit metrics.</p>
                <div className="mt-10 grid gap-2 sm:grid-cols-2"><div className="finir-node finir-node--active">COGS changes → downstream cone is dirty</div><div className="finir-node">Unrelated nodes → reused</div></div>
              </Section>

              <Section id="evidence" number="07" title="Evidence and reproducibility">
                <p className="mt-7">Experiment 001 asks whether dependency-aware caching reduces the cost of iterative financial reasoning. Its 1,000-turn synthetic workload uses a 6-node model and compares a warm FinIR cache with a same-engine baseline whose cache is cleared each turn.</p>
                <div className="mt-10 overflow-x-auto border border-[#d2d8d7]"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-[#f5f5f5] text-xs uppercase tracking-wider text-[#526064]"><tr><th className="p-4">Condition</th><th className="p-4">Time</th><th className="p-4">Recomputes</th><th className="p-4">Cache hit</th></tr></thead><tbody><tr className="border-t border-[#d2d8d7]"><td className="p-4">Baseline, full recompute</td><td className="p-4 font-mono">0.0355s</td><td className="p-4 font-mono">6,000</td><td className="p-4">0%</td></tr><tr className="border-t border-[#d2d8d7]"><td className="p-4">FinIR incremental</td><td className="p-4 font-mono">0.0223s</td><td className="p-4 font-mono">3,600</td><td className="p-4">40.0%</td></tr></tbody></table></div>
                <p className="mt-5 text-sm leading-7 text-[#526064]"><strong className="text-[#172126]">Observed in this run: 1.59×.</strong> This is a synthetic workload, with cheap arithmetic and Python traversal overhead, run in a single CPU process using the same engine and no-cache baseline. It is not a general production speedup claim. Reproduce with <code>python research/reproduce_experiment_001.py</code> in the public repository.</p>
              </Section>

              <Section id="limits" number="08" title="Limitations and boundaries">
                <p className="mt-7">FinIR is a compiler target and runtime for financial computation. It is not a dashboard, ERP, trading platform, quant library, or generic DAG engine. This release makes no novelty, first, or breakthrough claim.</p>
                <p className="mt-5">Experiment 001 is one synthetic graph and one CPU, with no engine-level parallelism. Experiment 002 does not verify a GPU crossover; its <code>GPU_MIN_ELEMENTS = 250_000</code> threshold is a heuristic placeholder. The repository describes a CPU-first reference/vectorized backend and an optional CuPy GPU backend; this page does not claim shipping CPU, SIMD, or GPU acceleration beyond that status.</p>
              </Section>

              <Section id="start" number="09" title="Install and get started">
                <p className="mt-7">The public package is FinIR 0.1.0, released August 31, 2026. Install the CPU-first package with:</p>
                <pre className="mt-6 overflow-x-auto border border-[#dfe4e2] bg-[#f1f3f1] p-5 font-mono text-sm leading-7 text-[#263438]">{`pip install finir\npython -c "import finir; print(finir.__version__)"\nfinir --help\nfinir doctor`}</pre>
                <p className="mt-6">The repository also documents optional <code>gpu</code> and <code>viz</code> extras and editable development installation. The canonical company model and exact <code>.finir</code> syntax are available in the repository’s <code>examples/company_model/model.finir</code>.</p>
              </Section>

              <Section id="resources" number="10" title="References and resources" className="border-b-0">
                <p className="mt-7">The implementation, release record, type rules, compiler behavior, runtime behavior, and experiment outputs are public in the following sources.</p>
                <div className="mt-10 border-t border-[#d5dcda]">
                  <Resource href="https://github.com/Olyxee/finir" title="FinIR on GitHub" detail="Source repository, examples, and release files" icon="github" />
                  <Resource href="https://github.com/Olyxee/finir/blob/main/docs/architecture.md" title="Architecture" detail="Layer responsibilities and evaluate data flow" icon="book" />
                  <Resource href="https://github.com/Olyxee/finir/blob/main/docs/type-system.md" title="Finance-aware type system" detail="Types and algebraic validation rules" icon="book" />
                  <Resource href="https://github.com/Olyxee/finir/blob/main/docs/compiler.md" title="Compiler" detail="Passes, interactive behavior, and fusion note" icon="book" />
                  <Resource href="https://github.com/Olyxee/finir/blob/main/docs/runtime.md" title="Incremental runtime" detail="Dirty sets, cache reuse, state, and scenarios" icon="book" />
                  <Resource href="https://github.com/Olyxee/finir/blob/main/research/experiment_001_incremental_financial_reasoning.md" title="Experiment 001" detail="Method, results, and reproduction notes" icon="book" />
                  <Resource href="https://pypi.org/project/finir/" title="FinIR on PyPI" detail="Package listing" icon="package" />
                  <Resource href="https://github.com/Olyxee/finir/releases/tag/v0.1.0" title="GitHub release v0.1.0" detail="Released August 31, 2026" icon="github" />
                  <Resource href="https://huggingface.co/Olyxee/FinIR-Intent" title="FinIR-Intent" detail="Hugging Face resource" icon="book" />
                  <div className="border-b border-[#d5dcda] px-4 py-5 text-sm text-[#526064]"><strong className="block text-[#172126]">IntentBench and live demo</strong><span className="mt-1 block text-xs">Private or forthcoming; no public link is asserted here.</span></div>
                </div>
              </Section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default FinIR;