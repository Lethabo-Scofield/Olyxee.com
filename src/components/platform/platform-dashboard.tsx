"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity, ArrowRight, BookOpen, ChevronDown, CreditCard, Home, KeyRound,
  LogOut, Menu, Settings2, UserRound, X,
} from "lucide-react";
import ProfilePanel from "./profile-panel";

type View = "home" | "access" | "usage" | "billing" | "profile";
type BillingTab = "Balance" | "Payment methods" | "Billing history" | "Credit grants" | "Settings" | "Pricing";
const views: { id: View; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "access", label: "API access", icon: KeyRound },
  { id: "usage", label: "Usage", icon: Activity },
  { id: "billing", label: "Billing", icon: CreditCard },
];
const billingTabs: BillingTab[] = ["Balance", "Payment methods", "Billing history", "Credit grants", "Settings", "Pricing"];
const headings: Record<View, { title: string; description: string }> = {
  home: { title: "Overview", description: "Your Olyxee API workspace at a glance." },
  access: { title: "API access", description: "Resources and updates for building with Olyxee." },
  usage: { title: "Usage", description: "Your API activity and reporting." },
  billing: { title: "Billing", description: "Manage billing for your workspace." },
  profile: { title: "Your profile", description: "Personal details and account security." },
};
const smallLink = "inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 hover:underline underline-offset-4";

export default function PlatformDashboard({ user, initialView }: {
  user: { name: string; email: string; company: string; createdAt: string };
  initialView: string;
}) {
  const view: View = views.some(item => item.id === initialView) || initialView === "profile" ? initialView as View : "home";
  const router = useRouter();
  const [account, setAccount] = useState(user);
  const [billingTab, setBillingTab] = useState<BillingTab>("Balance");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const firstName = account.name.split(" ")[0];

  async function signOut() {
    setSigningOut(true);
    setSignOutError("");
    try {
      const res = await fetch("/api/platform/logout", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
      });
      if (!res.ok) throw new Error("Could not sign out. Please try again.");
      router.replace("/platform/login");
      router.refresh();
    } catch (error) {
      setSignOutError(error instanceof Error ? error.message : "Could not sign out.");
      setSigningOut(false);
    }
  }

  function navLink(id: View, label: string, Icon: typeof Home) {
    return <Link key={id} href={id === "home" ? "/platform" : `/platform?view=${id}`} onClick={() => setMobileMenuOpen(false)}
      aria-current={view === id ? "page" : undefined}
      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${view === id ? "bg-neutral-100 font-semibold text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}>
      <Icon size={15} strokeWidth={1.7} aria-hidden />{label}
    </Link>;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex font-sans">
      {mobileMenuOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-neutral-900/25 md:hidden" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col border-r border-neutral-200 bg-white px-3 py-4 transition-transform md:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2 pb-7">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight" aria-label="Olyxee home">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-neutral-900 text-[11px] text-white">O</span>
            Olyxee <span className="font-normal text-neutral-400">/ Platform</span>
          </Link>
          <button className="md:hidden" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><X size={18} /></button>
        </div>
        <nav aria-label="Platform navigation" className="flex-1">
          <p className="px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-neutral-400">Workspace</p>
          <div className="space-y-0.5">{views.map(item => navLink(item.id, item.label, item.icon))}</div>
          <p className="px-2.5 pt-7 pb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-neutral-400">Resources</p>
          <Link href="/docs" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
            <BookOpen size={15} strokeWidth={1.7} />Documentation
          </Link>
          <p className="px-2.5 pt-7 pb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-neutral-400">Account</p>
          {navLink("profile", "Profile & security", UserRound)}
        </nav>
        <div className="border-t border-neutral-100 pt-3">
          <Link href="/platform?view=profile" className="flex min-w-0 items-center gap-2.5 rounded-md p-2 hover:bg-neutral-50">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-xs font-semibold">{account.name.slice(0, 1).toUpperCase()}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium">{account.name}</span><span className="block truncate text-[11px] text-neutral-400">{account.email}</span></span>
            <ChevronDown size={13} className="-rotate-90 text-neutral-400" />
          </Link>
          <button onClick={signOut} disabled={signingOut} className="mt-1 flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-50">
            <LogOut size={14} />{signingOut ? "Signing out..." : "Sign out"}
          </button>
          {signOutError && <p role="alert" className="px-2 text-xs text-red-600">{signOutError}</p>}
        </div>
      </aside>
      <div className="min-w-0 flex-1 md:pl-[220px]">
        <header className="flex h-14 items-center justify-between border-b border-neutral-100 px-5 md:px-8">
          <button className="md:hidden" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}><Menu size={19} /></button>
          <span className="hidden text-xs text-neutral-500 md:block">Workspace <span className="mx-2 text-neutral-300">/</span> {headings[view].title}</span>
          <Link href="/platform?view=profile" className="flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-900">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-800">{account.name.slice(0, 1).toUpperCase()}</span>
            <span className="hidden sm:block">{account.name}</span>
          </Link>
        </header>
        <main className="mx-auto max-w-[1350px] px-5 pb-20 pt-9 sm:px-8 lg:px-11">
          <div className="mb-8">
            <h1 className="text-[26px] font-semibold tracking-[-0.035em]">{headings[view].title}</h1>
            <p className="mt-1.5 text-[13px] text-neutral-500">{headings[view].description}</p>
          </div>

          {view === "home" && (
            <>
              <div className="mb-8 border-b border-neutral-200 pb-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">Your workspace</p>
                <h2 className="mt-3 text-xl font-medium tracking-tight">Good to see you, {firstName}.</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500">Your profile is ready. API access is being rolled out in stages; you can review the documentation while access is being prepared.</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <InfoCard eyebrow="ACCOUNT" title="Profile ready" body={`${account.name} · ${account.email}`}>
                  <Link className={smallLink} href="/platform?view=profile">Manage your profile <ArrowRight size={13} /></Link>
                </InfoCard>
                <InfoCard eyebrow="API ACCESS" title="Early access" body="Production API keys are not available in this workspace yet. Check the docs for the current API guide.">
                  <Link className={smallLink} href="/platform?view=access">View access details <ArrowRight size={13} /></Link>
                </InfoCard>
              </div>
              <h2 className="mt-10 mb-4 text-sm font-semibold">Get started</h2>
              <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200">
                <Step number="01" title="Complete your profile" description="Add your name and company details." href="/platform?view=profile" />
                <Step number="02" title="Explore the documentation" description="Read the guides and API reference." href="/docs" />
                <Step number="03" title="Review access status" description="See what is available in your workspace." href="/platform?view=access" />
              </div>
            </>
          )}
          {view === "access" && (
            <div className="max-w-3xl">
              <InfoCard eyebrow="CURRENT STATUS" title="API access is rolling out" body="You can create and manage your Olyxee profile today. Production API keys and sandbox execution are not enabled on this website yet; no key issued here would work against a production API.">
                <div className="flex flex-wrap gap-5">
                  <Link className={smallLink} href="/docs">Read documentation <ArrowRight size={13} /></Link>
                  <Link className={smallLink} href="/signup?tool=api">Join the API waitlist <ArrowRight size={13} /></Link>
                </div>
              </InfoCard>
            </div>
          )}
          {view === "usage" && (
            <div className="max-w-3xl">
              <InfoCard eyebrow="ACTIVITY" title="No usage to show" body="API activity will appear here when API access and usage reporting are enabled. No usage has been recorded for your workspace.">
                <Link className={smallLink} href="/platform?view=access">View access status <ArrowRight size={13} /></Link>
              </InfoCard>
            </div>
          )}
          {view === "billing" && (
            <>
              <div role="tablist" aria-label="Billing sections" className="mb-6 flex gap-6 overflow-x-auto border-b border-neutral-200 text-xs whitespace-nowrap">
                {billingTabs.map(tab => <button key={tab} type="button" role="tab" aria-selected={billingTab === tab} onClick={() => setBillingTab(tab)}
                  className={`relative pb-3 ${billingTab === tab ? "font-semibold text-neutral-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}>{tab}</button>)}
              </div>
              {billingTab === "Balance" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <InfoCard eyebrow="CURRENT BALANCE" title="Billing not enabled" body="There is no active billing account for this workspace. You cannot add funds or incur API charges here yet." />
                  <InfoCard eyebrow="AUTO-RELOAD" title="Not available" body="Automatic credit reload will be available if paid API access is introduced. No payments are being collected." />
                </div>
              ) : billingTab === "Pricing" ? (
                <InfoCard eyebrow="PLANS" title="Explore pricing" body="See the public pricing page for current product plans. API billing is not connected to this workspace.">
                  <Link className={smallLink} href="/pricing">View pricing <ArrowRight size={13} /></Link>
                </InfoCard>
              ) : (
                <InfoCard eyebrow={billingTab.toUpperCase()} title={`No ${billingTab.toLowerCase()} yet`}
                  body="Billing is not enabled for this workspace. Nothing has been added or charged." />
              )}
            </>
          )}
          {view === "profile" && <ProfilePanel user={account} onSaved={(name, company) => setAccount({ ...account, name, company })} />}
        </main>
      </div>
    </div>
  );
}

function InfoCard({ eyebrow, title, body, children }: { eyebrow: string; title: string; body: string; children?: React.ReactNode }) {
  return <section className="min-h-[160px] rounded-lg border border-neutral-200 bg-white p-6">
    <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400">{eyebrow}</p>
    <h2 className="mt-3 text-[17px] font-semibold tracking-tight">{title}</h2>
    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500">{body}</p>
    {children && <div className="mt-5">{children}</div>}
  </section>;
}

function Step({ number, title, description, href }: { number: string; title: string; description: string; href: string }) {
  return <Link href={href} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50">
    <span className="text-xs font-medium text-neutral-400">{number}</span>
    <span className="flex-1"><span className="block text-[13px] font-medium">{title}</span><span className="block mt-0.5 text-xs text-neutral-500">{description}</span></span>
    <ArrowRight size={15} className="text-neutral-400" />
  </Link>;
}