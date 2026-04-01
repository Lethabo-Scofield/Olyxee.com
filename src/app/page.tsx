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
  Shield,
  Cpu,
  BarChart3,
  Zap,
  Eye,
  Users,
  Building2,
  FlaskConical,
  MessageSquare,
  FileSearch,
  Bot,
  Layers,
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
        <ProductsSection />
        <MissionSection />
        <AudiencePathwaysSection />
        <UseCasesSection />
        <ProofSection />
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
              href="/products/grysics"
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


function ProductsSection() {
  const products = [
    {
      name: "Grysics",
      tag: "Flagship Product",
      tagline: "The verification engine for AI applications",
      description: "Test and monitor chatbots, RAG pipelines, and agent workflows for accuracy, consistency, and hallucination — before and after deployment. Catch failures before your users do.",
      href: "/products/grysics",
      cta: "Try Grysics",
      features: ["Hallucination detection", "RAG evaluation", "Drift monitoring", "Accuracy benchmarks"],
      gradient: "from-blue-50 via-indigo-50 to-violet-50",
      available: true,
    },
    {
      name: "Olyxee Edge Box",
      tag: "Division",
      tagline: "AI at the edge, optimized for real hardware",
      description: "Deploy verified AI models to IoT sensors, drones, robots, and embedded systems. Optimized for performance, power efficiency, and low latency on production hardware.",
      href: "/edgeai",
      cta: "Learn More",
      features: ["Edge deployment", "Hardware optimization", "OTA updates", "Device management"],
      gradient: "from-emerald-50 via-teal-50 to-cyan-50",
      available: false,
    },
  ];

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            What we <em className="text-neutral-400">build</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-neutral-500 font-light max-w-xl mx-auto"
          >
            Products and infrastructure powering the future of trustworthy AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
            >
              <Link
                href={product.href}
                className={`group relative flex flex-col h-full p-8 sm:p-10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-200/60 bg-gradient-to-br ${product.gradient} border border-neutral-100 hover:border-neutral-200`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-2xl sm:text-3xl tracking-tight text-neutral-900">{product.name}</h3>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-white/70 px-3 py-1 rounded-full border border-white/50 uppercase tracking-widest">
                    {product.tag}
                  </span>
                  {!product.available && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
                      Coming Soon
                    </span>
                  )}
                </div>

                <p className="text-base font-medium text-neutral-700 mb-3">{product.tagline}</p>
                <p className="text-sm text-neutral-500 leading-relaxed font-light mb-6 flex-1">{product.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {product.features.map((f) => (
                    <span key={f} className="text-[11px] text-neutral-500 bg-white/60 border border-neutral-200/60 rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 group-hover:gap-3 transition-all">
                  {product.cta} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function MissionSection() {
  const differentiators = [
    {
      icon: Shield,
      title: "Safety-first approach",
      desc: "Every product we build starts with verification and reliability as core requirements, not afterthoughts.",
    },
    {
      icon: Eye,
      title: "Pre- and post-deployment",
      desc: "Catch issues before launch with testing, then continuously monitor in production for drift and degradation.",
    },
    {
      icon: Layers,
      title: "Full-stack coverage",
      desc: "From RAG retrieval quality to agent workflow consistency to chatbot hallucination — one platform covers it all.",
    },
    {
      icon: Zap,
      title: "Built for speed",
      desc: "Designed to integrate into existing CI/CD pipelines without slowing down your development velocity.",
    },
  ];

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-8"
          >
            Why it <em className="text-neutral-500">matters</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed"
          >
            AI is being deployed in high-stakes environments — healthcare, legal, finance, customer support — where a wrong answer isn't just inconvenient, it's dangerous. Olyxee exists to ensure AI applications work correctly, consistently, and safely. We build the verification infrastructure that makes trustworthy AI possible at scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group p-7 sm:p-8 rounded-2xl border border-white/8 hover:border-white/15 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-400"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-neutral-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function AudiencePathwaysSection() {
  const pathways = [
    {
      icon: Code2,
      audience: "Developers",
      headline: "Ship AI that actually works",
      description: "Access SDKs, APIs, CLI tools, and comprehensive documentation to integrate verification into your development workflow. Test your models locally, in CI, or in production.",
      cta: "Explore Docs",
      href: "/docs",
      features: ["Python & C++ SDKs", "REST API", "CLI tools", "CI/CD integration"],
    },
    {
      icon: Building2,
      audience: "Enterprise",
      headline: "AI you can trust at scale",
      description: "Deploy verified AI models across your organization with enterprise-grade monitoring, audit trails, and compliance reporting. Scale with confidence.",
      cta: "Contact Sales",
      href: "/contact",
      features: ["SOC 2 compliance", "Audit trails", "SLA guarantees", "Dedicated support"],
    },
    {
      icon: FlaskConical,
      audience: "Research & Partners",
      headline: "Advance AI reliability together",
      description: "Collaborate on cutting-edge verification methods, share benchmarks, and contribute to open evaluation standards. Join the effort to make AI systems provably safe.",
      cta: "Learn More",
      href: "/research",
      features: ["Open benchmarks", "Research collaboration", "Validation tools", "Published papers"],
    },
  ];

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            Built for <em className="text-neutral-400">your team</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-neutral-500 font-light max-w-xl mx-auto"
          >
            Whether you're writing code, leading a product, or pushing the boundaries of research.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pathways.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.audience}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col rounded-3xl border border-neutral-200 hover:border-neutral-300 p-8 sm:p-9 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100/80"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{path.audience}</span>
                </div>

                <h3 className="text-xl tracking-tight text-neutral-900 mb-3">{path.headline}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light mb-6 flex-1">{path.description}</p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {path.features.map((f) => (
                    <span key={f} className="text-[11px] text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href={path.href}
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:gap-3 transition-all"
                >
                  {path.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function UseCasesSection() {
  const useCases = [
    {
      icon: MessageSquare,
      title: "Chatbot verification",
      description: "Test customer support bots across thousands of query variations. Detect hallucinated answers, inconsistent responses, and policy violations before they reach users.",
      metric: ">95% accuracy",
    },
    {
      icon: FileSearch,
      title: "RAG pipeline evaluation",
      description: "Score retrieval quality, context utilization, and response faithfulness independently. Identify exactly where your RAG pipeline breaks down.",
      metric: "Full-stack eval",
    },
    {
      icon: Bot,
      title: "Agent workflow testing",
      description: "Verify multi-step agent workflows handle edge cases correctly. Test tool-calling accuracy, reasoning chains, and failure recovery paths.",
      metric: "End-to-end",
    },
    {
      icon: BarChart3,
      title: "Production monitoring",
      description: "Continuously monitor deployed models for accuracy drift, response degradation, and emerging failure patterns. Get alerts before users complain.",
      metric: "Real-time",
    },
    {
      icon: Cpu,
      title: "Edge deployment validation",
      description: "Verify model accuracy is preserved after quantization and optimization for edge hardware. Ensure performance on Jetson, RPi, and custom silicon.",
      metric: "Hardware-aware",
    },
    {
      icon: Shield,
      title: "Compliance & audit trails",
      description: "Generate verification reports for regulated industries. Complete audit trails showing test results, accuracy metrics, and model behavior logs for every deployment.",
      metric: "Audit-ready",
    },
  ];

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 to-white" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            Real-world <em className="text-neutral-400">use cases</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-neutral-500 font-light max-w-xl mx-auto"
          >
            How teams use Olyxee to build AI that works correctly in production.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group p-7 sm:p-8 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-100/80 transition-all duration-400"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mt-1">{uc.metric}</span>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{uc.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{uc.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function ProofSection() {
  const metrics = [
    { value: "10,000+", label: "Models verified" },
    { value: "99.2%", label: "Detection accuracy" },
    { value: "<200ms", label: "Avg. verification time" },
    { value: "50+", label: "Enterprise customers" },
  ];

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5"
          >
            Trusted by <em className="text-neutral-400">the best</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-neutral-500 font-light max-w-xl mx-auto"
          >
            Leading AI teams rely on Olyxee to ship with confidence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="text-center p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-100"
            >
              <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-2">{m.value}</div>
              <div className="text-sm text-neutral-400 font-light">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] font-medium mb-8">Built for teams working with</p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14">
            {partnerLogos.map((logo, i) => {
              const Icon = logo.icon;
              return (
                <div
                  key={logo.name}
                  className="flex items-center gap-2.5 text-neutral-300 hover:text-neutral-500 transition-colors duration-300 cursor-default select-none"
                  title={logo.name}
                >
                  <Icon />
                  <span className="text-sm font-medium tracking-tight hidden sm:inline">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
            <blockquote className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed italic mb-6">
              &ldquo;Grysics caught hallucination patterns in our customer support bot that we missed in months of manual testing. The continuous monitoring alone has saved us from three potential incidents.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-neutral-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-900">AI Engineering Lead</div>
                <div className="text-xs text-neutral-400">Enterprise SaaS Company</div>
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
    <section className="py-28 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight mb-8"
        >
          Ready to build AI
          <br />
          <em className="text-neutral-500">that works?</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-neutral-300 text-lg sm:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed"
        >
          Start verifying your AI applications today, or talk to us about enterprise solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products/grysics"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
          >
            Try Grysics <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-400 border border-white/15 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all text-sm tracking-wide"
          >
            Explore Docs
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-400 border border-white/15 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all text-sm tracking-wide"
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
