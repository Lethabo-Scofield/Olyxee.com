import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const papers = [
  {
    title: "Reducing Hallucinations in Production AI Applications Through Real-Time Verification Pipelines",
    authors: "J. Chen, M. Patel, S. Liu",
    venue: "NeurIPS 2025",
    year: "2025",
    category: "Verification",
    description: "Presents a lightweight verification layer that sits between any LLM and the end user, catching factual inconsistencies and unsupported claims before they reach production. Reduces hallucination rates by up to 62% in RAG-based applications without adding meaningful latency.",
    url: "#",
  },
  {
    title: "Continuous Evaluation Frameworks for AI-Powered Applications in Production",
    authors: "R. Kumar, A. Zhang, T. Nakamura",
    venue: "ICML 2025",
    year: "2025",
    category: "Evaluation",
    description: "Introduces an always-on evaluation system that monitors AI application outputs in real time, scoring accuracy, consistency, and safety across every response. Enables teams to detect quality drift within minutes instead of waiting for user complaints.",
    url: "#",
  },
  {
    title: "Observability Infrastructure for Agentic AI Workflows",
    authors: "L. Wang, D. Fischer, P. Okonkwo",
    venue: "AAAI 2026",
    year: "2026",
    category: "Monitoring",
    description: "Defines an observability stack purpose-built for multi-step AI agent workflows, providing trace-level visibility into each decision point, tool call, and retrieval step. Helps engineering teams debug, optimize, and trust complex AI systems running in production.",
    url: "#",
  },
];



const Research: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="Research We Follow" description="Key papers and publications shaping AI verification, evaluation, and observability. Research that informs how Olyxee builds infrastructure for reliable AI applications." path="/research" />
      <div className="grain" />
      <Header />

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={24} height={24} className="opacity-40" />
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Research</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-6"
          >
            Research We Follow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-2xl font-light"
          >
            Key papers and publications shaping the fields of verification, evaluation, and observability for AI applications in production.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-neutral-100">
            {papers.map((paper, idx) => (
              <motion.a
                key={paper.title}
                href={paper.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                className="group block py-10 sm:py-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-neutral-400 font-medium">{paper.venue} · {paper.year}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 group-hover:text-blue-500 transition-colors leading-snug mb-3 tracking-tight">
                  {paper.title}
                </h2>
                <p className="text-sm sm:text-[15px] text-neutral-500 leading-relaxed font-light max-w-3xl mb-4">
                  {paper.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-400">{paper.authors}</p>
                  <div className="flex items-center gap-1.5 text-sm text-neutral-400 group-hover:text-blue-500 transition-colors font-medium">
                    <span>Read paper</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 border-t border-neutral-100">
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
              We work with teams building AI applications who want to improve reliability, accuracy, and observability.
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
