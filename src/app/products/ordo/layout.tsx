import type { Metadata } from "next";

const description =
  "Ordo is an AI execution system by Olyxee. Tell it a business goal in plain English and it plans, calls the right tools, and ships the completed work — combining GPT/Claude reasoning with n8n-style workflow orchestration across Gmail, Stripe, QuickBooks, Salesforce, Notion, Slack and more.";

export const metadata: Metadata = {
  title: "Ordo | AI Execution System for Business Operations",
  description,
  keywords: [
    "Ordo",
    "Olyxee Ordo",
    "AI execution system",
    "AI agent for business",
    "AI workflow automation",
    "goal to workflow AI",
    "AI orchestration",
    "GPT-4 agent",
    "Claude agent",
    "n8n alternative AI",
    "AI for finance operations",
    "stateful AI agent",
    "auditable AI agent",
  ],
  alternates: {
    canonical: "https://olyxee.com/products/ordo",
  },
  openGraph: {
    type: "website",
    title: "Ordo | AI Execution System for Business Operations",
    description,
    url: "https://olyxee.com/products/ordo",
    siteName: "Olyxee",
    images: [
      {
        url: "/api/og?title=Ordo&subtitle=AI%20execution%20system%20for%20business%20operations",
        width: 1200,
        height: 630,
        alt: "Ordo by Olyxee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ordo | AI Execution System",
    description,
  },
};

const ordoJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ordo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://ordo.olyxee.com",
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
    url: "https://ordo.olyxee.com",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://olyxee.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://olyxee.com/products" },
    { "@type": "ListItem", position: 3, name: "Ordo", item: "https://olyxee.com/products/ordo" },
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
