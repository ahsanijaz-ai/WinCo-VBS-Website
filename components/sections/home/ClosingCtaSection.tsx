import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CallToAction } from "@/content";

/** "Ready to Work Smarter?": a tinted panel with the consultation button, just above the footer. */
export function ClosingCtaSection({ cta }: { cta: CallToAction }) {
  return (
    <Section aria-labelledby="home-closing-cta">
      <div className="bg-secondary-tint rounded-card px-6 py-12 text-center sm:px-12 md:py-16">
        <h2 id="home-closing-cta" className="mx-auto max-w-2xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[55ch] text-lg leading-8">{cta.description}</p>
        <ButtonLink href={cta.button.href} variant={cta.button.variant} className="mt-8">
          {cta.button.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
