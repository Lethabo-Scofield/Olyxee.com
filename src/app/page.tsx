"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Truck, Check, PackageCheck, MapPin, Bell } from "lucide-react";


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
    description: "Olyxee is a research and infrastructure company helping businesses adapt to AI. We study the challenges organisations face when adopting AI, then build the infrastructure required to turn advanced intelligence into reliable organisational capability.",
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
        email: "info@olyxee.com",
        url: "https://olyxee.com/contact",
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Operational Intelligence",
      "Business Infrastructure",
      "AI Infrastructure",
      "Keep Your Business Moving",
      "Operational Memory",
      "Decision History",
      "Model-Neutral Architecture",
      "Intelligent Operations",
      "AI Research",
    ],
    slogan: "Research and Infrastructure for Operational Intelligence",
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
          text: "Olyxee is a research and infrastructure company helping businesses adapt to AI. We study the challenges organisations face when adopting AI, then build the infrastructure required to turn advanced intelligence into reliable organisational capability. Our work connects organisational knowledge, people, processes, rules, decisions, and systems so AI can operate with meaningful business context.",
        },
      },
      {
        "@type": "Question",
        name: "What is Orgni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orgni is Olyxee's operational intelligence infrastructure. It understands your organisation, works across the tools your teams already use, and handles the questions and routine work that create unnecessary delays, so work keeps moving across the business.",
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
          text: "You can reach the team at info@olyxee.com, or use the contact page at https://olyxee.com/contact for sales, partnerships, press, careers, or general inquiries.",
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
        <LatestReleaseSection />
        <ImageShowcase />
        
        <OrgniSection />
        <VideoShowcaseSection />
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
              operational intelligence
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
            src="/videos/hero.mp4"
            className="w-full aspect-video object-cover"
            autoPlay loop muted playsInline preload="metadata"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20">
            <a
              href="https://orgni.olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-7 sm:py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-600/30 border border-blue-500/40"
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
                desc: "We study the challenges businesses face when adopting AI: how knowledge is preserved, how decisions are made, and how humans and intelligent systems operate together.",
                gradient: "/images/what-we-do-research.png",
              },
              {
                num: "02",
                title: "Infrastructure",
                desc: "We build the infrastructure required to turn advanced intelligence into reliable organisational capability, connecting knowledge, people, processes, rules, decisions, and systems.",
                gradient: "/images/what-we-do-infrastructure.png",
              },
              {
                num: "03",
                title: "Intelligent operations",
                desc: "Orgni keeps work moving across the business by understanding the organisation and handling the questions and routine work that create delays, while Olyxee Logistics runs cross-border logistics operations end to end.",
                gradient: "/images/what-we-do-operations.png",
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
                  <Image src={step.gradient} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15 group-hover:from-black/65 group-hover:via-black/30 group-hover:to-black/10 transition-colors duration-300" />
                </div>
                <div className="relative p-7 sm:p-8 min-h-[200px] flex flex-col ring-1 ring-inset ring-white/10 rounded-2xl">
                  <span className="text-xs font-mono text-white/60 mb-4">{step.num}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug mb-3">{step.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{step.desc}</p>
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
    { src: "/images/showcase/enterprise-ai-framework.png", alt: "The framework for enterprise AI", caption: "Enterprise AI Framework" },
    { src: "/images/showcase/knowledge-routing.png", alt: "A query routed to structured organisational knowledge", caption: "Knowledge Routing" },
    { src: "/images/showcase/connected-systems.png", alt: "Systems, clouds and people connected around a shared hub", caption: "Connected Systems" },
    { src: "/images/showcase/company-insights.png", alt: "Company insights and predictions surfaced from live data", caption: "Company Insights" },
    { src: "/images/showcase/business-model.png", alt: "A hand sketching a business model map", caption: "Business Model Mapping" },
  ];
  const rowB = [
    { src: "/images/showcase/ai-assistant.png", alt: "A person working with an AI assistant across dashboards", caption: "AI at Work" },
    { src: "/images/showcase/custom-ai-solutions.png", alt: "Custom AI solutions folder with code and content", caption: "Custom AI Solutions" },
    { src: "/images/showcase/sales-funnel.png", alt: "A sales funnel chart with operational records", caption: "Sales Operations" },
    { src: "/images/showcase/roi-reporting.png", alt: "ROI reporting with revenue charts", caption: "ROI Reporting" },
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
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            How Orgni puts Olyxee&apos;s research to work
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

type ProductCta = { label: string; href: string; external?: boolean };

function ProductFeature({
  id,
  surface,
  eyebrow,
  heading,
  emphasis,
  description,
  image,
  primary,
  secondary,
}: {
  id: string;
  surface: "muted" | "plain";
  eyebrow?: string;
  heading: string;
  emphasis: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  primary: ProductCta;
  secondary?: ProductCta;
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
            {eyebrow && (
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-[0.2em] mb-4">{eyebrow}</p>
            )}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] max-w-2xl">
              {heading} <em className="text-orange-500 not-italic">{emphasis}</em>
            </h2>
          </div>
        </motion.div>

        {/* Full-width showcase */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-10 sm:mt-14"
        >
          <div className="relative overflow-hidden rounded-lg ring-1 ring-neutral-200/80">
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
          className="mt-8 sm:mt-12 border-t border-neutral-200 pt-8 sm:pt-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-10"
        >
          <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="shrink-0">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={primary.href}
                {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-2 text-sm font-medium text-white bg-neutral-900 hover:bg-black px-6 py-3 rounded-full transition-colors"
              >
                {primary.label}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              {secondary &&
                (secondary.external ? (
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
                ))}
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
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-[0.2em] mb-4">Olyxee Logistics</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] mb-5">
              Run cross-border logistics <em className="text-orange-500 not-italic">end to end.</em>
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-sm">
              Manage customers, invoices, cross-border orders, warehouse cargo matching, shipment statuses and customer tracking in one platform.
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
                href="mailto:info@olyxee.com?subject=Olyxee%20Logistics%20Inquiry"
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
            <div className="relative overflow-hidden rounded-3xl">
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
      heading="Orgni keeps your"
      emphasis="business moving."
      description="Work stops when people wait for answers, documents, approvals, or another team. Orgni understands your organisation, works across the tools your teams already use, and handles the questions and routine work that create unnecessary delays."
      image={{
        src: "/images/orgni-product.png",
        alt: "Orgni interface: an organizational role transfer being processed with a live user graph, entitlements, and approval trail",
        width: 1024,
        height: 576,
      }}
      primary={{ label: "Talk to us", href: "/contact" }}
    />
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
                <p className="text-neutral-500 text-base sm:text-lg font-normal leading-relaxed mb-10 max-w-lg mx-auto">
                  Turn business goals into completed operations. Orgni Workflows plans, coordinates, and executes across your tools and systems end-to-end.
                </p>
                <Link
                  href="/contact"
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
    headline: "One operational view across a fragmented freight network.",
    excerpt:
      "How Orgni connected shipment events, responsibilities and commitments into a shared operational model.",
    readTime: "5 min read",
    image: "/images/stories/logistics.png",
    alt: "Warehouse worker in safety vest packaging shipments on the line",
    href: "/stories/freightshift",
  },
  {
    tag: "Accounting",
    headline: "Making the financial close understandable before automating it.",
    excerpt:
      "Orgni modelled the responsibilities, dependencies and decisions behind the close, so intelligent systems could run it reliably.",
    readTime: "4 min read",
    image: "/images/stories/accounting.png",
    alt: "Finance team reviewing an operations dashboard together",
    href: "/stories/accounting",
  },
  {
    tag: "Automation",
    headline: "A supplier process that understands its own rules.",
    excerpt:
      "Orgni connected the roles, policies and evidence behind onboarding, making the automation reliable.",
    readTime: "4 min read",
    image: "/images/stories/automation.png",
    alt: "Distributed team celebrating a launch together at the desk",
    href: "/stories/automation",
  },
];

function VideoShowcaseSection() {
  return (
    <section id="in-motion" aria-label="Orgni in motion" className="py-20 sm:py-28 lg:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-black overflow-hidden"
        >
          <video
            src="/videos/landing-showcase.mp4"
            className="block w-full aspect-video object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 sm:h-56 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none"
          />
          <div className="absolute inset-x-0 top-0 pt-8 sm:pt-12 px-6 text-center">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] mb-3">See It in Motion</p>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white max-w-3xl mx-auto">
              One living view of your organisation
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const STORY_DURATION_MS = 7000;

const LATEST_RELEASE = {
  title: "FinIR: A financial intermediate representation for AI-native computation",
  description:
    "A finance-typed compiler and incremental execution runtime that turns structured financial intent into deterministic, auditable financial computation.",
  authors: "Lethabo Scofield and Alisha Fatima",
  date: "2026-09-04",
  dateLabel: "Sep 2026",
  href: "/research/finir",
  background: "/research/finir-card-bg.webp",
  links: [
    { label: "GitHub", href: "https://github.com/Olyxee/finir", logo: "/logos/collaborators/github.svg" },
    { label: "PyPI", href: "https://pypi.org/project/finir/", logo: "/research/logos/pypi.svg" },
    { label: "FinIR-Intent model", href: "https://huggingface.co/Olyxee/FinIR-Intent", logo: "/partner-logos/huggingface.svg" },
    { label: "IntentBench dataset", href: "https://huggingface.co/datasets/Olyxee/FinIR-IntentBench", logo: "/partner-logos/huggingface.svg" },
  ],
};

function LatestReleaseSection() {
  const release = LATEST_RELEASE;
  return (
    <section id="latest-release" className="py-20 sm:py-28 bg-white border-t border-neutral-200/70 scroll-mt-24" aria-labelledby="latest-release-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Research</p>
            <h2 id="latest-release-heading" className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 max-w-2xl">
              Latest release
            </h2>
          </div>
          <Link
            href="/research"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            View all research
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white bg-cover bg-center p-7 sm:p-10 lg:p-12"
          style={{ backgroundImage: `url(${release.background})` }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.22) 55%, rgba(255,255,255,0) 100%)" }}
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                <span className="text-neutral-900">Release</span>
                <span aria-hidden>·</span>
                <time dateTime={release.date}>{release.dateLabel}</time>
              </div>
              <h3 className="mt-5 max-w-[720px] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-neutral-900 sm:text-[2.25rem]">
                {release.title}
              </h3>
              <p className="mt-5 max-w-[640px] text-[16px] leading-[1.65] text-neutral-600 sm:text-[17px]">{release.description}</p>
              <p className="mt-4 text-[14px] text-neutral-500">{release.authors}</p>
              <Link
                href={release.href}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
              >
                Read the release
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-md sm:p-6">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-500">Public resources</p>
              <ul className="divide-y divide-neutral-200">
                {release.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 py-3 text-[14px] font-medium text-neutral-900"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white">
                        <Image src={link.logo} alt="" width={16} height={16} className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoriesSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const paused = hovered || focused;
  const autoplay = !reduceMotion;

  // Auto-advance. Pausing (hover/focus) cancels the timer; resuming restarts a
  // full cycle and bumps `cycle` so the progress line restarts in sync.
  useEffect(() => {
    if (!autoplay || paused) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % STORIES.length);
      setCycle((c) => c + 1);
    }, STORY_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, paused, cycle, autoplay]);

  useEffect(() => {
    if (!paused) setCycle((c) => c + 1);
  }, [paused]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const fade = reduceMotion ? { duration: 0 } : undefined;

  const story = STORIES[active];

  return (
    <section id="stories" className="py-20 sm:py-28 bg-white border-t border-neutral-200/70 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Stories</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 max-w-2xl">
            What organisational{" "}
            <span className="relative inline-block">
              understanding enables
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
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <p className="text-neutral-600 text-base sm:text-lg font-normal max-w-md">
              How Orgni helps teams keep work moving across the business.
            </p>
            <Link
              href="/stories"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              View all stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <motion.div
          id="stories-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-stretch scroll-mt-24"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
        >
          {/* Index: numbered entries with a reading-progress line */}
          <ol className="order-2 lg:order-1 flex flex-col divide-y divide-neutral-200 border-t border-b border-neutral-200" aria-label="Featured stories">
            {STORIES.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.href} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex w-full items-start gap-5 py-6 pr-2 text-left transition-colors"
                  >
                    <span className={`mt-1 font-mono text-[11px] tabular-nums tracking-wide ${isActive ? "text-neutral-900" : "text-neutral-400"}`}>
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 ${isActive ? "text-orange-600" : "text-neutral-400"}`}>
                        {item.tag}
                      </span>
                      <span className={`block font-serif text-lg sm:text-xl leading-snug tracking-tight transition-colors ${isActive ? "text-neutral-900" : "text-neutral-500 group-hover:text-neutral-800"}`}>
                        {item.headline}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="excerpt"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={fade ?? { duration: 0.35 }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-3 text-[15px] leading-relaxed text-neutral-600 max-w-[30rem]">{item.excerpt}</span>
                            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                              {item.readTime}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                  {/* progress line */}
                  <span aria-hidden className="absolute left-0 right-0 bottom-0 h-px bg-transparent overflow-hidden">
                    {isActive && autoplay && !paused && (
                      <motion.span
                        key={`${i}-${cycle}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STORY_DURATION_MS / 1000, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                        className="block h-px w-full bg-neutral-900"
                      />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Stage: the active story */}
          <div className="order-1 lg:order-2 relative">
            <Link href={story.href} className="group block relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-neutral-100 rounded-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={story.href}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={fade ?? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    priority={active === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">{story.tag}</p>
                  <p className="font-serif text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight text-white max-w-xl">{story.headline}</p>
                </div>
                <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-transform group-hover:translate-x-0.5">
                  Read story <ArrowUpRight className="w-4 h-4" aria-hidden />
                </span>
              </div>
            </Link>
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 lg:hidden">
              <span className="font-mono tabular-nums">0{active + 1} / 0{STORIES.length}</span>
              <div className="flex gap-2">
                {STORIES.map((item, i) => (
                  <button
                    key={item.href}
                    type="button"
                    aria-label={`Show story ${i + 1}: ${item.tag}`}
                    onClick={() => select(i)}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
            <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed mb-9 max-w-lg mx-auto">
              Work shouldn't stop because someone is waiting for an answer, a document, an approval, or another person. Ask Orgni today, give it work next, and reduce the blockers that slow your operations.
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
                href="/about"
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
        <p className="text-sm text-neutral-600 flex-1 font-normal">
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
