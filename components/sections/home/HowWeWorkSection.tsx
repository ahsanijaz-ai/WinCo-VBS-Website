import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { HomePage } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

import { howWeWorkIcons } from "./how-we-work/step-icons";

/** Card tone per step, escalating from light to Primary Blue on the final ("Improve") step. */
const CARD_TONE = [
  {
    surface: "bg-primary border border-border",
    title: "text-ink",
    body: "text-text",
    numeral: "text-accent-strong/40",
  },
  {
    surface: "bg-primary border border-border",
    title: "text-ink",
    body: "text-text",
    numeral: "text-accent-strong/40",
  },
  {
    surface: "bg-secondary-tint border border-border",
    title: "text-ink",
    body: "text-text",
    numeral: "text-accent-strong/40",
  },
  {
    surface: "bg-secondary",
    title: "text-primary",
    body: "text-primary",
    numeral: "text-primary/25",
  },
] as const;

/** Ascending card height from lg+, tallest on the final step, read clearly as a staircase. */
const CARD_HEIGHT = ["lg:h-[260px]", "lg:h-[300px]", "lg:h-[345px]", "lg:h-[395px]"] as const;

/**
 * "How We Work": four illustrated steps. The heading, then each card, reveals one after another
 * as the section scrolls into view, and each card lifts and its icon animates further on hover.
 * Teal stays on the step numerals only, matching the one documented accent use for this section
 * in docs/brand.md.
 */
export function HowWeWorkSection({ howWeWork }: { howWeWork: HomePage["howWeWork"] }) {
  return (
    <Section tone="alt" aria-labelledby="home-how-we-work">
      <Reveal className="contents">
        <RevealFade as="div">
          <SectionHeading
            id="home-how-we-work"
            title={howWeWork.title}
            titleClassName="text-section-heading font-extrabold tracking-tight"
          />
        </RevealFade>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {howWeWork.steps.map(({ number, title, description }, index) => {
            const Icon = howWeWorkIcons[index];
            const tone = CARD_TONE[index];

            return (
              <li key={number} className="flex">
                <RevealFade
                  as="article"
                  className={cn(
                    "group rounded-card relative flex w-full flex-col overflow-hidden p-6",
                    tone.surface,
                    CARD_HEIGHT[index],
                    "hover:shadow-secondary/15 hover:-translate-y-1 hover:shadow-lg",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-3 left-5 text-[42px] leading-none font-bold select-none",
                      tone.numeral,
                    )}
                  >
                    {number}
                  </span>

                  <div className="relative mt-6 flex justify-center">
                    <Icon className="ease-brand h-auto w-24 overflow-visible transition-transform duration-(--motion-base) group-hover:-translate-y-1 group-hover:scale-105 sm:w-28" />
                  </div>

                  <h3 className={cn("mt-5 text-center", tone.title)}>{title}</h3>
                  <p className={cn("mt-2 text-center text-pretty", tone.body)}>{description}</p>
                </RevealFade>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
