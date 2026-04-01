import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const papers = [
  {
    title: "A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions",
    authors: "Lei Huang, Weijiang Yu, Weitao Ma, Weihong Zhong, Zhangyin Feng, Haotian Wang, Qianglong Chen, Weihua Peng, Xiaocheng Feng, Bing Qin, Ting Liu",
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
    tags: ["Truthfulness", "Benchmarking", "Evaluation"],
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Yuntao Bai, Saurav Kadavath, Sandipan Kundu, Amanda Askell, Jackson Kernion, Andy Jones, Anna Chen, Anna Goldie, Azalia Mirhoseini, Cameron McKinnon, et al.",
    venue: "Anthropic, 2022",
    year: "2022",
    category: "AI Safety",
    description: "Training AI to be helpful, harmless, and honest using a set of principles, reducing the need for human feedback.",
    url: "https://arxiv.org/abs/2212.08073",
    tags: ["AI Safety", "Alignment", "RLHF"],
  },
  {
    title: "Concrete Problems in AI Safety",
    authors: "Dario Amodei, Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman, Dan Mane",
    venue: "arXiv, 2016",
    year: "2016",
    category: "AI Safety",
    description: "Five practical AI safety problems: safe exploration, distributional shift, side effects, reward hacking, and oversight.",
    url: "https://arxiv.org/abs/1606.06565",
    tags: ["AI Safety", "Foundational", "Research Agenda"],
  },
  {
    title: "FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation",
    authors: "Sewon Min, Kalpesh Krishna, Xinxi Lyu, Mike Lewis, Wen-tau Yih, Pang Wei Koh, Mohit Iyyer, Luke Zettlemoyer, Hannaneh Hajishirzi",
    venue: "EMNLP 2023",
    year: "2023",
    category: "Evaluation",
    description: "Breaks LLM text into atomic facts and verifies each against a knowledge source for fine-grained factuality scoring.",
    url: "https://arxiv.org/abs/2305.14251",
    tags: ["Factuality", "Evaluation", "LLM"],
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Kuttler, Mike Lewis, Wen-tau Yih, Tim Rocktaschel, Sebastian Riedel, Douwe Kiela",
    venue: "NeurIPS 2020",
    year: "2020",
    category: "RAG",
    description: "The seminal RAG paper. Combines retrieval with generation to improve factual accuracy and reduce hallucinations.",
    url: "https://arxiv.org/abs/2005.11401",
    tags: ["RAG", "Retrieval", "Factuality"],
  },
  {
    title: "Holistic Evaluation of Language Models (HELM)",
    authors: "Percy Liang, Rishi Bommasani, Tony Lee, Dimitris Tsipras, Dilara Soylu, Michihiro Yasunaga, Yian Zhang, Deepak Narayanan, Yuhuai Wu, Ananya Kumar, et al.",
    venue: "Transactions on Machine Learning Research, 2023",
    year: "2023",
    category: "Evaluation",
    description: "Comprehensive benchmark evaluating LLMs across accuracy, calibration, robustness, fairness, and efficiency.",
    url: "https://arxiv.org/abs/2211.09110",
    tags: ["Benchmarking", "Evaluation", "LLM"],
  },
  {
    title: "Language Models are Few-Shot Learners",
    authors: "Tom Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, et al.",
    venue: "NeurIPS 2020 (GPT-3)",
    year: "2020",
    category: "Foundational",
    description: "Scaling enables strong few-shot performance, but highlights challenges in reliability, bias, and factual consistency.",
    url: "https://arxiv.org/abs/2005.14165",
    tags: ["LLM", "Foundational", "GPT-3"],
  },
  {
    title: "Sparks of Artificial General Intelligence: Early experiments with GPT-4",
    authors: "Sebastien Bubeck, Varun Chandrasekaran, Ronen Eldan, Johannes Gehrke, Eric Horvitz, Ece Kamar, Peter Lee, Yin Tat Lee, Yuanzhi Li, Scott Lundberg, et al.",
    venue: "Microsoft Research, 2023",
    year: "2023",
    category: "Evaluation",
    description: "GPT-4 capabilities and limitations: remarkable reasoning alongside persistent factual accuracy failures.",
    url: "https://arxiv.org/abs/2303.12712",
    tags: ["GPT-4", "Evaluation", "Capabilities"],
  },
  {
    title: "Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned",
    authors: "Deep Ganguli, Liane Lovitt, Jackson Kernion, Amanda Askell, Yuntao Bai, Saurav Kadavath, Ben Mann, Ethan Perez, Nicholas Schiefer, Kamal Ndousse, et al.",
    venue: "Anthropic, 2022",
    year: "2022",
    category: "AI Safety",
    description: "Methods for red teaming LLMs to discover harmful outputs, and how model size affects the harms found.",
    url: "https://arxiv.org/abs/2209.07858",
    tags: ["Red Teaming", "AI Safety", "Evaluation"],
  },
];

const categories = ["All", "AI Safety", "Hallucination", "Evaluation", "RAG", "Foundational"];

const Research: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research" description="Key papers in AI safety, hallucination detection, model evaluation, and verification that inform Olyxee's mission to build reliable AI infrastructure." path="/research" />
      <div className="grain" />
      <Header />

      <section className="pt-28 sm:pt-44 pb-16 sm:pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/gradient-pastel.png" alt="" fill sizes="100vw" aria-hidden="true" priority className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-8">
            <span className="accent-dot" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Research</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-3xl sm:text-5xl lg:text-[5.5rem] text-neutral-900 tracking-tight leading-[1.05] mb-6 sm:mb-8">
            Papers that shape
            <br />
            <em className="text-blue-400">our mission</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-3xl font-light">
            Key papers from the AI safety and evaluation community that inform our direction. Full credit to the original authors.
          </motion.p>
        </div>
      </section>

      <section className="py-12 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-2"
          >
            <BookOpen className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em]">{papers.length} papers curated</span>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 sm:pb-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-0 divide-y divide-neutral-100">
            {papers.map((paper, idx) => (
              <motion.article
                key={paper.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="py-8 sm:py-10 group"
              >
                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold uppercase tracking-wider">
                        {paper.category}
                      </span>
                      <span className="text-xs text-neutral-400">{paper.venue}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug flex items-start gap-2">
                      <span className="flex-1">{paper.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 transition-colors flex-shrink-0 mt-1" />
                    </h2>

                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      {paper.authors}
                    </p>

                    <p className="text-sm text-neutral-500 leading-relaxed max-w-3xl">
                      {paper.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="text-[11px] text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Direction</p>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-900 mb-6">
                Why these papers <em className="text-orange-400">matter to us</em>
              </h2>
              <div className="space-y-4 text-[15px] text-neutral-600 font-light leading-relaxed">
                <p>
                  These papers represent the ideas that motivate our work, from hallucination detection to systematic evaluation.
                </p>
                <p>
                  As we publish our own findings, they will appear here alongside the work that inspired them.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "AI Safety", count: "3 papers", color: "bg-red-50 border-red-100 text-red-600" },
                { label: "Evaluation", count: "4 papers", color: "bg-blue-50 border-blue-100 text-blue-600" },
                { label: "Hallucination", count: "1 paper", color: "bg-amber-50 border-amber-100 text-amber-600" },
                { label: "RAG & Retrieval", count: "1 paper", color: "bg-emerald-50 border-emerald-100 text-emerald-600" },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl border p-5 ${item.color}`}>
                  <p className="text-sm font-semibold mb-1">{item.label}</p>
                  <p className="text-xs opacity-70">{item.count}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <FileText className="w-6 h-6 text-neutral-500 mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mb-5 sm:mb-6">
              Want to collaborate
              <br />
              <em className="text-blue-400">on research?</em>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg max-w-lg mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              We connect with researchers working on AI safety, evaluation, and reliability.
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
