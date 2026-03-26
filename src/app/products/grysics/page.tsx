'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight, Shield, Cpu, BarChart3, Zap, GitBranch, Layers } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function LiveDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const nodes = [
      { x: 0.18, y: 0.25, label: 'Model', r: 28 },
      { x: 0.50, y: 0.15, label: 'Verify', r: 28 },
      { x: 0.82, y: 0.25, label: 'Optimize', r: 28 },
      { x: 0.50, y: 0.50, label: 'Grysics', r: 36 },
      { x: 0.18, y: 0.75, label: 'Edge', r: 28 },
      { x: 0.50, y: 0.85, label: 'Monitor', r: 28 },
      { x: 0.82, y: 0.75, label: 'Deploy', r: 28 },
    ];

    const edges = [
      [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [3, 6],
      [0, 1], [1, 2], [4, 5], [5, 6],
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.008;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const pts = nodes.map(n => ({
        x: n.x * w,
        y: n.y * h + Math.sin(time * 1.2 + n.x * 6) * 4,
        label: n.label,
        r: n.r,
      }));

      edges.forEach(([a, b], i) => {
        const pa = pts[a];
        const pb = pts[b];
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = 'rgba(163,163,163,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const pulse = (time * 0.6 + i * 0.3) % 1;
        const px = pa.x + (pb.x - pa.x) * pulse;
        const py = pa.y + (pb.y - pa.y) * pulse;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,163,163,${0.5 - pulse * 0.4})`;
        ctx.fill();
      });

      pts.forEach((p, i) => {
        const isCenter = i === 3;
        const glow = Math.sin(time * 2 + i) * 0.15 + 0.85;

        if (isCenter) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(23,23,23,${0.04 * glow})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isCenter ? `rgba(23,23,23,${0.95 * glow})` : `rgba(245,245,245,${glow})`;
        ctx.fill();
        ctx.strokeStyle = isCenter ? 'rgba(23,23,23,0.3)' : 'rgba(163,163,163,0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = `${isCenter ? '600 13' : '500 11'}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isCenter ? 'rgba(255,255,255,0.95)' : 'rgba(115,115,115,0.9)';
        ctx.fillText(p.label, p.x, p.y);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function GrysicsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
                <span className="accent-dot" />
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Grysics</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-7xl text-neutral-900 tracking-tight leading-[1.05] mb-8">
                Verification
                <br />
                <em className="text-neutral-400">engine for AI</em>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-xl font-light mb-10">
                Test AI models against real hardware profiles before deployment.
                Catch failures before they reach production.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
                <Link href="/developers" className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/research" className="inline-flex items-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide">
                  Read the Paper
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-square max-w-[480px] mx-auto w-full"
            >
              <LiveDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-20">
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              What Grysics
              <br />
              <em className="text-neutral-500">does</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, title: "Pre-Deploy Verification", description: "Automated testing against target hardware configurations. Models are proven correct before they ship." },
              { icon: Cpu, title: "Adaptive Quantization", description: "Automatic model compression tuned to hardware constraints while maintaining accuracy guarantees." },
              { icon: GitBranch, title: "Multi-Framework Import", description: "Import from PyTorch, TensorFlow, ONNX. Grysics analyzes architecture and dependencies automatically." },
              { icon: BarChart3, title: "Performance Profiling", description: "Detailed latency, memory, and power analysis across every hardware target in your fleet." },
              { icon: Layers, title: "Hardware Abstraction", description: "Write verification once, run it against any supported edge device — from Jetson to Raspberry Pi." },
              { icon: Zap, title: "CI/CD Integration", description: "Plug into your existing pipeline. Block deployments that fail verification. Automate everything." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-neutral-950 p-10 hover:bg-white/[0.03] transition-colors">
                  <Icon className="w-6 h-6 text-neutral-500 mb-5" />
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              How it <em className="text-neutral-400">works</em>
            </h2>
          </motion.div>
          <div className="divide-y divide-neutral-200 max-w-3xl">
            {[
              { step: "01", title: "Import your model", description: "Load from any framework. Grysics reads the computational graph and maps dependencies." },
              { step: "02", title: "Define hardware targets", description: "Select from supported devices or define custom hardware profiles with resource constraints." },
              { step: "03", title: "Run verification", description: "Grysics tests accuracy, latency, memory usage, and edge cases across every target." },
              { step: "04", title: "Review results", description: "Get a detailed report with pass/fail status, performance metrics, and optimization suggestions." },
              { step: "05", title: "Deploy with confidence", description: "Ship only verified models. Grysics guarantees they'll work on the target hardware." },
            ].map((item, idx) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="py-8 grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="text-xs font-mono text-neutral-400 mt-1">{item.step}</span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Built for <em className="text-neutral-400">real workloads</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              { value: "10x", label: "Faster than manual testing", description: "Automated verification runs in minutes, not weeks." },
              { value: "99.9%", label: "Deployment reliability", description: "Models that pass Grysics verification work in production." },
              { value: "50+", label: "Hardware targets", description: "From NVIDIA Jetson to Raspberry Pi to custom silicon." },
            ].map((stat, idx) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-10 sm:p-12">
                <span className="font-serif text-5xl sm:text-6xl italic text-neutral-900">{stat.value}</span>
                <h3 className="text-sm font-semibold text-neutral-900 mt-4 mb-2">{stat.label}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Stop shipping
              <br />
              <em className="text-neutral-500">untested models</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Grysics catches deployment failures before they reach your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/developers" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
