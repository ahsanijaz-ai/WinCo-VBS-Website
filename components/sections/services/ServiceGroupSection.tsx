import { Ruler } from "lucide-react";
import { ServiceGlyph } from "@/components/brand/ServiceGlyph";
import { Section } from "@/components/layout/Section";
import {
  fallbackServiceIcon,
  serviceRowIcons,
} from "@/components/sections/services/service-row-icons";
import { twoDigits } from "@/components/sections/services/two-digits";
import {
  Reveal,
  RevealClip,
  RevealFade,
  RevealIcon,
  RevealLine,
  RevealUnit,
  RevealWords,
} from "@/components/ui/Reveal";
import type { ServiceGroup } from "@/content";

type ServiceGroupSectionProps = {
  group: ServiceGroup;
  /** Position on the page, from 0. Sets the big number (01 to 04) and the background. */
  index: number;
};

/**
 * One service group as a "chapter": the group on the left, its six services on the right.
 *
 * - Left: a large soft number, the glyph, the title (rises word by word), the subtitle
 *   (wipes in) and the intro. From 1024 px it stays in view while the services scroll past.
 * - Right: the services as numbered rows, not cards, so 24 services never read as one long
 *   grid of identical boxes. Each row's divider draws in and the rows fade up one after another;
 *   on hover the divider turns Primary Blue and the text shifts 3 px, like the Why Us points.
 *   From 640 px each row also shows an outlined icon whose strokes draw in with the row and
 *   which lifts on hover (the same Reveal icon effect as Why Us).
 * - Groups alternate white and light grey. The `id` is the anchor the Home cards and the hero
 *   tiles link to; `scroll-padding-top` (header) plus
 *   `scroll-margin-top` (group navigator) keep it clear of both sticky bars.
 */
export function ServiceGroupSection({ group, index }: ServiceGroupSectionProps) {
  const { id, title, subtitle, intro, icon, services, note } = group;
  const headingId = `${id}-title`;

  return (
    <Section
      id={id}
      tabIndex={-1}
      tone={index % 2 === 1 ? "alt" : "default"}
      aria-labelledby={headingId}
      className="scroll-mt-(--subnav-h) focus:outline-none"
    >
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <RevealUnit className="lg:sticky lg:top-[calc(var(--header-h)+var(--subnav-h)+2rem)] lg:col-span-5 lg:self-start">
          <div className="flex items-end justify-between gap-6">
            <RevealIcon>
              <span className="bg-secondary-tint text-secondary flex size-16 items-center justify-center rounded-xl p-2.5 sm:size-20 sm:p-3">
                <ServiceGlyph icon={icon} />
              </span>
            </RevealIcon>
            <span
              aria-hidden="true"
              className="text-secondary/15 text-[clamp(4.5rem,3rem+6vw,8rem)] leading-[0.8] font-extrabold tracking-tighter tabular-nums select-none"
            >
              {twoDigits(index)}
            </span>
          </div>

          <RevealWords
            as="h2"
            id={headingId}
            standalone={false}
            text={title}
            className="text-section-heading mt-8 font-extrabold tracking-tight"
          />
          <RevealClip standalone={false} className="text-secondary mt-3 text-lg font-semibold">
            {subtitle}
          </RevealClip>
          <RevealFade
            as="p"
            standalone={false}
            secondary
            className="mt-4 max-w-[52ch] text-lg leading-8"
          >
            {intro}
          </RevealFade>
        </RevealUnit>

        <div className="lg:col-span-7">
          <ol>
            {services.map(({ name, description }, serviceIndex) => {
              const Icon = serviceRowIcons[name] ?? fallbackServiceIcon;
              return (
                <RevealUnit key={name} as="li" hoverGroup className="cursor-default">
                  <RevealLine className="bg-border h-px w-full" />
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-4">
                    <RevealFade
                      as="span"
                      standalone={false}
                      className="text-secondary pt-1 text-sm font-bold tabular-nums"
                    >
                      <span aria-hidden="true">{twoDigits(serviceIndex)}</span>
                    </RevealFade>
                    <div>
                      <RevealFade
                        as="h3"
                        standalone={false}
                        className="text-lg leading-7 text-pretty sm:text-xl"
                      >
                        {name}
                      </RevealFade>
                      <RevealFade
                        as="p"
                        standalone={false}
                        secondary
                        className="mt-1.5 text-pretty"
                      >
                        {description}
                      </RevealFade>
                    </div>
                    <RevealIcon className="hidden sm:block">
                      <span className="bg-secondary-tint text-secondary flex size-12 items-center justify-center rounded-xl">
                        <Icon aria-hidden="true" strokeWidth={1.75} className="size-6" />
                      </span>
                    </RevealIcon>
                  </div>
                </RevealUnit>
              );
            })}
          </ol>

          {note && (
            <RevealFade
              as="p"
              className="border-secondary bg-secondary-tint rounded-card mt-4 flex gap-3 border-l-4 p-4 sm:p-5"
            >
              <Ruler aria-hidden="true" className="text-secondary mt-0.5 size-5 shrink-0" />
              <span>{note}</span>
            </RevealFade>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
