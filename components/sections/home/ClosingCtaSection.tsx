import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CallToAction } from "@/content";
import { Reveal, RevealClip, RevealFade, RevealWords } from "@/components/ui/Reveal";

/** "Ready to Work Smarter?": a tinted panel with the consultation button, just above the footer. Reveals as it scrolls into view. */
export function ClosingCtaSection({ cta }: { cta: CallToAction }) {
  return (
    <Section aria-labelledby="home-closing-cta">
      <Reveal
        asUnit
        className="bg-secondary-tint rounded-card px-6 py-12 text-center sm:px-12 md:py-16"
      >
        <RevealWords
          as="h2"
          id="home-closing-cta"
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
