import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, Cpu, Target, Zap, Eye } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="About" description="Learn about Olyxee's mission to build reliable AI infrastructure. Our team is dedicated to AI safety, verification, and making deployment trustworthy." path="/about" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs font-medium mb-6 uppercase tracking-widest"
            >
              About Olyxee
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.1]"
            >
              Making AI systems
              <br />
              <em className="text-neutral-400">reliable enough to trust.</em>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-3xl font-light"
          >
            Olyxee is an AI infrastructure company focused on the hardest problem in modern AI:
            ensuring systems work reliably in the real world — not just in the lab.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { title: "The Problem", bg: "/images/gradient-blue-pink.png", texts: [
                "AI models achieve remarkable results in controlled environments. But when deployed to real hardware — edge devices, IoT sensors, production servers — they fail in unpredictable ways.",
                "Models drift. Hardware constraints break assumptions. Latency spikes cause cascading failures. The gap between \"works in the notebook\" and \"works in production\" is where most AI projects die."
              ]},
              { title: "Our Answer", bg: "/images/gradient-yellow-green.png", texts: [
                "We build verification-first infrastructure. Every component in the Olyxee stack is designed around a core principle: AI systems should be proven correct before they're deployed, and continuously monitored after.",
                "There's no standard infrastructure for this today — no reliable way to test across heterogeneous hardware, and no systematic approach to post-deployment correctness. We're building it."
              ]},
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl p-10 sm:p-12 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${card.bg}")` }} />
                <div className="absolute inset-0 bg-white/82 backdrop-blur-sm" />
                <div className="relative">
                  <span className="accent-line" />
                  <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6">{card.title}</h2>
                  <div className="space-y-5 text-lg text-neutral-600 leading-relaxed font-light">
                    {card.texts.map((t, i) => <p key={i}>{t}</p>)}
                  </div>
                </div>
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
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-20"
          >
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Verification-first
              <br />
              <em className="text-neutral-500">AI infrastructure</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, title: "Pre-deployment Verification", description: "Rigorous automated testing across target hardware. Models are proven correct before they reach a single device." },
              { icon: Globe, title: "Hardware Abstraction", description: "One pipeline for every device — from $5 microcontrollers to GPU clusters. Write once, deploy anywhere." },
              { icon: Cpu, title: "Edge-Native Runtime", description: "Built for resource-constrained environments. Optimized inference for real-world hardware." },
              { icon: Target, title: "Continuous Monitoring", description: "Observability that detects drift and anomalies — with automated rollback when thresholds are breached." },
              { icon: Zap, title: "Automatic Optimization", description: "Quantization, pruning, and hardware-specific tuning that maintain accuracy while reducing compute." },
              { icon: Eye, title: "Full Observability", description: "Every deployment tracked, every inference logged, every failure explained. Complete transparency." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                  className="bg-neutral-950 p-10 hover:bg-white/[0.03] transition-colors"
                >
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-20"
          >
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Built for <em className="text-neutral-400">scale</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: "50+", label: "Hardware targets", bg: "/images/gradient-blue.png" },
              { number: "<10ms", label: "Verification latency", bg: "/images/gradient-pastel.png" },
              { number: "99.97%", label: "Deployment success", bg: "/images/gradient-orange-purple.png" },
              { number: "5", label: "ML frameworks", bg: "/images/gradient-yellow-green.png" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${stat.bg}")` }} />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
                <div className="relative">
                  <p className="text-4xl sm:text-5xl font-serif italic text-neutral-900 mb-2">{stat.number}</p>
                  <p className="text-sm text-neutral-500 uppercase tracking-widest font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              What drives <em className="text-neutral-400">us</em>
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-200">
            {[
              { title: "Reliability over novelty", description: "The most important advances in AI won't come from making models bigger — they'll come from making models more reliable." },
              { title: "Transparency by default", description: "Every deployment should be explainable. Every failure should be traceable. Engineers should understand exactly what happened and why." },
              { title: "Hardware is a first-class citizen", description: "Software that ignores hardware fails in production. We design every component with physical constraints in mind." },
              { title: "Fail gracefully, recover automatically", description: "Systems will fail. We build infrastructure that degrades predictably and recovers without human intervention." },
              { title: "Open foundations", description: "Critical infrastructure should be open. We publish our research, open-source our tools, and contribute to the ecosystem." },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="py-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10"
              >
                <h3 className="text-xl font-semibold text-neutral-900">{value.title}</h3>
                <p className="sm:col-span-2 text-neutral-500 leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="accent-line" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <blockquote className="font-serif text-3xl sm:text-4xl text-neutral-900 leading-snug mb-10 italic">
              "The companies that win in AI will be the ones whose systems work consistently,
              fail gracefully, and can be understood by the engineers who deploy them."
            </blockquote>
            <p className="text-lg text-neutral-500 leading-relaxed font-light mb-5">
              Olyxee exists to build the infrastructure layer that makes this possible. We're not
              building another model. We're building the foundation that every model needs.
            </p>
            <p className="text-lg text-neutral-500 leading-relaxed font-light">
              This means investing in verification research, building hardware-aware tooling, and
              creating deployment systems rigorous enough for safety-critical applications — while
              remaining simple enough for any team to adopt.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Join us in building
              <br />
              <em className="text-neutral-500">reliable AI</em>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              We're looking for engineers who want to solve hard problems in AI reliability,
              distributed systems, and edge deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
