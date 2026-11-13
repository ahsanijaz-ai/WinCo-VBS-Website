import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { HowWeWorkSection } from "@/components/sections/home/HowWeWorkSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhatWeDoSection } from "@/components/sections/home/WhatWeDoSection";
import { WhyUsSection } from "@/components/sections/home/WhyUsSection";
import { homePage } from "@/content";

export const metadata: Metadata = {
  title: homePage.seo.title,
  description: homePage.seo.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero hero={homePage.hero} />
      <IntroSection intro={homePage.intro} />
      <WhatWeDoSection whatWeDo={homePage.whatWeDo} />
      <WhyUsSection whyUs={homePage.whyUs} />
      <HowWeWorkSection howWeWork={homePage.howWeWork} />
      <ClosingCtaSection cta={homePage.closingCta} headingId="home-closing-cta" />
    </>
  );
}
