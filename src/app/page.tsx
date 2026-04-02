"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Eye, Brain, Zap, Lock, CheckCircle2, AlertTriangle, Activity, BarChart3 } from "lucide-react";

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
    description: "AI infrastructure company focused on research, safety, and reliability. Building verification and monitoring systems that ensure AI applications work correctly in production.",
    sameAs: ["https://www.linkedin.com/company/olyxeelab/"],
    foundingDate: "2024",
    knowsAbout: [
      "Artificial Intelligence",
      "AI Safety",
      "AI Verification",
      "AI Reliability",
      "Machine Learning",
      "LLM Evaluation",
      "Hallucination Detection",
      "AI Monitoring",
      "Responsible AI",
    ],
    slogan: "Research and safety for artificial intelligence",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Olyxee",
    url: "https://olyxee.com",
    description: "Research and safety for artificial intelligence",
    publisher: {
      "@type": "Organization",
      name: "Olyxee",
      logo: {
        "@type": "ImageObject",
        url: "https://olyxee.com/Logo/Olyxee_Logo.png",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="grain" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <LogoStrip />
        <MissionSection />
        <ResearchAreas />
        <ApproachSection />
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
    <section ref={ref} aria-label="Hero" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden" style={{ position: 'relative' }}>
      <div className="absolute inset-0 w-full h-full">
        <Image src="/hero-bg.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto pt-20 sm:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-neutral-900 leading-[1.02] tracking-tight"
        >
          Research and safety
          <br />
          for <em className="text-blue-400">artificial intelligence</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 sm:mt-7 text-base sm:text-xl text-neutral-500 font-light max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
        >
          Olyxee is an AI infrastructure company building the tools and systems
          that make artificial intelligence safe, reliable, and trustworthy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/about"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/20"
          >
            Our Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-700 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide shadow-sm"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mt-10 sm:mt-16 mb-8 px-2 sm:px-0"
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


function LogoStrip() {
  const collaborators = ["Google", "Microsoft", "OpenAI", "NVIDIA", "Meta", "AWS"];

  return (
    <section className="border-y border-neutral-100 bg-neutral-50/50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <p className="text-center text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Trusted By Industry Leaders</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16 sm:gap-y-6">
          {collaborators.map((name, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="text-neutral-300 hover:text-neutral-500 transition-colors duration-300"
            >
              <Image
                src={`/images/logos/${name.toLowerCase()}.png`}
                alt={name}
                width={120}
                height={40}
                className="h-7 sm:h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function MissionSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Who We Are</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 max-w-3xl">
            AI is powerful. It should also be <em className="text-orange-400">reliable</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              AI is everywhere. But the gap between what it can do and what it should do keeps widening.
            </p>
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              Olyxee builds the infrastructure to close that gap: verification, evaluation, and monitoring so AI behaves as intended.
            </p>
            <p className="text-lg text-neutral-600 font-light leading-relaxed">
              Safety and performance are not trade-offs. They are the same goal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {[
              { icon: Shield, title: "Research-first", desc: "Grounded in AI safety research. We study failure modes and publish our findings." },
              { icon: Zap, title: "Infrastructure-grade", desc: "Production-scale systems. Reliable, fast, and built to integrate seamlessly." },
              { icon: Eye, title: "Trust through transparency", desc: "Tools that show exactly how your AI behaves and where it falls short." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex gap-5 p-6 rounded-2xl hover:bg-neutral-50/80 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mt-0.5">
                  <item.icon className="w-5 h-5 text-neutral-600" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-2xl overflow-hidden border border-neutral-200/80"
        >
          <Image
            src="/images/team-developers.png"
            alt="Olyxee team collaborating on AI safety and infrastructure"
            width={1408}
            height={768}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}


function ResearchAreas() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative py-20 sm:py-32 lg:py-40 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20 lg:mb-24"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">What We Do</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Advancing the science of <em className="text-blue-400">AI reliability</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              num: "01",
              title: "Verification",
              desc: "Methods to verify AI systems produce accurate, consistent outputs across every scenario.",
              icon: CheckCircle2,
            },
            {
              num: "02",
              title: "Safety",
              desc: "Detecting hallucinations and ensuring AI systems stay within intended boundaries.",
              icon: AlertTriangle,
            },
            {
              num: "03",
              title: "Monitoring",
              desc: "Real-time observability for AI in production. Catch drift and failures early.",
              icon: Activity,
            },
          ].map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] group hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-white/40" />
                </div>
                <div className="text-4xl font-serif text-white/[0.06] leading-none">{step.num}</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm sm:text-[15px] text-neutral-400 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <VerificationDiagram />
        </motion.div>
      </div>
    </section>
  );
}


function VerificationDiagram() {
  const steps = [
    { label: "AI Application", sub: "Chatbot / RAG / Agent", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
    { label: "Verification", sub: "Test & Evaluate", color: "bg-amber-500/20 border-amber-500/30 text-amber-300" },
    { label: "Analysis", sub: "Score & Report", color: "bg-purple-500/20 border-purple-500/30 text-purple-300" },
    { label: "Production", sub: "Monitor & Alert", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-10">
      <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-6 sm:mb-8 text-center">How Olyxee Fits Into Your AI Stack</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border ${step.color} text-center`}
          >
            <div className="text-xs sm:text-sm font-semibold">{step.label}</div>
            <div className="text-[10px] sm:text-[11px] opacity-60 mt-0.5">{step.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


function ApproachSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 lg:mb-20"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Approach</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 max-w-3xl">
            Built at the intersection of <em className="text-orange-400">research and engineering</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 relative group rounded-2xl bg-neutral-950 overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/gradient-blue-pink.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                aria-hidden="true"
                className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              />
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/15 to-transparent rounded-full blur-2xl" />
            <div className="relative p-8 sm:p-10">
              <Shield className="w-6 h-6 text-neutral-400 mb-5" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">AI Safety Infrastructure</h3>
              <p className="text-neutral-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-lg mb-6">
                Verification engines, evaluation frameworks, and monitoring systems for real-world AI deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Verification", "Evaluation", "Monitoring", "Compliance"].map(t => (
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
            className="group rounded-2xl relative overflow-hidden border border-amber-100/80"
          >
            <div className="absolute inset-0">
              <Image src="/images/gradient-orange-pink.png" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" aria-hidden="true" className="object-cover opacity-30" />
            </div>
            <div className="relative p-8 sm:p-10">
              <Eye className="w-5 h-5 text-neutral-400 mb-5" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Hallucination Research</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
                Studying why AI fabricates information and building detection methods that work across domains.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 opacity-60">
                Active research <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="group rounded-2xl relative overflow-hidden border border-emerald-100/80"
          >
            <div className="absolute inset-0">
              <Image src="/images/gradient-yellow-green.png" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" aria-hidden="true" className="object-cover opacity-25" />
            </div>
            <div className="relative p-8 sm:p-10">
              <Brain className="w-5 h-5 text-neutral-400 mb-5" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Behavioral Evaluation</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
                Evaluating AI behavior at scale: consistency, accuracy, and alignment with intended outcomes.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 opacity-60">
                Active research <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="md:col-span-2 lg:col-span-2 group rounded-2xl relative overflow-hidden border border-violet-100/80"
          >
            <div className="absolute inset-0">
              <Image src="/images/gradient-purple.png" alt="" fill sizes="(max-width: 768px) 100vw, 66vw" aria-hidden="true" className="object-cover opacity-20" />
            </div>
            <div className="relative p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                <div className="flex-1">
                  <Lock className="w-5 h-5 text-neutral-400 mb-5" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Enterprise & Regulated Industries</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">
                    Verification and audit for regulated industries where trust is non-negotiable.
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-wrap gap-2">
                  {["Healthcare", "Legal", "Finance", "Enterprise"].map(t => (
                    <span key={t} className="text-[11px] text-violet-600 bg-violet-100/60 border border-violet-200/60 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="py-20 sm:py-32 lg:py-44 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/gradient-pastel.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src="/Logo/Olyxee_Logo.png"
            alt="Olyxee"
            width={48}
            height={48}
            className="mx-auto opacity-30"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 tracking-tight mb-5 sm:mb-6"
        >
          The future of AI<br />needs <em className="text-blue-500">better foundations</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-neutral-500 text-base sm:text-xl max-w-xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed px-2 sm:px-0"
        >
          We are building those foundations. Follow our journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/20"
          >
            Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-600 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide shadow-sm"
          >
            About Olyxee
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
