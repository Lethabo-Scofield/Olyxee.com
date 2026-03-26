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
  Factory,
  Bot,
  Wifi,
  Car,
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
    description: "AI infrastructure company building Grysics, a verification engine that ensures AI models work correctly before and after deployment.",
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
        <WhatWeDoSection />
        <ProductsSection />
        <ResearchSection />
        <TrustSection />
        <UseCasesSection />
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
            className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row gap-3 justify-center items-center p-4 sm:p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          >
            <Link
              href="/developers"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide shadow-lg"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-white border border-white/40 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide backdrop-blur-sm"
            >
              Read Our Research
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
        <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] font-medium text-center mb-8">Collaborating with</p>
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

function WhatWeDoSection() {
  const pillars = [
    { title: "Verification", description: "Rigorous testing and validation that ensures AI models perform correctly before deployment — catching failures before they reach production." },
    { title: "Deployment", description: "Hardware-agnostic infrastructure that abstracts away device complexity. Same model, any device — Jetson, Raspberry Pi, or cloud." },
    { title: "Optimization", description: "Automatic quantization and runtime optimization adapted to target hardware. Maintain accuracy while minimizing resource consumption." },
    { title: "Monitoring", description: "Real-time observability for deployed systems — detecting drift, anomalies, and degradation before they become critical failures." },
  ];

  return (
    <section className="py-28 sm:py-36 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="accent-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-6"
          >
            AI systems fail in
            <br />
            the real world.{" "}
            <em className="text-neutral-400">We fix that.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 leading-relaxed font-light"
          >
            From verification to deployment to monitoring — the complete infrastructure stack for AI that actually works in production.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-10 sm:p-12 hover:bg-neutral-50 transition-colors"
            >
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">0{idx + 1}</span>
              <h3 className="text-2xl font-semibold text-neutral-900 mt-3 mb-4">{pillar.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const products = [
    {
      name: "Grysics",
      tagline: "Verification Engine",
      description: "High-fidelity AI simulation and testing for edge devices. Verify model behavior across hardware configurations before deployment.",
      href: "/products/grysics",
      status: "Available",
    },
    {
      name: "Neural Reality Network",
      tagline: "Interpretable AI",
      description: "Next-generation architecture for multi-path feature analysis, delivering real-time insights into AI decision-making.",
      href: "/products/nrn",
      status: "Research Preview",
    },
    {
      name: "WAVE",
      tagline: "Core Platform",
      description: "The infrastructure layer that powers all Olyxee products — handling deployment pipelines, hardware abstraction, and runtime management.",
      href: "/docs",
      status: "In Development",
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
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
              A platform for
              <br />
              <em className="text-neutral-500">reliable AI</em>
            </motion.h2>
          </div>
          <Link href="/products/grysics" className="text-neutral-400 hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors tracking-wide">
            All products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={product.href}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-semibold">{product.name}</h3>
                    <span className="text-xs font-medium text-neutral-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">{product.status}</span>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">{product.description}</p>
                </div>
                <span className="text-sm font-medium text-neutral-500 flex items-center gap-1.5 group-hover:text-white group-hover:gap-3 transition-all flex-shrink-0">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  const papers = [
    {
      title: "Verification-First Deployment for Edge AI Systems",
      category: "AI Reliability",
      date: "2025",
      description: "A framework for pre-deployment verification of AI models targeting heterogeneous edge hardware.",
    },
    {
      title: "Multi-Path Feature Analysis in Neural Reality Networks",
      category: "Interpretability",
      date: "2025",
      description: "Introducing interpretable pathways that trace feature contributions at multiple levels of neural computation.",
    },
    {
      title: "Adaptive Quantization for Cross-Hardware Deployment",
      category: "Optimization",
      date: "2025",
      description: "Automatic model compression that adapts to target hardware constraints while preserving accuracy guarantees.",
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

function TrustSection() {
  const stats = [
    { value: "10x", label: "Faster deployment" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "50K+", label: "Devices powered" },
    { value: "90%", label: "Cost reduction" },
  ];

  return (
    <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900"
          >
            Trusted by engineers
            <br />
            <em className="text-neutral-400">building the future</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-neutral-900 mb-3">{stat.value}</div>
              <div className="text-neutral-400 text-sm uppercase tracking-widest font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const useCases = [
    { icon: Factory, title: "Smart Manufacturing", description: "Real-time quality control and predictive maintenance on factory edge devices." },
    { icon: Bot, title: "Robotics", description: "Deploy perception and planning models on autonomous systems with verified reliability." },
    { icon: Wifi, title: "IoT & Edge AI", description: "Run optimized models on constrained hardware across distributed sensor networks." },
    { icon: Car, title: "Autonomous Systems", description: "Safety-critical AI deployment with formal verification and continuous monitoring." },
  ];

  return (
    <section className="py-28 sm:py-36 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mb-20">
          <span className="accent-line" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-6"
          >
            Proven across
            <br />
            <em className="text-neutral-400">industries</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-5 p-8 sm:p-10 rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-900 transition-colors">
                  <Icon className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{uc.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{uc.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/use-cases" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium text-sm transition-colors tracking-wide">
            Explore all use cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-28 sm:py-36 bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6"
        >
          Ready to build AI
          <br />
          <em className="text-neutral-500">that works?</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed"
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
            href="/developers"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
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
