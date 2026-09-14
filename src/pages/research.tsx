import { FC, ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { researchEntries, researchFilters, type ResearchFilter } from "../lib/research-content";

const isInternal = (url: string) => url.startsWith("/");

function EntryLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return isInternal(href)
    ? <Link href={href} className={className}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

const Research: FC = () => {
  const [activeFilter, setActiveFilter] = useState<ResearchFilter>("All entries");
  const visiblePapers = useMemo(
    () => (activeFilter === "All entries" ? researchEntries : researchEntries.filter((paper) => paper.category === activeFilter)),
    [activeFilter]
  );
  const countFor = (filter: ResearchFilter) =>
    filter === "All entries" ? researchEntries.length : researchEntries.filter((paper) => paper.category === filter).length;

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
               itemListElement: researchEntries.map((paper, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                 "@type": paper.category === "News" ? "Article" : "ScholarlyArticle",
                headline: paper.title,
                name: paper.title,
                author: paper.category === "Release"
                  ? [
                      { "@type": "Person", name: "Lethabo Scofield", url: "https://www.linkedin.com/in/lethabo-scofield-17b37a257/" },
                      { "@type": "Person", name: "Alisha Fatima", url: "https://www.linkedin.com/in/thealisha-fatima/" },
                    ]
                  : [
                      { "@type": "Person", name: "P. Laban" },
                      { "@type": "Person", name: "T. Schnabel" },
                      { "@type": "Person", name: "J. Neville" },
                    ],
                url: isInternal(paper.url) ? `https://olyxee.com${paper.url}` : paper.url,
                datePublished: paper.date,
                publisher: { "@type": "Organization", name: paper.venue },
              },
            })),
          },
        }}
      />
      <div className="grain" />
      <Header />

      <main>
        {/* Intro */}
        <section className="px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mx-auto max-w-[1120px]">
            <div>
              <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-[#86868b]">Olyxee Research</p>
              <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1d1d1f] sm:text-[3.75rem]">
                Research and releases
              </h1>
              <p className="mt-6 max-w-[600px] text-[17px] leading-[1.65] text-[#6e6e73] sm:text-[18px]">
                Product releases, technical work, and selected research shaping how we build dependable systems for real operations.
              </p>
            </div>
          </div>
        </section>

        {/* Archive */}
        <section id="archive" className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32" aria-labelledby="archive-heading">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col gap-5 border-b border-[#dedee3] sm:flex-row sm:items-end sm:justify-between">
              <h2 id="archive-heading" className="pb-4 text-[1.375rem] font-semibold tracking-[-0.02em] text-[#1d1d1f]">All entries</h2>
               <nav className="flex gap-7 overflow-x-auto text-[13px] no-scrollbar" aria-label="Filter research">
                {researchFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                    className={`research-filter whitespace-nowrap font-medium transition-colors ${
                      activeFilter === filter ? "text-[#1d1d1f]" : "text-[#86868b] hover:text-[#3a3a3c]"
                    }`}
                  >
                    {filter}
                    <span className="ml-1.5 tabular-nums text-[#aeaeb2]">{countFor(filter)}</span>
                  </button>
                ))}
              </nav>
            </div>

            {visiblePapers.length > 0 ? (
              <ul>
                {visiblePapers.map((paper) => (
                  <li key={paper.title} className="research-entry border-b border-[#dedee3]">
                    <EntryLink href={paper.url} className="group block py-7 sm:py-9">
                      <div className="grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)_160px] lg:gap-10">
                        <div className="flex items-center gap-3 self-start text-[12px] font-medium uppercase tracking-[0.12em] text-[#4c4c50] lg:flex-col lg:items-start lg:gap-1">
                          <span>{paper.category}</span>
                          <time dateTime={paper.date} className="normal-case tracking-normal text-[#86868b]">{paper.month} {paper.year}</time>
                        </div>
                        <div className="max-w-[710px]">
                          <h3 className="text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.5rem]">{paper.title}</h3>
                          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.6] text-[#6e6e73]">{paper.description}</p>
                          <p className="mt-3 text-[13px] text-[#86868b]">{paper.authors} · {paper.venue}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-medium text-[#6e6e73] lg:justify-end lg:self-start lg:pt-1">
                          <span>{paper.source}</span>
                          <ArrowUpRight className="h-4 w-4 text-[#1d1d1f] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </div>
                      </div>
                    </EntryLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-b border-[#dedee3] py-12 text-sm text-[#6e6e73]">
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
