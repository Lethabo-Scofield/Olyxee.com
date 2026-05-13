import type { Metadata } from "next";

const description =
  "How a mid-market financial services firm cut month-end close from five days to overnight using Olyxee's Addup reconciliation and Ordo execution systems.";

export const metadata: Metadata = {
  title: "Accounting close in hours, not days | Customer story",
  description,
  alternates: { canonical: "https://olyxee.com/stories/accounting" },
  openGraph: {
    type: "article",
    title: "Accounting close in hours, not days",
    description,
    url: "https://olyxee.com/stories/accounting",
    siteName: "Olyxee",
    images: [{ url: "/api/og?title=Accounting%20close&subtitle=Customer%20story", width: 1200, height: 630, alt: "Olyxee accounting customer story" }],
  },
  twitter: { card: "summary_large_image", title: "Accounting close in hours, not days", description },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://olyxee.com" },
    { "@type": "ListItem", position: 2, name: "Accounting story", item: "https://olyxee.com/stories/accounting" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Month-end close dropped from five days to overnight",
  description,
  image: ["https://olyxee.com/og-image.jpg"],
  datePublished: "2025-09-01T00:00:00.000Z",
  dateModified: "2026-05-13T00:00:00.000Z",
  inLanguage: "en",
  articleSection: "Customer story",
  author: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
  publisher: {
    "@type": "Organization",
    name: "Olyxee",
    logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
  },
  mainEntityOfPage: "https://olyxee.com/stories/accounting",
};

export default function AccountingStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
