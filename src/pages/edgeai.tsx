import { FC, useState, useEffect } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Radio, Server, Layers, CircuitBoard, Shield, Gauge, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const capabilities = [
  {
    icon: CircuitBoard,
    title: "Hardware Abstraction",
    description: "Deploy to any edge device — NVIDIA Jetson, Raspberry Pi, Arduino, ESP32 — with a single unified pipeline. No device-specific rewrites.",
  },
  {
    icon: Gauge,
    title: "Runtime Optimization",
    description: "Automatic quantization, pruning, and compilation tailored to each target device. Maximum performance from minimum resources.",
  },
  {
    icon: Radio,
    title: "Fleet Orchestration",
    description: "Manage thousands of edge devices from a single control plane. Over-the-air updates, version control, and rollback across your entire fleet.",
  },
  {
    icon: Shield,
    title: "Secure Execution",
    description: "Encrypted model delivery, secure enclaves, and tamper detection. Your models stay protected from device to cloud.",
  },
  {
    icon: Layers,
    title: "Multi-Model Pipelines",
    description: "Chain multiple models on a single device — preprocessing, inference, and postprocessing — orchestrated as one coherent pipeline.",
  },
  {
    icon: Server,
    title: "Edge-Cloud Sync",
    description: "Seamless data flow between edge and cloud. Local inference with cloud fallback, telemetry aggregation, and continuous learning loops.",
  },
];

const hardwareGradients = [
  "/images/gradient-blue.png",
  "/images/gradient-pastel.png",
  "/images/gradient-yellow-green.png",
  "/images/gradient-blue-pink.png",
  "/images/gradient-orange-purple.png",
  "/images/gradient-purple.png",
  "/images/gradient-pink-cyan.png",
  "/images/gradient-abstract-blue.png",
];

const supportedHardware = [
  { name: "NVIDIA Jetson", category: "GPU" },
  { name: "Raspberry Pi", category: "SBC" },
  { name: "Arduino", category: "MCU" },
  { name: "ESP32", category: "MCU" },
  { name: "Intel NUC", category: "x86" },
  { name: "Google Coral", category: "TPU" },
  { name: "Qualcomm RB5", category: "SoC" },
  { name: "BeagleBone", category: "SBC" },
];

const EdgeAI: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="EdgeAI — Olyxee Edge Box"
        description="Olyxee Edge Box (OEB) is our execution division — deploying AI into real-world systems across edge devices, factories, and autonomous platforms."
        path="/edgeai"
      />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full blur-[60px] opacity-30"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 30%, #f97316 60%, #eab308 100%)' }}
              />
              <Image
                src="/Logo/OEB_Logo.png"
                alt="OEB"
                width={80}
                height={80}
                className="relative z-10 drop-shadow-2xl rounded-2xl"
                style={{ width: 80, height: 'auto' }}
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <span className="text-sm font-medium text-white/70 tracking-widest uppercase">Olyxee Edge Box</span>
              <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-orange-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grain" />
      <Header />

      <section className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium mb-8 border border-neutral-200/60">
              <Box className="w-3.5 h-3.5" />
              Olyxee Edge Box
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.08] tracking-tight mb-5"
          >
            AI that runs
            <br />
            <em className="text-neutral-400">in the real world</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg text-neutral-500 max-w-xl leading-relaxed font-light mb-10"
          >
            Olyxee Edge Box (OEB) is our execution division — the hands of Olyxee.
            We take AI from the lab and deploy it into the real world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/docs"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm"
            >
              Explore OEB <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/products/grysics"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-600 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 hover:text-neutral-900 transition-all text-sm"
            >
              Verify with Grysics
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full rounded-3xl overflow-hidden"
          >
            <img
              src="/images/edge-ai-grid.png"
              alt="AI-powered computer vision across real-world environments — object detection, pose estimation, anomaly detection, and scene analysis running on edge devices"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <p className="text-white/90 text-base sm:text-lg font-medium">Computer vision at the edge</p>
              <p className="text-white/50 text-sm mt-1.5 max-w-xl font-light">Object detection, pose estimation, anomaly detection, and scene analysis — deployed across industrial, automotive, and public safety environments.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-20 sm:mb-28"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5">
              How OEB fits into <em className="text-neutral-400">Olyxee</em>
            </h2>
            <p className="text-lg text-neutral-400 font-light max-w-xl mx-auto">
              Three layers working together to deliver trustworthy AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Olyxee",
                role: "The Brain",
                description: "Defines vision, conducts research, and builds core AI capabilities. Strategy and intelligence originate here.",
                bg: "/images/gradient-blue.png",
              },
              {
                label: "OEB",
                role: "The Hands",
                description: "Deploys AI into real-world systems. Takes models from lab to production across edge hardware at scale.",
                highlight: true,
              },
              {
                label: "Grysics",
                role: "Quality Control",
                description: "Verifies AI works correctly before and after deployment. The trust layer that ensures reliability.",
                bg: "/images/gradient-yellow-green.png",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className={`group p-10 sm:p-12 rounded-3xl relative overflow-hidden min-h-[280px] flex flex-col justify-end ${item.highlight ? "bg-neutral-900 text-white" : ""}`}
              >
                {!item.highlight && item.bg && (
                  <>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${item.bg}")` }} />
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm group-hover:bg-white/75 transition-all duration-500" />
                  </>
                )}
                <div className="relative">
                  <span className={`text-[10px] font-semibold uppercase tracking-widest ${item.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
                    {item.label}
                  </span>
                  <h3 className={`text-2xl tracking-tight mt-3 mb-3 ${item.highlight ? "text-white" : "text-neutral-900"}`}>
                    {item.role}
                  </h3>
                  <p className={`text-[15px] leading-relaxed font-light ${item.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-20 sm:mb-28"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-5">
              Edge <em className="text-neutral-400">capabilities</em>
            </h2>
            <p className="text-lg text-neutral-500 font-light max-w-xl mx-auto">
              Everything you need to run AI at the edge, built in.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 rounded-3xl overflow-hidden">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  variants={fadeUp}
                  className="bg-[#fafafa] p-10 sm:p-12 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 text-neutral-400 mb-6" />
                  <h3 className="text-lg tracking-tight text-neutral-900 mb-3">{cap.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-20 sm:mb-28"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5">
              Supported <em className="text-neutral-400">hardware</em>
            </h2>
            <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto">
              One pipeline, any device. OEB abstracts hardware differences so you write your model once and deploy everywhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {supportedHardware.map((hw, idx) => (
              <motion.div
                key={hw.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="group rounded-3xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-500 relative overflow-hidden min-h-[140px] flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${hardwareGradients[idx]}")` }} />
                <div className="absolute inset-0 bg-white/82 backdrop-blur-sm group-hover:bg-white/75 transition-all duration-500" />
                <div className="relative">
                  <Cpu className="w-5 h-5 text-neutral-400 mb-4" />
                  <h3 className="text-sm tracking-tight text-neutral-900">{hw.name}</h3>
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mt-1 block">
                    {hw.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-8">
                Deploy AI
                <br />
                <em className="text-neutral-400">at the edge</em>
              </h2>
              <p className="text-neutral-500 text-lg mb-12 font-light leading-relaxed">
                Get your models running on real hardware in minutes. OEB handles the infrastructure — you focus on the intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/developers"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm"
                >
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-600 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 hover:text-neutral-900 transition-all text-sm"
                >
                  Read the Docs
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src="/images/edge-ai-server.png"
                alt="Engineer managing edge infrastructure in a server room"
                className="w-full h-auto rounded-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EdgeAI;
