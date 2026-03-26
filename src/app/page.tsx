"use client";

import { useState, useEffect } from "react";
import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Cpu,
  Layers,
  Zap,
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

  return (
    <div className="min-h-screen bg-white">
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

function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white via-blue-200/30 to-white">
        <motion.svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="smokeGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="blurSmoke1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="90" />
            </filter>
          </defs>
          <circle cx="50%" cy="40%" r="220" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
          <circle cx="30%" cy="60%" r="180" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
          <circle cx="70%" cy="55%" r="200" fill="url(#smokeGradient1)" filter="url(#blurSmoke1)" />
        </motion.svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-8 border border-gray-200"
        >
          <Shield className="w-4 h-4" />
          Reliability-first AI infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans text-gray-900 leading-[1.1] tracking-tight"
        >
          Building reliable infrastructure for the next generation of AI systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Olyxee develops verification-first AI infrastructure — ensuring AI systems are reliable, explainable, and deployable everywhere from edge devices to enterprise clouds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/developers"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black hover:shadow-lg transition-all text-base"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all text-base"
          >
            Read Our Research
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-12"
      >
        {[
          { src: "/hardware-logos/NVIDIA-logo-BL_thmb.jpg", alt: "NVIDIA" },
          { src: "/hardware-logos/arduino-logo.png", alt: "Arduino" },
          { src: "/hardware-logos/raspberrypi.png", alt: "Raspberry Pi" },
          { src: "/hardware-logos/intel.jpg", alt: "Intel" },
          { src: "/hardware-logos/ESP32.png", alt: "ESP32" },
        ].map((logo, i) => (
          <div key={i} className="w-16 sm:w-20 h-12 sm:h-14 flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={80}
              height={56}
              unoptimized
              className="object-contain w-auto h-auto filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function WhatWeDoSection() {
  const pillars = [
    {
      icon: Shield,
      title: "Verification",
      description: "Rigorous testing and validation pipelines that ensure AI models perform correctly before deployment — catching failures before they reach production.",
    },
    {
      icon: Layers,
      title: "Deployment",
      description: "Hardware-agnostic deployment infrastructure that abstracts away device complexity, letting you run the same model on a Jetson, a Raspberry Pi, or the cloud.",
    },
    {
      icon: Cpu,
      title: "Optimization",
      description: "Automatic model quantization and runtime optimization that adapts to target hardware, maintaining accuracy while minimizing resource consumption.",
    },
    {
      icon: Zap,
      title: "Monitoring",
      description: "Real-time observability for deployed AI systems — detecting drift, anomalies, and performance degradation before they become critical failures.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
          >
            AI systems fail in the real world.
            <br className="hidden sm:block" />
            <span className="text-gray-500">We fix that.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            From verification to deployment to monitoring, Olyxee provides the complete infrastructure stack for building AI systems that actually work in production.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
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
      href: "/technology",
      status: "In Development",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4"
            >
              Our Products
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            >
              A platform for reliable AI
            </motion.h2>
          </div>
          <Link href="/products/grysics" className="text-gray-700 hover:text-black font-medium text-sm flex items-center gap-1 transition-colors">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                className="group flex flex-col h-full bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="/Logo/Olyxee_Logo.png" alt="" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.tagline}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.status}</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
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
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4"
            >
              Research
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            >
              Advancing AI reliability
            </motion.h2>
          </div>
          <Link href="/research" className="text-gray-700 hover:text-black font-medium text-sm flex items-center gap-1 transition-colors">
            View all research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {papers.map((paper, idx) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{paper.category}</span>
                <span className="text-xs text-gray-400">{paper.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{paper.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{paper.description}</p>
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
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-gray-900 rounded-3xl p-10 sm:p-16 lg:p-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Trusted by engineers building the future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-16"
          >
            From startups to research labs, teams use Olyxee to ship AI that works.
          </motion.p>

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
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4"
          >
            Use Cases
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
          >
            Proven across industries
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <Icon className="w-8 h-8 text-gray-700 mb-5" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{uc.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{uc.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/use-cases" className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm transition-colors">
            Explore all use cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6"
        >
          Ready to build AI that works?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-xl mx-auto mb-10"
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black hover:shadow-lg transition-all"
          >
            Start Building <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    onDismiss();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[420px] z-[999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
        <h2 id="cookie-banner-title" className="text-base font-semibold text-black mb-2">
          Cookie Settings
        </h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          We use cookies to improve your experience and analyze site usage.{" "}
          <a href="/privacy" className="text-gray-700 hover:underline">Learn more</a>
        </p>
        {showSettings && (
          <div className="mb-4 space-y-2 p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled className="rounded" />
              <span className="text-sm text-black">Essential (Required)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-black">Analytics</span>
            </label>
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={handleAccept} className="flex-1 rounded-full bg-gray-900 text-white hover:bg-black font-semibold text-sm">
            Accept All
          </Button>
          <Button onClick={() => setShowSettings(!showSettings)} variant="outline" className="flex-1 rounded-full border-gray-300 bg-white text-black hover:bg-gray-100 text-sm">
            {showSettings ? "Save" : "Customize"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

