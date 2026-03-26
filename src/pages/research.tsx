import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const papers = [
  { title: "Verification-First Deployment for Edge AI Systems", category: "AI Reliability", date: "2025", description: "A framework for systematic pre-deployment verification of AI models targeting heterogeneous edge hardware, reducing deployment failures by an order of magnitude.", tags: ["Verification", "Edge AI", "Deployment"] },
  { title: "Interpretable Feature Attribution in Verification Pipelines", category: "Interpretability", date: "2025", description: "A method for tracing feature contributions at multiple levels within the Grysics verification pipeline, providing actionable insights into model behavior.", tags: ["Grysics", "Explainability", "Verification"] },
  { title: "Adaptive Quantization for Cross-Hardware Deployment", category: "Optimization", date: "2025", description: "An automatic model compression approach that adapts quantization strategies to target hardware constraints while maintaining formal accuracy guarantees.", tags: ["Quantization", "Hardware", "Optimization"] },
  { title: "Failure Mode Analysis in Deployed AI Systems", category: "Reliability", date: "2024", description: "A comprehensive study of how AI systems fail in production environments, identifying common failure patterns and proposing systematic detection methods.", tags: ["Monitoring", "Failure Analysis", "Production"] },
  { title: "Benchmarking Edge AI: Beyond Accuracy Metrics", category: "Benchmarking", date: "2024", description: "A multi-dimensional benchmarking framework evaluating edge AI systems on latency, power consumption, reliability, and maintainability alongside accuracy.", tags: ["Benchmarking", "Edge AI", "Metrics"] },
];

const Research: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research" description="Explore Olyxee's research in AI verification, model reliability, interpretability, and edge deployment optimization." path="/research" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Research</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Advancing AI
            <br />
            <em className="text-neutral-400">reliability</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Our research focuses on making AI systems more reliable, interpretable, and
            deployable. We publish our findings to advance the field.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-neutral-200">
            {papers.map((paper, idx) => (
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
                  <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{paper.category}</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs text-neutral-400">{paper.date}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">{paper.title}</h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">{paper.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="text-xs text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-all flex-shrink-0 hidden sm:block mt-1.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              Interested in
              <br />
              <em className="text-neutral-500">collaborating?</em>
            </h2>
            <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
              We partner with universities and research labs on AI reliability, deployment, and verification.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Research;
