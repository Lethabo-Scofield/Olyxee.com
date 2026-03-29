import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Olyxee — Research and Safety for Artificial Intelligence",
    template: "%s | Olyxee",
  },
  description:
    "Olyxee is an AI infrastructure company building Grysics, a verification engine that ensures AI models work correctly before and after deployment. Research, safety, and reliability for artificial intelligence.",
  keywords: [
    "AI infrastructure",
    "AI verification",
    "Grysics",
    "AI safety",
    "model deployment",
    "edge AI",
    "AI reliability",
    "machine learning operations",
    "MLOps",
    "AI monitoring",
    "Olyxee",
    "AI research",
  ],
  authors: [{ name: "Olyxee" }],
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
    title: "Olyxee — Research and Safety for Artificial Intelligence",
    description:
      "AI infrastructure company building Grysics — a verification engine that ensures AI models work correctly before and after deployment.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Olyxee — Research and Safety for AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olyxee — Research and Safety for Artificial Intelligence",
    description:
      "AI infrastructure company building Grysics — a verification engine for reliable AI deployment.",
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
    icon: "/Logo/Olyxee_Logo.png",
    apple: "/Logo/Olyxee_Logo.png",
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
        <link rel="icon" href="/Logo/Olyxee_Logo.png" />
        <link rel="apple-touch-icon" href="/Logo/Olyxee_Logo.png" />
        <meta name="theme-color" content="#ffffff" />
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
