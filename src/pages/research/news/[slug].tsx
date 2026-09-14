import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SEO from "../../../components/SEO";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import {
  getEntrySlug,
  getReadingTime,
  researchEntries,
  type ArticleParagraph,
  type ResearchEntry,
} from "../../../lib/research-content";

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

function RichParagraph({ paragraph }: { paragraph: ArticleParagraph }) {
  if (typeof paragraph === "string") return <>{paragraph}</>;

  let remainder = paragraph.text;
  const content: ReactNode[] = [];

  paragraph.links.forEach((link, index) => {
    const position = remainder.indexOf(link.text);
    if (position === -1) return;
    content.push(remainder.slice(0, position));
    content.push(
      <a
        key={`${link.href}-${index}`}
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="font-medium text-[#1d1d1f] underline decoration-[#c7c7cc] underline-offset-4 transition-colors hover:decoration-[#1d1d1f]"
      >
        {link.text}
      </a>,
    );
    remainder = remainder.slice(position + link.text.length);
  });
  content.push(remainder);
  return <>{content}</>;
}

export default function NewsArticle({ entry }: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = entry.description;
  const image = `https://olyxee.com${entry.coverImage ?? "/og-image.jpg"}`;
  const readingTime = getReadingTime(entry);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SEO
        title={entry.title}
        description={description}
        path={entry.url}
        ogType="article"
        ogImage={image}
        ogImageAlt={`${entry.title} - Olyxee`}
        ogTitle={entry.title}
        ogDescription="How the Claude Partner Network strengthens Olyxee’s work on operational intelligence, Orgni and Olyxee Logistics."
        publishedTime={entry.date}
        authors={[entry.authors]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
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
              {entry.deck && (
                <p className="mt-7 max-w-[700px] text-[19px] leading-[1.6] text-[#6e6e73] sm:text-[22px]">
                  {entry.deck}
                </p>
              )}
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

            <div className="mx-auto mt-16 max-w-[680px]">
              {entry.articleSections?.map((section, sectionIndex) => (
                <section
                  key={`${section.heading ?? "introduction"}-${sectionIndex}`}
                  className={sectionIndex === 0 ? "" : "mt-16 border-t border-[#eeeeef] pt-14 sm:mt-20 sm:pt-16"}
                >
                  {section.heading && (
                    <h2 className="mb-8 text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#1d1d1f] sm:text-[2.5rem]">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-6 text-[17px] leading-[1.75] text-[#3a3a3c] sm:text-[18px]">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${sectionIndex}-${paragraphIndex}`}>
                        <RichParagraph paragraph={paragraph} />
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-8 space-y-3 border-l border-[#c7c7cc] pl-6 text-[16px] leading-[1.65] text-[#3a3a3c] sm:text-[17px]">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {section.image && (
                    <figure className="my-12 sm:my-16 lg:-ml-[120px] lg:w-[920px]">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#e5e5ea] bg-[#f4f4f2]">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          sizes="(max-width: 920px) 100vw, 920px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-[12px] leading-5 text-[#86868b]">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </section>
              ))}
            </div>

            <aside className="mx-auto mt-20 max-w-[680px] border-t border-[#dedee3] pt-10" aria-labelledby="explore-more">
              <h2 id="explore-more" className="text-[1.25rem] font-semibold tracking-[-0.02em]">Explore more from Olyxee</h2>
              <ul className="mt-5 divide-y divide-[#eeeeef]">
                {[
                  { label: "Orgni", href: "https://orgni.olyxee.com/", detail: "Operational intelligence for teams and business operations" },
                  { label: "Olyxee Logistics", href: "https://logistics.olyxee.com/", detail: "Operational infrastructure for cross-border logistics" },
                  { label: "Introducing FinIR", href: "/research/finir", detail: "Typed, auditable financial computation" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-start justify-between gap-6 py-5"
                    >
                      <span>
                        <strong className="block text-[15px] font-medium text-[#1d1d1f]">{item.label}</strong>
                        <span className="mt-1 block text-[13px] leading-5 text-[#86868b]">{item.detail}</span>
                      </span>
                      <span className="text-[#86868b] transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}