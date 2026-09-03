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
    authors: "Lethabo Innocent ScoField and Alisha Fatima",
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

type ResearchFilter = "All" | "Publication" | "Milestone" | "Release";

const Research: FC = () => {
  const [activeFilter, setActiveFilter] = useState<ResearchFilter>("All");
  const filters: ResearchFilter[] = ["All", "Publication", "Milestone", "Release"];
  const visiblePapers = useMemo(
    () =>
      activeFilter === "All"
        ? papers
        : papers.filter((paper) => paper.category === activeFilter),
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
                 author: paper.category === "Release"
                   ? [
                        {
                          "@type": "Person",
                          name: "Lethabo Innocent ScoField",
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
        <section className="px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-5xl font-medium tracking-[-0.045em] text-[#172126] sm:text-7xl">
              Research
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#526064] sm:text-xl">
              Product releases, technical work, and selected research shaping how
              we build dependable systems for real operations.
            </p>
            <nav
              className="mt-10 flex gap-7 overflow-x-auto border-b border-[#d8dcdd] pb-4 text-sm no-scrollbar"
              aria-label="Filter research"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] ${
                    activeFilter === filter
                      ? "font-semibold text-[#172126]"
                      : "text-[#687579] hover:text-[#172126]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section id="archive" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            {visiblePapers.length > 0 ? (
              <ul className="divide-y divide-[#d8dcdd]">
                {visiblePapers.map((paper) => (
                  <li key={paper.title} className="research-entry">
                    {paper.url.startsWith("/") ? (
                    <Link href={paper.url} className="group block py-9 sm:px-4 sm:py-12">
                      <div className="grid lg:grid-cols-[155px_1fr_auto] gap-4 lg:gap-8">
                        <div className="flex lg:flex-col gap-2 lg:gap-1 text-[11px] uppercase tracking-[0.14em] font-bold text-[#171717]">
                          <span>{paper.category}</span><span className="text-[#7a8587]">{paper.month} {paper.year}</span>
                        </div>
                        <div className="max-w-2xl">
                          <h3 className="font-serif !font-normal text-2xl sm:text-[2rem] leading-[1.06] text-[#172126] tracking-[-0.035em]">{paper.title}</h3>
                          <p className="mt-4 text-[15px] leading-7 text-[#526064]">{paper.description}</p>
                          <p className="mt-4 text-xs text-[#7a8587]">{paper.authors}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-[#526064] shrink-0 lg:pt-1">
                          <span>{paper.source}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#171717] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                        </div>
                      </div>
                    </Link>
                    ) : (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="group block py-9 sm:px-4 sm:py-12">
                      <div className="grid lg:grid-cols-[155px_1fr_auto] gap-4 lg:gap-8">
                        <div className="flex lg:flex-col gap-2 lg:gap-1 text-[11px] uppercase tracking-[0.14em] font-bold text-[#171717]"><span>{paper.category}</span><span className="text-[#7a8587]">{paper.month} {paper.year}</span></div>
                        <div className="max-w-2xl"><h3 className="font-serif !font-normal text-2xl sm:text-[2rem] leading-[1.06] text-[#172126] tracking-[-0.035em]">{paper.title}</h3><p className="mt-4 text-[15px] leading-7 text-[#526064]">{paper.description}</p><p className="mt-4 text-xs text-[#7a8587]">{paper.authors}</p></div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-[#526064] shrink-0 lg:pt-1"><span>{paper.source}</span><ArrowUpRight className="w-4 h-4 text-[#171717] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden /></div>
                      </div>
                    </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-[#d8dcdd] py-12 text-sm text-[#687579]">
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