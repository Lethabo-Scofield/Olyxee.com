import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";

const papers = [
  {
    category: "Release" as const,
    source: "Olyxee",
    title: "FinIR: A financial intermediate representation for AI-native computation",
    authors: "Lethabo Scofield and Alisha Fatima",
    venue: "Research · Release",
    month: "Sep",
    year: "2026",
    url: "/research/finir",
    description:
      "A finance-typed compiler and incremental execution runtime that turns structured financial intent into deterministic, auditable financial computation.",
  },
  {
    category: "Publication" as const,
    source: "Research we follow",
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

type ResearchFilter = "All" | "Publication" | "Release";

const Research: FC = () => {
  const [activeFilter, setActiveFilter] = useState<ResearchFilter>("All");
  const filters: ResearchFilter[] = ["All", "Publication", "Release"];
  const visiblePapers = useMemo(
    () =>
      activeFilter === "All"
        ? papers
        : papers.filter((paper) => paper.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="research-page min-h-screen relative">
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
                 author: paper.category === "Release"
                   ? [
                        {
                          "@type": "Person",
                          name: "Lethabo Scofield",
                          url: "https://www.linkedin.com/in/lethabo-scofield-17b37a257/",
                        },
                        {
                          "@type": "Person",
                          name: "Alisha Fatima",
                          url: "https://www.linkedin.com/in/thealisha-fatima/",
                        },
                     ]
                   : [
                       { "@type": "Person", name: "P. Laban" },
                       { "@type": "Person", name: "T. Schnabel" },
                       { "@type": "Person", name: "J. Neville" },
                     ],
                 url: paper.url.startsWith("/") ? `https://olyxee.com${paper.url}` : paper.url,
                 datePublished: paper.category === "Release" ? "2026-09-03" : "2026-04-01",
                publisher: { "@type": "Organization", name: paper.venue },
              },
            })),
          },
        }}
      />
      <div className="grain" />
      <Header />

      <main>
        <section className="px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-40">
          <div className="mx-auto max-w-[1120px]">
            <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#6e6e73]">
              Olyxee / Editorial desk
            </p>
            <h1 className="text-[3.25rem] font-semibold leading-[0.97] tracking-[-0.065em] text-[#1d1d1f] sm:text-[5.25rem]">
              Research
            </h1>
            <p className="mt-7 max-w-[660px] text-[17px] leading-8 tracking-[-0.015em] text-[#6e6e73] sm:text-[19px]">
              Product releases, technical work, and selected research shaping how
              we build dependable systems for real operations.
            </p>
            <nav
              className="mt-11 flex gap-7 overflow-x-auto border-b border-[#dedee3] text-[13px] no-scrollbar sm:gap-9"
              aria-label="Filter research"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`research-filter whitespace-nowrap font-medium transition-colors ${
                    activeFilter === filter
                      ? "text-[#1d1d1f]"
                      : "text-[#86868b] hover:text-[#3a3a3c]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section id="archive" className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-[1120px]">
            {visiblePapers.length > 0 ? (
              <ul className="border-t border-[#dedee3]">
                {visiblePapers.map((paper) => (
                  <li key={paper.title} className="research-entry border-b border-[#dedee3]">
                    {paper.url.startsWith("/") ? (
                    <Link href={paper.url} className="group block py-8 sm:py-11">
                       <div className="grid gap-5 lg:grid-cols-[132px_minmax(0,1fr)_150px] lg:gap-10">
                         <div className="flex items-center gap-2.5 self-start font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#4c4c50] lg:flex-col lg:items-start lg:gap-1">
                           <span>{paper.category}</span><span className="text-[#86868b]">{paper.month} {paper.year}</span>
                        </div>
                         <div className="max-w-[710px]">
                           <h3 className="font-serif text-[25px] leading-[1.13] text-[#1d1d1f] sm:text-[31px]">{paper.title}</h3>
                           <p className="mt-3.5 max-w-[640px] text-[14px] leading-6 text-[#6e6e73] sm:text-[15px]">{paper.description}</p>
                           <p className="mt-4 font-mono text-[10px] leading-5 tracking-[0.02em] text-[#86868b]">{paper.authors}</p>
                        </div>
                         <div className="flex items-center gap-2 text-[11px] font-medium text-[#6e6e73] lg:justify-end lg:pt-1">
                          <span>{paper.source}</span>
                           <ArrowUpRight className="h-3.5 w-3.5 text-[#1d1d1f] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </div>
                      </div>
                    </Link>
                    ) : (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="group block py-8 sm:py-11">
                       <div className="grid gap-5 lg:grid-cols-[132px_minmax(0,1fr)_150px] lg:gap-10">
                         <div className="flex items-center gap-2.5 self-start font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#4c4c50] lg:flex-col lg:items-start lg:gap-1"><span>{paper.category}</span><span className="text-[#86868b]">{paper.month} {paper.year}</span></div>
                         <div className="max-w-[710px]"><h3 className="font-serif text-[25px] leading-[1.13] text-[#1d1d1f] sm:text-[31px]">{paper.title}</h3><p className="mt-3.5 max-w-[640px] text-[14px] leading-6 text-[#6e6e73] sm:text-[15px]">{paper.description}</p><p className="mt-4 font-mono text-[10px] leading-5 tracking-[0.02em] text-[#86868b]">{paper.authors}</p></div>
                         <div className="flex items-center gap-2 text-[11px] font-medium text-[#6e6e73] lg:justify-end lg:pt-1"><span>{paper.source}</span><ArrowUpRight className="h-3.5 w-3.5 text-[#1d1d1f] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></div>
                      </div>
                    </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-[#dedee3] py-12 text-sm text-[#6e6e73]">
                No {activeFilter.toLowerCase()} entries yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;