'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
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
    { type: 'cmd', text: '$ orgni run --context "Reconcile Q1 financial transactions"' },
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
      <div className="relative bg-[#0A0A0A] rounded-2xl sm:rounded-[32px] shadow-2xl shadow-black/10 overflow-hidden ring-1 ring-black/5">
        <div className="flex items-center px-6 py-5 border-b border-white/10 bg-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[14px] leading-relaxed min-h-[380px] sm:min-h-[440px] overflow-x-auto no-scrollbar bg-[#0A0A0A]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === 'cmd' ? 'text-white font-medium mb-5' :
                line.type === 'pass' ? 'text-neutral-300' :
                line.type === 'warn' ? 'text-neutral-400' :
                line.type === 'fail' ? 'text-neutral-400' :
                line.type === 'header' ? 'text-white font-medium tracking-wide text-xs mb-3 mt-5' :
                line.type === 'success' ? 'text-white font-medium mt-3' :
                line.type === 'result' ? 'text-neutral-500' :
                line.type === 'info' ? 'text-neutral-400' :
                'text-transparent select-none'
              }
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          {visibleLines < lines.length && isInView && (
            <span className="inline-block w-2.5 h-4.5 bg-white/40 animate-pulse ml-1 align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  const [copied, setCopied] = useState(false);

  const code = `import orgni

result = orgni.run(
    context="Reconcile Q1 financial transactions",
    systems=["erp", "bank"],
    options={
        "auto_resolve": True,
        "audit_trail": True,
        "format": "detailed"
    }
)

if result.complete:
    orgni.deliver(result)`;

  return (
    <div className="relative bg-[#0A0A0A] rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0A0A0A]">
        <div className="flex items-center">
          <span className="text-[13px] text-neutral-400 font-mono tracking-tight">context.py</span>
        </div>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[13px] text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 sm:p-10 font-mono text-[13px] sm:text-[14px] leading-relaxed text-neutral-300 overflow-x-auto no-scrollbar bg-[#0A0A0A]">
        <code>{code.split('\n').map((line, i) => {
          let highlighted = line;
          highlighted = highlighted.replace(/(import|from|if)/g, '<kw>$1</kw>');
          highlighted = highlighted.replace(/(".*?")/g, '<str>$1</str>');
          highlighted = highlighted.replace(/(\d+\.?\d*)/g, '<num>$1</num>');
          highlighted = highlighted.replace(/(orgni|result|context|systems|options|True)/g, '<fn>$1</fn>');

          return (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-5 text-neutral-600 select-none flex-shrink-0">{i + 1}</span>
              <span dangerouslySetInnerHTML={{
                __html: highlighted
                  .replace(/<kw>(.*?)<\/kw>/g, '<span class="text-neutral-500">$1</span>')
                  .replace(/<str>(.*?)<\/str>/g, '<span class="text-white">$1</span>')
                  .replace(/<num>(.*?)<\/num>/g, '<span class="text-white">$1</span>')
                  .replace(/<fn>(.*?)<\/fn>/g, '<span class="text-neutral-200">$1</span>')
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
        className="flex items-center gap-3 px-6 py-4 rounded-full bg-neutral-100 border border-neutral-200/60"
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0A0A0A]">
          <Check className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="text-[15px] font-medium text-neutral-900">You're on the list. We'll be in touch.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 min-w-0 px-6 py-4 rounded-full text-[15px] focus:outline-none transition-all placeholder:text-neutral-400 border border-neutral-200/80 bg-neutral-50/50 text-neutral-900 focus:ring-2 focus:ring-neutral-900/5 focus:bg-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 rounded-full font-medium text-[15px] transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-[#0A0A0A] text-white hover:bg-black hover:shadow-lg hover:shadow-black/10"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 rounded-full animate-spin border-neutral-500 border-t-white" />
        ) : (
          <>Join Waitlist <ArrowRight className="w-4 h-4 ml-0.5" /></>
        )}
      </button>
    </form>
  );
}

export default function OrdoPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative selection:bg-neutral-200">
      <Header />

      {/* Hero */}
      <section className="pt-32 sm:pt-48 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-6 mb-12">
            <div className="w-14 h-14 rounded-[14px] bg-neutral-50 flex items-center justify-center p-2 border border-neutral-200/60 shadow-sm">
              <Image src="/images/ordo-logo.png" alt="Orgni" width={48} height={48} className="rounded-xl" priority />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-[13px] font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              Now in limited beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[104px] font-medium text-[#0A0A0A] tracking-tighter leading-[1.02] mb-8"
          >
            Live business context<br className="hidden sm:block" />
            <span className="text-neutral-400"> for modern operations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-[22px] text-neutral-500 leading-relaxed font-normal mb-12 max-w-2xl mx-auto px-2"
          >
            Orgni connects your company's knowledge, decisions, processes, systems, and controls into a living operational context.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <EarlyAccessForm />
            <p className="text-[13px] text-neutral-500 mt-5 font-medium">Free during beta · No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="py-12 border-t border-neutral-100 mt-8 sm:mt-16 bg-[#F9FAFB]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {[
              "Live business context",
              "Operational memory",
              "Cross-system integration",
              "ERP · Databases · Excel",
              "Full audit trail",
            ].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="text-[15px] font-medium text-neutral-400"
              >
                {text}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="py-24 sm:py-32 bg-[#F9FAFB] border-y border-neutral-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-24 sm:py-32 lg:py-48">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tighter text-[#0A0A0A] mb-6">
              Context across every domain.
            </h2>
            <p className="text-neutral-500 text-lg sm:text-[22px] font-normal max-w-2xl mx-auto leading-relaxed">
              Finance, compliance, HR, operations. Orgni gives every part of your business the live context it runs on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                viewport={{ once: true, margin: "-50px" }}
                custom={idx}
                variants={fadeUp}
                className="group rounded-2xl bg-white border border-neutral-200/60 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-neutral-200"
              >
                <h3 className="text-[19px] font-medium text-[#0A0A0A] mb-3">{app.name}</h3>
                <p className="text-[15px] text-neutral-500 leading-relaxed font-normal">{app.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code / SDK Integration */}
      <section className="py-24 sm:py-32 lg:py-48 bg-[#F9FAFB] border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp}>
              <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tighter text-[#0A0A0A] mb-8 leading-[1.05]">
                Three lines to connect.
              </h2>
              <p className="text-neutral-500 text-lg sm:text-[22px] font-normal leading-relaxed mb-10">
                Import, connect, query. Orgni fits into your existing stack with a Python SDK, CLI, and REST API integrations.
              </p>
              <div className="flex flex-wrap gap-3">
                {['pip install orgni', 'REST API', 'Python SDK'].map((item) => (
                  <span key={item} className="inline-flex items-center px-5 py-2.5 bg-white text-[#0A0A0A] rounded-full text-[14px] font-medium border border-neutral-200/80 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={2} variants={fadeUp}>
              <CodePreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics / Speed */}
      <section className="py-24 sm:py-32 lg:py-48">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className="text-center mb-20 sm:mb-32">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tighter text-[#0A0A0A]">
              Built for speed.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-20 sm:mb-32">
            {[
              { value: 10, suffix: 'x', label: 'Faster than manual' },
              { value: 50, suffix: '+', label: 'System integrations' },
              { value: 99, suffix: '.9%', label: 'Execution reliability' },
              { value: 2, suffix: 'm', label: 'Avg. completion time' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-[56px] sm:text-[80px] font-medium tracking-tighter text-[#0A0A0A] mb-4 leading-none">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[17px] text-neutral-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { label: "Execution Speed", ordo: "2 min", others: "4+ hrs", ordoWidth: "12%", othersWidth: "100%" },
              { label: "Accuracy", ordo: "99.2%", others: "92%", ordoWidth: "99%", othersWidth: "92%" },
              { label: "Systems Connected", ordo: "50+", others: "3-5", ordoWidth: "100%", othersWidth: "10%" },
              { label: "Success Rate", ordo: "99.9%", others: "87%", ordoWidth: "99%", othersWidth: "87%" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl bg-white border border-neutral-200/60 p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[17px] font-medium text-[#0A0A0A]">{item.label}</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[15px] font-medium">
                      <span className="text-[#0A0A0A]">Orgni</span>
                      <span className="text-[#0A0A0A]">{item.ordo}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#0A0A0A] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.ordoWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[15px] font-medium">
                      <span className="text-neutral-400">Others</span>
                      <span className="text-neutral-400">{item.others}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-300 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.othersWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 sm:py-32 lg:py-48 border-y border-neutral-100 bg-[#F9FAFB]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className="text-center mb-20 sm:mb-32">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tighter text-[#0A0A0A]">
              Grounded in your business context.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-12">
            {[
              {
                step: "01",
                title: "Describe",
                description: "Define your business goal in plain language. Orgni interprets it and identifies the systems, data, and steps required.",
              },
              {
                step: "02",
                title: "Execute",
                description: "Orgni plans and executes across your connected systems including ERP, databases, spreadsheets, and communication tools.",
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
                viewport={{ once: true, margin: "-50px" }}
                custom={idx}
                variants={fadeUp}
                className="relative flex flex-col pt-10 border-t border-neutral-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[26px] font-medium text-[#0A0A0A]">{item.title}</h3>
                  <span className="text-[15px] font-mono text-neutral-400">{item.step}</span>
                </div>
                <p className="text-neutral-500 text-[17px] leading-relaxed font-normal">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why teams choose Orgni */}
      <section className="py-24 sm:py-32 lg:py-48">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tighter text-[#0A0A0A] mb-6">
              Why teams choose Orgni.
            </h2>
            <p className="text-neutral-500 text-lg sm:text-[22px] font-normal max-w-2xl mx-auto">
              Six reasons teams build their operations on Orgni.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Live Business Context", description: "Orgni keeps a living model of how your business actually works, so systems act with real understanding.", severity: "Critical" },
              { title: "Works With Your Systems", description: "Connects to ERP, Excel, databases, payment platforms, and more without custom integrations.", severity: "High" },
              { title: "Reduces Workload", description: "Free your team from repetitive operational tasks that follow the same pattern every time.", severity: "Critical" },
              { title: "Accurate Outputs", description: "Consistent results every time. No human error from manual data entry or copy-paste mistakes.", severity: "High" },
              { title: "Full Audit Trail", description: "Every action logged and traceable for compliance. All data changes are tracked and reversible.", severity: "Medium" },
              { title: "Enterprise-Ready", description: "Built for regulated industries from day one. Approval workflows and full traceability at any stage.", severity: "Medium" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx}
                variants={fadeUp}
                className="group bg-white rounded-[24px] p-8 border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-neutral-200/80"
              >
                <div className="mb-6">
                  <span className={`inline-flex items-center text-[13px] font-medium px-3.5 py-1.5 rounded-full ${
                    item.severity === 'Critical' ? 'bg-neutral-100 text-[#0A0A0A]' :
                    item.severity === 'High' ? 'bg-neutral-50 text-neutral-600' :
                    'bg-neutral-50 text-neutral-400'
                  }`}>
                    {item.severity} Priority
                  </span>
                </div>
                <h3 className="text-[20px] font-medium text-[#0A0A0A] mb-3">{item.title}</h3>
                <p className="text-[15px] text-neutral-500 leading-relaxed font-normal">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 sm:py-48 bg-[#F9FAFB] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-5xl sm:text-7xl lg:text-[88px] font-medium tracking-tighter text-[#0A0A0A] mb-8 leading-[1.02]">
              Give your systems<br className="hidden sm:block" />
              the context they need.
            </h2>
            <p className="text-neutral-500 text-lg sm:text-[22px] font-normal max-w-2xl mx-auto mb-12 leading-relaxed">
              Join the waitlist. Be the first to build live business context for your operations.
            </p>
            <div className="flex justify-center mb-8">
              <EarlyAccessForm />
            </div>
            <p className="text-[14px] text-neutral-400 font-medium">Free during beta · No credit card required</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
