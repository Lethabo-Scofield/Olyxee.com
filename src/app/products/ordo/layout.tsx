import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ordo | AI Verification Engine",
  description:
    "Ordo is Olyxee's AI verification engine. It ensures AI models work correctly before and after deployment with real-time monitoring, drift detection, and automated testing.",
  alternates: {
    canonical: "https://olyxee.com/products/ordo",
  },
  openGraph: {
    title: "Ordo | AI Verification Engine | Olyxee",
    description:
      "AI verification engine that ensures models work correctly before and after deployment.",
    url: "https://olyxee.com/products/ordo",
  },
};

export default function OrdoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
