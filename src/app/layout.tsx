import type { Metadata, Viewport } from "next";
import { Geist, Inter, Caveat } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-handwritten",
});

const siteUrl = "https://olyxee.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Olyxee | Research and Infrastructure for Operational Intelligence",
    template: "%s | Olyxee",
  },
  description:
    "Olyxee is a research and infrastructure company helping businesses adapt to AI. We study the challenges organisations face when adopting AI, then build the infrastructure required to turn advanced intelligence into reliable organisational capability. Orgni, our core platform, connects scattered documents, workflows, decisions, roles, rules, and operational signals into structured business context.",
  keywords: [
    "Olyxee",
    "operational intelligence",
    "live business context",
    "business infrastructure",
    "operational memory",
    "decision history",
    "model-neutral architecture",
    "intelligent operations",
    "AI infrastructure",
    "Orgni",
    "Olyxee Document Integrity",
    "Togent",
    "Order Loop",
    "AI reliability",
    "business context for AI",
    "operational workflows",
    "financial operations",
    "document integrity",
    "AI for operations",
    "intelligent systems inside real businesses",
    "responsible AI",
    "AI research",
  ],
  authors: [{ name: "Olyxee" }, { name: "Lethabo Scofield", url: "https://lethaboscofield.web.app/" }],
  creator: "Olyxee",
  publisher: "Olyxee",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "https://olyxee.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Olyxee",
    title: "Olyxee | Research and Infrastructure for Operational Intelligence",
    description:
      "Olyxee is a research and infrastructure company helping businesses adapt to AI, turning advanced intelligence into reliable organisational capability.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Olyxee - Research and Infrastructure for Operational Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olyxee | Research and Infrastructure for Operational Intelligence",
    description:
      "Olyxee is a research and infrastructure company helping businesses adapt to AI, turning advanced intelligence into reliable organisational capability.",
    images: ["/og-image.jpg"],
    creator: "@Olyxee",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Olyxee",
              alternateName: ["Olyxee AI", "Olyxee Inc"],
              slogan: "Research and infrastructure for operational intelligence",
              url: "https://olyxee.com",
              logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
              description: "Olyxee is a research and infrastructure company helping businesses adapt to AI. We study the challenges organisations face when adopting AI, then build the infrastructure required to turn advanced intelligence into reliable organisational capability. Orgni, our core platform, creates a living operational model of an organisation.",
              knowsAbout: [
                "Operational intelligence",
                "Live business context",
                "Business infrastructure",
                "AI infrastructure",
                "Operational memory",
                "Decision history",
                "Model-neutral architecture",
                "Intelligent operations",
                "Document integrity",
                "Operational workflows",
                "Financial operations",
                "AI research"
              ],
              foundingDate: "2025",
              sameAs: [
                "https://twitter.com/olyxee",
                "https://www.linkedin.com/company/olyxee/",
                "https://github.com/olyxee"
              ],
              founder: {
                "@type": "Person",
                name: "Lethabo Scofield",
                url: "https://lethaboscofield.web.app/"
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "General Inquiry",
                url: "https://olyxee.com/contact"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Olyxee",
              alternateName: "Olyxee AI",
              url: "https://olyxee.com",
              description: "Olyxee is a research and infrastructure company helping businesses adapt to AI, turning advanced intelligence into reliable organisational capability.",
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                name: "Olyxee",
                url: "https://olyxee.com"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://olyxee.com/docs?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${geist.variable} ${inter.variable} ${caveat.variable} antialiased overflow-x-hidden`}>
        <ErrorReporter />
        <PageTransitionLoader />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
