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
  Code2,
  Terminal,
  Globe,
  BookOpen,
  X,
  CheckCircle,
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

        <IndustriesSection />
        <OfferingsSection />
        <ArchitectureSection />
        <DeveloperToolsSection />
        <ResearchSection />
        <CTASection />
      </main>

      <Footer />

      <AnimatePresence>
        {cookieBannerVisible && <CookieBanner onDismiss={() => setCookieBannerVisible(false)} />}
      </AnimatePresence>
    </div>
  );
}

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const AnthropicIcon = () => (
  <svg viewBox="0 0 24 16" fill="currentColor" className="w-5 h-5"><path d="M16.98 0L24 16h-4.87l-7.02-16h4.87zM7.02 0L0 16h4.87l2.15-5.12h6.42L11.3 6.97H8.73L11.64 0H7.02z"/></svg>
);

const MistralIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect x="0" y="0" width="5" height="5"/><rect x="19" y="0" width="5" height="5"/><rect x="0" y="6.33" width="5" height="5"/><rect x="6.33" y="6.33" width="5" height="5"/><rect x="12.66" y="6.33" width="5" height="5"/><rect x="19" y="6.33" width="5" height="5"/><rect x="0" y="12.66" width="5" height="5"/><rect x="12.66" y="12.66" width="5" height="5"/><rect x="19" y="12.66" width="5" height="5"/><rect x="0" y="19" width="5" height="5"/><rect x="6.33" y="19" width="5" height="5"/><rect x="12.66" y="19" width="5" height="5"/><rect x="19" y="19" width="5" height="5"/></svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 23 23" fill="currentColor" className="w-5 h-5"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/></svg>
);

const NvidiaIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" className="w-6 h-6"><path d="M103.47 55.08v-17.4c1.58-.12 3.18-.2 4.8-.2 55.24 0 72.94 47.86 72.94 47.86s-21.46 27.48-44.46 27.48c-14.28 0-26.08-8.54-33.28-17.78v-39.96zm0 54.32v16.26c4.76 2.28 10.08 3.58 15.74 3.58 31.94 0 55.62-29.44 55.62-29.44s-32.04-55.36-75.58-55.36c-5.74 0-11.08.82-15.92 2.06v11.12c-20.36 8.2-33.62 24.12-33.62 24.12s22.62 37.96 53.76 27.66zM85.33 45.32V55.7c-8.5 4.4-18.14 13.78-18.14 13.78s12.52 21.3 36.28 14.26V98.2c-28.88 10.08-56.58-22.52-56.58-22.52s15.18-20.84 38.44-30.36zm18.14-31.1v15.68c-2.24.18-4.44.46-6.62.84V14.68c-45.22 6.34-60.84 44.6-60.84 44.6s20.44 39.5 60.84 29.32v17.44C52.01 118.12 24.19 72.98 24.19 72.98s23.58-50.9 79.28-58.76z"/></svg>
);

const partnerLogos = [
  { name: "OpenAI", icon: OpenAIIcon },
  { name: "NVIDIA", icon: NvidiaIcon },
  { name: "Google", icon: GoogleIcon },
  { name: "Anthropic", icon: AnthropicIcon },
  { name: "Mistral", icon: MistralIcon },
  { name: "Microsoft", icon: MicrosoftIcon },
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
        <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl shadow-neutral-200/50">
          <video
            src="/videos/demo.mp4"
            className="w-full aspect-video object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
          >
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-xl text-neutral-900 rounded-2xl px-5 py-3 hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-black/10 border border-white/50"
            >
              <span className="text-sm font-medium tracking-tight">Try Grysics</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
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
          {partnerLogos.map((logo, i) => {
            const Icon = logo.icon;
            return (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.06, duration: 0.5 }}
                className="flex items-center gap-2.5 text-neutral-400 hover:text-neutral-600 transition-colors duration-300 cursor-default select-none"
                title={logo.name}
              >
                <Icon />
                <span className="text-sm font-medium tracking-tight hidden sm:inline">{logo.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}



function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const active = industries[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % industries.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="py-32 sm:py-44">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-neutral-950 text-white rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neutral-800 rounded-full blur-[200px] opacity-20 translate-x-1/3 -translate-y-1/3" />

          <div className="relative">
            <div className="mb-10 sm:mb-14">
              <span className="block w-12 h-0.5 bg-white/30 mb-6" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight"
              >
                Built for regulated,
                <br />
                <em className="text-neutral-500">safety-critical industries</em>
              </motion.h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="lg:w-[260px] flex-shrink-0">
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1">
                  {industries.map((ind, idx) => (
                    <button
                      key={ind.title}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative text-left px-4 py-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                        idx === activeIndex
                          ? "bg-white/10 text-white"
                          : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-sm font-medium whitespace-nowrap">{ind.title}</span>
                      {idx === activeIndex && (
                        <motion.div
                          className="absolute bottom-0 left-4 right-4 lg:left-0 lg:right-auto lg:top-0 lg:bottom-0 lg:w-[3px] h-[3px] lg:h-auto rounded-full bg-white"
                          layoutId="industry-indicator"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="hidden lg:flex items-center gap-2 mt-6 ml-4">
                  <span className="text-[11px] text-neutral-600 font-medium tabular-nums">{String(activeIndex + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}</span>
                  <div className="flex-1 h-px bg-white/10 rounded-full overflow-hidden ml-2">
                    <motion.div
                      className="h-full bg-white/40 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      key={activeIndex}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-2xl border border-white/10 overflow-hidden"
                  >
                    <div className="p-5 sm:p-7">
                      <div className="mb-5">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">{active.title}</h3>
                        <p className="text-sm text-neutral-500">{active.subtitle}</p>
                      </div>

                      <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-6">{active.desc}</p>

                      <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                        <div className="flex flex-wrap gap-6">
                          {active.metrics.map(m => (
                            <div key={m.label}>
                              <div className="text-lg font-semibold text-white">{m.value}</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">{m.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="sm:ml-auto sm:w-[220px] flex-shrink-0">
                          <div className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2.5 font-medium">Data flow</div>
                          <div className="flex flex-col gap-0">
                            {active.flow.map((node, i) => (
                              <div key={node} className="flex items-center gap-0">
                                <div className={`flex-1 text-xs font-medium px-3 py-1.5 border rounded-md text-center ${
                                  node.includes("Grysics")
                                    ? "border-white/30 text-white bg-white/5"
                                    : "border-white/10 text-neutral-400"
                                }`}>
                                  {node}
                                </div>
                                {i < active.flow.length - 1 && (
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
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function OfferingsSection() {
  return (
    <section className="py-32 sm:py-44">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            What we <em className="text-neutral-400">build & do</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-lg text-neutral-400 font-light max-w-xl mx-auto"
          >
            Products and divisions powering the future of trustworthy AI.
          </motion.p>
        </div>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/products/grysics"
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-10 sm:p-14 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-neutral-200/50"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/gradient-blue-pink.png")' }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm group-hover:bg-white/75 transition-all duration-500" />
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl tracking-tight text-neutral-900">Grysics</h3>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-white/60 px-3 py-1 rounded-full border border-white/40 uppercase tracking-widest">Product</span>
                </div>
                <p className="text-neutral-500 text-[15px] leading-relaxed max-w-xl font-light">Verification engine for AI applications. Test chatbots, RAG pipelines, and agent workflows for accuracy, consistency, and hallucination — before and after deployment.</p>
              </div>
              <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/edgeai"
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-10 sm:p-14 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-neutral-200/50"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/gradient-yellow-green.png")' }} />
              <div className="absolute inset-0 bg-white/82 backdrop-blur-sm group-hover:bg-white/75 transition-all duration-500" />
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl tracking-tight text-neutral-900">Olyxee Edge Box</h3>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-white/60 px-3 py-1 rounded-full border border-white/40 uppercase tracking-widest">Division</span>
                </div>
                <p className="text-neutral-500 text-[15px] leading-relaxed max-w-xl font-light">Our edge AI sub-division. Deploys AI models to IoT sensors, drones, robots, and embedded systems — optimized for performance, power, and latency on real hardware.</p>
              </div>
              <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function ArchitectureSection() {
  return (
    <section className="py-32 sm:py-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/gradient-pastel.png")' }} />
      <div className="absolute inset-0 bg-white/88 backdrop-blur-sm" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            System architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-neutral-500 text-lg max-w-xl mx-auto font-light"
          >
            How Olyxee connects strategy, execution, and verification into one coherent stack.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-lg">
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


function DeveloperToolsSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const tools = [
    {
      icon: Code2,
      title: "SDK",
      desc: "Python and C++ libraries for model verification, optimization, and deployment.",
      status: "Coming soon",
      statusColor: "bg-neutral-400",
    },
    {
      icon: Terminal,
      title: "CLI",
      desc: "Command-line tools for managing deployments, running tests, and monitoring.",
      status: "Coming soon",
      statusColor: "bg-neutral-400",
    },
    {
      icon: Globe,
      title: "API",
      desc: "RESTful API for programmatic access to the Grysics platform.",
      status: "Coming soon",
      statusColor: "bg-neutral-400",
    },
    {
      icon: BookOpen,
      title: "Docs",
      desc: "Comprehensive guides, tutorials, and API reference.",
      status: "Coming soon",
      statusColor: "bg-neutral-400",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, tool: selectedTool }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message);
        setTimeout(() => {
          setWaitlistOpen(false);
          setStatus("idle");
          setEmail("");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("Network error. Please try again.");
    }
  };

  const openWaitlist = (toolName: string) => {
    setSelectedTool(toolName);
    setWaitlistOpen(true);
    setStatus("idle");
    setResponseMsg("");
  };

  return (
    <>
      <section className="py-32 sm:py-44">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 sm:mb-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-5"
            >
              Developer <em className="text-neutral-400">tools</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-lg text-neutral-500 font-light max-w-xl mx-auto"
            >
              Everything you need to build, test, and ship reliable AI.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative rounded-3xl border border-neutral-200 hover:border-neutral-300 p-8 sm:p-10 transition-all duration-500 hover:bg-neutral-50 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${tool.statusColor}`} />
                      <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest">{tool.status}</span>
                    </div>
                  </div>

                  <h3 className="text-xl tracking-tight text-neutral-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light flex-1">{tool.desc}</p>

                  <button
                    onClick={() => openWaitlist(tool.title)}
                    className="mt-6 group/btn inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    Get early access <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {waitlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => { setWaitlistOpen(false); setStatus("idle"); }} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-100">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">Get early access</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedTool} — Join the waitlist</p>
                </div>
                <button
                  onClick={() => { setWaitlistOpen(false); setStatus("idle"); }}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                    <h4 className="text-lg text-neutral-900 mb-1">{responseMsg}</h4>
                    <p className="text-sm text-neutral-500">We'll notify you when {selectedTool} is ready for you.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-neutral-500 font-light leading-relaxed mb-2">
                      Sign up for early access to our {selectedTool}. We'll reach out when your spot is ready.
                    </p>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                      placeholder="Email address"
                    />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                      rows={3}
                      placeholder="Tell us what you're building (optional)"
                    />
                    {status === "error" && (
                      <p className="text-sm text-red-500">{responseMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? "Joining..." : "Join the waitlist"}
                    </button>
                    <p className="text-[11px] text-neutral-400 text-center">No spam. We'll only email you about early access.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    <section className="py-32 sm:py-44">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            Advancing AI <em className="text-neutral-400">reliability</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-lg text-neutral-400 font-light max-w-xl mx-auto"
          >
            Published research from the Olyxee team.
          </motion.p>
        </div>

        <div className="space-y-0 divide-y divide-neutral-100">
          {papers.map((paper, idx) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group cursor-pointer py-8 sm:py-10 flex items-center justify-between gap-6 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2.5">
                  <h3 className="text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">{paper.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl font-light mb-3">{paper.description}</p>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="font-medium uppercase tracking-widest">{paper.category}</span>
                  <span className="text-neutral-200">·</span>
                  <span>{paper.date}</span>
                </div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/research" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide">
            View all research <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="py-32 sm:py-44">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 tracking-tight mb-8"
        >
          Ready to build AI
          <br />
          <em className="text-neutral-400">that works?</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-neutral-500 text-lg sm:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          Get started with Olyxee's developer tools, or reach out to discuss enterprise solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/docs"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
          >
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-600 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 hover:text-neutral-900 transition-all text-sm tracking-wide"
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
