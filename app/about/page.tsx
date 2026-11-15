import type { Metadata } from "next";
import { AboutStorySection } from "@/components/sections/about/AboutStorySection";
import { ApproachSection } from "@/components/sections/about/ApproachSection";
import { ClosingTaglineSection } from "@/components/sections/about/ClosingTaglineSection";
import { MissionVisionSection } from "@/components/sections/about/MissionVisionSection";
import { Hero } from "@/components/sections/Hero";
import { aboutPage } from "@/content";

export const metadata: Metadata = {
  title: aboutPage.seo.title,
  description: aboutPage.seo.description,
  alternates: { canonical: "/about" },
};

/** About page: hero, the story, Mission with Vision, Our Approach, then the closing tagline. */
export default function AboutPage() {
  const { hero, about, mission, vision, approach, closingTagline } = aboutPage;

  return (
    <>
      <Hero hero={hero} align="center" animated buttonStyle="pill" backgroundMark />
      <AboutStorySection about={about} />
      <MissionVisionSection mission={mission} vision={vision} />
      <ApproachSection approach={approach} />
      <ClosingTaglineSection tagline={closingTagline} button={hero.buttons?.[0]} />
    </>
  );
}
