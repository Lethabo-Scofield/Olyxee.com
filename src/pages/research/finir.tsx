"use client";

import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const TITLE = "Introducing FinIR";
const DESCRIPTION = "FinIR is a finance-aware intermediate representation and execution runtime for turning AI-interpreted financial instructions into deterministic, typed, and auditable computation. It does this without relying on generated Python, SQL, or spreadsheets as the execution layer.";
const SEO_TITLE = "Introducing FinIR: Typed Financial Computation";
const SEO_DESCRIPTION = "FinIR turns AI-interpreted financial instructions into deterministic, typed, auditable computation with dependency-aware incremental execution.";
const ARTICLE_URL = "https://olyxee.com/research/finir";
const ARTICLE_IMAGE = "https://olyxee.com/research/finir-og.png";
const ARTICLE_DATE = "2026-09-03";
const sections = [["problem", "The problem"], ["boundary", "The boundary"], ["ir", "How FinIR works"], ["types", "Type semantics"], ["compiler", "Compiler flow"], ["runtime", "Incremental runtime"], ["evidence", "Evidence"], ["limits", "Limitations"], ["start", "Get started"], ["resources", "References"]] as const;
const people = [
  { "@type": "Person", name: "Lethabo Scofield", url: "https://www.linkedin.com/in/lethabo-scofield-17b37a257/" },
  { "@type": "Person", name: "Alisha Fatima", url: "https://www.linkedin.com/in/thealisha-fatima/" },
];

function Section({ id, title, children, className = "" }: { id: string; number: string; title: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`finir-section finir-rule scroll-mt-28 border-b ${className}`}>
    <div className="finir-prose max-w-[680px]"><h2 className="text-[2.1rem] leading-[1.05] text-[#182126] sm:text-5xl">{title}</h2>{children}</div>
  </section>;
}

function Resource({ href, title, detail, icon, meta }: { href: string; title: string; detail: string; icon: "github" | "pypi" | "huggingface" | "book"; meta?: string }) {
  const logo = icon === "github"
    ? { src: "/logos/collaborators/github.svg", alt: "GitHub" }
    : icon === "pypi"
      ? { src: "/research/logos/pypi.svg", alt: "PyPI" }
      : icon === "huggingface"
        ? { src: "/logos/collaborators/huggingface.svg", alt: "Hugging Face" }
        : null;

  return <a href={href} target="_blank" rel="noopener noreferrer" className="finir-resource">
    <span className="finir-resource__mark">{logo ? <Image src={logo.src} alt={logo.alt} width={24} height={24} className="h-auto max-h-6 w-auto" /> : <BookOpen className="h-4 w-4" aria-hidden />}</span>
    <span className="finir-resource__copy"><strong>{title}</strong><span>{detail}</span></span>
    {meta && <span className="finir-resource__meta">{meta}</span>}
    <span className="finir-resource__open"><span className="sr-only">Open {title}</span><ArrowUpRight className="h-4 w-4" aria-hidden /></span>
  </a>;
}

function CompanyGraph() {
  const rows = [["Revenue", "−", "COGS", "Gross Profit"], ["Gross Profit", "÷", "Revenue", "Gross Margin"], ["Gross Profit", "−", "Opex", "EBITDA"]];
  return <figure className="finir-ir-figure">
    <div className="finir-ir-legend"><span className="finir-ir-eyebrow">A stable representation between intent and evaluation</span><span>FIG. 01</span></div>
    <div className="finir-ir-stages">
      <div className="finir-ir-stage"><span className="finir-ir-stage-index">01 / EXPRESS</span><h3>Financial intent</h3><p>Inputs and definitions are expressed in a canonical model.</p></div>
      <div className="finir-ir-stage"><span className="finir-ir-stage-index">02 / REPRESENT</span><h3>Typed computation graph</h3><p>Expressions and dependencies become explicit, inspectable structure.</p></div>
      <div className="finir-ir-stage"><span className="finir-ir-stage-index">03 / EVALUATE</span><h3>Deterministic execution</h3><p>The compiler and runtime evaluate the same graph, not generated code.</p></div>
    </div>
    <div className="finir-ir-model">
      <div className="finir-ir-model-header"><h3>Canonical company model</h3><p>Textual <code>.finir</code> source → explicit dependencies</p></div>
      <div className="finir-ir-model-grid">
        <pre className="finir-ir-code">{`model company {
  input revenue: money[ZAR]
  input cogs: money[ZAR]
  input opex: money[ZAR]

  gross_profit = revenue - cogs
  gross_margin = gross_profit / revenue
  ebitda = gross_profit - opex
}`}</pre>
        <div className="finir-ir-graph"><p className="finir-ir-graph-label">Dependency graph</p>{rows.map(([a, operator, b, result]) => <div className="finir-ir-graph-row" key={result}><span className="finir-ir-token finir-ir-token--input">{a}</span><span className="finir-ir-operator">{operator}</span><span className="finir-ir-token finir-ir-token--input">{b}</span><span className="finir-ir-operator">→</span><span className="finir-ir-token finir-ir-token--result">{result}</span></div>)}</div>
      </div>
      <figcaption className="finir-ir-caption">Gross profit is revenue minus COGS. EBITDA is gross profit minus opex; gross margin is gross profit divided by revenue.</figcaption>
    </div>
  </figure>;
}

const benchmarkResults = [
  { condition: "Baseline, full recompute", time: "0.0355s", recomputes: "6,000", cacheHit: "0%" },
  { condition: "FinIR incremental", time: "0.0223s", recomputes: "3,600", cacheHit: "40.0%" },
];

const executionComparisons = [
  { approach: "FinIR", types: "Built in", recomputation: "Built in", graph: "Built in", boundary: "Designed for it" },
  { approach: "Spreadsheets", types: "Limited", recomputation: "Common, implementation-dependent", graph: "Implicit cell graph", boundary: "Not by default" },
  { approach: "Generated Python / SQL", types: "Custom code required", recomputation: "Custom code required", graph: "Not by default", boundary: "Generated code executes directly" },
  { approach: "Generic DAG tools", types: "Custom domain layer required", recomputation: "Tool-dependent", graph: "Built in", boundary: "Custom integration required" },
];

function BenchmarkResults() {
  return <div className="mt-10">
    <div className="grid gap-3 sm:hidden">{benchmarkResults.map((result) => <div className="border border-[#d9e0e1] bg-[#f6f8f7] p-5" key={result.condition}><strong className="text-sm text-[#24343b]">{result.condition}</strong><dl className="mt-4 grid grid-cols-3 gap-3 border-t border-[#d9e0e1] pt-4 text-center"><div><dt className="text-[10px] uppercase tracking-wide text-[#718087]">Time</dt><dd className="mt-1 font-mono text-sm text-[#24343b]">{result.time}</dd></div><div><dt className="text-[10px] uppercase tracking-wide text-[#718087]">Recomputes</dt><dd className="mt-1 font-mono text-sm text-[#24343b]">{result.recomputes}</dd></div><div><dt className="text-[10px] uppercase tracking-wide text-[#718087]">Cache hit</dt><dd className="mt-1 text-sm font-semibold text-[#24343b]">{result.cacheHit}</dd></div></dl></div>)}</div>
    <div className="hidden overflow-hidden border border-[#d9e0e1] sm:block"><table className="w-full table-fixed text-left text-sm"><thead className="bg-[#eaf0f0] text-xs uppercase tracking-wider text-[#526269]"><tr><th className="w-[40%] p-4">Condition</th><th className="w-[20%] p-4">Time</th><th className="w-[20%] p-4">Recomputes</th><th className="w-[20%] p-4">Cache hit</th></tr></thead><tbody>{benchmarkResults.map((result) => <tr className="border-t border-[#d9e0e1] bg-[#fafbfa]" key={result.condition}><td className="break-words p-4 font-semibold text-[#24343b]">{result.condition}</td><td className="p-4 font-mono">{result.time}</td><td className="p-4 font-mono">{result.recomputes}</td><td className="p-4">{result.cacheHit}</td></tr>)}</tbody></table></div>
  </div>;
}

function ExecutionComparison() {
  const labels = [["types", "Finance-aware types"], ["recomputation", "Incremental recomputation"], ["graph", "Dependency graph"], ["boundary", "AI execution boundary"]] as const;
  return <div className="mt-8">
    <div className="grid gap-4 lg:hidden">{executionComparisons.map((item) => <article className={`border p-5 ${item.approach === "FinIR" ? "border-[#7f9aa8] bg-[#edf3f4]" : "border-[#d9e0e1] bg-[#fafbfa]"}`} key={item.approach}><h4 className="text-base font-semibold text-[#24343b]">{item.approach}</h4><dl className="mt-4 divide-y divide-[#d9e0e1]">{labels.map(([key, label]) => <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-4 py-3 text-sm" key={key}><dt className="text-[#718087]">{label}</dt><dd className="font-medium text-[#34464e]">{item[key]}</dd></div>)}</dl></article>)}</div>
      <div className="hidden overflow-hidden border border-[#d9e0e1] lg:-ml-10 lg:block lg:w-[760px]"><table className="w-full table-fixed text-left text-sm"><thead className="bg-[#eaf0f0] text-[11px] uppercase tracking-wide text-[#526269]"><tr><th className="w-[18%] p-4">Approach</th><th className="p-4">Finance-aware types</th><th className="p-4">Incremental recomputation</th><th className="p-4">Dependency graph</th><th className="p-4">AI execution boundary</th></tr></thead><tbody>{executionComparisons.map((item) => <tr className={`border-t border-[#d9e0e1] ${item.approach === "FinIR" ? "bg-[#edf3f4]" : "bg-[#fafbfa]"}`} key={item.approach}><td className="break-words p-4 align-top font-semibold text-[#24343b]">{item.approach}</td><td className="break-words p-4 align-top text-[#526269]">{item.types}</td><td className="break-words p-4 align-top text-[#526269]">{item.recomputation}</td><td className="break-words p-4 align-top text-[#526269]">{item.graph}</td><td className="break-words p-4 align-top text-[#526269]">{item.boundary}</td></tr>)}</tbody></table></div>
  </div>;
}

const FinIR: FC = () => {
  const [showContents, setShowContents] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const movement = currentScrollY - previousScrollY.current;

      if (currentScrollY < 160) {
        setShowContents(false);
      } else if (movement < -8) {
        setShowContents(true);
      } else if (movement > 8) {
        setShowContents(false);
      }

      previousScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "ScholarlyArticle"],
    headline: TITLE,
    alternativeHeadline: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: ARTICLE_URL,
    mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL },
    image: { "@type": "ImageObject", url: ARTICLE_IMAGE, width: 1200, height: 630 },
    datePublished: ARTICLE_DATE,
    dateModified: ARTICLE_DATE,
    author: people,
    publisher: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com", logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" } },
    keywords: ["FinIR", "financial intermediate representation", "typed financial computation", "incremental execution", "AI financial infrastructure"],
    about: [
      { "@type": "Thing", name: "Financial computation" },
      { "@type": "Thing", name: "Intermediate representation" },
      { "@type": "Thing", name: "Incremental computing" },
    ],
    isAccessibleForFree: true,
    inLanguage: "en",
  };
  return <div className="finir-page min-h-[100dvh]">
    <SEO
      title={SEO_TITLE}
      description={SEO_DESCRIPTION}
      path="/research/finir"
      ogType="article"
      ogImage={ARTICLE_IMAGE}
      ogImageAlt="FinIR workflow from financial intent through typed graph execution to financial results"
      publishedTime={ARTICLE_DATE}
      modifiedTime={ARTICLE_DATE}
      authors={people.map((person) => person.url)}
      keywords={["FinIR", "financial computation", "financial intermediate representation", "typed financial computation", "incremental execution", "AI financial infrastructure"]}
      jsonLd={jsonLd}
    />
    <Header />
    <main><article>
      <header className="mx-auto max-w-[950px] px-5 pb-14 pt-24 text-center sm:px-8 sm:pb-24 sm:pt-36">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#527487]">Research release · September 3, 2026</p>
        <h1 className="finir-display mx-auto mt-5 max-w-[880px] text-[clamp(2.5rem,12vw,4.5rem)] leading-[.98] text-[#182126] lg:text-7xl">{TITLE}</h1>
        <p className="mx-auto mt-7 max-w-[720px] text-[16px] leading-7 text-[#5d6c73] sm:text-[19px] sm:leading-8">{DESCRIPTION}</p>
        <p className="mt-8 text-xs font-semibold text-[#43545b]">By <a href={people[0].url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#aebfc6] underline-offset-4 transition-colors hover:text-[#24475a]">Lethabo Scofield</a> and <a href={people[1].url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#aebfc6] underline-offset-4 transition-colors hover:text-[#24475a]">Alisha Fatima</a></p>
      </header>
      <figure className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 sm:py-14"><div><Image src="/research/finir-financial-model-before-after.png" alt="Before-and-after comparison of a financial spreadsheet model showing updated assumptions, profit and loss figures, key metrics, and net profit trend" width={1536} height={1024} className="h-auto w-full" priority /></div><figcaption className="mx-auto mt-4 max-w-[900px] px-1 text-center text-xs leading-5 text-[#718087]">A financial model before and after updated assumptions flow through its dependent calculations and metrics.</figcaption></figure>
      <div className="mx-auto grid max-w-[1060px] gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[160px_minmax(0,680px)] lg:gap-20 lg:pb-28"><aside aria-hidden={!showContents} className={`hidden transition-[opacity,transform] duration-200 lg:sticky lg:top-28 lg:block lg:self-start ${showContents ? "translate-y-0 opacity-100" : "-translate-y-2 pointer-events-none opacity-0"}`}><nav className="finir-anchor" aria-label="On this page">{sections.map(([id, label]) => <a key={id} href={`#${id}`} tabIndex={showContents ? 0 : -1}>{label}</a>)}</nav></aside><div className="min-w-0">
        <section id="problem" className="finir-rule scroll-mt-28 border-b pb-16"><h2 className="text-[2.1rem] leading-[1.05] sm:text-5xl">A reliable place for financial computation</h2><div className="finir-prose mt-8 max-w-[680px]"><p>AI systems are good at interpreting financial instructions, but interpretation is not the same as reliable execution. When an AI generates Python, SQL, or spreadsheet formulas for every task, the execution logic can change between runs, financial types are difficult to enforce, and the origin of each result becomes harder to audit.</p><p className="mt-5">FinIR addresses this problem by placing a deterministic computational layer between the AI and the final result. The AI expresses financial intent, while FinIR validates the types, records the dependencies, compiles the computation, and recalculates only the values affected by a change.</p></div></section>
        <section id="boundary" className="finir-rule scroll-mt-28 border-b py-16 sm:py-24"><h2 className="text-[2.1rem] leading-[1.05] sm:text-5xl">A computational boundary for AI</h2><p className="mt-7 max-w-[580px] text-base leading-7 text-[#445158]">FinIR separates probabilistic interpretation from deterministic financial execution.</p><figure className="mt-10 sm:-ml-16 sm:w-[calc(100%+8rem)]"><Image src="/research/finir-system-workflow.png" alt="FinIR workflow from AI financial intent through typed graph dependency analysis, incremental execution, hardware dispatch, and financial results" width={1672} height={941} className="h-auto w-full" /><figcaption className="px-1 pt-4 text-xs leading-5 text-[#718087]">FinIR turns financial intent into a typed dependency graph, recomputes only affected nodes, dispatches execution to available hardware, and returns auditable financial results.</figcaption></figure></section>
        <Section id="ir" number="03" title="How FinIR works"><p className="finir-ir-intro mt-8">The repository describes a typed computation graph with an expression AST, a textual <code>.finir</code> format, JSON interchange, parsing, and validation. The graph is the stable representation between intent and evaluation.</p><p className="mt-5">The Financial IR makes the model’s financial dependencies explicit before the compiler and runtime evaluate it.</p><CompanyGraph /></Section>
        <Section id="types" number="04" title="Finance-aware type semantics"><p className="mt-8">FinIR assigns every value a finance-aware type and validates operations before execution. The release includes money, percentage, ratio, days, quantity, rate, series, scenario, scalar, and boolean types.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{["money[ZAR] − money[ZAR] → money[ZAR]", "money ÷ money → ratio", "money × percentage → money", "money + days → TypeCheckError", "USD + ZAR → CurrencyError", "days ÷ scalar → days"].map((item) => <div className="finir-node" key={item}>{item}</div>)}</div><p className="mt-8">Money subtraction requires the same currency; mixing currencies raises a currency error, while invalid operations raise a type-check error. This makes an expression such as revenue plus receivable days fail loudly rather than produce a numeric result with the wrong meaning.</p></Section>
        <Section id="compiler" number="05" title="Compiler and evaluate flow"><p className="mt-8">A model validates and type-checks its module before an incremental engine evaluates requested targets. The engine computes needed nodes in dependency order and sends arithmetic to a backend.</p><p className="mt-5">The compiler also defines analysis and transformation passes: validation, type checking, constant folding, common-subexpression elimination, dead-node elimination, dependency pruning, scenario-vectorization analysis, fusion analysis, and cache planning. The ahead-of-time <code>finir compile</code> path can show these passes; interactive models retain queryable user node names and run validation plus type checking.</p><div className="finir-diagram mt-10 p-5 text-center text-xs font-semibold text-[#527487] sm:p-8">validate → type-check → plan dependencies → evaluate targets → return values and runtime statistics</div></Section>
        <Section id="runtime" number="06" title="Incremental runtime"><div className="mt-8 grid gap-8 lg:grid-cols-2"><div><p>The runtime maintains a value store and validity set. Changing an input invalidates its downstream cone using precomputed dependents. Evaluation walks needed nodes in dependency order: valid nodes are reused by lookup; invalid nodes are recomputed and marked valid.</p><p className="mt-5">For the company model, if COGS changes by 4%, gross profit, gross margin, and EBITDA are downstream defined nodes and are recomputed.</p></div><div className="border border-[#d9e0e1] bg-[#f6f8f7] p-5 text-xs"><p className="font-semibold text-[#24343b]">When an assumption changes</p><p className="mt-3 text-[#607078]">Example: COGS +4%</p>{["Gross Profit", "Gross Margin", "EBITDA"].map((item) => <div className="mt-3 flex justify-between border-b border-[#dce4e3] pb-3" key={item}><span>{item}</span><span className="bg-[#24475a] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">recomputed</span></div>)}<div className="mt-3 flex justify-between"><span>Unrelated nodes</span><span className="border border-[#6d818a] px-2 py-0.5 text-[10px] uppercase tracking-wide">reused</span></div></div></div><p className="mt-6">The repository also exposes transient what-if evaluation, state snapshots, and cache-hit metrics.</p></Section>
        <Section id="evidence" number="07" title="Evidence and reproducibility"><p className="mt-8">Experiment 001 asks whether dependency-aware caching reduces the cost of iterative financial reasoning. Its 1,000-turn synthetic workload uses a 6-node model and compares a warm FinIR cache with a same-engine baseline whose cache is cleared each turn.</p><BenchmarkResults /><figure className="mt-10"><Image src="/research/finir-execution-time-vs-graph-size.png" alt="Log-scale line chart comparing median execution time for full recomputation and FinIR incremental execution across synthetic graphs from 98 to 100,000 nodes" width={1306} height={794} className="h-auto w-full" /><figcaption className="px-1 pt-4 text-xs leading-5 text-[#718087]">Synthetic dependency-graph benchmark for FinIR v0.1.0. Incremental execution remains below full recomputation across the measured graph sizes; results are benchmark-specific and should not be read as a general production speedup claim.</figcaption></figure><p className="mt-6 text-sm leading-7 text-[#607078]"><strong className="text-[#24343b]">Observed in this run: 1.59×.</strong> This is a synthetic workload, with cheap arithmetic and Python traversal overhead, run in a single CPU process using the same engine and no-cache baseline. It is not a general production speedup claim. Reproduce with <code>python research/reproduce_experiment_001.py</code> in the public repository.</p><h3 className="mt-16 text-2xl font-semibold tracking-[-.035em] text-[#24343b]">How the execution models compare</h3><p className="mt-4 text-sm leading-7 text-[#607078]">The table below compares typical out-of-the-box execution models, not measured runtime speed. Products and custom implementations vary; external tools were not included in Experiment 001.</p><ExecutionComparison /></Section>
        <Section id="limits" number="08" title="Limitations and boundaries"><p className="mt-8">FinIR is a compiler target and runtime for financial computation. It is not a dashboard, ERP, trading platform, quant library, or generic DAG engine. This release makes no novelty, first, or breakthrough claim.</p><p className="mt-5">Experiment 001 is one synthetic graph and one CPU, with no engine-level parallelism. Experiment 002 does not verify a GPU crossover; its <code>GPU_MIN_ELEMENTS = 250_000</code> threshold is a heuristic placeholder. The repository describes a CPU-first reference/vectorized backend and an optional CuPy GPU backend; this page does not claim shipping CPU, SIMD, or GPU acceleration beyond that status.</p></Section>
        <Section id="start" number="09" title="Install and get started"><p className="mt-8">The public package is FinIR 0.1.0, released August 31, 2026. Install the CPU-first package with:</p><div className="finir-scroll mt-6 border border-[#d9e0e1] bg-[#eef3f3]"><pre className="p-5 font-mono text-sm leading-7 text-[#263b44]">{`pip install finir\npython -c "import finir; print(finir.__version__)"\nfinir --help\nfinir doctor`}</pre></div><p className="mt-6">The repository also documents optional <code>gpu</code> and <code>viz</code> extras and editable development installation. The canonical company model and exact <code>.finir</code> syntax are available in the repository’s <code>examples/company_model/model.finir</code>.</p></Section>
        <Section id="resources" number="10" title="References and resources" className="border-b-0"><div className="finir-resources-intro mt-8"><p>Primary materials for inspecting the release, reproducing the reported experiment, and working with the public package.</p><p>Each link opens the original source in a new tab.</p></div><div className="finir-resource-directory mt-12">
          <div className="finir-resource-group"><div className="finir-resource-group__heading"><span>01</span><div><h3>Start with the release</h3><p>The repository, installable package, and versioned release record.</p></div></div><div className="finir-resource-list"><Resource href="https://github.com/Olyxee/finir" title="FinIR on GitHub" detail="The source repository, including examples and release files." icon="github" meta="Repository" /><Resource href="https://pypi.org/project/finir/" title="FinIR on PyPI" detail="The public package listing for installation and package metadata." icon="pypi" meta="Package" /><Resource href="https://github.com/Olyxee/finir/releases/tag/v0.1.0" title="GitHub release v0.1.0" detail="The versioned release record, published August 31, 2026." icon="github" meta="Release" /></div></div>
          <div className="finir-resource-group"><div className="finir-resource-group__heading"><span>02</span><div><h3>Read the technical record</h3><p>Documentation for the representation, validation rules, compiler, and runtime.</p></div></div><div className="finir-resource-list"><Resource href="https://github.com/Olyxee/finir/blob/main/docs/architecture.md" title="Architecture" detail="How the layers are separated and how evaluation data moves through them." icon="book" meta="Documentation" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/type-system.md" title="Finance-aware type system" detail="Supported types and the validation rules for financial operations." icon="book" meta="Documentation" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/compiler.md" title="Compiler" detail="Compiler passes, interactive behavior, and the fusion note." icon="book" meta="Documentation" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/runtime.md" title="Incremental runtime" detail="Dirty sets, cache reuse, state handling, and scenarios." icon="book" meta="Documentation" /></div></div>
          <div className="finir-resource-group"><div className="finir-resource-group__heading"><span>03</span><div><h3>Inspect evidence and related work</h3><p>Experiment materials and the available model resource.</p></div></div><div className="finir-resource-list"><Resource href="https://github.com/Olyxee/finir/blob/main/research/experiment_001_incremental_financial_reasoning.md" title="Experiment 001" detail="The method, results, and notes for reproducing the incremental reasoning experiment." icon="book" meta="Research" /><Resource href="https://huggingface.co/Olyxee/FinIR-Intent" title="FinIR-Intent" detail="The FinIR-Intent resource on Hugging Face." icon="huggingface" meta="Resource" /><div className="finir-resource finir-resource--unavailable"><span className="finir-resource__mark"><BookOpen className="h-4 w-4" aria-hidden /></span><span className="finir-resource__copy"><strong>IntentBench and live demo</strong><span>Private or forthcoming; no public link is asserted here.</span></span><span className="finir-resource__meta">Availability</span></div></div></div>
        </div></Section>
      </div></div>
    </article></main>
    <Footer />
  </div>;
};

export default FinIR;