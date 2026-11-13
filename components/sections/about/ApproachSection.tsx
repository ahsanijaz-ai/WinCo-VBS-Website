import { Handshake, Target, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import {
  Reveal,
  RevealClip,
  RevealFade,
  RevealIcon,
  RevealUnit,
  RevealWords,
} from "@/components/ui/Reveal";
import type { TextBlock } from "@/content";
import { cn } from "@/lib/cn";

/** One icon per paragraph, in copy order: understanding first, then the values. */
const POINTS: { icon: LucideIcon; tone: "blue" | "teal" }[] = [
  { icon: Target, tone: "blue" },
  { icon: Handshake, tone: "teal" },
];

/** Two slanted bars, Primary Blue and Teal, echoing the W in the logo. Decorative. */
function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 32" className="mb-5 h-7 w-14 sm:h-8 sm:w-16">
      <path
        className="fill-secondary"
        d="M10 2h22a2 2 0 0 1 1.8 2.9L24 26a2 2 0 0 1-1.8 1.1H2a2 2 0 0 1-1.8-2.9L8.2 3.1A2 2 0 0 1 10 2Z"
      />
      <path
        className="fill-accent"
        d="M32 8h22a2 2 0 0 1 1.8 2.9L48 30a2 2 0 0 1-1.8 1.1H24a2 2 0 0 1-1.8-2.9L30.2 9.1A2 2 0 0 1 32 8Z"
      />
    </svg>
  );
}

/** Soft blue waves in the top-left and bottom corners, the bottom-right a little deeper. */
function ApproachDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute top-0 left-0 h-40 w-1/3 sm:h-52"
        viewBox="0 0 300 160"
        preserveAspectRatio="none"
      >
        <path className="fill-secondary-tint" d="M0 0h300C200 20 110 70 0 160Z" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-20 w-1/2 sm:h-28 lg:w-[30%]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path className="fill-secondary-tint" d="M0 30C120 20 260 70 400 120H0Z" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 h-24 w-1/2 sm:h-32 lg:w-[30%]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path className="fill-secondary-tint" d="M400 0C300 30 170 80 0 120H400Z" />
        <path className="fill-secondary/25" d="M400 50C310 70 200 100 90 120H400Z" />
      </svg>
    </div>
  );
}

/**
 * "Our Approach": a small brand mark, the heading (Home section heading size, last word in
 * strong Teal) and the Primary Blue subtitle on the left; a thin divider; then the two
 * paragraphs on the right, each with a rounded icon tile (blue target, Teal handshake). Text is
 * the client copy, unchanged. Reveals like the Home sections.
 */
export function ApproachSection({ approach }: { approach: TextBlock }) {
  return (
    <Section
      fullScreen={false}
      aria-labelledby="about-approach"
      className="relative isolate overflow-hidden"
    >
      <ApproachDecor />
      <Reveal as="div" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
        <RevealUnit className="lg:col-span-5 lg:pr-12">
          <RevealIcon>
            <BrandMark />
          </RevealIcon>
          <RevealWords
            as="h2"
            id="about-approach"
            standalone={false}
            text={approach.title}
            lastWordClassName="text-accent-strong"
            className="text-section-heading font-extrabold tracking-tight"
          />
          {approach.subtitle && (
            <RevealClip
              standalone={false}
              className="text-secondary mt-4 text-xl font-semibold sm:text-2xl"
            >
              {approach.subtitle}
            </RevealClip>
          )}
        </RevealUnit>

        <ul className="lg:border-secondary/20 grid gap-8 lg:col-span-7 lg:border-l lg:pl-12">
          {approach.paragraphs.map((paragraph, index) => {
            const { icon: Icon, tone } = POINTS[index] ?? POINTS[0];
            return (
              <RevealFade key={paragraph} as="li" className="flex items-start gap-5 sm:gap-6">
                <RevealIcon className="shrink-0">
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl shadow-md sm:size-16",
                      tone === "blue"
                        ? "bg-secondary-tint text-secondary shadow-secondary/10"
                        : "bg-accent-tint text-accent-deep shadow-accent/10",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-7 sm:size-8" />
                  </span>
                </RevealIcon>
                <p className="text-ink/90 pt-1 text-lg leading-8">{paragraph}</p>
              </RevealFade>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
