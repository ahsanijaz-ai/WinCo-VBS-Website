import { Section } from "@/components/layout/Section";
import type { HomePage } from "@/content";
import {
  Reveal,
  RevealClip,
  RevealFade,
  RevealIcon,
  RevealLine,
  RevealUnit,
  RevealWords,
} from "@/components/ui/Reveal";

import { whyUsIcons, type WhyUsIconKey } from "./why-us/icons";

const HEADING_ID = "home-why-us";

/** One illustration per Why Us point, in content order. */
const ICON_KEYS: readonly WhyUsIconKey[] = ["tailored", "guidance", "support", "expertise"];

/**
 * "Why WinCo VBS?": heading on the left (word-by-word reveal), four illustrated points on the
 * right. Each block animates in as it scrolls into view and replays if it fully leaves and
 * re-enters; everything is visible immediately without JS or with prefers-reduced-motion.
 */
export function WhyUsSection({ whyUs }: { whyUs: HomePage["whyUs"] }) {
  return (
    <Section tone="default" className="relative overflow-hidden" aria-labelledby={HEADING_ID}>
      {/* decorative background mark, echoing the hero's brand waves */}
      <svg
        data-reveal-mark=""
        viewBox="0 0 400 300"
        aria-hidden="true"
        focusable={false}
        className="pointer-events-none absolute bottom-[-6%] left-[-2%] w-[min(46vw,620px)]"
      >
        <polygon points="0,0 70,0 150,230 110,300 40,300" className="fill-secondary-tint" />
        <polygon points="110,0 180,0 250,230 210,300 140,300" className="fill-secondary-tint" />
        <polygon points="215,0 285,0 215,300 150,300" className="fill-secondary/15" />
      </svg>

      <Reveal className="relative grid gap-12 lg:grid-cols-12">
        <RevealUnit className="relative lg:col-span-4">
          <RevealWords
            as="h2"
            id={HEADING_ID}
            standalone={false}
            className="text-section-heading mb-3 font-extrabold tracking-tight"
            text={whyUs.title}
          />
          {whyUs.subtitle && (
            <RevealClip standalone={false} className="text-secondary mt-3 text-lg font-semibold">
              {whyUs.subtitle}
            </RevealClip>
          )}
        </RevealUnit>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {whyUs.points.map(({ title, description }, index) => {
            const Icon = whyUsIcons[ICON_KEYS[index]];
            return (
              <RevealUnit key={title} hoverGroup className="cursor-default">
                <RevealLine className="bg-border mb-5 h-px w-full" />
                <RevealIcon className="mb-5 flex h-16 items-end">
                  <Icon />
                </RevealIcon>
                <RevealFade as="h3" standalone={false} className="mb-2.5">
                  {title}
                </RevealFade>
                <RevealFade as="p" standalone={false} secondary className="text-pretty">
                  {description}
                </RevealFade>
              </RevealUnit>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
