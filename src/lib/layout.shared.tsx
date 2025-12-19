import { GitHubStars } from "@/components/layout/github-stars";
import type { BaseLayoutProps } from "@/components/layout/shared";
import { Logo } from "@/components/logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo size={24} />,
    },
    links: [
      {
        type: "custom",
        secondary: true,
        children: <GitHubStars owner="commet-labs" repo="billui" />,
      },
    ],
  };
}
