import { ChartColumnIncreasing, Laptop, Layers, Settings, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealClip, RevealFade, RevealIcon } from "@/components/ui/Reveal";
import type { TextBlock } from "@/content";
import { cn } from "@/lib/cn";

/** One icon per supporting paragraph, in copy order: beliefs, services, expertise, growth. */
const POINT_ICONS: LucideIcon[] = [Layers, Laptop, Settings, ChartColumnIncreasing];

/** Soft Teal and blue shapes in the top-right and bottom-left corners. Decorative. */
function StoryDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-accent-tint absolute -top-40 -right-40 size-[30rem] rounded-full blur-2xl" />
      <div className="bg-secondary-tint absolute -top-24 right-24 size-64 rounded-full opacity-70 blur-2xl" />
      <svg
        className="absolute bottom-0 left-0 h-24 w-1/2 sm:h-32 lg:w-[34%]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path className="fill-accent-tint" d="M0 20C120 30 260 74 400 120H0Z" />
        <path className="fill-secondary-tint" d="M0 64C110 70 230 92 330 120H0Z" />
      </svg>
    </div>
  );
}

/**
 * "About WinCo VBS": the heading as a small spaced eyebrow, the first paragraph as a large lead
 * statement with a Primary Blue bar, and the other paragraphs as cards beside it from 1024 px.
 * The cards alternate: light blue with a blue icon and a Teal divider, then white with a Teal
 * icon and a blue divider. On phones the icon sits above the text and the divider is hidden, so
 * the text gets the full card width. Text is the client copy, unchanged. Reveals like the Home sections.
 */
export function AboutStorySection({ about }: { about: TextBlock }) {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section fullScreen={false} className="relative isolate overflow-hidden">
      <StoryDecor />
      <Reveal as="div" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <RevealClip as="div" standalone>
            <h2 className="text-secondary text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
              {about.title}
            </h2>
          </RevealClip>
          <RevealFade as="div" className="mt-6">
            <p className="border-secondary text-ink border-l-4 pl-6 text-xl leading-relaxed font-bold sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
              {lead}
            </p>
          </RevealFade>
        </div>

        <ul className="grid gap-4 lg:col-span-7">
          {rest.map((paragraph, index) => {
            const Icon = POINT_ICONS[index] ?? Layers;
            const tinted = index % 2 === 0;
            return (
              <RevealFade key={paragraph} as="li">
                <div
                  className={cn(
                    "flex flex-col items-start gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
                    "ease-brand hover:shadow-secondary/10 transition-[translate,box-shadow] duration-(--motion-base) hover:shadow-lg motion-safe:hover:-translate-y-0.5",
                    tinted
                      ? "bg-secondary-tint/70 border-secondary-tint"
                      : "bg-primary border-border",
                  )}
                >
                  <RevealIcon className="shrink-0">
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl sm:size-16",
                        tinted ? "bg-primary/80 text-secondary" : "bg-accent-tint text-accent-deep",
                      )}
                    >
                      <Icon aria-hidden="true" className="size-6 sm:size-8" />
                    </span>
                  </RevealIcon>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden w-0.5 shrink-0 self-stretch rounded-full sm:block",
                      tinted ? "bg-accent" : "bg-secondary",
                    )}
                  />
                  <p className="text-ink/90 leading-7 sm:text-lg sm:leading-8">{paragraph}</p>
                </div>
              </RevealFade>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
