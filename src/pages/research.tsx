import { FC, useState, useMemo } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const papers = [
  {
    title: "A Survey on Hallucination in Large Language Models",
    authors: "Lei Huang, Weijiang Yu, Weitao Ma, et al.",
    venue: "ACM Computing Surveys, 2024",
    year: "2024",
    category: "Hallucination",
    description: "Categorizes hallucination in LLMs, analyzing causes and reviewing detection and mitigation strategies.",
    url: "https://arxiv.org/abs/2311.05232",
    tags: ["Hallucination", "LLM", "Survey"],
  },
  {
    title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods",
    authors: "Stephanie Lin, Jacob Hilton, Owain Evans",
    venue: "ACL 2022",
    year: "2022",
    category: "Evaluation",
    description: "Benchmark measuring whether language models generate truthful answers. Larger models can be less truthful.",
    url: "https://arxiv.org/abs/2109.07958",
    tags: ["Truthfulness", "Benchmarking"],
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al.",
    venue: "Anthropic, 2022",
    year: "2022",
    category: "AI Safety",
    description: "Training AI to be helpful, harmless, and honest using a set of principles, reducing the need for human feedback.",
    url: "https://arxiv.org/abs/2212.08073",
    tags: ["AI Safety", "Alignment"],
  },
  {
    title: "Concrete Problems in AI Safety",
    authors: "Dario Amodei, Chris Olah, Jacob Steinhardt, et al.",
    venue: "arXiv, 2016",
    year: "2016",
    category: "AI Safety",
    description: "Five practical AI safety problems: safe exploration, distributional shift, side effects, reward hacking, and oversight.",
    url: "https://arxiv.org/abs/1606.06565",
    tags: ["AI Safety", "Foundational"],
  },
  {
    title: "FActScore: Fine-grained Atomic Evaluation of Factual Precision",
    authors: "Sewon Min, Kalpesh Krishna, Xinxi Lyu, et al.",
    venue: "EMNLP 2023",
    year: "2023",
    category: "Evaluation",
    description: "Breaks LLM text into atomic facts and verifies each against a knowledge source for fine-grained factuality scoring.",
    url: "https://arxiv.org/abs/2305.14251",
    tags: ["Factuality", "Evaluation"],
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Patrick Lewis, Ethan Perez, Aleksandra Piktus, et al.",
    venue: "NeurIPS 2020",
    year: "2020",
    category: "RAG",
    description: "The seminal RAG paper. Combines retrieval with generation to improve factual accuracy and reduce hallucinations.",
    url: "https://arxiv.org/abs/2005.11401",
    tags: ["RAG", "Retrieval"],
  },
  {
    title: "Holistic Evaluation of Language Models (HELM)",
    authors: "Percy Liang, Rishi Bommasani, Tony Lee, et al.",
    venue: "TMLR, 2023",
    year: "2023",
    category: "Evaluation",
    description: "Comprehensive benchmark evaluating LLMs across accuracy, calibration, robustness, fairness, and efficiency.",
    url: "https://arxiv.org/abs/2211.09110",
    tags: ["Benchmarking", "Evaluation"],
  },
  {
    title: "Language Models are Few-Shot Learners",
    authors: "Tom Brown, Benjamin Mann, Nick Ryder, et al.",
    venue: "NeurIPS 2020 (GPT-3)",
    year: "2020",
    category: "Foundational",
    description: "Scaling enables strong few-shot performance, but highlights challenges in reliability, bias, and factual consistency.",
    url: "https://arxiv.org/abs/2005.14165",
    tags: ["LLM", "Foundational"],
  },
  {
    title: "Sparks of Artificial General Intelligence: Early experiments with GPT-4",
    authors: "Sebastien Bubeck, Varun Chandrasekaran, et al.",
    venue: "Microsoft Research, 2023",
    year: "2023",
    category: "Evaluation",
    description: "GPT-4 capabilities and limitations: remarkable reasoning alongside persistent factual accuracy failures.",
    url: "https://arxiv.org/abs/2303.12712",
    tags: ["GPT-4", "Evaluation"],
  },
  {
    title: "Red Teaming Language Models to Reduce Harms",
    authors: "Deep Ganguli, Liane Lovitt, Jackson Kernion, et al.",
    venue: "Anthropic, 2022",
    year: "2022",
    category: "AI Safety",
    description: "Methods for red teaming LLMs to discover harmful outputs, and how model size affects the harms found.",
    url: "https://arxiv.org/abs/2209.07858",
    tags: ["Red Teaming", "AI Safety"],
  },
];

const categories = ["All", "AI Safety", "Hallucination", "Evaluation", "RAG", "Foundational"];

const categoryColors: Record<string, string> = {
  "AI Safety": "bg-red-50 text-red-600 border-red-100",
  "Hallucination": "bg-amber-50 text-amber-600 border-amber-100",
  "Evaluation": "bg-blue-50 text-blue-600 border-blue-100",
  "RAG": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Foundational": "bg-violet-50 text-violet-600 border-violet-100",
};

const Research: FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPapers = useMemo(() => {
    if (activeCategory === "All") return papers;
    return papers.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research" description="Key papers in AI safety, hallucination detection, model evaluation, and verification that inform Olyxee's mission to build reliable AI infrastructure." path="/research" />
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
            Key papers from the AI safety and evaluation community that inform our direction. Full credit to the original authors.
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
              We connect with researchers working on AI safety, evaluation, and reliability.
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
