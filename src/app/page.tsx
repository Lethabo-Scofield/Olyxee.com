"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Truck, Check, PackageCheck, MapPin, Bell, Layers, Workflow, FileText, Wallet, type LucideIcon } from "lucide-react";


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
    legalName: "Olyxee",
    url: "https://olyxee.com",
    logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
    image: "https://olyxee.com/og-image.jpg",
    description: "Olyxee builds the research and infrastructure that enables AI to operate reliably across any domain, tool, or environment.",
    sameAs: [
      "https://www.linkedin.com/company/olyxee/",
      "https://twitter.com/olyxee",
      "https://github.com/olyxee",
      "https://www.youtube.com/@olyxee",
    ],
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Lethabo Scofield",
      url: "https://lethaboscofield.web.app/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johannesburg",
      addressCountry: "ZA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "scofield@olyxee.com",
        url: "https://olyxee.com/contact",
        availableLanguage: ["English"],
      },
    ],
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Olyxee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Olyxee is an AI infrastructure company. We build the research and systems that let organizations put AI to work across their operations: reliably, transparently, and at scale.",
        },
      },
      {
        "@type": "Question",
        name: "What is Orgni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orgni is Olyxee's core infrastructure product for organizations adopting AI. It connects business context, workflows, documents, systems, and decisions so AI can support real operations with context, control, and traceability.",
        },
      },
      {
        "@type": "Question",
        name: "What is Orgni Finance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orgni Finance handles financial reconciliation, transaction matching, anomaly review, and financial integrity for finance teams.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Olyxee based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Olyxee is headquartered in Johannesburg, South Africa, and operates remotely with collaborators worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get in touch with Olyxee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach the team at scofield@olyxee.com, or use the contact page at https://olyxee.com/contact for sales, partnerships, press, careers, or general inquiries.",
        },
      },
    ],
  };


  return (
    <div className="min-h-screen bg-white relative">
      <div className="grain" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <ResearchAreas />
        <ImageShowcase />
        {/* <OrdoSection /> hidden for now */}
        <OrgniSection />
        <CourierLoopSection />
        <StoriesSection />
        <CTASection />
        <LogoStrip />
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

      <motion.div style={mounted ? { y, opacity } : undefined} className="relative z-10 text-center max-w-5xl mx-auto pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-neutral-900 leading-[1.02] tracking-tight px-2 sm:px-0 text-[clamp(1.4rem,6.6vw,5.5rem)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="block sm:whitespace-nowrap">Research and Infrastructure</span>
          <span className="block sm:whitespace-nowrap">
            for{" "}
            <span
              className="font-handwritten text-blue-600 font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-handwritten), cursive" }}
            >
              artificial intelligence
            </span>
          </span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mt-8 mb-8 px-2 sm:px-0"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl shadow-neutral-300/40">
          <video
            src="/videos/demo.mp4"
            className="w-full aspect-video object-cover"
            autoPlay loop muted playsInline preload="metadata"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
          <motion.img
            src="/images/hero-menu-card.png"
            alt="Orgni product menu"
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute z-20 top-3 left-3 sm:top-5 sm:left-5 w-40 sm:w-56 lg:w-64 rounded-xl sm:rounded-2xl"
            style={{ filter: "drop-shadow(0 18px 40px rgba(15,23,42,0.28))" }}
          />
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20">
            <a
              href="https://orgni.olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-7 sm:py-3.5 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/30 border border-orange-400/40"
            >
              Try Orgni <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

    </section>
  );
}


function LogoStrip() {
  const slots: { front: { name: string; file: string }; back: { name: string; file: string } }[] = [
    { front: { name: "OpenAI", file: "openai" }, back: { name: "Microsoft", file: "microsoft" } },
    { front: { name: "Google", file: "google" }, back: { name: "AWS", file: "amazonwebservices" } },
    { front: { name: "Anthropic", file: "anthropic" }, back: { name: "DeepMind", file: "deepmind" } },
    { front: { name: "GitHub", file: "github" }, back: { name: "Hugging Face", file: "huggingface" } },
    { front: { name: "Meta", file: "meta" }, back: { name: "Intel", file: "intel" } },
    { front: { name: "Cisco", file: "cisco" }, back: { name: "IBM", file: "ibm" } },
    { front: { name: "Coursera", file: "coursera" }, back: { name: "Stripe", file: "stripe" } },
    { front: { name: "NVIDIA", file: "nvidia" }, back: { name: "Slack", file: "slack" } },
    { front: { name: "Cohere", file: "cohere" }, back: { name: "Notion", file: "notion" } },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
      <p className="text-center text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8 sm:mb-10">Built alongside the AI ecosystem</p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative px-6 sm:px-10 py-8 sm:py-10"
      >
        {/* dashed marching-ants selection border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-md crop-marquee pointer-events-none"
        />
        {/* corner handles */}
        {[
          "-top-1 -left-1",
          "-top-1 -right-1",
          "-bottom-1 -left-1",
          "-bottom-1 -right-1",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`absolute ${pos} w-2.5 h-2.5 bg-white border border-blue-500 rounded-[2px] shadow-sm`}
          />
        ))}
        {/* edge handles */}
        {[
          "-top-1 left-1/2 -translate-x-1/2",
          "-bottom-1 left-1/2 -translate-x-1/2",
          "top-1/2 -left-1 -translate-y-1/2",
          "top-1/2 -right-1 -translate-y-1/2",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`absolute ${pos} w-2 h-2 bg-white border border-blue-500 rounded-[2px] hidden sm:block`}
          />
        ))}

        {/* dimension label */}
        <span
          aria-hidden="true"
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500 text-white whitespace-nowrap"
        >
          1200 × 120
        </span>

        {/* colored cursor at bottom-right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 28 28"
          className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 z-10 pointer-events-none"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
        >
          <path
            d="M6 3.2 L6 22 L11.1 17.4 L13.7 23.8 L16.6 22.6 L14 16.2 L20.7 16.2 Z"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto scrollbar-hide sm:overflow-visible flex items-center sm:justify-between flex-nowrap gap-5 sm:gap-4">
          {slots.map((slot, idx) => (
            <motion.div
              key={slot.front.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="logo-flip select-none shrink-0 sm:flex-1 sm:min-w-0 flex justify-center"
              style={{ ['--flip-delay' as any]: `${idx * 0.6}s` }}
              aria-label={`${slot.front.name} / ${slot.back.name}`}
              title={`${slot.front.name} / ${slot.back.name}`}
            >
              <div className="logo-flip-inner h-7 sm:h-9 w-[84px] sm:w-full sm:max-w-[110px]">
                <div className="logo-face logo-front">
                  <img
                    src={`/logos/collaborators/${slot.front.file}.svg`}
                    alt={slot.front.name}
                    loading="lazy"
                    className="max-h-full max-w-full w-auto object-contain"
                  />
                </div>
                <div className="logo-face logo-back">
                  <img
                    src={`/logos/collaborators/${slot.back.file}.svg`}
                    alt={slot.back.name}
                    loading="lazy"
                    className="max-h-full max-w-full w-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
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
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">What We Do</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900">
              From research to systems businesses can run
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                num: "01",
                title: "Olyxee Research",
                desc: "We study the real operational problems organizations face when adopting AI.",
                gradient: "/images/gradient-orange-pink.webp",
              },
              {
                num: "02",
                title: "Infrastructure",
                desc: "We build the infrastructure that turns AI research into reliable business systems.",
                gradient: "/images/gradient-orange-purple.webp",
              },
              {
                num: "03",
                title: "Product Surfaces",
                desc: "We create focused product surfaces across finance, documents, logistics, workflows, and AI-agent operations.",
                gradient: "/images/gradient-yellow-green.webp",
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
                  <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-white/55 group-hover:from-white/92 group-hover:via-white/74 group-hover:to-white/45 transition-colors duration-300" />
                </div>
                <div className="relative p-7 sm:p-8 min-h-[200px] flex flex-col ring-1 ring-inset ring-neutral-900/5 rounded-2xl">
                  <span className="text-xs font-mono text-neutral-400 mb-4">{step.num}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight leading-snug mb-3">{step.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
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
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Visual Research</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            Exploring AI through new perspectives
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

type ProductBlock = {
  key: string;
  name: string;
  tagline: string;
  points: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  imageSide: "left" | "right";
  images: {
    a: { src: string; alt: string; w: number; h: number };
    b: { src: string; alt: string; w: number; h: number };
  };
};

const PRODUCT_BLOCKS: readonly ProductBlock[] = [
  {
    key: "ordo",
    name: "Orgni Workflows",
    tagline:
      "Ask in plain English. Orgni Workflows gets it done across the tools you already use - and keeps the receipts.",
    points: [
      "Plugs into Drive, Teams, SharePoint & more",
      "Turns requests into completed work",
      "Every step assigned, timestamped, reviewable",
    ],
    ctaLabel: "Try Orgni Workflows",
    ctaHref: "https://orgni.olyxee.com",
    imageSide: "right",
    images: {
      a: { src: "/images/ordo/integrations.jpeg", alt: "Connects natural-language requests to your existing tools", w: 1200, h: 675 },
      b: { src: "/images/ordo/tasks.png", alt: "Tracks every task with clear ownership and timestamps", w: 1200, h: 1200 },
    },
  },
  {
    key: "addup",
    name: "Orgni Finance",
    tagline:
      "The financial close, on autopilot. Orgni Finance reconciles, drafts, and reviews the books while your team approves.",
    points: [
      "Connects to Xero, QuickBooks & your bank feeds",
      "Turns transactions into a clean monthly close",
      "Every entry sourced, explained, audit-ready",
    ],
    ctaLabel: "Try Orgni Finance",
    ctaHref: "https://addup.olyxee.com",
    imageSide: "left",
    images: {
      a: { src: "/images/addup/reconciliation.png", alt: "Reconciliation statement with AI suggestions and variance analysis", w: 1440, h: 900 },
      b: { src: "/images/addup/integrations.png", alt: "Drag-and-drop connectors for PayPal, Chase, SAP and more", w: 1200, h: 1000 },
    },
  },
];

function ProductBlockRow({ p }: { p: ProductBlock }) {
  const imageRight = p.imageSide === "right";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className={`lg:col-span-5 ${imageRight ? "" : "lg:order-2"}`}
      >
        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-neutral-900 mb-6 leading-[1]">
          {p.name}
        </h2>
        <p className="text-lg sm:text-xl text-neutral-700 leading-snug mb-8 max-w-md font-light">
          {p.tagline}
        </p>
        <ul className="space-y-3">
          {p.points.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[15px] text-neutral-600">
              <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className={`lg:col-span-7 relative ${imageRight ? "" : "lg:order-1"}`}>
        <div className="relative aspect-[5/4] sm:aspect-[6/5] w-full">
          <motion.div
            initial={{ opacity: 0, x: imageRight ? "-65%" : "65%", y: -30, rotate: imageRight ? -14 : 14, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: imageRight ? -2 : 2, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-0 ${imageRight ? "left-0 sm:left-2" : "right-0 sm:right-2"} w-[78%] sm:w-[70%] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-300/50 border border-neutral-200/60 bg-white`}
          >
            <Image src={p.images.a.src} alt={p.images.a.alt} width={p.images.a.w} height={p.images.a.h} className="w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: imageRight ? "65%" : "-65%", y: 40, rotate: imageRight ? 16 : -16, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: imageRight ? 3 : -3, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-0 ${imageRight ? "right-0 sm:right-2" : "left-0 sm:left-2"} w-[72%] sm:w-[62%] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-300/50 border border-neutral-200/60 bg-white`}
          >
            <Image src={p.images.b.src} alt={p.images.b.alt} width={p.images.b.w} height={p.images.b.h} className="w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute -bottom-5 sm:-bottom-7 ${imageRight ? "right-4 sm:right-8" : "left-4 sm:left-8"} z-20`}
          >
            <a
              href={p.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-2xl shadow-neutral-900/30 hover:shadow-neutral-900/50 hover:scale-105"
            >
              {p.ctaLabel}
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
  );
}

function OrdoSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40 bg-neutral-50/60 border-y border-neutral-100 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-28 sm:space-y-40">
        {PRODUCT_BLOCKS.map((p) => (
          <ProductBlockRow key={p.key} p={p} />
        ))}
      </div>
    </section>
  );
}

type ProductCta = { label: string; href: string; external?: boolean };

function ProductFeature({
  id,
  surface,
  index,
  eyebrow,
  heading,
  emphasis,
  description,
  pills,
  image,
  glow,
  primary,
  secondary,
}: {
  id: string;
  surface: "muted" | "plain";
  index: string;
  eyebrow: string;
  heading: string;
  emphasis: string;
  description: string;
  pills?: { label: string; icon: LucideIcon }[];
  image: { src: string; alt: string; width: number; height: number };
  glow: string;
  primary: ProductCta;
  secondary: ProductCta;
}) {
  const ease = [0.25, 0.1, 0.25, 1] as const;
  const surfaceClass =
    surface === "muted"
      ? "bg-neutral-50/60 border-y border-neutral-100"
      : "bg-white border-y border-neutral-100";

  return (
    <section id={id} className={`py-20 sm:py-32 lg:py-40 ${surfaceClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-start justify-between gap-6"
        >
          <div>
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-[0.2em] mb-4">{eyebrow}</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] max-w-2xl">
              {heading} <em className="text-orange-500 not-italic">{emphasis}</em>
            </h2>
          </div>
          <span
            aria-hidden
            className="hidden sm:block font-serif text-3xl lg:text-4xl text-neutral-300 leading-none pt-2"
          >
            {index}
          </span>
        </motion.div>

        {/* Full-width showcase */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-10 sm:mt-14"
        >
          <div aria-hidden className={`absolute -inset-6 sm:-inset-10 -z-10 ${glow} blur-3xl rounded-[2.5rem]`} />
          <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] shadow-xl shadow-neutral-900/5">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="block w-full h-auto"
              sizes="(max-width: 1280px) 100vw, 1216px"
              quality={95}
            />
          </div>
        </motion.div>

        {/* Caption / meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 items-end border-t border-neutral-200 pt-8 sm:pt-10"
        >
          <p className="sm:col-span-6 lg:col-span-7 text-neutral-600 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="sm:col-span-6 lg:col-span-5 flex flex-col sm:items-end gap-5">
            {pills && pills.length > 0 && (
              <div className="flex flex-wrap sm:justify-end gap-2">
                {pills.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white ring-1 ring-neutral-200 text-xs font-medium text-neutral-700"
                  >
                    <Icon className="w-3.5 h-3.5 text-orange-500" />
                    {label}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={primary.href}
                {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
              >
                {primary.label}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              {secondary.external ? (
                <a
                  href={secondary.href}
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  {secondary.label} →
                </a>
              ) : (
                <Link
                  href={secondary.href}
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  {secondary.label} →
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CourierLoopSection() {
  return (
    <section id="logistics" className="py-20 sm:py-32 lg:py-40 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-[0.2em] mb-4">Order Loop</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-5">
              Keep every customer <em className="text-orange-500 not-italic">in the loop.</em>
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-sm">
              Send clean order-status updates, from confirmed to delivered.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://logistics.olyxee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
              >
                Open Logistics
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="mailto:scofield@olyxee.com?subject=Olyxee%20Logistics%20Inquiry"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Talk to us →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-8 relative"
          >
            <div aria-hidden className="absolute -inset-8 -z-10 bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 blur-2xl rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-200 shadow-sm">
              <Image
                src="/images/order-loop-illustration.png"
                alt="A shopper places an order on their phone while a courier delivers the package, with live order-status steps showing the order is on the way"
                width={1024}
                height={533}
                className="block w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 860px"
                quality={95}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OrgniSection() {
  return (
    <ProductFeature
      id="orgni"
      surface="muted"
      index="01"
      eyebrow="Orgni · Core platform"
      heading="Business context for"
      emphasis="AI execution."
      description="Orgni learns your processes, rules, roles, documents, and exceptions so AI can support real business work."
      pills={[
        { label: "Core", icon: Layers },
        { label: "Workflows", icon: Workflow },
        { label: "Docs", icon: FileText },
        { label: "Finance", icon: Wallet },
      ]}
      image={{
        src: "/images/orgni-product.png",
        alt: "Orgni interface: an organizational role transfer being processed with a live user graph, entitlements, and approval trail",
        width: 1024,
        height: 576,
      }}
      glow="bg-gradient-to-br from-orange-100/70 via-white to-amber-50/40"
      primary={{ label: "Try Orgni", href: "https://orgni.olyxee.com", external: true }}
      secondary={{ label: "Talk to us", href: "/contact" }}
    />
  );
}

function TogentSection() {
  return (
    <section id="togent" className="py-20 sm:py-32 lg:py-40 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 order-2 lg:order-1 relative"
          >
            <div aria-hidden className="absolute -inset-8 -z-10 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 blur-2xl rounded-[2rem]" />
            <div className="relative space-y-4">
              <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-200 bg-neutral-50 shadow-sm">
                <Image
                  src="/images/togent-tokens-guide.png"
                  alt="AI Tokens Guide: understanding, optimization, and cost management"
                  width={1600}
                  height={401}
                  className="block w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-200 bg-neutral-50 shadow-sm">
                <Image
                  src="/images/togent-token-stream.png"
                  alt="Token Stream Timeline showing past, active, and future tokens within the current context window"
                  width={1600}
                  height={739}
                  className="block w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-200 bg-neutral-50 shadow-sm">
                <Image
                  src="/images/togent-token-budget.png"
                  alt="Token Budget Allocation across user prompt, context, processing, and response"
                  width={1600}
                  height={1004}
                  className="block w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-3xl sm:text-4xl text-neutral-900 tracking-tight">Togent</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.25em]">Cost control</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono uppercase tracking-[0.18em]">Coming soon</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-6">
              Stop paying for the same <em className="text-neutral-500 not-italic">context twice.</em>
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-md">
              Togent is cost control and context optimization for AI agents. It tracks, stores, compresses, and reuses context across tools like Cursor, Claude, Codex, and your own copilots, so they stop repeating expensive work and your token bills stay under control.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
              >
                Get early access
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/enterprise"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Learn more →
              </Link>
            </div>
          </motion.div>
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
                  <Image src="/images/ordo-logo.png" alt="Orgni Workflows" width={32} height={32} className="rounded-lg" style={{ width: 32, height: 32 }} />
                  <span className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">Orgni Workflows</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-tight mb-6">
                  AI execution for your workflows.
                </h2>
                <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto">
                  Turn business goals into completed operations. Orgni Workflows plans, coordinates, and executes across your tools and systems end-to-end.
                </p>
                <Link
                  href="/products/ordo"
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


const STORIES = [
  {
    tag: "Logistics",
    headline: "Operational infrastructure for cross-continent freight.",
    image: "/images/stories/logistics.png",
    alt: "Warehouse worker in safety vest packaging shipments on the line",
    href: "/stories/freightshift",
  },
  {
    tag: "Accounting",
    headline: "Five-day close, now overnight.",
    image: "/images/stories/accounting.png",
    alt: "Finance team reviewing an operations dashboard together",
    href: "/stories/accounting",
  },
  {
    tag: "Automation",
    headline: "Supplier onboarding, fully automated.",
    image: "/images/stories/automation.png",
    alt: "Distributed team celebrating a launch together at the desk",
    href: "/stories/automation",
  },
];

function StoriesSection() {
  return (
    <section id="stories" className="py-20 sm:py-32 lg:py-40 bg-white border-t border-neutral-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-20"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Stories</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 max-w-2xl">
            Orgni{" "}
            <span className="relative inline-block">
              in practice
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-[18px] overflow-visible text-orange-500"
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M3 11 C 55 4, 105 16, 155 8 S 250 15, 297 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            .
          </h2>
          <p className="mt-5 text-neutral-600 text-base sm:text-lg font-light max-w-md">
            A closer look at how teams put Olyxee to work.
          </p>
        </motion.div>

        <div id="stories-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 scroll-mt-24">
          {STORIES.map((story, i) => (
            <motion.article
              key={story.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={story.href} className="group block cursor-pointer">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-neutral-100 mb-6 ring-1 ring-neutral-900/5">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 540px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em] mb-2">
                  {story.tag}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug group-hover:text-neutral-600 transition-colors">
                  {story.headline}
                </h3>
              </Link>
            </motion.article>
          ))}
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
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 leading-[1.05]">
              Get started with Orgni
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-lg mx-auto">
              Bring Orgni into your organization to connect your context, workflows, documents, and decisions, so AI can support real operations with control and traceability.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide shadow-lg shadow-neutral-900/10"
              >
                Get in touch
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/enterprise"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
              >
                Learn more
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
