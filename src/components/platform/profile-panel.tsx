"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, UserRound } from "lucide-react";

const inputStyle = "mt-1.5 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100";

export default function ProfilePanel({ user, onSaved }: {
  user: { name: string; email: string; company: string; createdAt: string };
  onSaved: (name: string, company: string) => void;
}) {
  const [name, setName] = useState(user.name);
  const [company, setCompany] = useState(user.company);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(event: FormEvent, action: "profile" | "password") {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    const setMessage = action === "profile" ? setProfileMessage : setPasswordMessage;
    setMessage("");
    try {
      const response = await fetch("/api/platform/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action === "profile" ? { name, company } : { action, currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save changes.");
      if (action === "profile") onSaved(data.user.name, data.user.company);
      else { setCurrentPassword(""); setNewPassword(""); }
      setMessage(action === "profile" ? "Profile saved." : "Password changed. Other sessions have been signed out.");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Could not save changes.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-[650px] space-y-8">
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-2"><UserRound size={17} /><h2 className="text-sm font-semibold">Personal information</h2></div>
        <p className="mt-2 text-sm text-neutral-500">Manage how your name appears in your workspace.</p>
        <form onSubmit={event => save(event, "profile")} className="mt-6 space-y-4">
          <label className="block text-xs font-medium text-neutral-600">Full name
            <input className={inputStyle} required maxLength={120} value={name} onChange={event => setName(event.target.value)} autoComplete="name" />
          </label>
          <label className="block text-xs font-medium text-neutral-600">Email address
            <input className={`${inputStyle} bg-neutral-50 text-neutral-500`} value={user.email} readOnly aria-describedby="email-note" />
            <span id="email-note" className="mt-1 block text-xs font-normal text-neutral-400">Email changes are not available yet.</span>
          </label>
          <label className="block text-xs font-medium text-neutral-600">Company
            <input className={inputStyle} maxLength={120} value={company} onChange={event => setCompany(event.target.value)} autoComplete="organization" />
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={busy} className="rounded-md bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-700 disabled:opacity-50">Save profile</button>
            {profileMessage && <span role="status" className="text-xs text-neutral-600">{profileMessage}</span>}
          </div>
        </form>
      </section>
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-2"><LockKeyhole size={17} /><h2 className="text-sm font-semibold">Security</h2></div>
        <p className="mt-2 text-sm text-neutral-500">Change your password. This signs out your other sessions.</p>
        <form onSubmit={event => save(event, "password")} className="mt-6 space-y-4">
          <label className="block text-xs font-medium text-neutral-600">Current password
            <input className={inputStyle} type="password" autoComplete="current-password" required value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
          </label>
          <label className="block text-xs font-medium text-neutral-600">New password
            <input className={inputStyle} type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={newPassword} onChange={event => setNewPassword(event.target.value)} />
            <span className="mt-1 block text-xs font-normal text-neutral-400">At least 12 characters</span>
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={busy} className="rounded-md border border-neutral-300 px-4 py-2 text-xs font-medium hover:bg-neutral-50 disabled:opacity-50">Change password</button>
            {passwordMessage && <span role="status" className="text-xs text-neutral-600">{passwordMessage}</span>}
          </div>
        </form>
      </section>
    </div>
  );
}