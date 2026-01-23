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
    default: "billui - Beautiful billing UI components",
    template: "%s | billui",
  },
  description:
    "Beautiful, accessible billing UI components for your Next.js app. Payment forms, pricing tables, invoices, usage cards, and more. Built with React and shadcn/ui.",
  keywords: [
    "billing components",
    "React",
    "Next.js",
    "UI components",
    "payment UI",
    "invoice components",
    "pricing table",
    "shadcn",
    "shadcn/ui",
    "billing UI",
    "payment form",
    "credit card input",
    "usage tracking",
    "subscription billing",
    "SaaS billing",
    "Stripe UI",
    "React components",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "0xDecker", url: "https://x.com/0xDecker" }],
  creator: "0xDecker",
  publisher: "billui",
  category: "Technology",
  alternates: {
    canonical: "https://billui.com",
  },
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
    title: "billui - Beautiful billing UI components",
    description:
      "Beautiful, accessible billing UI components for your Next.js app. Payment forms, pricing tables, invoices, usage cards, and more.",
    url: "https://billui.com",
    siteName: "billui",
    images: [
      {
        url: "/billui-banner.png",
        width: 1200,
        height: 630,
        alt: "billui - Beautiful billing UI components for React",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "billui - Beautiful billing UI components",
    description:
      "Beautiful, accessible billing UI components for your Next.js app. Payment forms, pricing tables, invoices, and more.",
    images: ["/billui-banner.png"],
    creator: "@0xDecker",
    site: "@0xDecker",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
