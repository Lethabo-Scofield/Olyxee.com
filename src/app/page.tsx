"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GoogleLogo, MicrosoftLogo, OpenAILogo, NvidiaLogo, MetaLogo, AWSLogo, GoogleCloudLogo, IBMLogo, HuggingFaceLogo, AnthropicLogo, MistralLogo, CohereLogo, DeepMindLogo, xAILogo } from "../components/company-logos";

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
    description: "Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence.",
    sameAs: ["https://www.linkedin.com/company/olyxeelab/"],
    foundingDate: "2024",
    knowsAbout: [
      "Artificial Intelligence",
      "AI Verification",
      "AI Evaluation",
      "AI Monitoring",
      "AI Infrastructure",
      "AI Reliability",
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
        <ResearchAreas />
        <ApproachSection />
        <IntegrationSection />
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
    <section ref={ref} aria-label="Hero" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden" style={{ position: 'relative' }}>
      <div className="absolute inset-0 w-full h-full">
        <Image src="/hero-bg.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto pt-20 sm:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-[2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-neutral-900 leading-[1.05] tracking-tight px-2 sm:px-0"
        >
          Research and Infrastructure
          <br />
          for <em className="text-blue-400">artificial intelligence</em>
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
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 bg-white/90 backdrop-blur-md text-neutral-900 rounded-full font-medium hover:bg-white transition-all text-sm tracking-wide shadow-lg shadow-black/10 border border-white/60"
            >
              Try Grysics <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      <LogoStrip />
    </section>
  );
}


function LogoStrip() {
  const collaborators = [
    { name: "OpenAI", Logo: OpenAILogo, width: "w-20" },
    { name: "Anthropic", Logo: AnthropicLogo, width: "w-24" },
    { name: "Google", Logo: GoogleLogo, width: "w-20" },
    { name: "NVIDIA", Logo: NvidiaLogo, width: "w-24" },
    { name: "Meta", Logo: MetaLogo, width: "w-20" },
    { name: "Mistral", Logo: MistralLogo, width: "w-6" },
    { name: "xAI", Logo: xAILogo, width: "w-16" },
    { name: "Hugging Face", Logo: HuggingFaceLogo, width: "w-6" },
    { name: "Cohere", Logo: CohereLogo, width: "w-24" },
    { name: "DeepMind", Logo: DeepMindLogo, width: "w-28" },
  ];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
      <p className="text-center text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-6 sm:mb-8">Collaborators</p>
      <div className="flex items-center justify-center gap-x-8 sm:gap-x-10 overflow-x-auto no-scrollbar">
        {collaborators.map((item, idx) => {
          const LogoComponent = item.Logo;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="flex-shrink-0 group"
              title={item.name}
            >
              <div className={`${item.width} h-8 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}>
                <LogoComponent className="w-full h-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}




function ResearchAreas() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">What We Do</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900">
              Advancing the science of <em className="text-blue-500">AI reliability</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                num: "01",
                title: "Verification",
                desc: "Methods to verify AI systems produce accurate, consistent outputs across every scenario.",
                bg: "/images/gradient-blue.png",
              },
              {
                num: "02",
                title: "Safety",
                desc: "Detecting hallucinations and ensuring AI systems stay within intended boundaries.",
                bg: "/images/gradient-orange-pink.png",
              },
              {
                num: "03",
                title: "Monitoring",
                desc: "Real-time observability for AI in production. Catch drift and failures early.",
                bg: "/images/gradient-purple.png",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative rounded-2xl group hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Image src={step.bg} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-white/80 group-hover:bg-white/75 transition-colors duration-300" />
                </div>
                <div className="relative p-8 sm:p-10">
                  <div className="mb-8">
                    <div className="text-4xl font-serif text-neutral-300 leading-none">{step.num}</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm sm:text-[15px] text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}




function ApproachSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 lg:p-16">
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
            className="md:col-span-2 relative group rounded-2xl bg-neutral-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-2xl" />
            <div className="relative p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/grysics-logo.png" alt="Grysics" width={32} height={32} className="rounded-lg" style={{ width: 32, height: 32 }} />
                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">Grysics Platform</h3>
              </div>
              <p className="text-neutral-500 text-sm sm:text-[15px] font-light leading-relaxed max-w-lg mb-6">
                Verification engines, evaluation frameworks, and monitoring systems for real-world AI deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Verification", "Evaluation", "Monitoring", "Compliance"].map(t => (
                  <span key={t} className="text-[11px] text-neutral-500 bg-white/60 rounded-full px-3 py-1">{t}</span>
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
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Hallucination Research</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">
                Studying why AI fabricates information and building detection methods that work across domains.
              </p>
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
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 tracking-tight">Behavioral Evaluation</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Evaluating AI behavior at scale: consistency, accuracy, and alignment with intended outcomes.
              </p>
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
    <section className="relative py-24 sm:py-36 lg:py-48 overflow-hidden bg-amber-50/40">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
      </div>

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
            <div className="bg-white rounded-2xl shadow-md shadow-neutral-200/60 border border-neutral-100/80 p-5 w-44 hover:shadow-lg transition-shadow duration-300">
              <Image src={card.src} alt={card.name} width={28} height={28} className="object-contain mb-2" style={{ width: 28, height: 28 }} />
              <p className="text-sm font-semibold text-neutral-800">{card.name}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}

        <div className="relative z-10 max-w-xl mx-auto text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-neutral-900 leading-tight mb-6">
              Grysics: AI verification built for{" "}
              <em className="text-orange-400">your stack</em>.
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-md mx-auto">
              Deploy Grysics in your environment, or integrate through our cloud API. Works with every major platform.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-orange-500 transition-colors group"
            >
              Discover more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-400" />
            </Link>
          </motion.div>

          <div className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mobileCards.map((card, idx) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4"
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
    <section className="py-20 sm:py-32 lg:py-44 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
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
            loading="lazy"
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
          We are building those foundations. Join us on the journey.
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
