"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    // In a real application, a cookie would be set here to remember the user's choice.
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[999] p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cookie-heading">
      <div className="mx-auto w-full max-w-[600px] rounded-lg border border-white/10 bg-black/95 p-6 shadow-2xl backdrop-blur-md">
        <h2 id="cookie-heading" className="text-lg font-semibold text-white">
          Cookie Settings
        </h2>

        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>
            Our website uses some cookies and records your IP address for the purposes of accessibility, security, and managing your access to the telecommunication network. You can disable data collection and cookies by changing your browser settings, but it may affect how this website functions.{" "}
            <a href="https://www.jetbrains.com/legal/docs/privacy/cookie-notice/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              Learn more
            </a>
          </p>
          <p>
            With your consent, JetBrains may also use cookies and your IP address to collect individual statistics and provide you with personalized offers and ads subject to the{" "}
            <a href="https://www.jetbrains.com/legal/docs/privacy/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              Privacy Notice
            </a>{" "}
            and the{" "}
            <a href="https://www.jetbrains.com/legal/docs/company/useterms/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              Terms of Use
            </a>
            . JetBrains may use{" "}
            <a href="https://www.jetbrains.com/legal/docs/privacy/third-parties/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              third-party services
            </a>{" "}
            for this purpose. You can adjust or withdraw your consent at any time by visiting the{" "}
            <a href="#opt-out" className="text-primary underline-offset-4 hover:underline">
              Opt-Out
            </a>.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={handleDismiss}
            className="h-auto flex-1 rounded-full px-8 py-3 text-base font-semibold sm:flex-none"
          >
            Accept All
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="h-auto flex-1 rounded-full border-white/30 bg-transparent px-8 py-3 text-base font-semibold text-white hover:bg-white/10 hover:text-white sm:flex-none"
          >
            Manage Settings
          </Button>
        </div>
      </div>
    </div>
  );
}