import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { currentPlatformUser } from "@/lib/platform-auth";
import PlatformDashboard from "@/components/platform/platform-dashboard";

export const metadata: Metadata = { title: "Olyxee Workspace", robots: { index: false, follow: false } };

export default async function PlatformPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const user = await currentPlatformUser();
  if (!user) redirect("/platform/login");
  const { view } = await searchParams;
  return <PlatformDashboard user={{ name: user.name, email: user.email, company: user.company, createdAt: user.created_at.toISOString() }} initialView={view ?? "home"} />;
}