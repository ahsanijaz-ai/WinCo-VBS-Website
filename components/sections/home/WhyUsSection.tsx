import { CircleCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { HomePage } from "@/content";

/** "Why WinCo VBS?": heading on the left, four points in a two-column grid on the right. */
export function WhyUsSection({ whyUs }: { whyUs: HomePage["whyUs"] }) {
  return (
    <Section aria-labelledby="home-why-us">
      <div className="grid gap-12 lg:grid-cols-12">
        <SectionHeading
          id="home-why-us"
          title={whyUs.title}
          subtitle={whyUs.subtitle}
          className="lg:col-span-4"
        />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {whyUs.points.map(({ title, description }) => (
            <li key={title} className="flex gap-4">
              <CircleCheck aria-hidden="true" className="text-secondary mt-0.5 size-6 shrink-0" />
              <div>
                <h3>{title}</h3>
                <p className="mt-2">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
