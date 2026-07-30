"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        // user cancelled or share failed; fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; nothing else to do
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={copied ? "Verification link copied" : "Share verification link"}
      className="inline-flex items-center gap-2 self-start border border-[#172123]/20 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#315b4e] transition-colors hover:border-[#315b4e] hover:bg-[#315b4e]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315b4e] focus-visible:ring-offset-2"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.474l6.733-3.366A2.52 2.52 0 0113 4.5z" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
