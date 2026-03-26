import { FC } from "react";
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
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white" />
        <div className="max-w-5xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6"
          >
            About Olyxee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Making AI systems
            <br />
            <span className="text-gray-400">reliable enough to trust.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-500 leading-relaxed max-w-3xl"
          >
            Olyxee is an AI infrastructure company focused on the hardest problem in modern AI:
            ensuring systems work reliably in the real world — not just in the lab.
          </motion.p>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
              >
                The Problem
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={1}
                variants={fadeUp}
                className="space-y-5 text-lg text-gray-600 leading-relaxed"
              >
                <p>
                  AI models achieve remarkable results in controlled environments. But when deployed
                  to real hardware — edge devices, IoT sensors, production servers — they fail in
                  unpredictable ways.
                </p>
                <p>
                  Models drift. Hardware constraints break assumptions. Latency spikes cause
                  cascading failures. The gap between "works in the notebook" and "works in
                  production" is where most AI projects die.
                </p>
              </motion.div>
            </div>
            <div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
              >
                Our Answer
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={1}
                variants={fadeUp}
                className="space-y-5 text-lg text-gray-600 leading-relaxed"
              >
                <p>
                  We build verification-first infrastructure. Every component in the Olyxee stack
                  is designed around a core principle: AI systems should be proven correct before
                  they're deployed, and continuously monitored after.
                </p>
                <p>
                  There's no standard infrastructure for this today — no reliable way to test
                  across heterogeneous hardware, and no systematic approach to post-deployment
                  correctness. We're building it.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Verification-first AI infrastructure
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Pre-deployment Verification", description: "Rigorous automated testing across target hardware configurations. Models are proven correct before they reach a single device." },
              { icon: Globe, title: "Hardware Abstraction", description: "One pipeline for every device — from $5 microcontrollers to GPU clusters. Write once, deploy anywhere." },
              { icon: Cpu, title: "Edge-Native Runtime", description: "Built for resource-constrained environments where reliability matters most. Optimized inference for real-world hardware." },
              { icon: Target, title: "Continuous Monitoring", description: "Runtime observability that detects drift, degradation, and anomalies — with automated rollback when thresholds are breached." },
              { icon: Zap, title: "Automatic Optimization", description: "Quantization, pruning, and hardware-specific tuning that maintain accuracy while dramatically reducing compute requirements." },
              { icon: Eye, title: "Full Observability", description: "Every deployment is tracked, every inference is logged, every failure is explained. Complete transparency across the stack." },
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-colors"
                >
                  <Icon className="w-7 h-7 text-gray-300 mb-5" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">By the numbers</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for scale</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Hardware targets supported" },
              { number: "<10ms", label: "Average verification latency" },
              { number: "99.97%", label: "Deployment success rate" },
              { number: "5", label: "Supported ML frameworks" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="text-center sm:text-left"
              >
                <p className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-2">{stat.number}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Our values</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What drives us</h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-gray-200">
            {[
              {
                title: "Reliability over novelty",
                description: "The most important advances in AI won't come from making models bigger — they'll come from making models more reliable. We optimize for correctness, not hype.",
              },
              {
                title: "Transparency by default",
                description: "Every deployment should be explainable. Every failure should be traceable. We build systems where engineers can understand exactly what happened and why.",
              },
              {
                title: "Hardware is a first-class citizen",
                description: "Software that ignores hardware fails in production. We design every component with physical constraints in mind — power, memory, thermals, latency.",
              },
              {
                title: "Fail gracefully, recover automatically",
                description: "Systems will fail. What matters is how they fail. We build infrastructure that degrades predictably and recovers without human intervention.",
              },
              {
                title: "Open foundations",
                description: "Critical infrastructure should be open. We publish our research, open-source our tools, and contribute to the ecosystem that makes AI deployment better for everyone.",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={idx}
                variants={fadeUp}
                className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
              >
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="sm:col-span-2 text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Our thinking</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Philosophy</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <blockquote className="text-2xl sm:text-3xl font-medium text-gray-900 leading-snug mb-8 border-l-4 border-gray-900 pl-6">
              "The companies that win in AI will be the ones whose systems work consistently,
              fail gracefully, and can be understood by the engineers who deploy them."
            </blockquote>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Olyxee exists to build the infrastructure layer that makes this possible. We're not
              building another model. We're building the foundation that every model needs to work
              in the real world.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This means investing in verification research, building hardware-aware tooling, and
              creating deployment systems that are rigorous enough for safety-critical applications —
              while remaining simple enough for any engineering team to adopt.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Join us in building reliable AI
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              We're looking for engineers who want to solve hard problems in AI reliability,
              distributed systems, and edge deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all">
                View Open Roles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all">
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
