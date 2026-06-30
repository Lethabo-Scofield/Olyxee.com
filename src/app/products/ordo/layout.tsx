import type { Metadata } from "next";

const description =
  "Orgni is the operational intelligence platform by Olyxee. Describe a business goal in plain English and Orgni plans, calls the right tools, and ships the completed work, combining live business context with workflow orchestration across Gmail, Stripe, QuickBooks, Salesforce, Notion, Slack and more.";

export const metadata: Metadata = {
  title: "Orgni | Operational Intelligence for Business Operations",
  description,
  keywords: [
    "Orgni",
    "Olyxee Orgni",
    "operational intelligence platform",
    "AI for business operations",
    "operational workflows",
    "live business context",
    "operational memory",
    "GPT-4 agent",
    "Claude agent",
    "model-neutral architecture",
    "financial operations",
    "stateful AI platform",
    "auditable AI platform",
  ],
  alternates: {
    canonical: "https://olyxee.com/products/ordo",
  },
  openGraph: {
    type: "website",
    title: "Orgni | Operational Intelligence for Business Operations",
    description,
    url: "https://olyxee.com/products/ordo",
    siteName: "Olyxee",
    images: [
      {
        url: "/api/og?title=Orgni&subtitle=Operational%20intelligence%20for%20business%20operations",
        width: 1200,
        height: 630,
        alt: "Orgni by Olyxee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgni | Operational Intelligence Platform",
    description,
  },
};

const ordoJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Orgni",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://orgni.olyxee.com",
  description,
  brand: { "@type": "Brand", name: "Olyxee" },
  publisher: {
    "@type": "Organization",
    name: "Olyxee",
    url: "https://olyxee.com",
    logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
  },
  featureList: [
    "Plain-English goal input",
    "Multi-step planning across tools",
    "Stateful memory across runs",
    "Tool integrations: Gmail, Stripe, QuickBooks, Salesforce, Notion, Slack",
    "Auditable execution traces",
    "Reasoning powered by GPT-4, Claude and DeepSeek",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://orgni.olyxee.com",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://olyxee.com" },
    { "@type": "ListItem", position: 2, name: "Enterprise", item: "https://olyxee.com/enterprise" },
    { "@type": "ListItem", position: 3, name: "Orgni", item: "https://olyxee.com/products/ordo" },
  ],
};

export default function OrdoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ordoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
