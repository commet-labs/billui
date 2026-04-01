"use client";

import { track } from "@vercel/analytics";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "billui-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    const isDismissed = localStorage.getItem(STORAGE_KEY) === "true";
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    track("billsdk_banner_dismiss");
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-primary/5 via-primary/3 to-primary/2 border-b px-6 py-2.5 sm:px-3.5">
      {/* Subtle animated gradient */}
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary/30 to-primary/20 opacity-30"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full justify-center">
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="hidden sm:inline">Need the billing logic too? </span>
          <span className="sm:hidden">Billing logic? </span>
          <a
            href="https://billsdk.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("billsdk_banner_click")}
            className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
          >
            Try BillSDK
            <span aria-hidden="true" className="hidden sm:inline">
              — the billing engine that pairs with these components
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="-m-1.5 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="sr-only">Dismiss</span>
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
