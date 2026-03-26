import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Atom, Brain, Microscope, Lightbulb, Shapes, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const researchAreas = [
  {
    icon: Brain,
    title: "Frontier Model Research",
    description: "Pushing the boundaries of what AI systems can understand, reason about, and generate. We explore novel architectures and training paradigms.",
    status: "Active",
  },
  {
    icon: Atom,
    title: "AI Safety & Alignment",
    description: "Developing methods to ensure AI systems behave as intended. Mechanistic interpretability, reward modeling, and formal verification of AI behavior.",
    status: "Active",
  },
  {
    icon: Microscope,
    title: "Interpretability",
    description: "Understanding how neural networks represent and process information internally. Making the black box transparent without sacrificing capability.",
    status: "Active",
  },
  {
    icon: Lightbulb,
    title: "Efficient Intelligence",
    description: "Building AI systems that achieve more with less — smaller models, fewer parameters, lower energy. Intelligence shouldn't require a data center.",
    status: "Active",
  },
  {
    icon: Shapes,
    title: "Multimodal Reasoning",
    description: "Systems that can perceive, reason across, and generate content spanning text, vision, audio, and structured data simultaneously.",
    status: "Exploring",
  },
  {
    icon: Sparkles,
    title: "Emergent Capabilities",
    description: "Studying how complex behaviors arise from simple training objectives. Understanding and predicting capability jumps in scaled systems.",
    status: "Exploring",
  },
];

const recentWork = [
  {
    title: "On the Geometry of Concept Representation in Language Models",
    date: "2025",
    area: "Interpretability",
    description: "We show that high-level concepts in transformer models form predictable geometric structures, enabling targeted concept editing without retraining.",
  },
  {
    title: "Verification-First Deployment for Edge AI Systems",
    date: "2025",
    area: "AI Safety",
    description: "A framework for systematic pre-deployment verification of AI models targeting heterogeneous edge hardware.",
  },
  {
    title: "Sparse Attention Is All You Need: Efficient Transformers for Resource-Constrained Environments",
    date: "2025",
    area: "Efficient Intelligence",
    description: "We demonstrate that structured sparse attention patterns can match dense attention quality at 40% of the compute budget.",
  },
  {
    title: "Failure Mode Taxonomy for Deployed AI Systems",
    date: "2024",
    area: "AI Safety",
    description: "A comprehensive classification of how AI systems fail in production, with detection signatures and mitigation strategies for each mode.",
  },
];

const Lab: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Olyxee Lab — Research" description="Olyxee Lab is our research division exploring the frontiers of AI safety, interpretability, and efficient intelligence. Read our latest publications." path="/lab" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-8">
            <Image src="/Logo/olyxee-lab-logo.png" alt="Olyxee Lab" width={28} height={28} className="rounded" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Olyxee Lab</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Exploring the frontiers
            <br />
            <em className="text-neutral-400">of intelligence</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Olyxee Lab is our research division — dedicated to advancing the science of
            artificial intelligence. We work on fundamental problems in AI safety,
            interpretability, and capability, and publish our findings openly.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neutral-800 rounded-full blur-[150px] opacity-30 -translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-20">
            <span className="block w-12 h-0.5 bg-white/30 mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Research
              <br />
              <em className="text-neutral-500">areas</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {researchAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <motion.div key={area.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-neutral-950 p-10 hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-start justify-between mb-5">
                    <Icon className="w-6 h-6 text-neutral-500" />
                    <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border ${area.status === "Active" ? "text-neutral-400 border-neutral-700" : "text-neutral-600 border-neutral-800"}`}>
                      {area.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{area.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{area.description}</p>
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
              Recent <em className="text-neutral-400">work</em>
            </h2>
          </motion.div>
          <div className="divide-y divide-neutral-200">
            {recentWork.map((paper, idx) => (
              <motion.article
                key={paper.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="py-10 sm:py-12 group cursor-pointer hover:px-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{paper.area}</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs text-neutral-400">{paper.date}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">{paper.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{paper.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-all flex-shrink-0 hidden sm:block mt-1.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-16">
            <span className="accent-line" />
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-neutral-900">
              Our <em className="text-neutral-400">approach</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {[
              { title: "Open research", description: "We publish our findings, share our methods, and contribute to the broader scientific community. Knowledge compounds when shared." },
              { title: "Safety by design", description: "Every research direction is evaluated through the lens of safety. We don't build capabilities without understanding their implications." },
              { title: "From lab to product", description: "Our best research becomes Olyxee products. The path from paper to production is short and deliberate." },
            ].map((item, idx) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} variants={fadeUp} className="bg-white p-10 sm:p-12">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Join us at
              <br />
              <em className="text-neutral-500">the frontier</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              We're looking for researchers and engineers who want to work on problems that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://www.linkedin.com/company/olyxeelab/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Follow on LinkedIn <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lab;
