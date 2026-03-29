import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Cpu, Radio, Server, Layers, CircuitBoard, Shield, Gauge, Box } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
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
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="EdgeAI — Olyxee Edge Box"
        description="Olyxee Edge Box (OEB) is our execution division — deploying AI into real-world systems across edge devices, factories, and autonomous platforms."
        path="/edgeai"
      />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-7 h-7 bg-neutral-900 rounded-lg flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
              Olyxee Edge Box
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8"
          >
            AI that runs
            <br />
            <em className="text-neutral-400">in the real world</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light"
          >
            Olyxee Edge Box (OEB) is our execution division — the hands of Olyxee.
            We take AI from the lab and deploy it into factories, vehicles, devices,
            and every environment where intelligence needs to operate at the edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide"
            >
              Deploy Your First Model <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products/grysics"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Verify with Grysics <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              How OEB fits into <em className="text-neutral-400">Olyxee</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              {
                label: "Olyxee",
                role: "The Brain",
                description: "Defines vision, conducts research, and builds core AI capabilities. Strategy and intelligence originate here.",
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
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className={`p-10 sm:p-12 ${item.highlight ? "bg-neutral-900 text-white" : "bg-white"}`}
              >
                <span className={`text-xs font-medium uppercase tracking-widest ${item.highlight ? "text-neutral-400" : "text-neutral-400"}`}>
                  {item.label}
                </span>
                <h3 className={`text-2xl font-semibold mt-3 mb-3 ${item.highlight ? "text-white" : "text-neutral-900"}`}>
                  {item.role}
                </h3>
                <p className={`text-sm leading-relaxed ${item.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-20"
          >
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Edge
              <br />
              <em className="text-neutral-500">capabilities</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
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
                  className="bg-neutral-950 p-10 hover:bg-white/[0.03] transition-colors"
                >
                  <Icon className="w-6 h-6 text-neutral-500 mb-5" />
                  <h3 className="text-lg font-semibold mb-3">{cap.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Supported <em className="text-neutral-400">hardware</em>
            </h2>
            <p className="text-neutral-500 mt-4 text-lg font-light max-w-2xl">
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
                className="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 hover:shadow-sm transition-all"
              >
                <Cpu className="w-5 h-5 text-neutral-400 mb-4" />
                <h3 className="text-sm font-semibold text-neutral-900">{hw.name}</h3>
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mt-1 block">
                  {hw.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Deploy AI
              <br />
              <em className="text-neutral-500">at the edge</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Get your models running on real hardware in minutes. OEB handles the infrastructure — you focus on the intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide"
              >
                Read the Docs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EdgeAI;
