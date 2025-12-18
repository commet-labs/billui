import type { BaseLayoutProps } from "@/components/layout/shared";
import { Logo } from "@/components/logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo size={24} />,
    },
    githubUrl: "https://github.com/commet-labs/billui",
  };
}
