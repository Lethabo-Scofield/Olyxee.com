import type { Metadata } from "next";

const description =
  "How a logistics operations team replaced manual coordination with Olyxee's Ordo, automating dispatch, invoicing, and exception handling end-to-end.";

export const metadata: Metadata = {
  title: "Automating operations end-to-end | Customer story",
  description,
  alternates: { canonical: "https://olyxee.com/stories/automation" },
  openGraph: {
    type: "article",
    title: "Automating operations end-to-end",
    description,
    url: "https://olyxee.com/stories/automation",
    siteName: "Olyxee",
    images: [{ url: "/api/og?title=Operations%20automation&subtitle=Customer%20story", width: 1200, height: 630, alt: "Olyxee automation customer story" }],
  },
  twitter: { card: "summary_large_image", title: "Automating operations end-to-end", description },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://olyxee.com" },
    { "@type": "ListItem", position: 2, name: "Automation story", item: "https://olyxee.com/stories/automation" },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automating operations end-to-end with Ordo",
  description,
  image: ["https://olyxee.com/og-image.jpg"],
  datePublished: "2025-10-01T00:00:00.000Z",
  dateModified: "2026-05-13T00:00:00.000Z",
  inLanguage: "en",
  articleSection: "Customer story",
  author: { "@type": "Organization", name: "Olyxee", url: "https://olyxee.com" },
  publisher: {
    "@type": "Organization",
    name: "Olyxee",
    logo: { "@type": "ImageObject", url: "https://olyxee.com/Logo/Olyxee_Logo.png" },
  },
  mainEntityOfPage: "https://olyxee.com/stories/automation",
};

export default function AutomationStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
