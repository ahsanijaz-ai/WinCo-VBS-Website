import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Hero as HeroContent } from "@/content";
import { cn } from "@/lib/cn";

type HeroProps = {
  hero: HeroContent;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Splits a heading into sentences and colours the last word of each: Primary Blue first,
 * strong Teal second (both pass 3:1 for large text). "Smarter Solutions. Stronger Businesses."
 * becomes "Smarter [Solutions.] Stronger [Businesses.]".
 */
function HighlightedTitle({ title }: { title: string }) {
  const sentences = title.match(/[^.!?]+[.!?]*/g) ?? [title];
  const tones = ["text-secondary", "text-accent-strong"];
  return sentences.map((sentence, index) => {
    const trimmed = sentence.trim();
    const cut = trimmed.lastIndexOf(" ");
    const head = cut === -1 ? "" : trimmed.slice(0, cut + 1);
    const last = cut === -1 ? trimmed : trimmed.slice(cut + 1);
    // The space before each later sentence keeps the text correct for screen readers and search.
    return (
      <span key={index} className="block">
        {index > 0 && " "}
        {head}
        <span className={tones[index % tones.length]}>{last}</span>
      </span>
    );
  });
}

/**
 * The hero at the top of every page. Its content comes from the page's content file.
 *
 * - It fills the first screen below the header (`100svh` minus `--header-h`), so the next
 *   section only appears after scrolling. `svh` is the height with the phone browser bars
 *   showing, so nothing is cut off when they are.
 * - If the content is taller than the screen (short landscape phones), the hero grows with it.
 * - Background runs edge to edge; content sits in the same Container as the header, so left
 *   edges line up on every page. Heading and text stop at 672 px so lines stay readable.
 * - `size="tall"` (Home) uses a larger heading; `compact` is for the other pages.
 * - With an image, the layout becomes two columns from 1024 px (text 7 of 12, image 5 of 12).
 * - `tagline` (Home) is a small letter-spaced line above the heading, Slate text (16.9:1)
 *   followed by a short Primary Blue bar. Uppercase is CSS only; the content keeps its capitals.
 * - Primary buttons get an arrow that slides 4 px on hover.
 * - The last word of each sentence in the heading is coloured (see HighlightedTitle).
 * - Background: a soft Teal glow top left, a dot grid top right (from 1024 px) and layered
 *   Primary Blue and Teal waves bottom right, all behind the content and aria-hidden.
 * - Text never waits for an animation.
 */
export function Hero({ hero }: HeroProps) {
  const { title, description, tagline, buttons, size, image } = hero;
  const titleId = "hero-title";

  return (
    <section
      aria-labelledby={titleId}
      className="from-primary to-primary-alt relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden bg-linear-to-b"
    >
      {/* Background decoration only: teal glow, dot grid and layered brand waves. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-accent/15 absolute -top-40 -left-40 size-[28rem] rounded-full blur-3xl" />

        <svg
          className="text-secondary/30 absolute top-24 right-8 hidden lg:block"
          width="120"
          height="72"
          viewBox="0 0 120 72"
        >
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={6 + col * 22}
                cy={6 + row * 28}
                r="2"
                fill="currentColor"
              />
            )),
          )}
        </svg>

        <svg
          className="absolute right-0 bottom-0 h-[22%] w-full sm:h-[32%] lg:h-[62%] lg:w-[62%]"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <path
            className="fill-secondary/[0.07]"
            d="M0 400C220 385 360 300 500 195S700 40 800 18V400Z"
          />
          <path
            className="fill-secondary/[0.12]"
            d="M120 400C310 372 455 328 600 255S755 168 800 158V400Z"
          />
          <path className="fill-accent" d="M300 400C455 372 565 330 655 282S762 192 800 176V400Z" />
          <path
            className="fill-secondary"
            d="M210 400C420 390 565 352 685 302S772 250 800 244V400Z"
          />
        </svg>
      </div>

      <Container className="pt-16 pb-32 sm:pb-36 md:pt-20 lg:pb-20">
        <div className={cn("grid gap-12", image && "lg:grid-cols-12 lg:items-center")}>
          <div className={cn("max-w-2xl", image && "lg:col-span-7")}>
            {tagline && (
              <p className="text-ink mb-6 flex items-center gap-4 text-xs font-semibold tracking-[0.18em] uppercase sm:text-sm">
                <span>{tagline}</span>
                <span
                  aria-hidden="true"
                  className="bg-secondary hidden h-0.5 w-16 shrink-0 rounded-full sm:block"
                />
              </p>
            )}

            <h1
              id={titleId}
              className={cn(
                "font-bold",
                size === "tall" && "text-[clamp(2.25rem,1.4rem+4vw,4rem)]",
              )}
            >
              <HighlightedTitle title={title} />
            </h1>

            <p className="mt-6 max-w-[65ch] text-lg leading-7 md:text-xl md:leading-8">
              {description}
            </p>

            {buttons && (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {buttons.map(({ label, href, variant }) => (
                  <ButtonLink
                    key={label}
                    href={href}
                    variant={variant}
                    target={isExternal(href) ? "_blank" : undefined}
                    rel={isExternal(href) ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group",
                      variant === "primary" && "shadow-secondary/30 shadow-lg",
                    )}
                  >
                    {label}
                    {variant === "primary" && (
                      <ArrowRight
                        aria-hidden="true"
                        className="ease-brand size-5 transition duration-(--motion-base) group-hover:translate-x-1"
                      />
                    )}
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={640}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="rounded-card h-auto w-full"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
