"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Code, Eye, RotateCcw } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  code?: string;
  /** Component name for generating v0 demo URL (e.g., "plan-card") */
  component?: string;
  /** Example identifier for the demo URL (e.g., "preview", "basic", "elevated") */
  example?: string;
  /** @deprecated Use `component` prop instead */
  registryUrl?: string;
  /** Enable replay button to restart animations */
  animated?: boolean;
}

function OpenInV0Button({ url }: { url: string }) {
  return (
    <a
      href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(url)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Open in v0"
      className="flex h-7 items-center gap-1.5 rounded-md bg-zinc-950 px-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      Open in
      <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
          fill="currentColor"
        />
        <path
          d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

export function ComponentPreview({
  children,
  code,
  component,
  example,
  registryUrl,
  animated = false,
  className,
  ...props
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview",
  );
  const [previewKey, setPreviewKey] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState(false);

  // Generate v0 URL from component name and example id
  const v0Url = React.useMemo(() => {
    if (registryUrl) return registryUrl;
    if (component && example) {
      return `https://billui.com/r/${component}-demo-${example}.json`;
    }
    return null;
  }, [registryUrl, component, example]);

  const handleReplay = () => {
    setIsSpinning(true);
    setPreviewKey((prev) => prev + 1);
    setTimeout(() => setIsSpinning(false), 500);
  };

  // If no code provided, render simple preview
  if (!code) {
    return (
      <div className={cn("not-prose my-8 w-full", className)} {...props}>
        {animated && (
          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={handleReplay}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Replay animation"
              title="Replay animation"
            >
              <RotateCcw
                className={cn(
                  "h-4 w-4",
                  isSpinning && "animate-[spin-once_0.5s_ease-out]",
                )}
              />
            </button>
          </div>
        )}
        <div
          key={previewKey}
          className="flex min-h-[300px] w-full items-center justify-center rounded-xl border bg-background p-10 md:p-16"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("not-prose my-8 w-full", className)} {...props}>
      {/* Tab header */}
      <div className="flex items-center rounded-t-xl border border-b-0 bg-fd-muted/50 px-1 pr-2">
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === "preview"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("code")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === "code"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Code className="h-4 w-4" />
          Code
        </button>
        <div className="ml-auto flex items-center gap-1">
          {animated && activeTab === "preview" && (
            <button
              type="button"
              onClick={handleReplay}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Replay animation"
              title="Replay animation"
            >
              <RotateCcw
                className={cn(
                  "h-4 w-4",
                  isSpinning && "animate-[spin-once_0.5s_ease-out]",
                )}
              />
            </button>
          )}
          {v0Url && <OpenInV0Button url={v0Url} />}
        </div>
      </div>

      {/* Content area */}
      <div className="overflow-hidden rounded-b-xl border">
        {activeTab === "preview" ? (
          <div
            key={previewKey}
            className="flex min-h-[300px] w-full items-center justify-center bg-background p-10 md:p-16"
          >
            {children}
          </div>
        ) : (
          <div className="[&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">
            <DynamicCodeBlock lang="tsx" code={code} />
          </div>
        )}
      </div>
    </div>
  );
}
