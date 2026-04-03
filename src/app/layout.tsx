import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  style: ["normal", "italic"],
});

const siteUrl = "https://olyxee.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Olyxee | Research and Infrastructure for Artificial Intelligence",
    template: "%s | Olyxee",
  },
  description:
    "Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence. We make AI applications more reliable, accurate, and observable in production.",
  keywords: [
    "Olyxee",
    "AI infrastructure",
    "AI verification",
    "AI evaluation",
    "AI monitoring",
    "AI reliability",
    "AI observability",
    "Grysics",
    "hallucination detection",
    "LLM evaluation",
    "LLM testing",
    "AI quality assurance",
    "AI production monitoring",
    "model evaluation",
    "AI drift detection",
    "AI application testing",
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
    title: "Olyxee | Research and Infrastructure for Artificial Intelligence",
    description:
      "Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Olyxee - Research and Infrastructure for AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olyxee | Research and Infrastructure for Artificial Intelligence",
    description:
      "Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence.",
    images: ["/api/og"],
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
    <html lang="en">
      <head>
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
              url: "https://olyxee.com",
              logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
              description: "Olyxee builds verification, evaluation, and monitoring infrastructure so teams can ship AI with confidence. We make AI applications more reliable, accurate, and observable in production.",
              foundingDate: "2024",
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
              url: "https://olyxee.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://olyxee.com/docs?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
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
