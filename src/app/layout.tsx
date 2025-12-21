import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://billui.com"),
  title: {
    default: "billui",
    template: "%s | billui",
  },
  description: "Beautiful billing UI components for your Next.js app.",
  keywords: [
    "billing components",
    "React",
    "Next.js",
    "UI components",
    "payment UI",
    "invoice components",
    "pricing table",
    "shadcn",
  ],
  authors: [{ name: "0xDecker", url: "https://x.com/0xDecker" }],
  creator: "0xDecker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "billui",
    description: "Beautiful billing UI components for your Next.js app.",
    url: "https://billui.com",
    siteName: "billui",
    images: [
      {
        url: "/billui-banner.png",
        width: 1200,
        height: 630,
        alt: "billui - Billing UI Components",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "billui",
    description: "Beautiful billing UI components for your Next.js app.",
    images: ["/billui-banner.png"],
    creator: "@0xDecker",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
