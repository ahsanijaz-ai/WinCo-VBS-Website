import { ArrowRight, Info } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Section } from "@/components/layout/Section";
import { ServiceList } from "@/components/sections/services/ServiceList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageLink } from "@/components/ui/PageLink";
import { Reveal, RevealClip, RevealFade, RevealUnit, RevealWords } from "@/components/ui/Reveal";
import { RollLabel } from "@/components/ui/RollLabel";
import type { ServiceGroup } from "@/content";
import { site } from "@/content";

type ServiceCategorySectionProps = {
  group: ServiceGroup;
};

/**
 * One service group as its own screen: the category panel (title, tagline, lead, CTA, "best
 * for" chips, a WhatsApp line) beside its services, two per row from 640 px and collapsible to
 * three on phones. Every group keeps the same white background, so there's no seam between them.
 */
export function ServiceCategorySection({ group }: ServiceCategorySectionProps) {
  const { id, title, subtitle, intro, cta, bestFor, listLabel, services, note, iconScale } = group;
  const headingId = `${id}-heading`;
  const listLabelId = `${id}-list-label`;

  return (
    <Section id={id} tabIndex={-1} aria-labelledby={headingId} className="scroll-mt-(--header-h)">
      <Reveal className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-12">
        <RevealUnit className="bg-primary border-border flex flex-col items-start justify-center rounded-3xl border p-7">
          <RevealWords
            as="h2"
            id={headingId}
            standalone={false}
            text={title}
            className="text-2xl leading-8 font-extrabold tracking-tight sm:text-3xl sm:leading-9"
          />
          <RevealClip standalone={false} className="text-secondary mt-2 font-semibold">
            {subtitle}
          </RevealClip>
          <RevealFade as="p" standalone={false} secondary className="mt-3 text-[15px] leading-6">
            {intro}
          </RevealFade>
          <RevealFade as="div" standalone={false} secondary className="mt-6 w-full sm:w-auto">
            <ButtonLink href={cta.href} variant={cta.variant} className="group w-full sm:w-auto">
              <RollLabel text={cta.label} />
              <ArrowRight
                aria-hidden="true"
                className="ease-brand size-5 transition duration-(--motion-base) group-hover:translate-x-1"
              />
            </ButtonLink>
          </RevealFade>

          <RevealFade as="div" standalone={false} secondary className="mt-6 w-full min-w-0">
            <span className="text-text/70 text-xs font-semibold tracking-wide uppercase">
              Best for
            </span>
            <div className="mt-2 flex min-w-0 [scrollbar-width:none] flex-nowrap gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,black_calc(100%-14px),transparent)] [&::-webkit-scrollbar]:hidden">
              {bestFor.map((item) => (
                <span
                  key={item}
                  className="border-border bg-primary text-ink shrink-0 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </RevealFade>

          <RevealFade
            as="div"
            standalone={false}
            secondary
            className="border-border mt-6 hidden w-full border-t pt-5 sm:block"
          >
            <PageLink
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-secondary ease-brand flex items-center gap-2 text-sm font-medium transition duration-(--motion-base)"
            >
              <WhatsAppIcon aria-hidden="true" className="text-secondary size-5 shrink-0" />
              Prefer to chat? Message us on WhatsApp
            </PageLink>
          </RevealFade>
        </RevealUnit>

        <div>
          <p id={listLabelId} className="text-ink mb-3 text-sm font-semibold">
            {listLabel}
          </p>
          <ServiceList services={services} iconScale={iconScale} />

          {note && (
            <RevealFade
              as="p"
              className="border-secondary bg-secondary-tint rounded-card mt-4 flex gap-3 border-l-4 p-4 sm:p-5"
            >
              <Info aria-hidden="true" className="text-secondary mt-0.5 size-5 shrink-0" />
              <span>{note}</span>
            </RevealFade>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
