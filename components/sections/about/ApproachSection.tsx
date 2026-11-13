import { Section } from "@/components/layout/Section";
import { Reveal, RevealClip, RevealFade, RevealUnit, RevealWords } from "@/components/ui/Reveal";
import type { TextBlock } from "@/content";

/**
 * "Our Approach": heading with its last word in strong Teal and the subtitle in Primary Blue on
 * the left, the two paragraphs on the right from 1024 px. Reveals like the Home sections.
 */
export function ApproachSection({ approach }: { approach: TextBlock }) {
  return (
    <Section fullScreen={false} aria-labelledby="about-approach">
      <Reveal as="div" className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <RevealUnit className="lg:col-span-5">
          <RevealWords
            as="h2"
            id="about-approach"
            standalone={false}
            text={approach.title}
            lastWordClassName="text-accent-strong"
            className="text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight font-bold"
          />
          {approach.subtitle && (
            <RevealClip standalone={false} className="text-secondary mt-4 text-xl font-semibold">
              {approach.subtitle}
            </RevealClip>
          )}
        </RevealUnit>
        <div className="grid max-w-[65ch] gap-5 text-lg leading-8 lg:col-span-7">
          {approach.paragraphs.map((paragraph) => (
            <RevealFade key={paragraph} as="p">
              {paragraph}
            </RevealFade>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
