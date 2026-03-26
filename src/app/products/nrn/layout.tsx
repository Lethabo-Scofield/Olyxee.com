import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NRN — Neural Residual Networks",
  description:
    "Explore Olyxee's NRN research — Neural Residual Networks for interpretable, efficient AI with 92% explainability score.",
  alternates: {
    canonical: "https://olyxee.com/products/nrn",
  },
  openGraph: {
    title: "NRN — Neural Residual Networks | Olyxee",
    description:
      "Neural Residual Networks for interpretable, efficient AI systems.",
    url: "https://olyxee.com/products/nrn",
  },
};

export default function NRNLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
