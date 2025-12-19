import type { I18nConfig } from "fumadocs-core/i18n";
import type { ReactNode } from "react";
import { GitHubStars } from "./github-stars";
import type { LinkItemType } from "./link-item";

export interface NavOptions {
  enabled: boolean;
  component: ReactNode;

  title?: ReactNode;

  /**
   * Redirect url of title
   * @defaultValue '/'
   */
  url?: string;

  /**
   * Use transparent background
   *
   * @defaultValue none
   */
  transparentMode?: "always" | "top" | "none";

  children?: ReactNode;
}

export interface BaseLayoutProps {
  themeSwitch?: {
    enabled?: boolean;
    component?: ReactNode;
    mode?: "light-dark" | "light-dark-system";
  };

  searchToggle?: Partial<{
    enabled: boolean;
    components: Partial<{
      sm: ReactNode;
      lg: ReactNode;
    }>;
  }>;

  /**
   * I18n options
   *
   * @defaultValue false
   */
  i18n?: boolean | I18nConfig;

  /**
   * GitHub url
   */
  githubUrl?: string;

  links?: LinkItemType[];
  /**
   * Replace or disable navbar
   */
  nav?: Partial<NavOptions>;

  children?: ReactNode;
}

/**
 * Parse GitHub URL to extract owner and repo
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  }
  return null;
}

/**
 * Get link items with shortcuts
 */
export function resolveLinkItems({
  links = [],
  githubUrl,
}: Pick<BaseLayoutProps, "links" | "githubUrl">): LinkItemType[] {
  const result = [...links];

  if (githubUrl) {
    const parsed = parseGitHubUrl(githubUrl);
    if (parsed) {
      result.push({
        type: "custom",
        secondary: true,
        children: <GitHubStars owner={parsed.owner} repo={parsed.repo} />,
      });
    }
  }

  return result;
}

export type * from "./link-item";
