import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Internship",
  description: "Verify the authenticity of an Olyxee internship by entering a verification code.",
  alternates: { canonical: "/verify" },
  robots: { index: false, follow: false },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
