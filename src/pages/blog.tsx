import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const posts = [
  { title: "Why AI Systems Fail in Production (And How to Fix It)", excerpt: "We analyzed hundreds of AI deployment failures across industries. The patterns are consistent — and preventable.", category: "Engineering", date: "Oct 2025", readTime: "8 min" },
  { title: "Introducing Grysics: Verification-First Edge AI", excerpt: "Today we're launching Grysics — a verification engine that tests AI models against real hardware profiles before deployment.", category: "Product", date: "Sep 2025", readTime: "5 min" },
  { title: "Benchmarking Edge AI: What Metrics Actually Matter", excerpt: "Accuracy alone doesn't tell you if your model will work on a Raspberry Pi. We propose a multi-dimensional evaluation framework.", category: "Research", date: "Aug 2025", readTime: "12 min" },
  { title: "The WAVE Architecture: How Olyxee Handles Hardware Abstraction", excerpt: "A technical deep-dive into how WAVE abstracts away device-specific complexity to provide a unified deployment interface.", category: "Technical", date: "Jul 2025", readTime: "10 min" },
  { title: "From Notebook to Production: Bridging the AI Deployment Gap", excerpt: "The journey from a working Jupyter notebook to a reliable production system is longer than most teams expect.", category: "Engineering", date: "Jun 2025", readTime: "7 min" },
  { title: "Model Drift Detection at the Edge", excerpt: "How do you know when your deployed model is no longer performing well? We explore lightweight drift detection techniques.", category: "Research", date: "May 2025", readTime: "9 min" },
];

const Blog: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-28 sm:pb-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[120px] opacity-50 -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Blog</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-8">
            Insights &
            <br />
            <em className="text-neutral-400">updates</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Technical writing on AI deployment, reliability engineering, and the future of edge AI.
          </motion.p>
        </div>
      </section>

      <section className="py-28 sm:py-36 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-neutral-200">
            {posts.map((post, idx) => (
              <motion.article
                key={post.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="py-10 sm:py-12 group cursor-pointer hover:px-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{post.category}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">{post.title}</h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span>{post.date}</span>
                      <span className="text-neutral-300">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-all flex-shrink-0 hidden sm:block mt-1.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
