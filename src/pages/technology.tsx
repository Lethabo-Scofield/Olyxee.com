import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Shield, Cpu, Zap, GitBranch, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Technology: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Technology" description="The architecture powering Olyxee's Grysics platform. Learn about our verification pipeline, hardware abstraction, and deployment infrastructure." path="/technology" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Technology</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            How Olyxee
            <br />
            <em className="text-neutral-400">works</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Built on Grysics — our verification engine for AI deployment. It handles the entire
            lifecycle from model verification to production monitoring.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-20">
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-4">
              Grysics <em className="text-neutral-500">Architecture</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-3xl font-light leading-relaxed">
              The verification engine and infrastructure layer powering Olyxee's AI deployment platform.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, title: "Verification Pipeline", description: "Automated testing that validates model correctness across target hardware configurations before deployment." },
              { icon: Layers, title: "Hardware Abstraction", description: "A unified deployment interface that abstracts away device-specific complexity. Write once, deploy anywhere." },
              { icon: BarChart3, title: "Runtime Monitoring", description: "Continuous observability for deployed models — tracking accuracy drift, latency, and resource usage." },
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
              The deployment <em className="text-neutral-400">pipeline</em>
            </h2>
          </motion.div>
          <div className="divide-y divide-neutral-200 max-w-3xl">
            {[
              { step: "01", title: "Model Ingestion", description: "Import from any framework — PyTorch, TensorFlow, ONNX. Grysics automatically analyzes architecture and dependencies.", icon: GitBranch },
              { step: "02", title: "Verification", description: "Comprehensive tests against target hardware profiles. Identify accuracy degradation, latency bottlenecks, and edge cases.", icon: Shield },
              { step: "03", title: "Optimization", description: "Automatic quantization and runtime optimization tuned for your target hardware.", icon: Cpu },
              { step: "04", title: "Deployment", description: "One-click deployment to any supported device. Grysics handles containerization and configuration.", icon: Zap },
              { step: "05", title: "Monitoring", description: "Real-time observability with drift detection, anomaly alerts, and automated rollback.", icon: BarChart3 },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="py-8 flex flex-col sm:grid sm:grid-cols-[auto_auto_1fr] gap-4 sm:gap-6 items-start">
                  <div className="flex items-center gap-3 sm:contents">
                    <span className="text-xs font-mono text-neutral-400 mt-1">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-neutral-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-neutral-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-12">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Supported <em className="text-neutral-400">hardware</em>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-start gap-10 sm:gap-14">
            {[
              { src: "/hardware-logos/NVIDIA-logo-BL_thmb.jpg", alt: "NVIDIA Jetson" },
              { src: "/hardware-logos/arduino-logo.png", alt: "Arduino" },
              { src: "/hardware-logos/raspberrypi.png", alt: "Raspberry Pi" },
              { src: "/hardware-logos/intel.jpg", alt: "Intel" },
              { src: "/hardware-logos/ESP32.png", alt: "ESP32" },
            ].map((logo, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src={logo.src} alt={logo.alt} width={48} height={48} unoptimized className="object-contain w-auto h-auto max-w-[48px] max-h-[48px] filter grayscale opacity-40" />
                </div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">{logo.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
              Start building <em className="text-neutral-400">with Grysics</em>
            </h2>
            <Link href="/developers" className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Technology;
