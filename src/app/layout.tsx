import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BillUI",
    template: "%s | BillUI",
  },
  description: "Beautiful billing UI components for your Next.js app",
  openGraph: {
    title: "BillUI",
    description: "Beautiful billing UI components for your Next.js app",
    url: "https://billui.com",
    siteName: "BillUI",
    images: [
      {
        url: "/billui-banner.png",
        width: 1200,
        height: 630,
        alt: "BillUI - Billing UI Components",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BillUI",
    description: "Beautiful billing UI components for your Next.js app",
    images: ["/billui-banner.png"],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
