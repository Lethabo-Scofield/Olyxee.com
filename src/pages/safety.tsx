import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, Shield, AlertTriangle, Eye, RotateCcw, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Safety: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Safety & Reliability</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Reliable before
            <br />
            <em className="text-neutral-400">useful</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Our approach to safety is grounded in engineering rigor — not aspirational principles.
            We build systems that detect, prevent, and recover from AI failures.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-20">
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Reliability
              <br />
              <em className="text-neutral-500">principles</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, title: "Pre-Deployment Verification", description: "Rigorous automated testing against target hardware. Models are proven correct before they reach any device." },
              { icon: AlertTriangle, title: "Failure Detection", description: "Real-time monitoring that identifies drift, anomalous predictions, and degradation before they become critical." },
              { icon: Eye, title: "Explainability", description: "Interpretable pathways into AI decision-making. Understand why a model made a specific prediction." },
              { icon: RotateCcw, title: "Automated Recovery", description: "Automatic rollback to known-good states with operator notifications and diagnostic information." },
              { icon: CheckCircle, title: "Deployment Guarantees", description: "Formal accuracy and latency guarantees for deployed models, continuously verified over time." },
              { icon: Lock, title: "Secure by Default", description: "Model encryption, secure deployment channels, and access control built into every layer." },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="accent-line" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-10">
              Why this <em className="text-neutral-400">matters</em>
            </h2>
            <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-light">
              <p>
                AI systems are being deployed in safety-critical applications — from medical devices
                to autonomous vehicles to industrial control systems. A model that works 99% of the time
                will fail thousands of times at scale.
              </p>
              <p>
                Traditional software engineering has decades of established practices for reliability.
                AI systems need the same rigor, adapted for non-deterministic behavior,
                data distribution shift, and hardware-dependent performance.
              </p>
              <p>
                Olyxee builds this missing infrastructure layer. We focus on the immediate, practical
                challenge of making today's AI systems reliable enough to deploy with confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900 mb-6">
              Learn more about
              <br />
              <em className="text-neutral-400">our approach</em>
            </h2>
            <Link href="/research" className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm tracking-wide">
              View Research <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Safety;
