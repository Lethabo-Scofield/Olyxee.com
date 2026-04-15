'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      setValue(current);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { type: 'cmd', text: '$ grysics execute --goal "Reconcile Q1 financial transactions"' },
    { type: 'info', text: '◼ Connecting to systems... ERP + Bank' },
    { type: 'info', text: '◼ Planning execution steps...' },
    { type: 'blank', text: '' },
    { type: 'header', text: '  EXECUTION RESULTS' },
    { type: 'blank', text: '' },
    { type: 'pass', text: '  ✓ Pulling transactions       847 records from ERP' },
    { type: 'pass', text: '  ✓ Cross-referencing          matched with bank data' },
    { type: 'warn', text: '  ⚠ Discrepancies found        3 found, 2 resolved' },
    { type: 'pass', text: '  ✓ Variance identified        $12.4K flagged' },
    { type: 'pass', text: '  ✓ Report generated           ready for download' },
    { type: 'pass', text: '  ✓ Audit trail                full log available' },
    { type: 'blank', text: '' },
    { type: 'result', text: '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'result', text: '  847 records · 2m 14s · 1 pending review' },
    { type: 'success', text: '  ✓ Execution complete' },
  ];

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [isInView, lines.length]);

  return (
    <div ref={ref} className="relative">
      <div className="relative bg-[#0d1117] rounded-xl sm:rounded-2xl border border-neutral-200 shadow-2xl shadow-neutral-200/40 overflow-hidden">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 font-mono">grysics / execution</span>
          </div>
        </div>
        <div className="p-3 sm:p-6 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 min-h-[260px] sm:min-h-[340px] overflow-x-auto no-scrollbar">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === 'cmd' ? 'text-white font-semibold' :
                line.type === 'pass' ? 'text-green-400' :
                line.type === 'warn' ? 'text-amber-400' :
                line.type === 'fail' ? 'text-red-400' :
                line.type === 'header' ? 'text-neutral-300 font-bold tracking-wider text-[11px]' :
                line.type === 'success' ? 'text-green-400 font-bold' :
                line.type === 'result' ? 'text-neutral-500' :
                line.type === 'info' ? 'text-neutral-400' :
                'text-transparent select-none'
              }
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          {visibleLines < lines.length && isInView && (
            <span className="inline-block w-2 h-4 bg-white/60 animate-pulse ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  const [copied, setCopied] = useState(false);

  const code = `import grysics

result = grysics.execute(
    goal="Reconcile Q1 financial transactions",
    systems=["erp", "bank"],
    options={
        "auto_resolve": True,
        "audit_trail": True,
        "format": "detailed"
    }
)

if result.complete:
    grysics.deliver(result)`;

  return (
    <div className="relative bg-[#0d1117] rounded-xl sm:rounded-2xl border border-neutral-200 overflow-hidden shadow-lg shadow-neutral-200/30">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-neutral-800 bg-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded bg-yellow-500/60" />
          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-mono">execute.py</span>
        </div>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[10px] sm:text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-3 sm:p-6 font-mono text-[10px] sm:text-[13px] leading-5 sm:leading-6 text-neutral-300 overflow-x-auto no-scrollbar">
        <code>{code.split('\n').map((line, i) => {
          let highlighted = line;
          highlighted = highlighted.replace(/(import|from|if)/g, '<kw>$1</kw>');
          highlighted = highlighted.replace(/(".*?")/g, '<str>$1</str>');
          highlighted = highlighted.replace(/(\d+\.?\d*)/g, '<num>$1</num>');
          highlighted = highlighted.replace(/(grysics)/g, '<fn>$1</fn>');

          return (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-4 text-neutral-700 select-none flex-shrink-0">{i + 1}</span>
              <span dangerouslySetInnerHTML={{
                __html: highlighted
                  .replace(/<kw>(.*?)<\/kw>/g, '<span class="text-purple-400">$1</span>')
                  .replace(/<str>(.*?)<\/str>/g, '<span class="text-green-400">$1</span>')
                  .replace(/<num>(.*?)<\/num>/g, '<span class="text-amber-400">$1</span>')
                  .replace(/<fn>(.*?)<\/fn>/g, '<span class="text-cyan-400">$1</span>')
              }} />
            </div>
          );
        })}</code>
      </pre>
    </div>
  );
}

function EarlyAccessForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-50 border border-green-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">You're on the list!</p>
          <p className="text-xs text-green-600">We'll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md px-2 sm:px-0">
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 min-w-0 px-5 py-3 sm:py-3.5 rounded-full text-sm focus:outline-none transition-all placeholder:text-neutral-400 border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-7 py-3 sm:py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-neutral-900 text-white hover:bg-black"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 rounded-full animate-spin border-white/30 border-t-white" />
        ) : (
          <>Get Early Access <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

export default function GrysicsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-24 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-4 mb-6">
            <Image src="/images/grysics-logo.png" alt="Grysics" width={48} height={48} className="rounded-xl" style={{ width: 48, height: 48 }} priority />
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 text-neutral-500 rounded-full text-xs font-medium border border-neutral-200/60">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Now in limited beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-6"
          >
            Turn business goals
            <br />
            <span className="text-neutral-400">into completed work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed font-light mb-10 max-w-2xl mx-auto px-2"
          >
            Describe what needs to be done. Grysics plans, coordinates, and executes across your tools and systems end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <EarlyAccessForm />
            <p className="text-xs text-neutral-400 mt-3">Free during beta · No credit card required</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            {[
              "Goal-to-delivery execution",
              "2 min average completion",
              "Cross-system integration",
              "ERP · Databases · Excel",
              "SOC 2 compliant",
            ].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="text-[13px] text-neutral-400"
              >
                {text}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Any goal. Any system.
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl mx-auto">
              Finance, compliance, HR, operations. Grysics executes it all across your connected systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Finance", examples: "Reconciliation, reporting, expense management" },
              { name: "Compliance", examples: "Audit-ready reports, regulatory reporting" },
              { name: "HR Operations", examples: "Onboarding, offboarding, employee updates" },
              { name: "Enterprise Reporting", examples: "Cross-system data aggregation" },
              { name: "Procurement", examples: "Vendor management, PO processing" },
              { name: "Data Operations", examples: "ETL, data validation, migration" },
              { name: "Customer Operations", examples: "Account management, billing" },
              { name: "Executive Dashboards", examples: "KPI tracking, summaries" },
            ].map((app, idx) => (
              <motion.div
                key={app.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-white hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300 p-5 sm:p-6"
              >
                <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">{app.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">{app.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
                Three lines to execute
              </h2>
              <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8">
                Import, describe, execute. Grysics fits into your existing stack with a Python SDK, CLI, and API integrations.
              </p>
              <div className="flex flex-wrap gap-3">
                {['pip install grysics', 'REST API', 'Python SDK'].map((item) => (
                  <span key={item} className="inline-flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-mono border border-neutral-200/60">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
              <CodePreview />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50/80 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Built for speed
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-16">
            {[
              { value: 10, suffix: 'x', label: 'Faster than manual' },
              { value: 50, suffix: '+', label: 'System integrations' },
              { value: 99, suffix: '.9%', label: 'Execution reliability' },
              { value: 2, suffix: 'min', label: 'Avg. completion time' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 text-center"
              >
                <div className="font-serif text-3xl sm:text-4xl italic text-neutral-900 mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { label: "Execution Speed", grysics: "2 min", others: "4+ hrs", grysicsWidth: "7%", othersWidth: "100%" },
              { label: "Accuracy", grysics: "99.2%", others: "92%", grysicsWidth: "99%", othersWidth: "92%" },
              { label: "Systems Connected", grysics: "50+", others: "3-5", grysicsWidth: "100%", othersWidth: "10%" },
              { label: "Success Rate", grysics: "99.9%", others: "87%", grysicsWidth: "99%", othersWidth: "87%" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white rounded-xl p-5 border border-neutral-100"
              >
                <p className="text-xs font-medium text-neutral-500 mb-3">{item.label}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 w-12">Grysics</span>
                    <div className="flex-1 h-6 bg-neutral-100 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-900 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.grysicsWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-white">{item.grysics}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-400 w-12">Others</span>
                    <div className="flex-1 h-6 bg-neutral-100 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-300 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.othersWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-neutral-600">{item.others}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-20">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Goal to delivery in minutes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Describe",
                description: "Define your business goal in plain language. Grysics interprets it and identifies the systems, data, and steps required.",
              },
              {
                step: "02",
                title: "Execute",
                description: "Grysics plans and executes across your connected systems — ERP, databases, spreadsheets, and communication tools.",
              },
              {
                step: "03",
                title: "Deliver",
                description: "Results delivered as reports, notifications, or audit trails. Every action is logged and traceable for compliance.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative px-6 sm:px-8 py-8 sm:py-10 border-t sm:border-t-0 sm:border-l first:border-t-0 first:border-l-0 border-neutral-200"
              >
                <span className="text-5xl sm:text-6xl font-serif italic text-neutral-100 block mb-4">{item.step}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50/80 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              Why teams choose Grysics
            </h2>
            <p className="text-neutral-500 mt-4 text-base sm:text-lg font-light max-w-2xl mx-auto">
              Six reasons teams move from manual workflows to AI-driven execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "No Manual Workflows", description: "Stop building complex automations. Just describe the goal and Grysics handles the rest.", severity: "Critical" },
              { title: "Works With Your Systems", description: "Connects to ERP, Excel, databases, payment platforms, and more without custom integrations.", severity: "High" },
              { title: "Reduces Workload", description: "Free your team from repetitive operational tasks that follow the same pattern every time.", severity: "Critical" },
              { title: "Accurate Outputs", description: "Consistent results every time. No human error from manual data entry or copy-paste mistakes.", severity: "High" },
              { title: "Full Audit Trail", description: "Every action logged and traceable for compliance. All data changes are tracked and reversible.", severity: "Medium" },
              { title: "Enterprise-Ready", description: "Built for regulated industries from day one. SOC 2 compliant with approval workflows at any stage.", severity: "Medium" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group bg-white rounded-2xl p-7 border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${
                    item.severity === 'Critical' ? 'bg-red-50 text-red-600' :
                    item.severity === 'High' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-6">
              Give it a goal. Get it done.
            </h2>
            <p className="text-neutral-500 text-sm sm:text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed px-2 sm:px-0">
              Join the waitlist. Be the first to experience AI-driven execution for your business operations.
            </p>
            <div className="flex justify-center mb-4">
              <EarlyAccessForm />
            </div>
            <p className="text-xs text-neutral-400">Join 500+ teams already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
