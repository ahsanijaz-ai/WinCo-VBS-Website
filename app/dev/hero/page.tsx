import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { contactPage } from "@/content";

/**
 * Developer-only page for checking the compact Hero with a section after it.
 * The section must stay below the first screen until you scroll.
 * Returns 404 on the live production site. Delete it before the client signs off.
 */
export const metadata: Metadata = {
  title: "Hero check",
  robots: { index: false, follow: false },
};

export default function HeroCheckPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <>
      <Hero hero={contactPage.hero} />
      <Section tone="alt" aria-labelledby="after-hero">
        <h2 id="after-hero">Next section</h2>
        <p className="mt-4">This section should only appear after scrolling.</p>
      </Section>
    </>
  );
}
