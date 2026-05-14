"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import SEO from "./SEO";
import Header from "./header";
import Footer from "./footer";

export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalLayoutProps {
  documentTitle: string;
  documentNumber: string;
  effectiveDate: string;
  version: string;
  description: string;
  path: string;
  intro?: string;
  sections: LegalSection[];
  downloadFilename?: string;
  contactEmail?: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const LegalLayout: FC<LegalLayoutProps> = ({
  documentTitle,
  documentNumber,
  effectiveDate,
  version,
  description,
  path,
  intro,
  sections,
  downloadFilename,
  contactEmail = "legal@olyxee.com",
}) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0] ? slugify(sections[0].title) : "");

  useEffect(() => {
    const handler = () => {
      let current = "";
      for (const s of sections) {
        const id = slugify(s.title);
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  const handleDownload = () => {
    let text = `OLYXEE | ${documentTitle.toUpperCase()}\n`;
    text += `Document: ${documentNumber}    Version: ${version}    Effective: ${effectiveDate}\n\n`;
    if (intro) text += `${intro}\n\n`;
    sections.forEach((s) => {
      text += `${s.title}\n${"-".repeat(s.title.length)}\n${s.content}\n\n`;
    });
    text += `\n© ${new Date().getFullYear()} Olyxee, Inc. All rights reserved.\n`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename || `Olyxee_${documentTitle.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-900 relative overflow-hidden">
      <SEO title={documentTitle} description={description} path={path} />
      <div className="grain" />

      {/* Watermark logo */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center select-none z-0"
      >
        <Image
          src="/Logo/Olyxee_Logo_ClearBack.png"
          alt=""
          width={1100}
          height={1100}
          className="opacity-[0.025] w-[80vw] max-w-[1100px] h-auto"
          priority={false}
        />
      </div>

      <Header />

      <div className="relative z-10">
        {/* === Document header === */}
        <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 sm:px-8 border-b border-neutral-200/70">
          <div className="max-w-6xl mx-auto">
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs text-neutral-400 mb-10"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-neutral-700 transition-colors">Olyxee</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-500">Legal</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-700">{documentTitle}</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-8">
                  <Image src="/Logo/Olyxee_Logo_ClearBack.png" alt="Olyxee" width={28} height={28} />
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.22em]">
                    Olyxee, Legal Document
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05]">
                  {documentTitle}
                </h1>
                {intro && (
                  <p className="mt-6 text-[15px] sm:text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                    {intro}
                  </p>
                )}
              </div>

              <div className="lg:col-span-4">
                <div className="grid grid-cols-3 gap-6 text-left lg:text-right">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-1.5">Doc</p>
                    <p className="text-sm font-mono text-neutral-700">{documentNumber}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-1.5">Version</p>
                    <p className="text-sm font-mono text-neutral-700">{version}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-1.5">Effective</p>
                    <p className="text-sm font-mono text-neutral-700">{effectiveDate}</p>
                  </div>
                </div>
                <div className="mt-6 flex lg:justify-end">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-300/80 rounded-full hover:bg-white transition-all bg-white/60 backdrop-blur-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === Body with sticky TOC === */}
        <section className="px-6 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* TOC */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start order-last lg:order-first">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-5">
                Contents
              </p>
              <nav className="border-l border-neutral-200">
                <ul className="space-y-0.5">
                  {sections.map((s) => {
                    const id = slugify(s.title);
                    const isActive = activeSection === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`block pl-4 -ml-px py-1.5 text-[13px] leading-snug border-l transition-all ${
                            isActive
                              ? "border-neutral-900 text-neutral-900 font-medium"
                              : "border-transparent text-neutral-500 hover:text-neutral-900"
                          }`}
                        >
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Document body */}
            <article className="lg:col-span-9 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-14"
              >
                {sections.map((section, idx) => {
                  const id = slugify(section.title);
                  return (
                    <section key={id} id={id} className="scroll-mt-28 group">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
                          §{String(idx + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight">
                          {section.title.replace(/^\d+\.\s*/, "")}
                        </h2>
                      </div>
                      <div className="pl-0 sm:pl-10">
                        <p className="text-[15px] text-neutral-600 leading-[1.75] font-light whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </section>
                  );
                })}
              </motion.div>

              {/* Document footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-20 pt-10 border-t border-neutral-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <Image src="/Logo/Olyxee_Logo_ClearBack.png" alt="Olyxee" width={26} height={26} />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Olyxee, Inc.</p>
                      <p className="text-xs text-neutral-400">© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Questions?{" "}
                    <a href={`mailto:${contactEmail}`} className="text-neutral-900 underline underline-offset-4 hover:no-underline">
                      {contactEmail}
                    </a>
                  </div>
                </div>
                <p className="mt-6 text-[11px] text-neutral-400 font-mono">
                  {documentNumber} · v{version} · effective {effectiveDate}
                </p>
              </motion.div>
            </article>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default LegalLayout;
