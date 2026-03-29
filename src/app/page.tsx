"use client";

import { useState, useEffect } from "react";
import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";

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
    sameAs: [
      "https://www.linkedin.com/company/olyxeelab/",
    ],
    foundingDate: "2024",
    knowsAbout: ["Artificial Intelligence", "AI Safety", "AI Verification", "Machine Learning", "Edge AI"],
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="grain" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main>
        <HeroSection />
        <PipelineSection />
        <IndustriesSection />
        <OfferingsSection />
        <ArchitectureSection />
        <ResearchSection />
        <MetricsSection />
        <CTASection />
      </main>

      <Footer />

      <AnimatePresence>
        {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
      </AnimatePresence>
    </div>
  );
}

const partnerLogos = [
  { name: "OpenAI", src: "/partner-logos/openai.svg", w: 28, h: 28 },
  { name: "Meta", src: "/partner-logos/meta.svg", w: 36, h: 20 },
  { name: "Google", src: "/partner-logos/google.svg", w: 26, h: 26 },
  { name: "Anthropic", src: "/partner-logos/anthropic.svg", w: 28, h: 18 },
  { name: "Mistral", src: "/partner-logos/mistral.svg", w: 24, h: 24 },
  { name: "Hugging Face", src: "/partner-logos/huggingface.svg", w: 28, h: 28 },
];

function HeroSection() {
  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-neutral-900 leading-[1.05] tracking-tight"
        >
          Research and safety
          <br />
          for{" "}
          <em className="text-neutral-400">artificial intelligence</em>
        </motion.h1>

      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl shadow-neutral-200/50">
          <video
            src="/videos/demo.mp4"
            className="w-full aspect-video object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
          >
            <Link
              href="/docs"
              className="inline-flex items-center justify-center w-20 h-20 bg-white text-neutral-900 rounded-full font-medium hover:scale-105 transition-all text-sm tracking-wide shadow-xl shadow-black/20"
            >
              Start
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-16"
      >
        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] font-medium text-center mb-8">Trusted by industry leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14">
          {partnerLogos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.5 }}
              className="flex items-center gap-2.5 opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-default"
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                className="select-none"
                draggable={false}
              />
              <span className="text-sm font-semibold text-neutral-900 tracking-tight hidden sm:inline">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


function PipelineSection() {
  const steps = [
    { title: "Connect", desc: "Point to any AI app." },
    { title: "Verify", desc: "Test accuracy and safety." },
    { title: "Evaluate", desc: "Score RAG and agents." },
    { title: "Deploy", desc: "Ship with confidence." },
    { title: "Monitor", desc: "Watch it in production." },
  ];

  return (
    <section className="py-32 sm:py-44 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-5"
          >
            From app to <em className="text-neutral-400">production.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 font-light"
          >
            Five stages. One pipeline. Zero guesswork.
          </motion.p>
        </div>

        <div className="hidden sm:flex items-start justify-between relative">
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-neutral-200" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center relative z-10 w-1/5"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium mb-6">
                {idx + 1}
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-1">{step.title}</h3>
              <p className="text-sm text-neutral-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="sm:hidden space-y-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-400 mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function IndustriesSection() {
  const industries = [
    {
      title: "Customer Support AI",
      subtitle: "Reliable chatbots at scale",
      desc: "Verify that your support chatbot answers accurately, handles edge cases gracefully, and never hallucinates policy information. Grysics tests consistency across thousands of query variations and monitors response quality in production.",
      metrics: [
        { label: "Accuracy", value: ">95%" },
        { label: "Consistency", value: "97%" },
        { label: "Hallucination rate", value: "<2%" },
      ],
      flow: ["User Query", "RAG Pipeline", "Grysics Verify", "Response", "Monitor"],
    },
    {
      title: "Legal & Compliance",
      subtitle: "Verified AI for regulated industries",
      desc: "Ensure legal research assistants and compliance chatbots cite correct sources and never fabricate case law. Grysics provides audit trails showing verification results for every model update — supporting regulatory requirements.",
      metrics: [
        { label: "Citation accuracy", value: ">99%" },
        { label: "Source fidelity", value: "Verified" },
        { label: "Audit trail", value: "Complete" },
      ],
      flow: ["Legal Query", "Document Retrieval", "Grysics Verify", "Response", "Audit Log"],
    },
    {
      title: "Healthcare AI",
      subtitle: "Safe AI assistants for clinical use",
      desc: "Test medical Q&A systems and clinical decision support tools for accuracy and safety. Grysics detects hallucinated medical advice, verifies responses against approved clinical guidelines, and flags inconsistencies before patient-facing deployment.",
      metrics: [
        { label: "Safety checks", value: "Automated" },
        { label: "Guideline adherence", value: ">98%" },
        { label: "Drift detection", value: "Real-time" },
      ],
      flow: ["Clinical Query", "Knowledge Base", "Grysics Verify", "Response", "Safety Monitor"],
    },
    {
      title: "Enterprise Knowledge",
      subtitle: "Trustworthy internal AI tools",
      desc: "Verify that internal knowledge base chatbots and document Q&A systems retrieve the right information and answer correctly. Grysics evaluates retrieval quality, context utilization, and response faithfulness across your entire document corpus.",
      metrics: [
        { label: "Retrieval relevance", value: ">92%" },
        { label: "Answer accuracy", value: ">94%" },
        { label: "Context utilization", value: ">87%" },
      ],
      flow: ["Employee Query", "Vector Search", "Grysics Verify", "Response", "Quality Dashboard"],
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neutral-800 rounded-full blur-[200px] opacity-20 translate-x-1/3 -translate-y-1/3" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight"
            >
              Built for regulated,
              <br />
              <em className="text-neutral-500">safety-critical industries</em>
            </motion.h2>
          </div>
        </div>

        <div className="space-y-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl sm:text-2xl font-semibold">{ind.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 mb-4">{ind.subtitle}</p>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">{ind.desc}</p>

                    <div className="flex flex-wrap gap-6 mt-6">
                      {ind.metrics.map(m => (
                        <div key={m.label}>
                          <div className="text-xl font-semibold text-white">{m.value}</div>
                          <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-[340px] flex-shrink-0">
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3 font-medium">Data flow</div>
                    <div className="flex flex-col gap-0">
                      {ind.flow.map((node, i) => (
                        <div key={node} className="flex items-center gap-0">
                          <div className={`flex-1 text-xs font-medium px-3 py-2 border rounded-md text-center ${
                            node.includes("Grysics")
                              ? "border-white/30 text-white bg-white/5"
                              : "border-white/10 text-neutral-400"
                          }`}>
                            {node}
                          </div>
                          {i < ind.flow.length - 1 && (
                            <div className="flex flex-col items-center mx-0 -my-1 relative z-10">
                              <div className="w-px h-3 bg-white/20" />
                              <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-white/20" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function OfferingsSection() {
  return (
    <section className="py-28 sm:py-36 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <span className="accent-line" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900"
            >
              What we
              <br />
              <em className="text-neutral-400">build & do</em>
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/products/grysics"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Grysics</h3>
                <span className="text-xs font-medium text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200">Product</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xl">Verification engine for AI applications. Test chatbots, RAG pipelines, and agent workflows for accuracy, consistency, and hallucination — before and after deployment.</p>
            </div>
            <span className="text-sm font-medium text-neutral-400 flex items-center gap-1.5 group-hover:text-neutral-900 group-hover:gap-3 transition-all flex-shrink-0">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4"
        >
          <Link
            href="/edgeai"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Olyxee Edge Box</h3>
                <span className="text-xs font-medium text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200">Division</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xl">Our edge AI sub-division. Deploys AI models to IoT sensors, drones, robots, and embedded systems — optimized for performance, power, and latency on real hardware.</p>
            </div>
            <span className="text-sm font-medium text-neutral-400 flex items-center gap-1.5 group-hover:text-neutral-900 group-hover:gap-3 transition-all flex-shrink-0">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function ArchitectureSection() {
  return (
    <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4"
          >
            System architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-base max-w-xl mx-auto"
          >
            How Olyxee connects strategy, execution, and verification into one coherent stack.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <div className="border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Olyxee Core</div>
                  <div className="text-[11px] text-neutral-400">Strategy & orchestration layer</div>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2 max-w-lg">The brain — handles API routing, application registry, verification scheduling, monitoring coordination, and customer-facing platform services.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center">
                    <span className="text-neutral-700 text-xs font-bold">OEB</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Edge Box Division</div>
                    <div className="text-[11px] text-neutral-400">Execution layer</div>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2">The hands — manages physical edge deployments, device provisioning, OTA updates, and hardware abstraction across Jetson, RPi, Intel, and custom silicon.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Jetson", "RPi", "Intel NCS2", "Custom"].map(d => (
                    <span key={d} className="text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-200 rounded px-2 py-0.5">{d}</span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center">
                    <span className="text-neutral-700 text-xs font-bold">G</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">Grysics Engine</div>
                    <div className="text-[11px] text-neutral-400">Verification layer</div>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Quality control — tests AI applications for accuracy, consistency, and hallucination. Monitors chatbots, RAG pipelines, and agent workflows in production.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Accuracy", "Consistency", "Hallucination", "RAG Eval", "Drift"].map(c => (
                    <span key={c} className="text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-200 rounded px-2 py-0.5">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 p-4 sm:p-6 bg-neutral-50">
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" /> Orchestrates
                </span>
                <span className="text-neutral-300">|</span>
                <span>OpenAI · Anthropic · LangChain · LlamaIndex · Custom</span>
                <span className="text-neutral-300">|</span>
                <span>REST API · Python SDK · CLI</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="w-2 h-px bg-neutral-300" />
              <span>Olyxee (brain) → OEB (hands) → Grysics (quality control)</span>
              <span className="w-2 h-px bg-neutral-300" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function ResearchSection() {
  const papers = [
    {
      title: "Automated Hallucination Detection in RAG Pipelines",
      category: "AI Reliability",
      date: "2025",
      description: "A framework for detecting and measuring hallucination rates in retrieval-augmented generation systems, with configurable thresholds and continuous monitoring.",
    },
    {
      title: "Consistency Metrics for Conversational AI Systems",
      category: "Evaluation",
      date: "2025",
      description: "Measuring behavioral consistency in chatbots and agent workflows across query variations, prompt perturbations, and temporal drift.",
    },
    {
      title: "End-to-End RAG Evaluation: Retrieval, Context, and Response",
      category: "RAG Systems",
      date: "2025",
      description: "A comprehensive evaluation methodology for RAG pipelines that independently scores retrieval quality, context utilization, and response faithfulness.",
    },
  ];

  return (
    <section className="py-28 sm:py-36 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <span className="accent-line" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900"
            >
              Advancing AI
              <br />
              <em className="text-neutral-400">reliability</em>
            </motion.h2>
          </div>
          <Link href="/research" className="text-neutral-500 hover:text-neutral-900 font-medium text-sm flex items-center gap-1.5 transition-colors tracking-wide">
            All research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-neutral-200">
          {papers.map((paper, idx) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="py-10 sm:py-12 group cursor-pointer hover:px-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{paper.category}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs text-neutral-400">{paper.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">{paper.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{paper.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-all flex-shrink-0 hidden sm:block mt-1.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function MetricsSection() {
  const metrics = [
    { value: "94.3%", label: "Avg accuracy score", context: "Across verified applications" },
    { value: "<2%", label: "Hallucination rate", context: "Post-Grysics verification" },
    { value: "97%", label: "Consistency score", context: "Same query, stable answers" },
    { value: "0", label: "Undetected failures", context: "In monitored production apps" },
  ];

  return (
    <section className="py-28 sm:py-36 bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            Numbers that
            <br />
            <em className="text-neutral-500">matter</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white mb-2">{m.value}</div>
              <div className="text-neutral-400 text-sm font-medium mb-1">{m.label}</div>
              <div className="text-neutral-600 text-xs">{m.context}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="py-28 sm:py-36 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-6"
        >
          Ready to build AI
          <br />
          <em className="text-neutral-400">that works?</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          Get started with Olyxee's developer tools, or reach out to discuss enterprise solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
          >
            Contact Sales
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
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-neutral-200 shadow-lg rounded-xl px-6 py-4 max-w-lg">
        <p className="text-sm text-neutral-600 flex-1">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-neutral-900">privacy policy</Link>.
        </p>
        <div className="flex gap-3">
          <button onClick={() => { localStorage.setItem("cookie-consent", "accepted"); onDismiss(); }} className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg font-medium hover:bg-black transition-colors">
            Accept
          </button>
          <button onClick={() => { localStorage.setItem("cookie-consent", "declined"); onDismiss(); }} className="px-4 py-2 text-neutral-500 text-sm hover:text-neutral-900 transition-colors">
            Decline
          </button>
        </div>
      </div>
    </motion.div>
  );
}
