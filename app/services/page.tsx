import type { Metadata } from "next";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Hero } from "@/components/sections/Hero";
import { FindYourPathSection } from "@/components/sections/services/FindYourPathSection";
import { ServiceCategorySection } from "@/components/sections/services/ServiceCategorySection";
import { StickyServiceContact } from "@/components/sections/services/StickyServiceContact";
import { servicesPage } from "@/content";

export const metadata: Metadata = {
  title: servicesPage.seo.title,
  description: servicesPage.seo.description,
  alternates: { canonical: "/services" },
};

/**
 * Services page: the shared hero, then "Find your path" (one problem card per group, linking
 * down to it), then each group as its own full-screen section (like every other page), then the
 * closing call to action. A mobile-only bottom bar keeps WhatsApp and a free consultation one
 * tap away.
 */
export default function ServicesPage() {
  const { hero, findYourPath, groups, closingCta } = servicesPage;

  return (
    <>
      <Hero hero={hero} align="center" />
      <FindYourPathSection findYourPath={findYourPath} groups={groups} />
      {groups.map((group) => (
        <ServiceCategorySection key={group.id} group={group} />
      ))}
      <ClosingCtaSection cta={closingCta} headingId="services-closing-cta" />
      <StickyServiceContact />
    </>
  );
}
