"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";


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
    description: "Olyxee builds the research and infrastructure that enables AI to operate reliably across any domain, tool, or environment.",
    sameAs: ["https://www.linkedin.com/company/olyxeelab/"],
    foundingDate: "2024",
    knowsAbout: [
      "Artificial Intelligence",
      "AI Execution Systems",
      "AI Infrastructure",
      "AI Reliability",
      "AI Composability",
      "Machine Learning",
      "LLM Evaluation",
      "Hallucination Detection",
      "AI Observability",
    ],
    slogan: "Research and Infrastructure for artificial intelligence",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Olyxee",
    url: "https://olyxee.com",
    description: "Research and Infrastructure for artificial intelligence",
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
        <ResearchAreas />
        <ImageShowcase />
        <OrdoSection />
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
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} aria-label="Hero" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="/hero-bg.webp" alt="Olyxee hero background with mountain landscape" fill className="object-cover" priority sizes="100vw" />
      </div>

      <motion.div style={mounted ? { y, opacity } : undefined} className="relative z-10 text-center max-w-5xl mx-auto pt-20 sm:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-neutral-900 leading-[1.05] tracking-tight px-2 sm:px-0 text-[clamp(1.55rem,7.2vw,5.5rem)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="block whitespace-nowrap">Research and Infrastructure</span>
          <span className="block">
            for <em className="text-blue-600">artificial intelligence</em>
          </span>
        </motion.h1>

      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mt-10 sm:mt-16 mb-8 px-2 sm:px-0"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-300/40">
          <video
            src="/videos/demo.mp4"
            className="w-full aspect-video object-cover"
            autoPlay loop muted playsInline preload="metadata"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20">
            <a
              href="https://ordo.olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-7 sm:py-3.5 bg-white/90 backdrop-blur-md text-neutral-900 rounded-full font-medium hover:bg-white transition-all text-xs sm:text-sm tracking-wide shadow-lg shadow-black/10 border border-white/60"
            >
              Try Ordo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

    </section>
  );
}


function LogoStrip() {
  const logos: { name: string; file: string }[] = [
    { name: "OpenAI", file: "openai" },
    { name: "Google", file: "google" },
    { name: "Anthropic", file: "anthropic" },
    { name: "GitHub", file: "github" },
    { name: "Meta", file: "meta" },
    { name: "Cisco", file: "cisco" },
    { name: "Coursera", file: "coursera" },
    { name: "DeepMind", file: "deepmind" },
    { name: "Cohere", file: "cohere" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <p className="text-center text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8 sm:mb-10">Collaborators</p>
      <div className="flex items-center justify-center flex-wrap gap-x-8 sm:gap-x-14 gap-y-7 sm:gap-y-8">
        {logos.map(({ name, file }, idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            className="select-none"
            aria-label={name}
            title={name}
          >
            <img
              src={`/logos/collaborators/${file}.svg`}
              alt={name}
              loading="lazy"
              className="h-8 sm:h-10 w-auto opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}




function ResearchAreas() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">What We Do</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900">
              From intelligence to <em className="text-blue-500">reliable execution</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                num: "01",
                title: "AI Research",
                desc: "New system-level approaches for how AI executes tasks, coordinates processes, and maintains reliability across multi-step operations.",
                gradient: "/images/gradient-blue.webp",
              },
              {
                num: "02",
                title: "Infrastructure Systems",
                desc: "Runtime and integration layers that allow AI to operate across tools, APIs, and environments as a unified system.",
                gradient: "/images/gradient-purple.webp",
              },
              {
                num: "03",
                title: "Composability Layer",
                desc: "Connecting models, tools, and workflows into coherent, end-to-end AI systems that execute reliably.",
                gradient: "/images/gradient-abstract-blue.webp",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
              >
                <div className="absolute inset-0">
                  <Image src={step.gradient} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition-colors duration-300" />
                </div>
                <div className="relative p-7 sm:p-8 min-h-[200px] flex flex-col">
                  <span className="text-xs font-mono text-neutral-300 mb-4">{step.num}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight leading-snug mb-3">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}




function ImageShowcase() {
  const rowA = [
    { src: "/images/visualising-ai.png", alt: "Visualising AI", caption: "Visualising AI" },
    { src: "/images/showcase/research.png", alt: "AI Research", caption: "Mathematical Reasoning" },
    { src: "/images/ai-structures.png", alt: "AI Structures", caption: "Biological Structures" },
    { src: "/images/showcase/agents.png", alt: "AI Agents", caption: "Agent Builders" },
    { src: "/images/ai-robot.png", alt: "AI Robotics", caption: "Embodied Intelligence" },
    { src: "/images/showcase/commerce.png", alt: "AI Commerce", caption: "Personalised Commerce" },
    { src: "/images/ai-analysis.png", alt: "AI Analysis", caption: "Language Understanding" },
    { src: "/images/showcase/insights.png", alt: "AI Insights", caption: "Operational Insights" },
    { src: "/images/showcase/safety.png", alt: "AI Safety", caption: "Workplace Safety Vision" },
    { src: "/images/showcase/search.png", alt: "AI Search", caption: "Search & Discovery" },
    { src: "/images/showcase/robotics.png", alt: "Warehouse Robotics", caption: "Warehouse Automation" },
  ];
  const rowB = [
    { src: "/images/showcase/insights.png", alt: "AI Insights", caption: "Operational Insights" },
    { src: "/images/ai-analysis.png", alt: "AI Analysis", caption: "Language Understanding" },
    { src: "/images/showcase/safety.png", alt: "AI Safety", caption: "Workplace Safety Vision" },
    { src: "/images/visualising-ai.png", alt: "Visualising AI", caption: "Visualising AI" },
    { src: "/images/showcase/search.png", alt: "AI Search", caption: "Search & Discovery" },
    { src: "/images/ai-robot.png", alt: "AI Robotics", caption: "Embodied Intelligence" },
    { src: "/images/showcase/robotics.png", alt: "Warehouse Robotics", caption: "Warehouse Automation" },
    { src: "/images/ai-structures.png", alt: "AI Structures", caption: "Biological Structures" },
    { src: "/images/showcase/research.png", alt: "AI Research", caption: "Mathematical Reasoning" },
    { src: "/images/showcase/commerce.png", alt: "AI Commerce", caption: "Personalised Commerce" },
    { src: "/images/showcase/agents.png", alt: "AI Agents", caption: "Agent Builders" },
  ];

  const doubledA = [...rowA, ...rowA];
  const doubledB = [...rowB, ...rowB];

  const renderCard = (img: { src: string; alt: string; caption: string }, idx: number) => (
    <div
      key={`${img.alt}-${idx}`}
      className="group relative flex-shrink-0 w-[260px] sm:w-[360px] lg:w-[440px] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)] hover:shadow-[0_30px_70px_-12px_rgba(15,23,42,0.5)] transition-shadow duration-500"
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 440px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-white text-sm sm:text-base font-medium">{img.caption}</p>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Visual Research</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            Exploring AI through <em className="text-blue-500">new perspectives</em>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full space-y-5 sm:space-y-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="image-scroll-row-a flex gap-5 sm:gap-6 hover:[animation-play-state:paused] will-change-transform">
          {doubledA.map(renderCard)}
        </div>

        <div className="image-scroll-row-b flex gap-5 sm:gap-6 hover:[animation-play-state:paused] will-change-transform">
          {doubledB.map(renderCard)}
        </div>
      </div>
    </section>
  );
}

function OrdoSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40 bg-neutral-50/60 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="font-handwritten text-blue-600 text-2xl sm:text-3xl block mb-2 -rotate-2">
              Say hello to -
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 mb-6 leading-[1]">
              <em className="not-italic font-normal">Ordo</em>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-700 leading-snug mb-8 max-w-md font-light">
              Ask in plain English. Ordo gets it done across the tools you already use - and keeps the receipts.
            </p>

            <ul className="space-y-3 mb-2">
              {[
                "Plugs into Drive, Teams, SharePoint & more",
                "Turns requests into completed work",
                "Every step assigned, timestamped, reviewable",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-neutral-600">
                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[5/4] sm:aspect-[6/5] w-full">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 sm:left-2 w-[78%] sm:w-[70%] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-300/50 border border-neutral-200/60 bg-white"
              >
                <Image
                  src="/images/ordo/integrations.jpeg"
                  alt="Ordo connects natural-language requests to your existing tools"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 right-0 sm:right-2 w-[72%] sm:w-[62%] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-300/50 border border-neutral-200/60 bg-white"
              >
                <Image
                  src="/images/ordo/tasks.png"
                  alt="Ordo tracks every task with clear ownership and timestamps"
                  width={1200}
                  height={1200}
                  className="w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-5 sm:-bottom-7 right-4 sm:right-8 z-20 flex flex-col items-center gap-1"
              >
                <span className="font-handwritten text-blue-600 text-xl sm:text-2xl rotate-[-8deg] -translate-x-10 -mb-1 hidden sm:block">
                  give it a spin →
                </span>
                <a
                  href="https://ordo.olyxee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-2xl shadow-neutral-900/30 hover:shadow-neutral-900/50 hover:scale-105"
                >
                  Try Ordo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute -inset-x-8 -inset-y-12 -z-10 bg-gradient-to-tr from-blue-100/40 via-transparent to-emerald-100/30 blur-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function IntegrationSection() {
  const scatteredCards = useMemo(() => [
    { name: "OpenAI", subtitle: "GPT Models", src: "/images/logos/openai.png", top: "4%", left: "3%", rotate: -3 },
    { name: "Anthropic", subtitle: "Claude AI", src: "/images/logos/anthropic.png", top: "8%", right: "5%", rotate: 2 },
    { name: "Mistral", subtitle: "Open Models", src: "/images/logos/mistral.png", top: "42%", right: "2%", rotate: -1.5 },
    { name: "DeepSeek", subtitle: "AI Research", src: "/images/logos/deepseek.png", top: "38%", left: "1%", rotate: 2.5 },
    { name: "Google", subtitle: "AI Platform", src: "/images/logos/google.png", bottom: "8%", left: "6%", rotate: -2 },
    { name: "GitHub", subtitle: "Developer Platform", src: "/images/logos/github.png", bottom: "4%", right: "3%", rotate: 1.5 },
  ], []);

  const mobileCards = useMemo(() => [
    { name: "OpenAI", subtitle: "GPT Models", src: "/images/logos/openai.png" },
    { name: "Anthropic", subtitle: "Claude AI", src: "/images/logos/anthropic.png" },
    { name: "Mistral", subtitle: "Open Models", src: "/images/logos/mistral.png" },
    { name: "DeepSeek", subtitle: "AI Research", src: "/images/logos/deepseek.png" },
    { name: "Google", subtitle: "AI Platform", src: "/images/logos/google.png" },
    { name: "GitHub", subtitle: "Developer Platform", src: "/images/logos/github.png" },
  ], []);

  return (
    <section className="relative py-24 sm:py-36 lg:py-48 overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100/40 to-sky-50">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {scatteredCards.map((card, idx) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="absolute hidden lg:block"
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom,
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md shadow-neutral-200/60 border border-neutral-200/60 p-5 w-44 hover:shadow-lg hover:shadow-neutral-300/40 transition-shadow duration-300">
              <Image src={card.src} alt={card.name} width={28} height={28} className="object-contain mb-2" style={{ width: 28, height: 28 }} />
              <p className="text-sm font-semibold text-neutral-800">{card.name}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden p-[1px]"
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #f97316, #3b82f6, #f97316, #3b82f6)',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 6s ease infinite',
              }}
            />
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm">
              <div
                className="absolute inset-0 rounded-3xl opacity-[0.06]"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #3b82f6, #f97316)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-shift 6s ease infinite',
                }}
              />
              <div className="relative px-8 sm:px-14 lg:px-20 py-14 sm:py-20 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Image src="/images/ordo-logo.png" alt="Ordo" width={32} height={32} className="rounded-lg" style={{ width: 32, height: 32 }} />
                  <span className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Ordo</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-tight mb-6">
                  AI execution for{" "}
                  <em className="text-orange-400">your workflows</em>.
                </h2>
                <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto">
                  Turn business goals into completed operations. Ordo plans, coordinates, and executes across your tools and systems end-to-end.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors group"
                >
                  Discover more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mobileCards.map((card, idx) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200/60 p-4"
              >
                <Image src={card.src} alt={card.name} width={24} height={24} className="object-contain mb-1.5" style={{ width: 20, height: 20 }} />
                <p className="text-sm font-semibold text-neutral-800">{card.name}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{card.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-neutral-100 border border-neutral-200/70 px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-neutral-200/60 blur-3xl"
          />

          <div className="relative text-center max-w-2xl mx-auto">
            <span className="font-handwritten text-blue-600 text-2xl sm:text-3xl block mb-3 -rotate-2">
              ready when you are -
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
              Get started with <em className="not-italic font-normal text-blue-600">Ordo</em>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
              Bring Ordo into your stack and turn scattered work into one accountable workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://ordo.olyxee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
              >
                Talk to us
              </Link>
            </div>
          </div>
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
      className="fixed bottom-4 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-50 flex justify-center"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 max-w-lg w-full rounded-2xl"
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
