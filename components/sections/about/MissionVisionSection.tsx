import { Eye, Target, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealFade, RevealIcon } from "@/components/ui/Reveal";
import type { TextBlock } from "@/content";
import { cn } from "@/lib/cn";

type Card = { block: TextBlock; icon: LucideIcon; tone: "blue" | "teal"; id: string };

/**
 * "Our Mission" and "Our Vision" as two cards. They use the same hover as the Contact cards and
 * the Home service cards (`.contact-card` in globals.css): a fill in the card's colour grows from
 * the bottom-left and the tile, title and text turn white. The cards hold no links, so they are
 * not focusable; the fill is a hover-only touch. Cards fade up one after another.
 */
export function MissionVisionSection({
  mission,
  vision,
}: {
  mission: TextBlock;
  vision: TextBlock;
}) {
  const cards: Card[] = [
    { block: mission, icon: Target, tone: "blue", id: "about-mission" },
    { block: vision, icon: Eye, tone: "teal", id: "about-vision" },
  ];

  return (
    <Section tone="alt" fullScreen={false} aria-label={`${mission.title}, ${vision.title}`}>
      <Reveal as="div" className="contents">
        <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {cards.map(({ block, icon: Icon, tone, id }) => (
            <RevealFade key={id} as="li">
              <article
                aria-labelledby={id}
                className={cn(
                  "contact-card bg-primary border-primary shadow-secondary/10 flex h-full flex-col rounded-3xl border p-6 shadow-xl sm:p-10",
                  "ease-brand hover:shadow-secondary/15 transition-[translate,box-shadow] duration-(--motion-base) hover:shadow-2xl motion-safe:hover:-translate-y-1",
                  tone === "blue" ? "contact-card--blue" : "contact-card--teal",
                )}
              >
                <RevealIcon>
                  <span className="contact-card-tile flex size-16 items-center justify-center rounded-2xl bg-(--card-tile-bg) text-(color:--card-tile-fg)">
                    <Icon aria-hidden="true" className="size-8" />
                  </span>
                </RevealIcon>
                <h2
                  id={id}
                  className="contact-card-title mt-6 text-2xl font-bold text-(color:--card-title) sm:text-3xl"
                >
                  {block.title}
                </h2>
                {block.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="contact-card-text mt-4 text-lg leading-8 text-(color:--card-text)"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            </RevealFade>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
