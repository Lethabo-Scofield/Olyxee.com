import { FC } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

interface Paper {
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
}

const papers: Paper[] = [
  {
    title: "Verification-First Deployment for Edge AI Systems",
    category: "AI Reliability",
    date: "2025",
    description: "We present a framework for systematic pre-deployment verification of AI models targeting heterogeneous edge hardware, reducing deployment failures by an order of magnitude.",
    tags: ["Verification", "Edge AI", "Deployment"],
  },
  {
    title: "Multi-Path Feature Analysis in Neural Reality Networks",
    category: "Interpretability",
    date: "2025",
    description: "NRN introduces interpretable neural pathways that trace feature contributions at multiple levels, providing actionable insights into AI decision-making without sacrificing performance.",
    tags: ["NRN", "Explainability", "Architecture"],
  },
  {
    title: "Adaptive Quantization for Cross-Hardware Deployment",
    category: "Optimization",
    date: "2025",
    description: "An automatic model compression approach that adapts quantization strategies to target hardware constraints while maintaining formal accuracy guarantees.",
    tags: ["Quantization", "Hardware", "Optimization"],
  },
  {
    title: "Failure Mode Analysis in Deployed AI Systems",
    category: "Reliability",
    date: "2024",
    description: "A comprehensive study of how AI systems fail in production environments, identifying common failure patterns and proposing systematic detection methods.",
    tags: ["Monitoring", "Failure Analysis", "Production"],
  },
  {
    title: "Benchmarking Edge AI: Beyond Accuracy Metrics",
    category: "Benchmarking",
    date: "2024",
    description: "We propose a multi-dimensional benchmarking framework that evaluates edge AI systems on latency, power consumption, reliability, and maintainability alongside accuracy.",
    tags: ["Benchmarking", "Edge AI", "Metrics"],
  },
];

const Research: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Research</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Advancing AI reliability through rigorous research.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Our research focuses on making AI systems more reliable, interpretable, and
            deployable. We publish our findings to advance the field and build trust in AI infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {papers.map((paper) => (
              <div
                key={paper.title}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{paper.category}</span>
                  <span className="text-xs text-gray-400">{paper.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {paper.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{paper.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {paper.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interested in collaborating?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We partner with universities and research labs on AI reliability, deployment, and verification.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Research;
