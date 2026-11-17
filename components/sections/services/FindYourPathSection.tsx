import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { BrandIcon } from "@/components/brand/service-icons";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageLink } from "@/components/ui/PageLink";
import { Reveal, RevealFade, RevealIcon, RevealWords } from "@/components/ui/Reveal";
import type { ServicesPage } from "@/content";

const HEADING_ID = "find-your-path-heading";

type FindYourPathSectionProps = {
  /** The copy's line after the hero: "Explore our solutions below." */
  intro: string;
  findYourPath: ServicesPage["findYourPath"];
  groups: ServicesPage["groups"];
};

/**
 * The top of /services, right under the hero: "Start with the problem" and one card per group,
 * linking down to it. Below 768 px each card collapses to a compact icon/title/chevron row
 * (matching the approved mobile design exactly, not a shrunk version of the desktop card).
 * Closes with a "Not sure which one fits?" bar (consultation and WhatsApp), with a lighter
 * one-line version on phones.
 */
export function FindYourPathSection({ intro, findYourPath, groups }: FindYourPathSectionProps) {
  const { eyebrow, heading, seeServices, unsure } = findYourPath;

  return (
    <Section id="find-your-path" aria-labelledby={HEADING_ID} fullScreen={false}>
      <Reveal className="contents">
        <div className="text-center max-md:text-left">
          <RevealFade
            as="p"
            className="text-secondary text-[13px] font-semibold tracking-[.12em] uppercase max-md:text-[11.5px]"
          >
            {eyebrow}
          </RevealFade>
          <RevealWords
            as="h2"
            id={HEADING_ID}
            text={heading}
            className="text-ink mt-[10px] text-[40px] leading-[1.1] font-extrabold tracking-[-0.025em] max-md:mt-[6px] max-md:text-[23px]"
          />
          <RevealFade
            as="p"
            secondary
            className="mt-3 mb-[30px] text-lg leading-7 max-md:mt-2 max-md:mb-[16px] max-md:text-base"
          >
            {intro}
          </RevealFade>
        </div>

        <ul className="grid grid-cols-4 gap-[20px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-[10px]">
          {groups.map(({ id, title, problem }) => (
            <RevealFade key={id} as="li" className="flex">
              <PageLink
                href={`#${id}`}
                className="svc-card group border-border bg-primary ease-brand hover:border-secondary flex w-full flex-col rounded-[16px] border p-[20px] transition duration-(--motion-base) hover:-translate-y-[4px] hover:shadow-lg max-md:grid max-md:grid-cols-[44px_1fr_18px] max-md:items-center max-md:gap-x-[12px] max-md:rounded-[14px] max-md:px-[14px] max-md:py-[12px] max-md:hover:translate-y-0"
              >
                <RevealIcon>
                  <span className="svc-icon flex size-[48px] shrink-0 items-center justify-center rounded-[12px] p-[8px] max-md:size-[44px] max-md:rounded-[11px]">
                    <BrandIcon name={problem.icon} className="size-full" />
                  </span>
                </RevealIcon>
                <div>
                  <h3 className="svc-card-title mt-[16px] mb-[8px] text-[18px] leading-[1.25] font-bold tracking-[-0.01em] max-md:mt-0 max-md:mb-[3px] max-md:text-[15.5px]">
                    {problem.title}
                  </h3>
                  <p className="svc-card-text text-[13.5px] leading-[1.5] max-md:text-[12.5px] max-md:leading-[1.4]">
                    {problem.description}
                  </p>
                </div>
                <div className="mt-auto flex flex-col items-start gap-[10px] pt-[14px] max-md:hidden">
                  <span className="bg-secondary-tint text-secondary rounded-[7px] px-[8px] py-[4px] text-[11.5px] leading-[1.3] font-medium">
                    {title}
                  </span>
                  <span className="svc-card-title ease-brand inline-flex items-center gap-[6px] text-[13.5px] font-semibold transition-colors duration-(--motion-base)">
                    {seeServices}
                    <ArrowDown
                      aria-hidden="true"
                      strokeWidth={2}
                      className="ease-brand size-[15px] transition-transform duration-(--motion-base) group-hover:translate-y-[2px]"
                    />
                  </span>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={2.2}
                  className="text-secondary hidden size-[18px] max-md:block"
                />
              </PageLink>
            </RevealFade>
          ))}
        </ul>

        <RevealFade
          as="div"
          className="bg-secondary-tint border-border mt-[22px] flex flex-wrap items-center justify-between gap-[16px] rounded-[16px] border px-[20px] py-[12px] max-md:hidden"
        >
          <p className="text-ink text-[16px] font-medium">{unsure.text}</p>
          <div className="flex flex-wrap gap-[12px]">
            <ButtonLink
              href={unsure.consultation.href}
              className="h-[42px] min-h-0 w-auto rounded-[10px] px-[18px] text-[14.5px]"
            >
              {unsure.consultation.label}
            </ButtonLink>
            <ButtonLink
              variant="secondary"
              href={unsure.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[42px] min-h-0 w-auto rounded-[10px] px-[18px] text-[14.5px]"
            >
              {unsure.whatsapp.label}
            </ButtonLink>
          </div>
        </RevealFade>

        <RevealFade
          as="div"
          className="bg-secondary-tint border-border mt-[12px] hidden items-center justify-between rounded-[14px] border px-[14px] py-[12px] max-md:flex"
        >
          <span className="text-ink text-[14px] font-medium">{unsure.text}</span>
          <a
            href={unsure.mobile.href}
            className="text-secondary inline-flex shrink-0 items-center gap-[6px] font-semibold"
          >
            {unsure.mobile.label}
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[15px]" />
          </a>
        </RevealFade>
      </Reveal>
    </Section>
  );
}
