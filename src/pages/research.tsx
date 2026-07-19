import { FC } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const papers = [
  {
    title: "LLMs Corrupt Your Documents When You Delegate",
    authors: "P. Laban, T. Schnabel, J. Neville",
    venue: "arXiv",
    month: "Apr",
    year: "2026",
    url: "https://arxiv.org/abs/2604.15597",
  },
  {
    title:
      "Attention Residuals: Scalable Sparse Attention with Residual Connections for Efficient Long-Context Transformers",
    authors: "S. Rao, K. Müller, A. Desai, N. Ivanov",
    venue: "ICLR",
    month: "Mar",
    year: "2026",
    url: "https://arxiv.org/abs/2603.15031",
  },
];

const Research: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Research We Follow"
        description="Key papers and publications shaping AI verification, evaluation, and observability. Research that informs how Olyxee builds infrastructure for reliable AI applications."
        path="/research"
      />
      <div className="grain" />
      <Header />

      {/* === HEADER STRIP === */}
      <section className="pt-32 sm:pt-40 pb-6 sm:pb-8 px-4 sm:px-6 border-b border-neutral-200/70 bg-white">
        <div className="max-w-5xl mx-auto flex items-center gap-2.5 text-[18px] sm:text-[20px] font-semibold tracking-tight text-neutral-900 leading-none">
          <Image
            src="/Logo/Olyxee_Logo.png"
            alt="Olyxee"
            width={28}
            height={28}
            className="w-7 h-7"
            priority
          />
          <span>Olyxee</span>
          <span aria-hidden className="text-neutral-300 font-normal mx-0.5">
            /
          </span>
          <span>Research</span>
        </div>
      </section>

      {/* === HERO === */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-2">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 tracking-tight leading-[1.1] max-w-3xl">
            Papers shaping verification, evaluation, and observability for AI in production.
          </h1>
        </div>
      </section>

      {/* === PAPERS LIST === */}
      <section id="papers" className="scroll-mt-24 px-4 sm:px-6 pt-10 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto">
          <ul className="group/list divide-y divide-neutral-200/80">
            {papers.map((paper) => (
              <li key={paper.title} className="group/item">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-7 sm:py-9 transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                    <div className="max-w-3xl">
                      <h3 className="font-serif text-xl sm:text-[1.6rem] leading-snug text-neutral-900 tracking-tight">
                        {paper.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500 font-normal">
                        {paper.authors}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 font-normal shrink-0">
                      <span>
                        {paper.venue} · {paper.month} {paper.year}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-neutral-400 group-hover/item:text-neutral-900 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 transition-all"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-neutral-100 ring-1 ring-neutral-200/70 p-10 sm:p-16 lg:p-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-[-0.025em] leading-[1.05] font-medium mb-5 sm:mb-6">
              Want to <em className="font-serif italic font-normal text-neutral-500">collaborate on research?</em>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg max-w-lg mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
