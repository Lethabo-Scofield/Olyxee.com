import type { Metadata } from "next";

const description =
  "How FreightShift used Orgni, Olyxee's infrastructure for operational intelligence, to plan, dispatch, and reconcile cross-border freight without expanding headcount.";

export const metadata: Metadata = {
  title: "FreightShift scales without scaling headcount | Customer story",
  description,
  alternates: { canonical: "https://olyxee.com/stories/freightshift" },
  openGraph: {
    type: "article",
    title: "FreightShift scales without scaling headcount",
    description,
    url: "https://olyxee.com/stories/freightshift",
    siteName: "Olyxee",
    images: [{ url: "/api/og?title=FreightShift&subtitle=Customer%20story", width: 1200, height: 630, alt: "FreightShift Olyxee customer story" }],
  },
  twitter: { card: "summary_large_image", title: "FreightShift scales without scaling headcount", description },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://olyxee.com" },
    { "@type": "ListItem", position: 2, name: "FreightShift story", item: "https://olyxee.com/stories/freightshift" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "FreightShift scales without scaling headcount",
  description,
  image: ["https://olyxee.com/og-image.jpg"],
  datePublished: "2025-11-01T00:00:00.000Z",
  dateModified: "2026-05-13T00:00:00.000Z",
  inLanguage: "en",
  articleSection: "Customer story",
  author: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
  publisher: {
    "@type": "Organization",
    name: "Olyxee",
    logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
  },
  mainEntityOfPage: "https://olyxee.com/stories/freightshift",
};

export default function FreightShiftStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
