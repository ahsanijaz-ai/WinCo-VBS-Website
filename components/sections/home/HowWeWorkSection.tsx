import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { HomePage } from "@/content";

/**
 * "How We Work": four numbered steps as an ordered list.
 * Step numbers are Teal badges with Slate text (7.8:1), which brand.md allows for step numbers.
 * From 1024 px the steps sit in one row with a line linking the badges.
 */
export function HowWeWorkSection({ howWeWork }: { howWeWork: HomePage["howWeWork"] }) {
  return (
    <Section tone="alt" aria-labelledby="home-how-we-work">
      <SectionHeading id="home-how-we-work" title={howWeWork.title} />

      <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {howWeWork.steps.map(({ number, title, description }) => (
          <li
            key={number}
            className="lg:after:bg-border relative lg:after:absolute lg:after:top-6 lg:after:right-0 lg:after:left-16 lg:after:h-px lg:last:after:hidden"
          >
            <span
              aria-hidden="true"
              className="bg-accent text-ink flex size-12 items-center justify-center rounded-full text-lg font-bold"
            >
              {number}
            </span>
            <h3 className="mt-5">{title}</h3>
            <p className="mt-2">{description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
