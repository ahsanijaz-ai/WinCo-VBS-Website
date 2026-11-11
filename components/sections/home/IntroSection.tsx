import { Section } from "@/components/layout/Section";
import type { TextBlock } from "@/content";

/** "More Than Support": heading on the left, paragraphs on the right from 1024 px. */
export function IntroSection({ intro }: { intro: TextBlock }) {
  return (
    <Section aria-labelledby="home-intro">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 id="home-intro" className="lg:col-span-5">
          {intro.title}
        </h2>
        <div className="grid max-w-[65ch] gap-4 text-lg leading-8 lg:col-span-7">
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
