import type { Metadata } from "next";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Hero } from "@/components/sections/Hero";
import { GroupTiles } from "@/components/sections/services/GroupTiles";
import { ServiceGroupSection } from "@/components/sections/services/ServiceGroupSection";
import { servicesPage } from "@/content";

export const metadata: Metadata = {
  title: servicesPage.seo.title,
  description: servicesPage.seo.description,
};

/** Services page: hero with the four group tiles, the service groups, then the closing call to action. */
export default function ServicesPage() {
  const { hero, groups, closingCta } = servicesPage;

  return (
    <>
      <Hero hero={hero} aside={<GroupTiles groups={groups} />} />
      {groups.map((group, index) => (
        <ServiceGroupSection key={group.id} group={group} index={index} />
      ))}
      <ClosingCtaSection cta={closingCta} headingId="services-closing-cta" />
    </>
  );
}
