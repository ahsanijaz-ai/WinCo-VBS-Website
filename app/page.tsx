import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { homePage } from "@/content";

export const metadata: Metadata = {
  title: homePage.seo.title,
  description: homePage.seo.description,
};

/** Home page. The sections below the hero come in task 2.3. */
export default function HomePage() {
  return <Hero hero={homePage.hero} />;
}
