import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ComponentPreview({
  children,
  className,
  ...props
}: ComponentPreviewProps) {
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
