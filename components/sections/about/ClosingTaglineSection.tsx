import { Section } from "@/components/layout/Section";
import { HeadingWave } from "@/components/sections/HeadingWave";
import { SectionDecor } from "@/components/sections/SectionDecor";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealFade, RevealIcon, RevealWords } from "@/components/ui/Reveal";
import type { CtaButton } from "@/content";

type ClosingTaglineSectionProps = {
  tagline: string;
  /** Reuses the hero's button, so the page ends with the same call to action it starts with. */
  button?: CtaButton;
};

/**
 * Closing band: the brand wave, the tagline large with its last word in strong Teal, and the
 * hero's "Let's Talk Business" button, on the soft wave background used on the Contact page.
 */
export function ClosingTaglineSection({ tagline, button }: ClosingTaglineSectionProps) {
  return (
    <Section
      tone="alt"
      fullScreen={false}
      aria-labelledby="about-closing"
      className="relative isolate overflow-hidden pb-[calc(var(--section-y)+4rem)]"
    >
      <SectionDecor />
      <Reveal as="div" className="mx-auto max-w-3xl text-center">
        <RevealIcon standalone>
          <HeadingWave />
        </RevealIcon>
        <RevealWords
          as="h2"
          id="about-closing"
          text={tagline}
          lastWordClassName="text-accent-strong"
          className="text-[clamp(2rem,1.4rem+2.8vw,3.5rem)] leading-tight font-bold"
        />
        {button && (
          <RevealFade as="div">
            <ButtonLink href={button.href} variant={button.variant} className="mt-10">
              {button.label}
            </ButtonLink>
          </RevealFade>
        )}
      </Reveal>
    </Section>
  );
}
