import { Section } from "@/components/layout/Section";
import type { TextBlock } from "@/content";
import { Reveal, RevealFade, RevealWords } from "@/components/ui/Reveal";

/** "More Than Support": heading on the left, paragraphs on the right from 1024 px. Both reveal as they scroll into view. */
export function IntroSection({ intro }: { intro: TextBlock }) {
  return (
    <Section fullScreen={false} aria-labelledby="home-intro">
      <Reveal as="div" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <RevealWords as="h2" id="home-intro" className="lg:col-span-5" text={intro.title} />
        <div className="grid max-w-[65ch] gap-4 text-lg leading-8 lg:col-span-7">
          {intro.paragraphs.map((paragraph) => (
            <RevealFade key={paragraph} as="p">
              {paragraph}
            </RevealFade>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
