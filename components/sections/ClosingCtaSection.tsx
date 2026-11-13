import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CallToAction } from "@/content";
import { Reveal, RevealClip, RevealFade, RevealWords } from "@/components/ui/Reveal";

type ClosingCtaSectionProps = {
  cta: CallToAction;
  /** Id of the heading, unique per page (e.g. `home-closing-cta`); it labels the section. */
  headingId: string;
};

/**
 * The closing call to action just above the footer, shared by every page: a tinted panel with
 * the heading, a short line and one button. Reveals as it scrolls into view.
 */
export function ClosingCtaSection({ cta, headingId }: ClosingCtaSectionProps) {
  return (
    <Section fullScreen={false} aria-labelledby={headingId}>
      <Reveal
        asUnit
        className="bg-secondary-tint rounded-card px-6 py-12 text-center sm:px-12 md:py-16"
      >
        <RevealWords
          as="h2"
          id={headingId}
          standalone={false}
          className="mx-auto max-w-2xl"
          text={cta.title}
        />
        <RevealClip standalone={false} className="mx-auto mt-4 max-w-[55ch] text-lg leading-8">
          {cta.description}
        </RevealClip>
        <RevealFade as="div" standalone={false}>
          <ButtonLink href={cta.button.href} variant={cta.button.variant} className="mt-8">
            {cta.button.label}
          </ButtonLink>
        </RevealFade>
      </Reveal>
    </Section>
  );
}
