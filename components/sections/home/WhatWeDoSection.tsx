import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HomePage } from "@/content";
import { serviceIcons } from "@/lib/service-icons";

/**
 * "What We Do": four cards, each a link to its group on /services, then "View All Services".
 * One column on phones, two from 640 px, four from 1024 px.
 */
export function WhatWeDoSection({ whatWeDo }: { whatWeDo: HomePage["whatWeDo"] }) {
  return (
    <Section tone="alt" aria-labelledby="home-what-we-do">
      <SectionHeading id="home-what-we-do" title={whatWeDo.title} />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whatWeDo.cards.map(({ title, description, href, icon }) => {
          const Icon = icon ? serviceIcons[icon] : null;
          return (
            <li key={title} className="flex">
              <Link
                href={href ?? "/services"}
                className="group bg-primary border-border rounded-card ease-brand hover:border-secondary flex w-full flex-col border p-6 transition duration-(--motion-base) hover:-translate-y-1 hover:shadow-md active:scale-[0.98] active:duration-(--motion-fast)"
              >
                {Icon && (
                  <span className="bg-secondary-tint text-secondary rounded-card flex size-12 items-center justify-center">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                )}
                <h3 className="mt-5">{title}</h3>
                <p className="mt-2 flex-1">{description}</p>
                <ArrowRight
                  aria-hidden="true"
                  className="text-secondary ease-brand mt-6 size-5 transition duration-(--motion-base) group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <ButtonLink href={whatWeDo.button.href} variant={whatWeDo.button.variant} className="mt-10">
        {whatWeDo.button.label}
      </ButtonLink>
    </Section>
  );
}
