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
    title: "Hardware diversity",
    description: "Exploring how intelligent systems might work across different edge devices and hardware constraints.",
  },
  {
    icon: Gauge,
    title: "Efficient computation",
    description: "Researching how computational approaches can adapt to the resource limits of real-world systems.",
  },
  {
    icon: Radio,
    title: "Distributed coordination",
    description: "Investigating how distributed systems and intelligent agents can coordinate across connected environments.",
  },
  {
    icon: Shield,
    title: "Trust and governance",
    description: "Considering security, oversight and governance as essential questions for intelligence operating in real environments.",
  },
  {
    icon: Layers,
    title: "Systems of models",
    description: "Exploring how machine intelligence components might work together within larger systems.",
  },
  {
    icon: Server,
    title: "Connected environments",
    description: "Studying how local and cloud-based systems can share context while operating across different environments.",
  },
];

const hardwareGradients = [
  "/images/gradient-blue.webp",
  "/images/gradient-pastel.webp",
  "/images/gradient-yellow-green.webp",
  "/images/gradient-blue-pink.webp",
  "/images/gradient-orange-purple.webp",
  "/images/gradient-purple.webp",
  "/images/gradient-pink-cyan.webp",
  "/images/gradient-abstract-blue.webp",
];

const supportedHardware = [
  { name: "NVIDIA Jetson", category: "GPU platform" },
  { name: "Raspberry Pi", category: "SBC platform" },
  { name: "Arduino", category: "MCU platform" },
  { name: "ESP32", category: "MCU platform" },
  { name: "Intel NUC", category: "x86 platform" },
  { name: "Google Coral", category: "TPU platform" },
  { name: "Qualcomm RB5", category: "SoC platform" },
  { name: "BeagleBone", category: "SBC platform" },
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
        title="Edge Systems Research | Olyxee"
        description="Olyxee explores edge systems as part of its broader research into Organizational Intelligence and coordination across complex environments."
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
              <span className="text-sm font-medium text-white/70 tracking-widest uppercase">Olyxee · Edge Systems Research</span>
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
              Edge systems research
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.08] tracking-tight mb-5"
          >
            Exploring intelligence
            <br />
            <em className="text-neutral-400">in complex environments</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg text-neutral-500 max-w-xl leading-relaxed font-normal mb-10"
          >
            Olyxee is exploring how machine intelligence can operate across real-world systems. This work is one research direction within our broader effort toward Organizational Intelligence—not a solved capability or a separate execution division.
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
              Explore our research <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://orgni.olyxee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-neutral-600 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 hover:text-neutral-900 transition-all text-sm"
            >
              Try Orgni
            </a>
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
              alt="Illustration of edge computing systems in real-world environments"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <p className="text-white/90 text-base sm:text-lg font-medium">Intelligence in real-world systems</p>
              <p className="text-white/50 text-sm mt-1.5 max-w-xl font-normal">We are exploring how machine intelligence can work within complex environments and operational systems.</p>
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
              How this research connects to <em className="text-neutral-400">Olyxee</em>
            </h2>
            <p className="text-lg text-neutral-400 font-normal max-w-xl mx-auto">
              Different parts of our work, from long-term research to software used in practice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Olyxee",
                role: "Research & technology",
                description: "Researching the foundations of Organizational Intelligence and how organizations might learn, adapt and improve.",
                bg: "/images/gradient-blue.webp",
              },
              {
                label: "Research",
                role: "Edge systems",
                description: "Exploring how machine intelligence may operate across devices and complex real-world environments.",
                highlight: true,
              },
              {
                label: "Orgni",
                role: "Organizational work",
                description: "An intelligence layer for everyday organizational work and an applied environment for Olyxee's research.",
                bg: "/images/gradient-yellow-green.webp",
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
                  <p className={`text-[15px] leading-relaxed font-normal ${item.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
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
              Edge systems <em className="text-neutral-400">research</em>
            </h2>
            <p className="text-lg text-neutral-500 font-normal max-w-xl mx-auto">
              Areas we are exploring as part of research into machine intelligence in real-world systems.
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
                  <p className="text-sm text-neutral-500 leading-relaxed font-normal">{cap.description}</p>
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
              Hardware <em className="text-neutral-400">examples</em>
            </h2>
            <p className="text-neutral-400 text-lg font-normal max-w-2xl mx-auto">
              These examples represent hardware platforms relevant to edge systems research; they are not a statement of product support.
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
                Explore intelligence
                <br />
                <em className="text-neutral-400">in real systems</em>
              </h2>
              <p className="text-neutral-500 text-lg mb-12 font-normal leading-relaxed">
                We are investigating how machine intelligence can operate across real-world systems and contribute to the wider Organizational Intelligence research direction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/developers"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm"
                >
                  Explore Olyxee <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
