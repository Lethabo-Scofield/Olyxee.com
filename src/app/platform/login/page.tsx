import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { currentPlatformUser } from "@/lib/platform-auth";
import AccountForm from "@/components/platform/account-form";

export const metadata: Metadata = { title: "Sign in · Olyxee Workspace", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await currentPlatformUser()) redirect("/platform");
  return <AccountForm mode="login" />;
}