import { Section } from "@/components/layout/Section";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
import type { TextBlock } from "@/content";

/**
 * "About WinCo VBS": the first paragraph as a large lead statement with a Primary Blue edge,
 * the other paragraphs beside it from 1024 px. The heading repeats the hero title word for word,
 * so it stays for screen readers but is visually hidden. The section is deliberately not labelled
 * by it, so screen readers do not list two regions both named "About WinCo VBS" (the hero is
 * one). Reveals as it scrolls into view.
 */
export function AboutStorySection({ about }: { about: TextBlock }) {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section fullScreen={false}>
      <h2 id="about-story" className="sr-only">
        {about.title}
      </h2>
      <Reveal as="div" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <RevealFade as="div" className="lg:col-span-5">
          <p className="border-secondary text-ink border-l-4 pl-6 text-xl leading-relaxed font-semibold sm:text-2xl">
            {lead}
          </p>
        </RevealFade>
        <div className="grid max-w-[65ch] gap-5 text-lg leading-8 lg:col-span-7">
          {rest.map((paragraph) => (
            <RevealFade key={paragraph} as="p">
              {paragraph}
            </RevealFade>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
