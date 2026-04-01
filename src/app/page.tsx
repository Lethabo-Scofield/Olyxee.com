"use client";

import { useState, useEffect, useRef } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Terminal, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setCookieBannerVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olyxee",
    url: "https://olyxee.com",
    logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
    description: "AI infrastructure company building Grysics, a verification engine that ensures AI applications — chatbots, RAG pipelines, and agent workflows — work correctly and reliably.",
    sameAs: ["https://www.linkedin.com/company/olyxeelab/"],
    foundingDate: "2024",
    knowsAbout: ["Artificial Intelligence", "AI Safety", "AI Verification", "Machine Learning"],
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="grain" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <AnnouncementStrip />
        <ProductShowcase />
        <HowItWorks />
        <CapabilitiesBento />
        <DeveloperSection />
        <CTASection />
      </main>
      <Footer />
      <AnimatePresence>
        {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
      </AnimatePresence>
    </div>
  );
}


function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden" style={{ position: 'relative' }}>
      <div className="absolute inset-0 w-full h-full">
        <Image src="/hero-bg.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/5 border border-neutral-200 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-neutral-600">Now building in public</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-neutral-900 leading-[1.02] tracking-tight"
        >
          Research and safety
          <br />
          for <em className="text-neutral-400">artificial intelligence</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 text-lg sm:text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed"
        >
          We build verification infrastructure for AI applications.
          Test, evaluate, and monitor your models before they fail in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/products/grysics"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/20"
          >
            Try Grysics <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-700 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide shadow-sm"
          >
            Read the Docs
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mt-16 mb-8"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-300/40">
          <video
            src="/videos/demo.mp4"
            className="w-full aspect-video object-cover"
            autoPlay loop muted playsInline preload="metadata"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>
    </section>
  );
}


function AnnouncementStrip() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-white bg-neutral-900 px-2.5 py-1 rounded-md uppercase tracking-widest">New</span>
            <p className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-900">Grysics is now available.</span>{" "}
              Verification engine for chatbots, RAG, and agent workflows.
            </p>
          </div>
          <Link href="/products/grysics" className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap">
            Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}


function ProductShowcase() {
  return (
    <section className="py-32 sm:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Product</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 max-w-3xl">
            Grysics catches what <em className="text-neutral-400">testing misses</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              AI applications fail in ways traditional testing can't detect. Grysics is a verification engine
              purpose-built for LLM-powered systems — chatbots, RAG pipelines, and agent workflows.
            </p>

            <div className="space-y-5">
              {[
                { title: "Hallucination detection", desc: "Find fabricated facts, invented citations, and confident-sounding nonsense before users do." },
                { title: "RAG evaluation", desc: "Score retrieval quality, context usage, and answer faithfulness independently across your entire pipeline." },
                { title: "Drift monitoring", desc: "Detect when production models silently degrade over time. Get alerts on accuracy drops, behavior shifts, and emerging patterns." },
                { title: "Consistency testing", desc: "Verify your AI gives the same quality answer to the same question, regardless of phrasing, ordering, or context." },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/products/grysics"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors mt-4"
            >
              Explore Grysics <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="sticky top-32 rounded-2xl bg-neutral-950 p-6 sm:p-8 overflow-hidden border border-neutral-800">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] text-neutral-600 ml-2 font-mono">grysics verify</span>
              </div>
              <div className="font-mono text-[13px] leading-[1.8] space-y-1">
                <div className="text-neutral-500">$ grysics verify --suite chatbot-v2</div>
                <div className="text-neutral-400 mt-3">Running 847 test cases...</div>
                <div className="text-neutral-400 mt-1 flex items-center gap-2">
                  <span className="text-green-400">✓</span> Accuracy: all assertions passed
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> <span className="text-neutral-400">Consistency: 98.2% across paraphrases</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">!</span> <span className="text-neutral-400">Hallucination: 3 cases flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> <span className="text-neutral-400">RAG retrieval: relevance above threshold</span>
                </div>
                <div className="text-neutral-400 mt-3">
                  <span className="text-neutral-500">───────────────────────────────</span>
                </div>
                <div className="text-white mt-1">
                  Results: <span className="text-green-400">844 passed</span>, <span className="text-amber-400">3 warnings</span>, <span className="text-red-400">0 failed</span>
                </div>
                <div className="text-neutral-600 mt-1">Report saved to ./reports/chatbot-v2.html</div>
                <div className="mt-3 text-neutral-500 animate-pulse">▊</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    { num: "01", title: "Connect", desc: "Point Grysics at your AI application — chatbot, RAG pipeline, or agent workflow. No code changes required." },
    { num: "02", title: "Verify", desc: "Run comprehensive test suites that check accuracy, consistency, hallucination, and retrieval quality across thousands of scenarios." },
    { num: "03", title: "Monitor", desc: "Deploy to production with continuous monitoring. Get real-time alerts when behavior drifts or quality degrades." },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative py-32 sm:py-40 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 sm:mb-24"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">How it works</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Three steps to <em className="text-neutral-500">reliable AI</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative p-8 sm:p-10 md:p-12"
            >
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              <div className="text-5xl sm:text-6xl font-serif text-white/[0.06] mb-6 leading-none">{step.num}</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm sm:text-[15px] text-neutral-400 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CapabilitiesBento() {
  return (
    <section className="py-32 sm:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Capabilities</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 max-w-3xl">
            Built for every stage of the <em className="text-neutral-400">AI lifecycle</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 relative group rounded-2xl bg-neutral-950 p-8 sm:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/15 to-transparent rounded-full blur-2xl" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">Chatbot & Agent Verification</h3>
              <p className="text-neutral-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-lg mb-6">
                Test customer-facing AI across thousands of query variations. Detect hallucinated answers, inconsistent behavior, and policy violations — automatically.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Accuracy testing", "Consistency checks", "Policy compliance", "Edge case detection"].map(t => (
                  <span key={t} className="text-[11px] text-neutral-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="group rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/80 p-8 sm:p-10"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">RAG Evaluation</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
              Score retrieval quality, context utilization, and response faithfulness independently. Know exactly where your pipeline breaks.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 opacity-60">
              Full-stack analysis <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="group rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/80 p-8 sm:p-10"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Production Monitoring</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
              Continuous monitoring for accuracy drift, response degradation, and emerging failure patterns. Alerts before users notice.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 opacity-60">
              Real-time alerts <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="md:col-span-2 lg:col-span-2 group rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100/80 p-8 sm:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Compliance & Audit Trails</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Generate verification reports for regulated industries. Complete audit trails with test results, accuracy metrics, and behavioral logs for every deployment cycle.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-wrap gap-2">
                {["Healthcare", "Legal", "Finance", "Enterprise"].map(t => (
                  <span key={t} className="text-[11px] text-violet-600 bg-violet-100/60 border border-violet-200/60 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function DeveloperSection() {
  const codeSnippet = `from grysics import Verifier

verifier = Verifier(api_key="gry_...")

# Verify a chatbot response
result = verifier.check(
    prompt="What is your refund policy?",
    response=chatbot.reply(prompt),
    context=retrieval.search(prompt),
)

print(result.accuracy)      # 0.94
print(result.hallucination) # False
print(result.consistency)   # 0.97`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="relative py-32 sm:py-40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">For Developers</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6">
                Integrate in <em className="text-neutral-500">minutes</em>
              </h2>
              <p className="text-neutral-400 text-[15px] sm:text-base font-light leading-relaxed mb-8">
                Grysics fits into your existing workflow. Python SDK, REST API, and CLI — test locally, in CI/CD, or in production. No infrastructure to manage.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { label: "Python SDK", desc: "pip install grysics — start verifying in 3 lines of code" },
                  { label: "REST API", desc: "Language-agnostic HTTP endpoints for any stack" },
                  { label: "CLI", desc: "Run verification suites from your terminal or CI pipeline" },
                ].map((tool) => (
                  <div key={tool.label} className="flex gap-3 items-start">
                    <Terminal className="w-4 h-4 text-neutral-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-white">{tool.label}</span>
                      <span className="text-sm text-neutral-500 ml-2">{tool.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/docs"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm"
                >
                  Read the Docs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/products/grysics"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-400 border border-white/15 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all text-sm"
                >
                  Get API Access
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-[11px] text-neutral-600 ml-2 font-mono">verify.py</span>
                </div>
                <pre className="p-5 sm:p-6 overflow-x-auto">
                  <code className="text-[13px] font-mono leading-[1.8]">
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i}>
                        {line.startsWith('#') ? (
                          <span className="text-neutral-600">{line}</span>
                        ) : line.startsWith('from') || line.startsWith('import') ? (
                          <span>
                            <span className="text-purple-400">{line.split(' ')[0]}</span>
                            <span className="text-neutral-300">{' ' + line.split(' ').slice(1).join(' ')}</span>
                          </span>
                        ) : line.includes('print') ? (
                          <span>
                            <span className="text-blue-400">print</span>
                            <span className="text-neutral-300">{line.replace('print', '')}</span>
                          </span>
                        ) : line.includes('=') && !line.trim().startsWith('response') && !line.trim().startsWith('context') ? (
                          <span className="text-neutral-300">{line}</span>
                        ) : (
                          <span className="text-neutral-300">{line}</span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="py-32 sm:py-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100" />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 tracking-tight mb-6"
        >
          Build AI that<br /><em className="text-neutral-400">actually works</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-neutral-500 text-lg sm:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          Start verifying your AI applications today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/products/grysics"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/20"
          >
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-600 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide shadow-sm"
          >
            Talk to Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed bottom-6 left-6 right-6 z-50 flex justify-center"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div
        className="flex flex-col sm:flex-row items-center gap-4 px-6 py-4 max-w-lg rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
      >
        <p className="text-sm text-neutral-600 flex-1 font-light">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-neutral-900">privacy policy</Link>.
        </p>
        <div className="flex gap-3">
          <button onClick={() => { localStorage.setItem("cookie-consent", "accepted"); onDismiss(); }} className="px-5 py-2 bg-neutral-900 text-white text-sm rounded-full font-medium hover:bg-black transition-colors">
            Accept
          </button>
          <button onClick={() => { localStorage.setItem("cookie-consent", "declined"); onDismiss(); }} className="px-4 py-2 text-neutral-400 text-sm hover:text-neutral-900 transition-colors">
            Decline
          </button>
        </div>
      </div>
    </motion.div>
  );
}
