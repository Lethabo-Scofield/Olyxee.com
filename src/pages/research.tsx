import { FC, useState, useMemo } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.",
    venue: "NeurIPS 2017",
    year: "2017",
    category: "Foundational",
    description: "Introduced the Transformer architecture that underpins virtually all modern AI systems, replacing recurrence with self-attention for parallelizable, scalable sequence modeling.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    title: "Scaling Laws for Neural Language Models",
    authors: "Jared Kaplan, Sam McCandlish, Tom Henighan, et al.",
    venue: "OpenAI, 2020",
    year: "2020",
    category: "Scaling",
    description: "Empirically derives power-law relationships between model size, dataset size, compute budget, and performance, foundational to planning AI infrastructure investments.",
    url: "https://arxiv.org/abs/2001.08361",
  },
  {
    title: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism",
    authors: "Mohammad Shoeybi, Mostofa Patwary, Raul Puri, et al.",
    venue: "NVIDIA, 2020",
    year: "2020",
    category: "Infrastructure",
    description: "Efficient intra-layer model parallelism techniques for training massive transformer models across GPU clusters, enabling practical multi-billion parameter training.",
    url: "https://arxiv.org/abs/1909.08053",
  },
  {
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    authors: "Tri Dao, Daniel Y. Fu, Stefano Ermon, et al.",
    venue: "NeurIPS 2022",
    year: "2022",
    category: "Infrastructure",
    description: "Redesigns attention computation to be IO-aware, achieving 2-4x speedups and significant memory savings. Now standard infrastructure in all major training frameworks.",
    url: "https://arxiv.org/abs/2205.14135",
  },
  {
    title: "Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-DeepSpeed",
    authors: "Deepak Narayanan, Mohammad Shoeybi, Jared Casper, et al.",
    venue: "SC 2021",
    year: "2021",
    category: "Infrastructure",
    description: "Combines pipeline, tensor, and data parallelism to efficiently train trillion-parameter models. Defines the distributed training playbook used across the industry.",
    url: "https://arxiv.org/abs/2104.04473",
  },
  {
    title: "LLaMA: Open and Efficient Foundation Language Models",
    authors: "Hugo Touvron, Thibaut Lavril, Gautier Izacard, et al.",
    venue: "Meta AI, 2023",
    year: "2023",
    category: "Foundational",
    description: "Demonstrates that smaller, well-trained models can match larger ones. Shifted the field toward efficient training and open-weight models as infrastructure.",
    url: "https://arxiv.org/abs/2302.13971",
  },
  {
    title: "vLLM: Efficient Memory Management for Large Language Model Serving with PagedAttention",
    authors: "Woosuk Kwon, Zhuohan Li, Sicheng Zuo, et al.",
    venue: "SOSP 2023",
    year: "2023",
    category: "Serving",
    description: "Introduces PagedAttention for near-zero-waste KV cache memory management, achieving 2-4x higher serving throughput. Core infrastructure for production LLM deployment.",
    url: "https://arxiv.org/abs/2309.06180",
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Patrick Lewis, Ethan Perez, Aleksandra Piktus, et al.",
    venue: "NeurIPS 2020",
    year: "2020",
    category: "Systems",
    description: "Combines retrieval with generation to ground AI outputs in external knowledge, reducing hallucinations. The architecture behind modern enterprise AI systems.",
    url: "https://arxiv.org/abs/2005.11401",
  },
  {
    title: "Training Compute-Optimal Large Language Models",
    authors: "Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, et al.",
    venue: "DeepMind (Chinchilla), 2022",
    year: "2022",
    category: "Scaling",
    description: "Shows that most large models are significantly undertrained for their compute budget. Redefines optimal allocation of data vs. parameters for training infrastructure.",
    url: "https://arxiv.org/abs/2203.15556",
  },
  {
    title: "Holistic Evaluation of Language Models (HELM)",
    authors: "Percy Liang, Rishi Bommasani, Tony Lee, et al.",
    venue: "TMLR, 2023",
    year: "2023",
    category: "Evaluation",
    description: "Comprehensive benchmark evaluating LLMs across accuracy, calibration, robustness, fairness, and efficiency. Sets the standard for systematic AI evaluation infrastructure.",
    url: "https://arxiv.org/abs/2211.09110",
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yelong Shen, Phillip Wallis, et al.",
    venue: "ICLR 2022",
    year: "2022",
    category: "Infrastructure",
    description: "Freezes pretrained weights and injects trainable low-rank matrices, reducing fine-tuning compute by 10,000x. Fundamental infrastructure for efficient model customization.",
    url: "https://arxiv.org/abs/2106.09685",
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al.",
    venue: "Anthropic, 2022",
    year: "2022",
    category: "Alignment",
    description: "Training AI to be helpful, harmless, and honest using a set of principles. Establishes scalable alignment methods critical for deploying AI systems responsibly.",
    url: "https://arxiv.org/abs/2212.08073",
  },
];

const categories = ["All", "Foundational", "Infrastructure", "Scaling", "Serving", "Systems", "Evaluation", "Alignment"];

const categoryColors: Record<string, string> = {
  "Foundational": "bg-violet-50 text-violet-600 border-violet-100",
  "Infrastructure": "bg-blue-50 text-blue-600 border-blue-100",
  "Scaling": "bg-orange-50 text-orange-600 border-orange-100",
  "Serving": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Systems": "bg-cyan-50 text-cyan-600 border-cyan-100",
  "Evaluation": "bg-amber-50 text-amber-600 border-amber-100",
  "Alignment": "bg-red-50 text-red-600 border-red-100",
};

const Research: FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPapers = useMemo(() => {
    if (activeCategory === "All") return papers;
    return papers.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research" description="Papers in AI infrastructure, systems, scaling, and foundational research that shape Olyxee's work in building reliable AI systems." path="/research" />
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
            Papers across AI infrastructure, training systems, and foundational research that shape our work. Full credit to the original authors.
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
