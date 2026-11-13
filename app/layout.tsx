import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";
import { siteUrl } from "@/lib/site-url";
import { siteStructuredData } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WinCo VBS | Virtual Business Solutions",
  description: "Your Business, Organized and Optimized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(inter.variable, "h-full antialiased")}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={siteStructuredData()} />
      </body>
    </html>
  );
}
