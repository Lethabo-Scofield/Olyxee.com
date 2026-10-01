import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import { getReadingTime, researchEntries, researchFilters, type ResearchFilter } from "../lib/research-content";

const isInternal = (url: string) => url.startsWith("/");

function EntryLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return isInternal(href)
    ? <Link href={href} className={className}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

const Research: FC = () => {
  const [activeFilter, setActiveFilter] = useState<ResearchFilter>("All entries");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [mediaError, setMediaError] = useState(false);
  const failedSources = useRef(new Set<string>());
  const visiblePapers = useMemo(
    () => (activeFilter === "All entries" ? researchEntries : researchEntries.filter((paper) => paper.category === activeFilter)),
    [activeFilter]
  );
  const countFor = (filter: ResearchFilter) =>
    filter === "All entries" ? researchEntries.length : researchEntries.filter((paper) => paper.category === filter).length;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaError) return;
    if (reducedMotion !== false) {
      video.pause();
      return;
    }
    let active = true;
    video.play().catch(() => {
      if (active && video.error) setMediaError(true);
    });
    return () => { active = false; };
  }, [reducedMotion, mediaError]);

  const handleSourceError = (format: string) => {
    failedSources.current.add(format);
    if (failedSources.current.size === 2) {
      setMediaError(true);
    }
  };

  return (
    <div className="research-page min-h-screen relative">
      <SEO
        title="Research | Organizational Intelligence | Olyxee"
        description="Explore Olyxee's research directions in Organizational Intelligence, including adaptive organizations, human-AI coordination, organizational models, agents and organizational learning."
        path="/research"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Olyxee Research",
          url: "https://olyxee.com/research",
          description: "Olyxee's research directions in Organizational Intelligence, alongside documented releases and selected research we follow.",
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
                author: paper.category === "News"
                  ? [{ "@type": "Organization", name: paper.authors, url: "https://olyxee.com" }]
                  : paper.category === "Release"
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

      <main className="pt-14">
        <section className="research-hero" aria-labelledby="research-heading">
          <div className="research-hero-heading">
            <h1 id="research-heading" className="research-display">Research</h1>
          </div>
          <div className="research-motion">
            <video
              ref={videoRef}
              className="research-motion-video"
              style={{ visibility: mediaError ? "hidden" : undefined }}
              poster="/images/research-motion-poster.jpg"
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Abstract network geometry and pale blue forms moving across a white field"
              onPlay={() => failedSources.current.clear()}
              onError={() => setMediaError(true)}
            >
              <source src="/videos/research-motion.mp4" type="video/mp4" onError={() => handleSourceError("mp4")} />
              <source src="/videos/research-motion.webm" type="video/webm" onError={() => handleSourceError("webm")} />
            </video>
            {mediaError && (
              <img src="/images/research-motion-poster.jpg" className="research-motion-video" alt="" width={1080} height={1350} />
            )}
          </div>
        </section>

        {/* Archive */}
        <section id="archive" className="research-archive scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32" aria-labelledby="archive-heading">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col gap-5 border-b border-[#dedee3] sm:flex-row sm:items-end sm:justify-between">
              <h2 id="archive-heading" className="pb-4 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">Research and releases</h2>
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
                          <p className="mt-3 text-[13px] text-[#86868b]">
                            {paper.authors} <span aria-hidden="true">·</span> {paper.venue}
                            {paper.articleSections ? <> <span aria-hidden="true">·</span> {getReadingTime(paper)} min read</> : ""}
                          </p>
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
