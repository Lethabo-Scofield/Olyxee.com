'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight, Shield, Cpu, BarChart3, Zap, GitBranch, Layers, Check, Brain, Eye, MessageSquare, Image, Music, Video, Bot, Car, Factory, Stethoscope, Sparkles, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      setValue(current);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

function BenchmarkBar({ label, grysics, others, unit, delay }: { label: string; grysics: number; others: number; unit: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const max = Math.max(grysics, others);
  const grysicsWidth = (grysics / max) * 100;
  const othersWidth = (others / max) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-xs text-neutral-500">{unit}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-neutral-400 w-16 flex-shrink-0">Grysics</span>
          <div className="flex-1 h-8 bg-white/10 rounded-lg overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-neutral-300 rounded-lg flex items-center justify-end pr-3"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${grysicsWidth}%` } : {}}
              transition={{ duration: 1, delay: delay + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-[11px] font-bold text-neutral-900">{grysics}{unit === 'ms' ? 'ms' : unit === '%' ? '%' : ''}</span>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-neutral-600 w-16 flex-shrink-0">Others</span>
          <div className="flex-1 h-8 bg-white/10 rounded-lg overflow-hidden relative">
            <motion.div
              className="h-full bg-white/20 rounded-lg flex items-center justify-end pr-3"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${othersWidth}%` } : {}}
              transition={{ duration: 1, delay: delay + 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-[11px] font-bold text-neutral-400">{others}{unit === 'ms' ? 'ms' : unit === '%' ? '%' : ''}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EarlyAccessForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-2xl"
      >
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">You're on the list!</p>
          <p className="text-xs text-green-600">We'll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3.5 rounded-full border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all placeholder:text-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium text-sm hover:bg-black transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Get Early Access <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

const aiApplications = [
  { icon: Eye, name: "Computer Vision", examples: "Object detection, image segmentation, facial recognition", color: "from-blue-500 to-cyan-500" },
  { icon: MessageSquare, name: "NLP & LLMs", examples: "Text generation, sentiment analysis, chatbots, translation", color: "from-violet-500 to-purple-500" },
  { icon: Image, name: "Image Generation", examples: "Stable Diffusion, DALL-E, style transfer, super-resolution", color: "from-pink-500 to-rose-500" },
  { icon: Music, name: "Audio & Speech", examples: "Speech-to-text, music generation, voice cloning", color: "from-orange-500 to-amber-500" },
  { icon: Video, name: "Video Analysis", examples: "Action recognition, tracking, video generation", color: "from-green-500 to-emerald-500" },
  { icon: Bot, name: "Robotics & Control", examples: "Path planning, reinforcement learning, simulation", color: "from-red-500 to-orange-500" },
  { icon: Stethoscope, name: "Medical AI", examples: "Diagnostics, drug discovery, medical imaging", color: "from-teal-500 to-cyan-500" },
  { icon: Car, name: "Autonomous Systems", examples: "Self-driving, drone navigation, ADAS", color: "from-indigo-500 to-blue-500" },
];

export default function GrysicsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] opacity-30 -translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f0abfc 100%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #67e8f9 0%, #6ee7b7 100%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-medium uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Coming Soon
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-6"
          >
            Verify any AI app
            <br />
            <em className="text-neutral-400">before it ships</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed max-w-2xl font-light mb-10"
          >
            Grysics tests your AI application — vision, language, generative, or any other type — against real-world conditions. Catch accuracy drops, latency spikes, and failures before your users do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm font-medium text-neutral-500 mb-3">Sign up for early access</p>
            <EarlyAccessForm />
            <p className="text-xs text-neutral-400 mt-3">Free during beta. No credit card required.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-14 border-y border-neutral-100 bg-neutral-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {[
              { icon: Shield, text: "Pre-deploy verification" },
              { icon: Zap, text: "Real-time benchmarks" },
              { icon: Cpu, text: "Any hardware target" },
              { icon: Layers, text: "Any AI framework" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm text-neutral-500"
                >
                  <Icon className="w-4 h-4 text-neutral-400" />
                  {item.text}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-4 block">Works with every AI type</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              One tool for <em className="text-neutral-400">all your AI</em>
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl mx-auto">
              Whether you're building a chatbot, a vision system, or a generative model — Grysics verifies it works correctly on any device.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiApplications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-lg transition-all cursor-default overflow-hidden"
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${app.color} opacity-[0.08] group-hover:opacity-[0.15] rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`} />
                  <div className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br ${app.color} opacity-[0.05] group-hover:opacity-[0.1] rounded-full blur-xl transition-opacity duration-500 pointer-events-none`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">{app.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{app.examples}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 -translate-y-1/2 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.15] translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.08] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4 block">Performance</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Benchmark <em className="text-neutral-500">results</em>
            </h2>
            <p className="text-neutral-400 mt-4 text-lg font-light max-w-2xl mx-auto">
              Grysics consistently outperforms manual testing and competing tools across key metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-10">
              <BenchmarkBar label="Verification Speed" grysics={12} others={180} unit="ms" delay={0} />
              <BenchmarkBar label="Accuracy Retention" grysics={99} others={92} unit="%" delay={0.15} />
              <BenchmarkBar label="Memory Efficiency" grysics={245} others={512} unit="mb" delay={0.3} />
              <BenchmarkBar label="Deployment Success Rate" grysics={99} others={87} unit="%" delay={0.45} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 10, suffix: 'x', label: 'Faster verification', description: 'Compared to manual testing workflows', icon: TrendingUp },
                { value: 50, suffix: '+', label: 'Hardware targets', description: 'From Jetson to Raspberry Pi to cloud', icon: Cpu },
                { value: 99, suffix: '.9%', label: 'Deploy reliability', description: 'Verified models work in production', icon: Shield },
                { value: 3, suffix: 'min', label: 'Average verify time', description: 'Full verification pipeline end-to-end', icon: Clock },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    variants={fadeUp}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <Icon className="w-5 h-5 text-neutral-500 mb-3" />
                    <div className="font-serif text-3xl sm:text-4xl italic text-white mb-1">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">{stat.label}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{stat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.08] translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              How it <em className="text-neutral-400">works</em>
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl">
              Three steps from model to verified deployment. No complex setup required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload your model",
                description: "Drop in any AI model — PyTorch, TensorFlow, ONNX, TFLite. Grysics auto-detects the architecture and maps all dependencies.",
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                step: "02",
                title: "Run verification",
                description: "Grysics tests accuracy, latency, memory, and edge cases across your target devices. Get detailed pass/fail reports in minutes.",
                gradient: "from-violet-500 to-purple-500",
              },
              {
                step: "03",
                title: "Ship with confidence",
                description: "Deploy only verified models. Grysics guarantees they'll work on your target hardware. Continuous monitoring catches drift post-deploy.",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative"
              >
                <div className={`h-2 rounded-full bg-gradient-to-r ${item.gradient} mb-8 opacity-40`} />
                <span className="text-xs font-mono font-bold text-neutral-400 mb-3 block">{item.step}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.08] -translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.08] translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              What Grysics <em className="text-neutral-400">catches</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              { icon: Shield, title: "Accuracy Degradation", description: "Detects when quantization or hardware conversion silently drops model accuracy below your thresholds." },
              { icon: Clock, title: "Latency Violations", description: "Identifies operations that exceed real-time constraints on your target edge devices." },
              { icon: Cpu, title: "Memory Overflows", description: "Catches models that exceed available RAM or VRAM on constrained hardware before deployment." },
              { icon: BarChart3, title: "Numerical Instability", description: "Finds floating-point precision issues and NaN propagation that cause silent failures." },
              { icon: GitBranch, title: "Framework Mismatches", description: "Validates that model exports preserve behavior across PyTorch, TF, and ONNX conversions." },
              { icon: Zap, title: "Performance Bottlenecks", description: "Pinpoints layers and operations that consume disproportionate compute or energy." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  variants={fadeUp}
                  className="bg-white p-8 sm:p-10 hover:bg-neutral-50 transition-colors"
                >
                  <Icon className="w-6 h-6 text-neutral-400 mb-5" />
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-20 -translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.15] translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-medium mb-8 border border-white/10 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Limited Beta
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Stop shipping
              <br />
              <em className="text-neutral-500">untested AI</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Join the early access list. Be the first to verify your AI applications with Grysics before they reach production.
            </p>
            <div className="flex justify-center">
              <EarlyAccessForm />
            </div>
            <p className="text-xs text-neutral-600 mt-4">Join 500+ developers already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
