import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import SEO from "../../../components/SEO";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { getEntrySlug, getReadingTime, researchEntries, type ResearchEntry } from "../../../lib/research-content";

type Props = {
  entry: ResearchEntry;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: researchEntries
    .filter((entry) => entry.category === "News" && entry.url.startsWith("/research/news/"))
    .map((entry) => ({ params: { slug: getEntrySlug(entry.url) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const entry = researchEntries.find(
    (candidate) =>
      candidate.category === "News" &&
      candidate.url.startsWith("/research/news/") &&
      getEntrySlug(candidate.url) === slug,
  );

  if (!entry) return { notFound: true };
  return { props: { entry } };
};

export default function NewsArticle({ entry }: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = entry.description;
  const image = `https://olyxee.com${entry.coverImage ?? "/og-image.jpg"}`;
  const readingTime = getReadingTime(entry.body);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SEO
        title={entry.title}
        description={description}
        path={entry.url}
        ogType="article"
        ogImage={image}
        ogImageAlt={`${entry.title} - Olyxee`}
        publishedTime={entry.date}
        authors={[entry.authors]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description,
          image: [image],
          datePublished: entry.date,
          author: { "@type": "Organization", name: entry.authors },
          publisher: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
            logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
          },
          mainEntityOfPage: `https://olyxee.com${entry.url}`,
        }}
      />
      <Header />
      <main>
        <article className="px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-36">
          <div className="mx-auto max-w-[920px]">
            <Link
              href="/research#archive"
              className="inline-flex text-[13px] font-medium text-[#86868b] transition-colors hover:text-[#1d1d1f]"
            >
              ← News / All entries
            </Link>
            <header className="mt-12 max-w-[760px]">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#86868b]">{entry.category}</p>
              <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[4.5rem]">
                {entry.title}
              </h1>
              <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-[#6e6e73]">
                <span>{entry.authors}</span>
                <span aria-hidden>·</span>
                <time dateTime={entry.date}>{entry.month} {entry.year}</time>
                <span aria-hidden>·</span>
                <span>{readingTime} min read</span>
              </div>
            </header>

            <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-3xl border border-[#e5e5ea] bg-[#f4f4f2]">
              <Image
                src={entry.coverImage ?? "/og-image.jpg"}
                alt="Olyxee and Anthropic Claude Partner Network"
                fill
                priority
                className="object-contain p-12 sm:p-20"
                sizes="(max-width: 920px) 100vw, 920px"
              />
            </div>

            <div className="mx-auto mt-14 max-w-[680px]">
              <div className="space-y-6 text-[17px] leading-[1.75] text-[#3a3a3c] sm:text-[18px]">
                {entry.body?.map((paragraph, index) =>
                  paragraph.endsWith(":") || paragraph === "Build the research and infrastructure for operational intelligence." ? (
                    <p key={paragraph} className={index === (entry.body?.length ?? 0) - 1 ? "font-medium text-[#1d1d1f]" : "pt-2"}>
                      {paragraph}
                    </p>
                  ) : (
                    <p key={paragraph}>{paragraph}</p>
                  ),
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}