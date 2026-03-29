'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Cpu, BarChart3, Zap, GitBranch, Layers, Check, Sparkles, TrendingUp, Clock, ChevronLeft, Terminal, Play, Copy, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Globe, Lock, Activity } from 'lucide-react';

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

function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { type: 'cmd', text: '$ grysics verify model.onnx --target jetson-orin' },
    { type: 'info', text: '◼ Loading model... ResNet-50 (ONNX, 97.8MB)' },
    { type: 'info', text: '◼ Target: NVIDIA Jetson Orin Nano (8GB)' },
    { type: 'blank', text: '' },
    { type: 'header', text: '  VERIFICATION RESULTS' },
    { type: 'blank', text: '' },
    { type: 'pass', text: '  ✓ Accuracy retention     99.2%   (threshold: 95%)' },
    { type: 'pass', text: '  ✓ Inference latency      8.4ms   (threshold: 50ms)' },
    { type: 'pass', text: '  ✓ Memory footprint       412MB   (available: 8GB)' },
    { type: 'pass', text: '  ✓ Numerical stability    PASS    (no NaN detected)' },
    { type: 'warn', text: '  ⚠ INT8 quantization      97.1%   (minor accuracy loss)' },
    { type: 'pass', text: '  ✓ Throughput             119 fps  (target: 30 fps)' },
    { type: 'blank', text: '' },
    { type: 'result', text: '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'result', text: '  5/6 passed · 1 warning · 0 failed' },
    { type: 'success', text: '  ✓ Model is ready for deployment' },
  ];

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [isInView, lines.length]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-b from-violet-500/10 via-transparent to-cyan-500/10 rounded-[2rem] blur-xl pointer-events-none" />
      <div className="relative bg-neutral-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[11px] text-neutral-600 font-mono">grysics — verification</span>
          </div>
          <Terminal className="w-3.5 h-3.5 text-neutral-600" />
        </div>
        <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-6 min-h-[360px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === 'cmd' ? 'text-white font-semibold' :
                line.type === 'pass' ? 'text-green-400' :
                line.type === 'warn' ? 'text-amber-400' :
                line.type === 'fail' ? 'text-red-400' :
                line.type === 'header' ? 'text-neutral-300 font-bold tracking-wider text-[11px]' :
                line.type === 'success' ? 'text-green-400 font-bold' :
                line.type === 'result' ? 'text-neutral-500' :
                line.type === 'info' ? 'text-neutral-400' :
                'text-transparent select-none'
              }
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          {visibleLines < lines.length && isInView && (
            <span className="inline-block w-2 h-4 bg-white/60 animate-pulse ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  const [copied, setCopied] = useState(false);

  const code = `import grysics

report = grysics.verify(
    model="model.onnx",
    target="jetson-orin",
    checks=["accuracy", "latency", "memory"],
    thresholds={
        "accuracy": 0.95,
        "latency_ms": 50,
        "memory_mb": 2048
    }
)

if report.passed:
    grysics.deploy(report)`;

  return (
    <div className="relative bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded bg-yellow-500/60" />
          <span className="text-[11px] text-neutral-500 font-mono">verify.py</span>
        </div>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-6 text-neutral-300 overflow-x-auto">
        <code>{code.split('\n').map((line, i) => {
          let highlighted = line;
          highlighted = highlighted.replace(/(import|from|if)/g, '<kw>$1</kw>');
          highlighted = highlighted.replace(/(".*?")/g, '<str>$1</str>');
          highlighted = highlighted.replace(/(\d+\.?\d*)/g, '<num>$1</num>');
          highlighted = highlighted.replace(/(grysics)/g, '<fn>$1</fn>');
          highlighted = highlighted.replace(/(#.*$)/g, '<cmt>$1</cmt>');

          return (
            <div key={i} className="flex">
              <span className="w-8 text-right pr-4 text-neutral-700 select-none flex-shrink-0">{i + 1}</span>
              <span dangerouslySetInnerHTML={{
                __html: highlighted
                  .replace(/<kw>(.*?)<\/kw>/g, '<span class="text-purple-400">$1</span>')
                  .replace(/<str>(.*?)<\/str>/g, '<span class="text-green-400">$1</span>')
                  .replace(/<num>(.*?)<\/num>/g, '<span class="text-amber-400">$1</span>')
                  .replace(/<fn>(.*?)<\/fn>/g, '<span class="text-cyan-400">$1</span>')
                  .replace(/<cmt>(.*?)<\/cmt>/g, '<span class="text-neutral-600">$1</span>')
              }} />
            </div>
          );
        })}</code>
      </pre>
    </div>
  );
}

function EarlyAccessForm({ dark = false }: { dark?: boolean }) {
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
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl ${dark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'bg-green-500/20' : 'bg-green-100'}`}>
          <Check className={`w-4 h-4 ${dark ? 'text-green-400' : 'text-green-600'}`} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${dark ? 'text-green-300' : 'text-green-900'}`}>You're on the list!</p>
          <p className={`text-xs ${dark ? 'text-green-400/70' : 'text-green-600'}`}>We'll notify you when Grysics launches.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none transition-all placeholder:text-neutral-400 ${
          dark
            ? 'bg-white/10 border border-white/10 text-white focus:border-white/30 focus:ring-2 focus:ring-white/10'
            : 'border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400'
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-7 py-3.5 rounded-full font-medium text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 ${
          dark
            ? 'bg-white text-neutral-900 hover:bg-neutral-100'
            : 'bg-neutral-900 text-white hover:bg-black'
        }`}
      >
        {loading ? (
          <div className={`w-4 h-4 border-2 rounded-full animate-spin ${dark ? 'border-neutral-300 border-t-neutral-900' : 'border-white/30 border-t-white'}`} />
        ) : (
          <>Get Early Access <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}

function VisionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    </svg>
  );
}

function LanguageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16M4 5v3c0 4.418 3.582 8 8 8M4 5c0 0 1 4 4 6" />
      <path d="M12 16l3 5M12 16l-3 5" />
      <path d="M20 5c0 0-1 4-4 6" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-1 19.95A2 2 0 0 0 13 20v-1.5a2 2 0 0 1 2-2h1.5a10 10 0 0 0-4.5-14.5" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 12h2l2-7 3 14 3-10 2 6h2l2-3" />
    </svg>
  );
}

function FilmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8h20M2 16h20M8 4v16M16 4v16" />
    </svg>
  );
}

function RobotArmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-4M8 20h8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8V4M8.5 9.5L5.5 6.5M15.5 9.5l3-3" />
    </svg>
  );
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M5 12h3l2-3 3 6 2-3h4" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3l2-5h14l2 5v3a2 2 0 0 1-2 2M5 17v2M19 17v2" />
      <circle cx="7.5" cy="14.5" r="1.5" />
      <circle cx="16.5" cy="14.5" r="1.5" />
      <path d="M10 7l1-3M14 7l-1-3" />
    </svg>
  );
}

const aiApplications = [
  { icon: VisionIcon, name: "Computer Vision", examples: "Object detection, segmentation, facial recognition", image: "/images/gradient-blue.png" },
  { icon: LanguageIcon, name: "NLP & LLMs", examples: "Text generation, sentiment analysis, translation", image: "/images/gradient-purple.png" },
  { icon: PaletteIcon, name: "Image Generation", examples: "Stable Diffusion, DALL-E, style transfer", image: "/images/gradient-pink-cyan.png" },
  { icon: WaveformIcon, name: "Audio & Speech", examples: "Speech-to-text, music generation, voice cloning", image: "/images/gradient-orange-purple.png" },
  { icon: FilmIcon, name: "Video Analysis", examples: "Action recognition, tracking, generation", image: "/images/gradient-yellow-green.png" },
  { icon: RobotArmIcon, name: "Robotics & Control", examples: "Path planning, reinforcement learning", image: "/images/gradient-orange-pink.png" },
  { icon: HeartPulseIcon, name: "Medical AI", examples: "Diagnostics, drug discovery, medical imaging", image: "/images/gradient-pastel.png" },
  { icon: CarIcon, name: "Autonomous Systems", examples: "Self-driving, drone navigation, ADAS", image: "/images/gradient-abstract-blue.png" },
];

export default function GrysicsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Olyxee</span>
            </Link>
            <div className="h-4 w-px bg-neutral-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-neutral-900 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-neutral-900">Grysics</span>
              <span className="hidden sm:inline text-[10px] font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['Features', 'Benchmarks', 'How it works', 'Pricing'].map((item) => (
              <span key={item} className="px-3 py-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors cursor-default">{item}</span>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button className="px-4 py-1.5 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Log in
            </button>
            <button className="px-4 py-1.5 text-[13px] font-medium bg-neutral-900 text-white rounded-full hover:bg-black transition-colors">
              Sign up free
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-28 sm:pt-36 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20 -translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f0abfc 100%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.12] translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #67e8f9 0%, #6ee7b7 100%)' }} />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium border border-neutral-200/60">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Now in limited beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-6"
            >
              Verify your AI
              <br />
              <em className="text-neutral-400">before it breaks</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-500 leading-relaxed font-light mb-10 max-w-2xl mx-auto"
            >
              One command to test accuracy, latency, and memory across every target device. Catch failures before your users do.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <EarlyAccessForm />
              <p className="text-xs text-neutral-400 mt-3">Free during beta · No credit card required</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {[
              { icon: Shield, text: "Pre-deploy verification" },
              { icon: Zap, text: "12ms average check" },
              { icon: Cpu, text: "50+ hardware targets" },
              { icon: Layers, text: "PyTorch · TensorFlow · ONNX" },
              { icon: Lock, text: "SOC 2 compliant" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex items-center gap-2 text-[13px] text-neutral-400"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.text}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.06] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-4 block">Works with everything</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Any model. <em className="text-neutral-400">Any device.</em>
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl mx-auto">
              Vision, language, generative, audio — Grysics verifies it all on any hardware target.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  className="group relative rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl transition-all duration-500 cursor-default overflow-hidden bg-white"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={app.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">{app.name}</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-light">{app.examples}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-4 block">Developer-first</span>
              <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
                Three lines to <em className="text-neutral-400">verify</em>
              </h2>
              <p className="text-neutral-500 text-lg font-light leading-relaxed mb-8">
                Import, configure, verify. Grysics fits into your existing pipeline with a Python SDK, CLI, and CI/CD integrations. No complex setup.
              </p>
              <div className="flex flex-wrap gap-3">
                {['pip install grysics', 'GitHub Actions', 'Docker'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-xs font-mono border border-neutral-200/60">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
              <CodePreview />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 -translate-y-1/2 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.15] translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4 block">Performance</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Built for <em className="text-neutral-500">speed</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { value: 10, suffix: 'x', label: 'Faster verification', icon: TrendingUp },
              { value: 50, suffix: '+', label: 'Hardware targets', icon: Cpu },
              { value: 99, suffix: '.9%', label: 'Deploy reliability', icon: Shield },
              { value: 3, suffix: 'min', label: 'Avg. verify time', icon: Clock },
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
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
                >
                  <Icon className="w-5 h-5 text-neutral-500 mb-4 mx-auto" />
                  <div className="font-serif text-3xl sm:text-4xl italic text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-neutral-500">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { label: "Verification Speed", grysics: "12ms", others: "180ms", grysicsWidth: "7%", othersWidth: "100%" },
              { label: "Accuracy Retention", grysics: "99.2%", others: "92%", grysicsWidth: "99%", othersWidth: "92%" },
              { label: "Memory Efficiency", grysics: "245MB", others: "512MB", grysicsWidth: "48%", othersWidth: "100%" },
              { label: "Success Rate", grysics: "99.9%", others: "87%", grysicsWidth: "99%", othersWidth: "87%" },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="bg-white/[0.03] rounded-xl p-5 border border-white/5"
              >
                <p className="text-xs font-medium text-neutral-400 mb-3">{item.label}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 w-12">Grysics</span>
                    <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-white to-neutral-300 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.grysicsWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-neutral-900">{item.grysics}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-600 w-12">Others</span>
                    <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden">
                      <motion.div
                        className="h-full bg-white/10 rounded-md flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.othersWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <span className="text-[10px] font-bold text-neutral-500">{item.others}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06] -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-20">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-4 block">How it works</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Model to production <em className="text-neutral-400">in minutes</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Upload",
                description: "Drop in any AI model — PyTorch, TensorFlow, ONNX, TFLite. Grysics auto-detects architecture and dependencies.",
                icon: ArrowUpRight,
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                step: "02",
                title: "Verify",
                description: "Grysics tests accuracy, latency, memory, and edge cases across your target devices. Detailed pass/fail reports in minutes.",
                icon: Activity,
                gradient: "from-violet-500 to-purple-500",
              },
              {
                step: "03",
                title: "Ship",
                description: "Deploy only verified models. Continuous monitoring catches drift and regressions post-deploy automatically.",
                icon: Globe,
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  variants={fadeUp}
                  className="relative px-8 py-10 sm:border-l first:border-l-0 border-neutral-200"
                >
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest mb-2 block">Step {item.step}</span>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-neutral-50/80 border-y border-neutral-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-4 block">Detection</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              What Grysics <em className="text-neutral-400">catches</em>
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl mx-auto">
              Six categories of failures that silently break AI in production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: AlertTriangle, title: "Accuracy Degradation", description: "Detects when quantization or hardware conversion silently drops model accuracy below your thresholds.", severity: "Critical" },
              { icon: Clock, title: "Latency Violations", description: "Identifies operations that exceed real-time constraints on your target edge devices.", severity: "High" },
              { icon: Cpu, title: "Memory Overflows", description: "Catches models that exceed available RAM or VRAM on constrained hardware before deployment.", severity: "Critical" },
              { icon: BarChart3, title: "Numerical Instability", description: "Finds floating-point precision issues and NaN propagation that cause silent failures.", severity: "High" },
              { icon: GitBranch, title: "Framework Mismatches", description: "Validates that model exports preserve behavior across PyTorch, TF, and ONNX conversions.", severity: "Medium" },
              { icon: Zap, title: "Performance Bottlenecks", description: "Pinpoints layers and operations that consume disproportionate compute or energy.", severity: "Medium" },
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
                  className="group bg-white rounded-2xl p-7 border border-neutral-200/80 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      item.severity === 'Critical' ? 'bg-red-50 text-red-600' :
                      item.severity === 'High' ? 'bg-amber-50 text-amber-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-20 -translate-y-1/3 translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.15] translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-medium mb-8 border border-white/10 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Limited Beta
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Stop shipping
              <br />
              <em className="text-neutral-500">untested AI</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Join the waitlist. Be the first to verify your AI before it reaches production.
            </p>
            <div className="flex justify-center">
              <EarlyAccessForm dark />
            </div>
            <p className="text-xs text-neutral-600 mt-4">Join 500+ developers already on the waitlist</p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-neutral-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white/50" />
              </div>
              <span className="text-xs text-neutral-500 font-medium">Grysics</span>
              <span className="text-xs text-neutral-700">by Olyxee</span>
            </div>
            <div className="flex items-center gap-6">
              {['Docs', 'Status', 'Changelog', 'Privacy', 'Terms'].map((item) => (
                <span key={item} className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors cursor-default">{item}</span>
              ))}
            </div>
            <p className="text-xs text-neutral-700">&copy; {new Date().getFullYear()} Olyxee Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
