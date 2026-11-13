import type { Metadata } from "next";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Hero } from "@/components/sections/Hero";
import { GroupNav } from "@/components/sections/services/GroupNav";
import { GroupTiles } from "@/components/sections/services/GroupTiles";
import { ServiceGroupSection } from "@/components/sections/services/ServiceGroupSection";
import { servicesPage } from "@/content";

export const metadata: Metadata = {
  title: servicesPage.seo.title,
  description: servicesPage.seo.description,
  alternates: { canonical: "/services" },
};

/**
 * Services page: hero with the four group tiles, the group navigator over the four service
 * groups, then the closing call to action.
 */
export default function ServicesPage() {
  const { hero, intro, groups, closingCta } = servicesPage;

  return (
    <>
      <Hero hero={hero} aside={<GroupTiles label={intro} groups={groups} />} />
      {/* The navigator sticks only while the groups are on screen. */}
      <div>
        <GroupNav groups={groups} />
        {groups.map((group, index) => (
          <ServiceGroupSection
            key={group.id}
            group={group}
            index={index}
            discussLabel={closingCta.button.label}
          />
        ))}
      </div>
      <ClosingCtaSection cta={closingCta} headingId="services-closing-cta" />
    </>
  );
}
