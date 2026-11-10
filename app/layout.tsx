import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/cn";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WinCo VBS | Virtual Business Solutions",
  description: "Your Business, Organized and Optimized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(inter.variable, "h-full antialiased")}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
