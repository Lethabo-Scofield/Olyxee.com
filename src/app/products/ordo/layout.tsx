import type { Metadata } from "next";

const description =
  "Orgni is the operational intelligence platform by Olyxee. It connects your company's knowledge, decisions, processes, responsibilities, systems, and controls into a living operational context layer, giving intelligent systems the live business context they need to understand how work actually happens.";

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
    "Live business context layer",
    "Operational memory across systems",
    "Connects knowledge, decisions, processes, and controls",
    "Cross-system integration: ERP, databases, spreadsheets, business tools",
    "Auditable, traceable operations",
    "Model-neutral architecture",
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
