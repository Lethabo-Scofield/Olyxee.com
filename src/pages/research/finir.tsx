"use client";

import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Github, Package } from "lucide-react";
import SEO from "../../components/SEO";
import Header from "../../components/header";
import Footer from "../../components/footer";

const TITLE = "Introducing FinIR";
const DESCRIPTION = "FinIR is a finance-aware intermediate representation and execution runtime for turning AI-interpreted financial instructions into deterministic, typed, and auditable computation. It does this without relying on generated Python, SQL, or spreadsheets as the execution layer.";
const sections = [["problem", "The problem"], ["boundary", "The boundary"], ["ir", "How FinIR works"], ["types", "Type semantics"], ["compiler", "Compiler flow"], ["runtime", "Incremental runtime"], ["evidence", "Evidence"], ["limits", "Limitations"], ["start", "Get started"], ["resources", "References"]] as const;
const people = [
  { "@type": "Person", name: "Lethabo Scofield", url: "https://www.linkedin.com/in/lethabo-scofield-17b37a257/" },
  { "@type": "Person", name: "Alisha Fatima", url: "https://www.linkedin.com/in/thealisha-fatima/" },
];

function Section({ id, number, title, children, className = "" }: { id: string; number: string; title: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`finir-section finir-rule scroll-mt-28 border-b ${className}`}>
    <p className="finir-kicker text-[10px] font-bold uppercase tracking-[.18em]">{number} / {title}</p>
    <div className="finir-prose mt-6 max-w-[680px]"><h2 className="text-[2.1rem] leading-[1.05] text-[#182126] sm:text-5xl">{title}</h2>{children}</div>
  </section>;
}

function Resource({ href, title, detail, icon }: { href: string; title: string; detail: string; icon: "github" | "package" | "book" }) {
  const Icon = icon === "github" ? Github : icon === "package" ? Package : BookOpen;
  return <a href={href} target="_blank" rel="noopener noreferrer" className="finir-resource flex items-center justify-between gap-5 border-b border-[#d9e0e1] px-3 py-5 sm:px-4">
    <span className="flex items-center gap-4"><Icon className="h-4 w-4 shrink-0 text-[#527487]" aria-hidden /><span><strong className="block text-sm font-semibold text-[#24343b]">{title}</strong><span className="mt-1 block text-xs text-[#718087]">{detail}</span></span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-[#527487]" aria-hidden />
  </a>;
}

function FlowDiagram() {
  const flow = ["Natural language", "AI / FinIR-Intent", "Canonical Financial Intent", "FinIR", "Deterministic Financial Execution", "Financial Result"];
  return <div className="finir-diagram mt-10 p-5 sm:p-8"><div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]">
    <div className="grid justify-items-center gap-2">{flow.map((item, i) => <div className="contents" key={item}><div className={`finir-node w-full max-w-[270px] ${item === "FinIR" ? "finir-node--active" : ""}`}>{item}</div>{i < flow.length - 1 && <span className="text-[#527487]">↓</span>}</div>)}</div>
    <div className="hidden text-center text-xs font-semibold text-[#527487] lg:block">Financial<br />intent →</div>
    <div className="border border-[#d4dddf] bg-[#fbfcfb] p-4"><p className="mb-3 text-center text-xs font-bold text-[#34464e]">Inside FinIR</p>{["Typed Financial Graph", "Dependency Analysis", "Compiler Passes", "Incremental Runtime"].map((item) => <div className="finir-node mb-2 last:mb-0" key={item}>{item}</div>)}<div className="my-3 text-center text-[#527487]">↓</div><div className="finir-node">CPU · SIMD · GPU</div></div>
  </div></div>;
}

function CompanyGraph() {
  const rows = [["Revenue", "−", "COGS", "Gross Profit"], ["Gross Profit", "÷", "Revenue", "Gross Margin"], ["Gross Profit", "−", "Opex", "EBITDA"]];
  return <div className="mt-10 grid gap-5 lg:grid-cols-2"><div className="border border-[#d9e0e1] bg-[#f6f8f7] p-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#527487]">Canonical company model</p><pre className="mt-5 overflow-x-auto border border-[#dce4e3] bg-[#eef2f1] p-4 font-mono text-xs leading-6 text-[#263b44]">{`model company {
  input revenue: money[ZAR]
  input cogs: money[ZAR]
  input opex: money[ZAR]

  gross_profit = revenue - cogs
  gross_margin = gross_profit / revenue
  ebitda = gross_profit - opex
}`}</pre></div>
  <div className="border border-[#d9e0e1] bg-[#f6f8f7] p-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#527487]">Dependency graph</p><div className="mt-8 grid gap-6 text-xs">{rows.map(([a, operator, b, result]) => <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2" key={result}><div className="finir-node">{a}</div><span className="finir-flow-arrow">{operator}</span><div className="finir-node">{b}</div><span className="finir-flow-arrow">→</span><div className="finir-node">{result}</div></div>)}</div><p className="mt-8 text-sm leading-6 text-[#607078]">Gross profit is revenue minus COGS. EBITDA is gross profit minus opex; gross margin is gross profit divided by revenue.</p></div></div>;
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

  const jsonLd = { "@context": "https://schema.org", "@type": ["TechArticle", "ScholarlyArticle"], headline: TITLE, description: DESCRIPTION, datePublished: "2026-09-03", dateModified: "2026-09-03", mainEntityOfPage: "https://olyxee.com/research/finir", author: people, publisher: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com", logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" } }, inLanguage: "en" };
  return <div className="finir-page min-h-[100dvh]">
    <SEO title={TITLE} description={DESCRIPTION} path="/research/finir" ogType="article" keywords={["FinIR", "financial computation", "financial intermediate representation", "incremental execution", "AI infrastructure"]} jsonLd={jsonLd} />
    <Header />
    <main><article>
      <header className="mx-auto max-w-[950px] px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-36">
        <Link href="/research" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#718087] transition-colors hover:text-[#24475a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#527487]"><ArrowLeft className="h-3.5 w-3.5" aria-hidden />Research &amp; releases</Link>
        <p className="mt-12 text-[10px] font-bold uppercase tracking-[.2em] text-[#527487]">Research release · September 3, 2026</p>
        <h1 className="finir-display mx-auto mt-5 max-w-[880px] text-[2.7rem] leading-[.98] text-[#182126] sm:text-6xl lg:text-7xl">{TITLE}</h1>
        <p className="mx-auto mt-7 max-w-[720px] text-[17px] leading-7 text-[#5d6c73] sm:text-[19px] sm:leading-8">{DESCRIPTION}</p>
        <p className="mt-8 text-xs font-semibold text-[#43545b]">By <a href={people[0].url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#aebfc6] underline-offset-4 transition-colors hover:text-[#24475a]">Lethabo Scofield</a> and <a href={people[1].url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#aebfc6] underline-offset-4 transition-colors hover:text-[#24475a]">Alisha Fatima</a></p>
      </header>
      <figure className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 sm:py-14"><div className="finir-media overflow-hidden border border-[#e0e6e5] bg-white p-2 sm:p-4"><Image src="/research/finir-workflow.png" alt="FinIR workflow from natural-language financial intent through a typed intermediate representation, dependency graph, incremental execution, and financial result" width={1448} height={1086} className="h-auto w-full" priority /></div><figcaption className="mx-auto mt-4 max-w-[900px] text-center text-xs leading-5 text-[#718087]">FinIR turns interpreted financial intent into an explicit, typed, and executable computation graph.</figcaption></figure>
      <div className="mx-auto grid max-w-[1060px] gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[160px_minmax(0,680px)] lg:gap-20 lg:pb-28"><aside aria-hidden={!showContents} className={`hidden transition-[opacity,transform] duration-200 lg:sticky lg:top-28 lg:block lg:self-start ${showContents ? "translate-y-0 opacity-100" : "-translate-y-2 pointer-events-none opacity-0"}`}><nav className="finir-anchor" aria-label="On this page">{sections.map(([id, label]) => <a key={id} href={`#${id}`} tabIndex={showContents ? 0 : -1}>{label}</a>)}</nav></aside><div className="min-w-0">
        <section id="problem" className="finir-rule scroll-mt-28 border-b pb-16"><p className="finir-kicker text-[10px] font-bold uppercase tracking-[.18em]">01 / The problem</p><h2 className="mt-6 text-[2.1rem] leading-[1.05] sm:text-5xl">A reliable place for financial computation</h2><div className="finir-prose mt-8 max-w-[680px]"><p>AI systems are good at interpreting financial instructions, but interpretation is not the same as reliable execution. When an AI generates Python, SQL, or spreadsheet formulas for every task, the execution logic can change between runs, financial types are difficult to enforce, and the origin of each result becomes harder to audit.</p><p className="mt-5">FinIR addresses this problem by placing a deterministic computational layer between the AI and the final result. The AI expresses financial intent, while FinIR validates the types, records the dependencies, compiles the computation, and recalculates only the values affected by a change.</p></div></section>
        <section id="boundary" className="finir-rule scroll-mt-28 border-b py-16 sm:py-24"><p className="finir-kicker text-[10px] font-bold uppercase tracking-[.18em]">02 / The boundary</p><h2 className="mt-6 text-[2.1rem] leading-[1.05] sm:text-5xl">A computational boundary for AI</h2><p className="mt-7 max-w-[580px] text-base leading-7 text-[#445158]">FinIR separates probabilistic interpretation from deterministic financial execution.</p><FlowDiagram /></section>
        <Section id="ir" number="03" title="How FinIR works"><p className="mt-8">The repository describes a typed computation graph with an expression AST, a textual <code>.finir</code> format, JSON interchange, parsing, and validation. The graph is the stable representation between intent and evaluation.</p><p className="mt-5">The Financial IR makes the model’s financial dependencies explicit before the compiler and runtime evaluate it.</p><CompanyGraph /></Section>
        <Section id="types" number="04" title="Finance-aware type semantics"><p className="mt-8">FinIR assigns every value a finance-aware type and validates operations before execution. The release includes money, percentage, ratio, days, quantity, rate, series, scenario, scalar, and boolean types.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{["money[ZAR] − money[ZAR] → money[ZAR]", "money ÷ money → ratio", "money × percentage → money", "money + days → TypeCheckError", "USD + ZAR → CurrencyError", "days ÷ scalar → days"].map((item) => <div className="finir-node" key={item}>{item}</div>)}</div><p className="mt-8">Money subtraction requires the same currency; mixing currencies raises a currency error, while invalid operations raise a type-check error. This makes an expression such as revenue plus receivable days fail loudly rather than produce a numeric result with the wrong meaning.</p></Section>
        <Section id="compiler" number="05" title="Compiler and evaluate flow"><p className="mt-8">A model validates and type-checks its module before an incremental engine evaluates requested targets. The engine computes needed nodes in dependency order and sends arithmetic to a backend.</p><p className="mt-5">The compiler also defines analysis and transformation passes: validation, type checking, constant folding, common-subexpression elimination, dead-node elimination, dependency pruning, scenario-vectorization analysis, fusion analysis, and cache planning. The ahead-of-time <code>finir compile</code> path can show these passes; interactive models retain queryable user node names and run validation plus type checking.</p><div className="finir-diagram mt-10 p-5 text-center text-xs font-semibold text-[#527487] sm:p-8">validate → type-check → plan dependencies → evaluate targets → return values and runtime statistics</div></Section>
        <Section id="runtime" number="06" title="Incremental runtime"><div className="mt-8 grid gap-8 lg:grid-cols-2"><div><p>The runtime maintains a value store and validity set. Changing an input invalidates its downstream cone using precomputed dependents. Evaluation walks needed nodes in dependency order: valid nodes are reused by lookup; invalid nodes are recomputed and marked valid.</p><p className="mt-5">For the company model, if COGS changes by 4%, gross profit, gross margin, and EBITDA are downstream defined nodes and are recomputed.</p></div><div className="border border-[#d9e0e1] bg-[#f6f8f7] p-5 text-xs"><p className="font-semibold text-[#24343b]">When an assumption changes</p><p className="mt-3 text-[#607078]">Example: COGS +4%</p>{["Gross Profit", "Gross Margin", "EBITDA"].map((item) => <div className="mt-3 flex justify-between border-b border-[#dce4e3] pb-3" key={item}><span>{item}</span><span className="bg-[#24475a] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">recomputed</span></div>)}<div className="mt-3 flex justify-between"><span>Unrelated nodes</span><span className="border border-[#6d818a] px-2 py-0.5 text-[10px] uppercase tracking-wide">reused</span></div></div></div><p className="mt-6">The repository also exposes transient what-if evaluation, state snapshots, and cache-hit metrics.</p></Section>
        <Section id="evidence" number="07" title="Evidence and reproducibility"><p className="mt-8">Experiment 001 asks whether dependency-aware caching reduces the cost of iterative financial reasoning. Its 1,000-turn synthetic workload uses a 6-node model and compares a warm FinIR cache with a same-engine baseline whose cache is cleared each turn.</p><div className="mt-10 overflow-x-auto border border-[#d9e0e1]"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-[#f1f5f5] text-xs uppercase tracking-wider text-[#607078]"><tr><th className="p-4">Condition</th><th className="p-4">Time</th><th className="p-4">Recomputes</th><th className="p-4">Cache hit</th></tr></thead><tbody><tr className="border-t border-[#d9e0e1]"><td className="p-4">Baseline, full recompute</td><td className="p-4 font-mono">0.0355s</td><td className="p-4 font-mono">6,000</td><td className="p-4">0%</td></tr><tr className="border-t border-[#d9e0e1]"><td className="p-4">FinIR incremental</td><td className="p-4 font-mono">0.0223s</td><td className="p-4 font-mono">3,600</td><td className="p-4">40.0%</td></tr></tbody></table></div><figure className="finir-media mt-10 border border-[#d9e0e1] bg-white p-3 sm:p-5"><Image src="/research/finir-execution-time-vs-graph-size.png" alt="Log-scale line chart comparing median execution time for full recomputation and FinIR incremental execution across synthetic graphs from 98 to 100,000 nodes" width={1306} height={794} className="h-auto w-full" /><figcaption className="border-t border-[#e0e6e5] px-1 pb-1 pt-4 text-xs leading-5 text-[#718087]">Synthetic dependency-graph benchmark for FinIR v0.1.0. Incremental execution remains below full recomputation across the measured graph sizes; results are benchmark-specific and should not be read as a general production speedup claim.</figcaption></figure><p className="mt-6 text-sm leading-7 text-[#607078]"><strong className="text-[#24343b]">Observed in this run: 1.59×.</strong> This is a synthetic workload, with cheap arithmetic and Python traversal overhead, run in a single CPU process using the same engine and no-cache baseline. It is not a general production speedup claim. Reproduce with <code>python research/reproduce_experiment_001.py</code> in the public repository.</p><h3 className="mt-16 text-2xl font-semibold tracking-[-.035em] text-[#24343b]">How the execution models compare</h3><p className="mt-4 text-sm leading-7 text-[#607078]">The table below compares typical out-of-the-box execution models, not measured runtime speed. Products and custom implementations vary; external tools were not included in Experiment 001.</p><div className="mt-8 overflow-x-auto border border-[#d9e0e1]"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f1f5f5] text-xs uppercase tracking-wider text-[#607078]"><tr><th className="p-4">Approach</th><th className="p-4">Finance-aware types</th><th className="p-4">Incremental recomputation</th><th className="p-4">Explicit dependency graph</th><th className="p-4">Execution boundary for AI</th></tr></thead><tbody>{[["FinIR", "Built in", "Built in", "Built in", "Designed for it"], ["Spreadsheets", "Limited", "Common, implementation-dependent", "Implicit cell graph", "Not by default"], ["Generated Python / SQL", "Custom code required", "Custom code required", "Not by default", "Generated code executes directly"], ["Generic DAG tools", "Custom domain layer required", "Tool-dependent", "Built in", "Custom integration required"]].map((row) => <tr className="border-t border-[#d9e0e1]" key={row[0]}>{row.map((cell, index) => <td className={`p-4 align-top ${index === 0 ? "font-semibold text-[#24343b]" : "text-[#526269]"}`} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></Section>
        <Section id="limits" number="08" title="Limitations and boundaries"><p className="mt-8">FinIR is a compiler target and runtime for financial computation. It is not a dashboard, ERP, trading platform, quant library, or generic DAG engine. This release makes no novelty, first, or breakthrough claim.</p><p className="mt-5">Experiment 001 is one synthetic graph and one CPU, with no engine-level parallelism. Experiment 002 does not verify a GPU crossover; its <code>GPU_MIN_ELEMENTS = 250_000</code> threshold is a heuristic placeholder. The repository describes a CPU-first reference/vectorized backend and an optional CuPy GPU backend; this page does not claim shipping CPU, SIMD, or GPU acceleration beyond that status.</p></Section>
        <Section id="start" number="09" title="Install and get started"><p className="mt-8">The public package is FinIR 0.1.0, released August 31, 2026. Install the CPU-first package with:</p><pre className="mt-6 overflow-x-auto border border-[#d9e0e1] bg-[#eef3f3] p-5 font-mono text-sm leading-7 text-[#263b44]">{`pip install finir\npython -c "import finir; print(finir.__version__)"\nfinir --help\nfinir doctor`}</pre><p className="mt-6">The repository also documents optional <code>gpu</code> and <code>viz</code> extras and editable development installation. The canonical company model and exact <code>.finir</code> syntax are available in the repository’s <code>examples/company_model/model.finir</code>.</p></Section>
        <Section id="resources" number="10" title="References and resources" className="border-b-0"><p className="mt-8">The implementation, release record, type rules, compiler behavior, runtime behavior, and experiment outputs are public in the following sources.</p><div className="mt-10 border-t border-[#d9e0e1]"><Resource href="https://github.com/Olyxee/finir" title="FinIR on GitHub" detail="Source repository, examples, and release files" icon="github" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/architecture.md" title="Architecture" detail="Layer responsibilities and evaluate data flow" icon="book" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/type-system.md" title="Finance-aware type system" detail="Types and algebraic validation rules" icon="book" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/compiler.md" title="Compiler" detail="Passes, interactive behavior, and fusion note" icon="book" /><Resource href="https://github.com/Olyxee/finir/blob/main/docs/runtime.md" title="Incremental runtime" detail="Dirty sets, cache reuse, state, and scenarios" icon="book" /><Resource href="https://github.com/Olyxee/finir/blob/main/research/experiment_001_incremental_financial_reasoning.md" title="Experiment 001" detail="Method, results, and reproduction notes" icon="book" /><Resource href="https://pypi.org/project/finir/" title="FinIR on PyPI" detail="Package listing" icon="package" /><Resource href="https://github.com/Olyxee/finir/releases/tag/v0.1.0" title="GitHub release v0.1.0" detail="Released August 31, 2026" icon="github" /><Resource href="https://huggingface.co/Olyxee/FinIR-Intent" title="FinIR-Intent" detail="Hugging Face resource" icon="book" /><div className="border-b border-[#d9e0e1] px-3 py-5 text-sm text-[#607078] sm:px-4"><strong className="block text-[#24343b]">IntentBench and live demo</strong><span className="mt-1 block text-xs">Private or forthcoming; no public link is asserted here.</span></div></div></Section>
      </div></div>
    </article></main>
    <Footer />
  </div>;
};

export default FinIR;