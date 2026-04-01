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
      description: "We're building in the open and looking for research partners to help define verification standards for AI systems. If you're working on AI safety, evaluation, or reliability — let's talk.",
      cta: "Get in Touch",
      href: "/contact",
      features: ["Open collaboration", "Verification standards", "Safety research", "Early partner program"],
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
      metric: "Automated",
    },
    {
      icon: FileSearch,
      title: "RAG pipeline evaluation",
      description: "Score retrieval quality, context utilization, and response faithfulness independently. Identify exactly where your RAG pipeline breaks down.",
      metric: "Full-stack",
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
