"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Code, Eye } from "lucide-react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  code?: string;
}

export function ComponentPreview({
  children,
  code,
  className,
  ...props
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview",
  );

  // If no code provided, render simple preview
  if (!code) {
    return (
      <div
        className={cn(
          "not-prose my-8 flex min-h-[300px] w-full items-center justify-center rounded-xl border bg-background p-10 md:p-16",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("not-prose my-8 w-full", className)} {...props}>
      {/* Tab header */}
      <div className="flex items-center rounded-t-xl border border-b-0 bg-fd-muted/50 px-1">
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
      </div>

      {/* Content area */}
      <div className="overflow-hidden rounded-b-xl border">
        {activeTab === "preview" ? (
          <div className="flex min-h-[300px] w-full items-center justify-center bg-background p-10 md:p-16">
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
