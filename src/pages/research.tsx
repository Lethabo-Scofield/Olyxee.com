"use client";

import { FC, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, FileText, FlaskConical, Layers3 } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";

type Filter = "All" | "Olyxee updates" | "Research we follow";

const papers = [
  {
    kind: "Olyxee updates" as const,
    title: "FinIR: A financial intermediate representation for AI-native computation",
    authors: "Lethabo Innocent ScoField and Alisha Fatima",
    venue: "Research · Release",
    month: "Sep",
    year: "2026",
    url: "/research/finir",
    description:
      "A finance-typed compiler and incremental execution runtime that turns structured financial intent into deterministic, auditable financial computation.",
  },
  {
    kind: "Research we follow" as const,
    title: "LLMs Corrupt Your Documents When You Delegate",
    authors: "P. Laban, T. Schnabel, J. Neville",
    venue: "arXiv",
    month: "Apr",
    year: "2026",
    url: "https://arxiv.org/abs/2604.15597",
    description:
      "A paper we are following as we think about dependable document-handling workflows and the boundaries of delegated AI work.",
  },
];

const Research: FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", "Olyxee updates", "Research we follow"];
  const visiblePapers = useMemo(
    () => (activeFilter === "All" ? papers : papers.filter((paper) => paper.kind === activeFilter)),
    [activeFilter]
  );

  return (
    <div className="min-h-screen bg-[#fdfdfc] text-[#172126] relative">
      <SEO
        title="Research & releases"
        description="Olyxee's public desk for product releases, research notes, engineering updates, company milestones, and research we follow."
        path="/research"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Olyxee Research & releases",
          url: "https://olyxee.com/research",
          description: "Olyxee's public desk for product releases, research notes, engineering updates, company milestones, and research we follow.",
          inLanguage: "en",
          isPartOf: { "@type": "WebSite", name: "Olyxee", url: "https://olyxee.com" },
          publisher: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
            logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
          },
           mainEntity: {
            "@type": "ItemList",
             itemListElement: papers.map((paper, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "ScholarlyArticle",
                headline: paper.title,
                name: paper.title,
                 author: paper.kind === "Olyxee updates"
                   ? [
                       { "@type": "Person", name: "Lethabo Innocent ScoField" },
                       { "@type": "Person", name: "Alisha Fatima" },
                     ]
                   : [
                       { "@type": "Person", name: "P. Laban" },
                       { "@type": "Person", name: "T. Schnabel" },
                       { "@type": "Person", name: "J. Neville" },
                     ],
                 url: paper.url.startsWith("/") ? `https://olyxee.com${paper.url}` : paper.url,
                 datePublished: paper.kind === "Olyxee updates" ? "2026-09-03" : "2026-04-01",
                publisher: { "@type": "Organization", name: paper.venue },
              },
            })),
          },
        }}
      />
      <div className="grain" />
      <Header />

      <main>
        <section className="pt-28 sm:pt-36 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto border-y border-[#d8dcdd] py-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#526064]">
            <div className="flex items-center gap-2.5">
              <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={22} height={22} className="w-[22px] h-[22px]" priority />
              <span>Olyxee / Editorial desk</span>
            </div>
            <span className="hidden sm:block text-[#0c6a72]">Public record · establishing</span>
          </div>
        </section>

        <section className="research-grid px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#0c6a72] mb-6">Research &amp; releases</p>
              <h1 className="font-serif !font-normal text-[3.15rem] sm:text-7xl lg:text-[5.8rem] text-[#172126] tracking-[-0.052em] leading-[0.92]">
                The operational intelligence record.
              </h1>
              <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[#526064] max-w-2xl">
                Product decisions, engineering work, research notes, and the outside ideas shaping how Olyxee builds dependable systems for real operations.
              </p>
            </div>
            <div className="mt-14 research-rule max-w-6xl" />
            <div className="grid sm:grid-cols-3 gap-px mt-px bg-[#d8dcdd] border border-[#d8dcdd]">
              {[
                { icon: Layers3, title: "Product releases", body: "Changes to the workflows teams run every day." },
                { icon: FileText, title: "Engineering notes", body: "How we reason about infrastructure and operational controls." },
                { icon: FlaskConical, title: "Research context", body: "Work we follow beyond Olyxee's own publication program." },
              ].map(({ icon: Icon, title, body }) => (
                <div className="bg-[#fdfdfc] p-5 sm:p-6" key={title}>
                  <Icon className="w-4 h-4 text-[#0c6a72] mb-5" aria-hidden />
                  <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
                  <p className="text-sm leading-6 text-[#687579] mt-2">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="archive" className="scroll-mt-24 px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7 border-b border-[#d8dcdd] pb-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#0c6a72]">Archive</p>
                <h2 className="font-serif !font-normal text-4xl sm:text-5xl tracking-[-0.04em] mt-3">From the desk</h2>
                <p className="text-sm text-[#687579] mt-3">An archive designed to grow in public, without filling the gaps with noise.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar" role="group" aria-label="Filter archive entries">
                {filters.map((filter) => (
                  <button type="button" key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c6a72] ${activeFilter === filter ? "border-[#0c6a72] bg-[#0c6a72] text-white" : "border-[#cbd1d2] bg-transparent text-[#526064] hover:border-[#0c6a72] hover:text-[#0c6a72]"}`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {visiblePapers.length > 0 ? (
              <ul className="divide-y divide-[#d8dcdd]">
                {visiblePapers.map((paper) => (
                  <li key={paper.title} className="research-entry">
                    {paper.url.startsWith("/") ? (
                    <Link href={paper.url} className="group block py-9 sm:py-11 px-1 sm:px-5 -mx-1 sm:-mx-5">
                      <div className="grid lg:grid-cols-[155px_1fr_auto] gap-4 lg:gap-8">
                        <div className="flex lg:flex-col gap-2 lg:gap-1 text-[11px] uppercase tracking-[0.14em] font-bold text-[#0c6a72]">
                          <span>{paper.kind}</span><span className="text-[#7a8587]">{paper.month} {paper.year}</span>
                        </div>
                        <div className="max-w-2xl">
                          <h3 className="font-serif !font-normal text-2xl sm:text-[2rem] leading-[1.06] text-[#172126] tracking-[-0.035em]">{paper.title}</h3>
                          <p className="mt-4 text-[15px] leading-7 text-[#526064]">{paper.description}</p>
                          <p className="mt-4 text-xs text-[#7a8587]">{paper.authors}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-[#526064] shrink-0 lg:pt-1">
                          <span>{paper.venue}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#0c6a72] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                        </div>
                      </div>
                    </Link>
                    ) : (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="group block py-9 sm:py-11 px-1 sm:px-5 -mx-1 sm:-mx-5">
                      <div className="grid lg:grid-cols-[155px_1fr_auto] gap-4 lg:gap-8">
                        <div className="flex lg:flex-col gap-2 lg:gap-1 text-[11px] uppercase tracking-[0.14em] font-bold text-[#0c6a72]"><span>{paper.kind}</span><span className="text-[#7a8587]">{paper.month} {paper.year}</span></div>
                        <div className="max-w-2xl"><h3 className="font-serif !font-normal text-2xl sm:text-[2rem] leading-[1.06] text-[#172126] tracking-[-0.035em]">{paper.title}</h3><p className="mt-4 text-[15px] leading-7 text-[#526064]">{paper.description}</p><p className="mt-4 text-xs text-[#7a8587]">{paper.authors}</p></div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-[#526064] shrink-0 lg:pt-1"><span>{paper.venue}</span><ArrowUpRight className="w-4 h-4 text-[#0c6a72] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden /></div>
                      </div>
                    </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-16 sm:py-20 grid md:grid-cols-[1fr_2fr] gap-6 border-b border-[#d8dcdd]">
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#0c6a72]">No published entry</p>
                <div>
                  <h3 className="font-serif !font-normal text-3xl tracking-[-0.035em]">Olyxee updates will appear here.</h3>
                  <p className="mt-4 max-w-xl text-[#687579]">This desk is being established as the durable record for releases, research notes, engineering updates, and milestones. We will add entries when there is something concrete to publish.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto bg-[#172126] text-[#f4f6f5] p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1.3fr_.7fr] gap-10 items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#8bd0c9]">A working archive</p>
              <h2 className="font-serif !font-normal text-4xl sm:text-5xl tracking-[-0.045em] leading-[1.02] mt-5 max-w-2xl">Building operational intelligence is a practice worth documenting.</h2>
            </div>
            <div className="lg:justify-self-end lg:max-w-xs">
              <p className="text-[15px] leading-7 text-[#c3cece] mb-7">Have a specific operational problem or a research conversation in mind? Start with the work, not the pitch.</p>
              <Link href="/contact" className="group inline-flex items-center gap-2 border border-[#8bd0c9] px-5 py-3 text-sm font-semibold text-[#f4f6f5] hover:bg-[#8bd0c9] hover:text-[#172126] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8bd0c9]">
                Talk with Olyxee <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;