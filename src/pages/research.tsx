import { FC, useState, useMemo } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const papers = [
  {
    title: "Reducing Hallucinations in Production AI Applications Through Real-Time Verification Pipelines",
    authors: "Olyxee Research",
    venue: "Olyxee Labs, 2026",
    year: "2026",
    category: "Verification",
    description: "Presents a lightweight verification layer that sits between any LLM and the end user, catching factual inconsistencies and unsupported claims before they reach production. Reduces hallucination rates by up to 62% in RAG-based applications without adding meaningful latency.",
    url: "#",
  },
  {
    title: "Continuous Evaluation Frameworks for AI-Powered Applications in Production",
    authors: "Olyxee Research",
    venue: "Olyxee Labs, 2025",
    year: "2025",
    category: "Evaluation",
    description: "Introduces an always-on evaluation system that monitors AI application outputs in real time, scoring accuracy, consistency, and safety across every response. Enables teams to detect quality drift within minutes instead of waiting for user complaints.",
    url: "#",
  },
  {
    title: "Observability Infrastructure for Agentic AI Workflows",
    authors: "Olyxee Research",
    venue: "Olyxee Labs, 2025",
    year: "2025",
    category: "Monitoring",
    description: "Defines an observability stack purpose-built for multi-step AI agent workflows, providing trace-level visibility into each decision point, tool call, and retrieval step. Helps engineering teams debug, optimize, and trust complex AI systems running in production.",
    url: "#",
  },
];

const categories = ["All", "Verification", "Evaluation", "Monitoring"];

const categoryColors: Record<string, string> = {
  "Verification": "bg-blue-50 text-blue-600 border-blue-100",
  "Evaluation": "bg-amber-50 text-amber-600 border-amber-100",
  "Monitoring": "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const Research: FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPapers = useMemo(() => {
    if (activeCategory === "All") return papers;
    return papers.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research" description="Our latest research on making AI applications more reliable, accurate, and observable in production." path="/research" />
      <div className="grain" />
      <Header />

      <section className="pt-28 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-6"
          >
            Research
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Our latest work on making AI applications more reliable, accurate, and observable in production.
          </motion.p>
        </div>
      </section>

      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {papers.filter(p => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredPapers.map((paper, idx) => (
                <motion.a
                  key={paper.title}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="group block rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-white hover:shadow-lg hover:shadow-neutral-100/60 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 sm:p-7 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${categoryColors[paper.category] || "bg-neutral-50 text-neutral-500 border-neutral-100"}`}>
                        {paper.category}
                      </span>
                      <span className="text-xs text-neutral-300">{paper.year}</span>
                    </div>

                    <h2 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug mb-3 flex-grow">
                      {paper.title}
                    </h2>

                    <p className="text-sm text-neutral-500 leading-relaxed font-light mb-4 line-clamp-3">
                      {paper.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-neutral-50">
                      <p className="text-xs text-neutral-400 mb-2 line-clamp-1">{paper.authors}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400">{paper.venue}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-sm">No papers in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
              Want to collaborate on research?
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg max-w-lg mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              We connect with researchers working on AI infrastructure, systems, and foundational research.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide">
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
