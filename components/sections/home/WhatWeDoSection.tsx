import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HomePage } from "@/content";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

import { ServiceCard } from "./what-we-do/ServiceCard";

const HEADING_ID = "home-what-we-do";

/** Index of the card shown in the raised/featured state by default (Marketing & Digital Presence). */
const FEATURED_INDEX = 1;

/**
 * "What We Do": four illustrated cards, same compact scale as every other card on the site,
 * that fill with colour on hover/focus, then "View All Services". Heading, cards and button
 * reveal one after another as the section scrolls into view.
 */
export function WhatWeDoSection({ whatWeDo }: { whatWeDo: HomePage["whatWeDo"] }) {
  return (
    <Section tone="alt" fullScreen={false} aria-labelledby={HEADING_ID}>
      <Reveal className="contents">
        <RevealFade as="div">
          <SectionHeading
            id={HEADING_ID}
            title={whatWeDo.title}
            titleClassName="text-section-heading font-extrabold tracking-tight"
          />
        </RevealFade>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.cards.map(({ title, description, href, icon }, index) => (
            <RevealFade key={title} as="li" className="flex">
              <ServiceCard
                title={title}
                description={description}
                href={href ?? "/services"}
                icon={icon ?? "briefcase"}
                featured={index === FEATURED_INDEX}
              />
            </RevealFade>
          ))}
        </ul>

        <RevealFade as="div">
          <ButtonLink
            href={whatWeDo.button.href}
            variant={whatWeDo.button.variant}
            className="mt-10"
          >
            {whatWeDo.button.label}
          </ButtonLink>
        </RevealFade>
      </Reveal>
    </Section>
  );
}
