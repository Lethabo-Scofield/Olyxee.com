import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const papers = [
  {
    title: "Attention Residuals: Scalable Sparse Attention with Residual Connections for Efficient Long-Context Transformers",
    authors: "S. Rao, K. Müller, A. Desai, N. Ivanov",
    venue: "ICLR 2026",
    year: "2026",
    category: "Architecture",
    description: "Proposes a residual-augmented sparse attention mechanism that preserves long-range dependencies while reducing quadratic complexity. By routing residual pathways through sparse attention heads, the method achieves near-full attention quality at a fraction of the compute cost, enabling efficient inference on sequences exceeding 128K tokens.",
    url: "https://arxiv.org/abs/2603.15031",
  },
  {
    title: "Reducing Hallucinations in Production AI Applications Through Real-Time Verification Pipelines",
    authors: "J. Chen, M. Patel, S. Liu",
    venue: "NeurIPS 2025",
    year: "2025",
    category: "Verification",
    description: "Presents a lightweight verification layer that sits between any LLM and the end user, catching factual inconsistencies and unsupported claims before they reach production. Reduces hallucination rates by up to 62% in RAG-based applications without adding meaningful latency.",
    url: "https://arxiv.org/abs/2510.22751",
  },
  {
    title: "Continuous Evaluation Frameworks for AI-Powered Applications in Production",
    authors: "R. Kumar, A. Zhang, T. Nakamura",
    venue: "ICML 2025",
    year: "2025",
    category: "Evaluation",
    description: "Introduces an always-on evaluation system that monitors AI application outputs in real time, scoring accuracy, consistency, and safety across every response. Enables teams to detect quality drift within minutes instead of waiting for user complaints.",
    url: "https://arxiv.org/abs/2603.26718",
  },
  {
    title: "Observability Infrastructure for Agentic AI Workflows",
    authors: "L. Wang, D. Fischer, P. Okonkwo",
    venue: "AAAI 2026",
    year: "2026",
    category: "Monitoring",
    description: "Defines an observability stack purpose-built for multi-step AI agent workflows, providing trace-level visibility into each decision point, tool call, and retrieval step. Helps engineering teams debug, optimize, and trust complex AI systems running in production.",
    url: "https://arxiv.org/abs/2512.08769",
  },
];

const TOPICS = ["Architecture", "Verification", "Evaluation", "Monitoring", "Agents", "Long context"];

const CATEGORY_COLORS: Record<string, string> = {
  Architecture: "bg-violet-50 text-violet-700",
  Verification: "bg-emerald-50 text-emerald-700",
  Evaluation: "bg-amber-50 text-amber-700",
  Monitoring: "bg-blue-50 text-blue-700",
};

const Research: FC = () => {
  const featured = papers[0];
  const rest = papers.slice(1);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Research We Follow"
        description="Key papers and publications shaping AI verification, evaluation, and observability. Research that informs how Olyxee builds infrastructure for reliable AI applications."
        path="/research"
      />
      <div className="grain" />
      <Header />

      {/* === DOCUMENT HEADER === */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 border-b border-neutral-200/70 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.25em] mb-5"
          >
            Olyxee · Research
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-neutral-900 tracking-tight leading-[1.1] mb-5"
          >
            Research we follow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl"
          >
            Selected papers shaping verification, evaluation, and observability for AI applications in production. We publish our notes here as the field moves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {TOPICS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium tracking-wide"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === FEATURED PAPER === */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-16 pb-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-5 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
            Featured paper
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-all p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-wrap items-center gap-2 mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
              <span>{featured.venue}</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span>{featured.year}</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide normal-case ${
                  CATEGORY_COLORS[featured.category] ?? "bg-neutral-100 text-neutral-700"
                }`}
              >
                {featured.category}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-neutral-900 tracking-tight leading-[1.15] mb-4 group-hover:text-blue-700 transition-colors">
              {featured.title}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed font-light max-w-3xl mb-6">
              {featured.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-neutral-200/80">
              <p className="text-sm text-neutral-500 font-light">{featured.authors}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 group-hover:text-blue-700 transition-colors">
                Read paper
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                  focusable="false"
                />
              </span>
            </div>
          </motion.a>
        </div>
      </section>

      {/* === MORE PAPERS === */}
      <section className="pb-20 sm:pb-32 pt-8 sm:pt-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-5"
          >
            More from the field
          </motion.p>

          <ul className="rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200 bg-white">
            {rest.map((paper, idx) => (
              <motion.li
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 + idx * 0.06 }}
              >
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 px-5 sm:px-6 py-6 sm:py-8 hover:bg-neutral-50/60 transition-colors"
                >
                  <div className="flex md:flex-col flex-wrap items-start gap-2 md:gap-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-700">
                      {paper.venue} <span className="text-neutral-500">· {paper.year}</span>
                    </p>
                    <span
                      className={`inline-flex items-center md:mt-3 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide ${
                        CATEGORY_COLORS[paper.category] ?? "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {paper.category}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-light max-w-3xl mb-4">
                      {paper.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-100">
                      <p className="text-xs sm:text-sm text-neutral-500 font-light">{paper.authors}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-blue-700 transition-colors">
                        Read paper
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                          focusable="false"
                        />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* === RESEARCH DIRECTIONS === */}
      <section className="py-20 sm:py-28 border-t border-neutral-200/70 bg-neutral-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
              Internal · Research directions
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-[1.1] mb-4">
              Where we&apos;re looking next.
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-2xl font-light">
              Our active research areas reach beyond software, into systems that perceive and act in the physical world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.25em] mb-4">
              Research Division
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-tight leading-[1.15] mb-5">
              Olyxee Robotics
            </h3>
            <p className="text-base sm:text-[17px] text-neutral-600 leading-relaxed font-light mb-8">
              Olyxee Robotics focuses on embodied intelligence: building systems that bring AI into the physical world through perception, decision-making, and action.
            </p>
            <ul className="space-y-3 border-t border-neutral-200/80 pt-6">
              {[
                "Embodied intelligence",
                "Real-world interaction systems",
                "Autonomous decision layers",
                "Hardware-integrated AI",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-sm sm:text-[15px] text-neutral-700 font-light"
                >
                  <span aria-hidden className="text-neutral-300 text-[11px] leading-none translate-y-[1px]">
                    ●
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Editorial mosaic — Olyxee Robotics in the field */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-14 sm:mt-20"
          >
            <div className="flex items-baseline justify-between mb-5">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                Fig. 01 · Field log
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
                Olyxee Robotics · 2025
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:min-h-[560px] xl:min-h-[620px]">
              <figure className="lg:flex-[1.4] group flex flex-col">
                <div className="relative flex-1 min-h-0 aspect-[4/3] lg:aspect-auto overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
                  <Image
                    src="/images/robotics/humanoid-manipulation.png"
                    alt="Humanoid robot manipulating objects on a table"
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between mt-3 px-1">
                  <span className="text-sm font-medium text-neutral-700">Humanoid manipulation</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                    Embodied intelligence · 01
                  </span>
                </figcaption>
              </figure>

              <div className="lg:flex-1 flex flex-col gap-4 sm:gap-5">
                <figure className="group flex-1 flex flex-col">
                  <div className="relative flex-1 min-h-0 aspect-[16/10] lg:aspect-auto overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-200/80">
                    <Image
                      src="/images/robotics/foundation-partnerships.png"
                      alt="Boston Dynamics and Google DeepMind on stage"
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="flex items-baseline justify-between mt-3 px-1">
                    <span className="text-sm font-medium text-neutral-700">Foundation partnerships</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                      Ecosystem · 02
                    </span>
                  </figcaption>
                </figure>

                <figure className="group flex-1 flex flex-col">
                  <div className="relative flex-1 min-h-0 aspect-[16/10] lg:aspect-auto overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
                    <Image
                      src="/images/robotics/hardware-design.png"
                      alt="Engineer reviewing CAD blueprints on a monitor"
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="flex items-baseline justify-between mt-3 px-1">
                    <span className="text-sm font-medium text-neutral-700">Hardware design</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                      Engineering · 03
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>

            <figure className="group mt-4 sm:mt-5">
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
                <Image
                  src="/images/robotics/field-deployment.png"
                  alt="Students and engineers around a solar-powered vehicle prototype"
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="flex items-baseline justify-between mt-3 px-1">
                <span className="text-sm font-medium text-neutral-700">Field deployment</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                  Real-world programs · 04
                </span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="py-20 sm:py-32 border-t border-neutral-200/70">
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
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
            >
              Get in touch
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
                focusable="false"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
