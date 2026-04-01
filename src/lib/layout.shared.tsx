import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

function CommetLogo() {
  return (
    <svg width="18" height="18" viewBox="143 71 214 369" aria-label="Commet">
      <path
        d="M250 71L356.521 255.5H143.479L250 71Z"
        className="fill-foreground"
      />
      <path
        d="M250 440L356.521 255.5H143.479L250 440Z"
        className="fill-foreground"
      />
      <rect
        width="253.649"
        height="17.0192"
        transform="matrix(0.718749 0.695269 -0.64697 0.762515 143.458 243.867)"
        className="fill-background"
      />
    </svg>
  );
}

export const githubLink = {
  type: "icon" as const,
  url: "https://github.com/commet-labs/billui",
  text: "GitHub",
  label: "GitHub",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  external: true,
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <CommetLogo />,
      url: "https://commet.co",
      children: (
        <div className="flex items-center gap-3">
          <div className="h-4 w-px shrink-0 bg-fd-border" />
          <a href="/" className="text-sm font-medium hover:text-foreground/80">
            billUI
          </a>
        </div>
      ),
      transparentMode: "always",
    },
  };
}
