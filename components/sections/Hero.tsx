import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ctaLiftClassName } from "@/components/ui/button-styles";
import { RollLabel } from "@/components/ui/RollLabel";
import type { Hero as HeroContent } from "@/content";
import { cn } from "@/lib/cn";

type HeroProps = {
  hero: HeroContent;
  /** `center` centres the text and buttons (Contact). Default `left`. */
  align?: "left" | "center";
  /** Optional decorative illustration shown above the heading. */
  illustration?: ReactNode;
  /**
   * Adds the Contact entrance and button motion: the illustration, heading and description fade
   * up 8 px once on load (220 ms), and primary buttons lift 2 px with their arrow sliding 4 px on
   * hover (180 ms). Both skip when the visitor prefers reduced motion. Default off.
   */
  animated?: boolean;
  /**
   * `pill` (Contact): primary buttons become fully rounded with a Primary Blue gradient and the
   * arrow in a light circle on the right. Default keeps the standard 8 px button.
   */
  buttonStyle?: "default" | "pill";
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
 * - The content's `tagline` is not shown in the hero; it appears in the footer on every page.
 * - Primary buttons get an arrow that slides 4 px on hover.
 * - The last word of each sentence in the heading is coloured (see HighlightedTitle).
 * - Background: a soft blue glow top left, a dot grid top right (from 1024 px) and layered
 *   waves bottom right, all behind the content and aria-hidden. The strong Teal heading word is
 *   the screen's one accent (brand rule 2), so the Teal wave is only a soft 25 % tint.
 * - Text never waits for an animation; with `animated` it fades in over 220 ms on load.
 */
export function Hero({
  hero,
  align = "left",
  illustration,
  animated = false,
  buttonStyle = "default",
}: HeroProps) {
  const { title, description, buttons, size, image } = hero;
  const titleId = "hero-title";
  const centered = align === "center";
  const fadeUp = animated && "motion-safe:animate-fade-up";

  return (
    <section
      aria-labelledby={titleId}
      className="from-primary to-primary-alt relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden bg-linear-to-b"
    >
      {/* Background decoration only: blue glow, dot grid and layered waves (the Teal one is a soft tint). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-secondary/10 absolute -top-40 -left-40 size-[28rem] rounded-full blur-3xl" />

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
          <path
            className="fill-accent/25"
            d="M300 400C455 372 565 330 655 282S762 192 800 176V400Z"
          />
          <path
            className="fill-secondary"
            d="M210 400C420 390 565 352 685 302S772 250 800 244V400Z"
          />
        </svg>
      </div>

      <Container className="pt-16 pb-32 sm:pb-36 md:pt-20 lg:pb-20">
        <div className={cn("grid gap-12", image && "lg:grid-cols-12 lg:items-center")}>
          <div
            className={cn(
              "max-w-2xl",
              centered && "mx-auto max-w-4xl text-center",
              image && "lg:col-span-7",
            )}
          >
            {illustration && (
              <div className={cn("mb-6 flex", centered && "justify-center", fadeUp)}>
                {illustration}
              </div>
            )}

            <h1
              id={titleId}
              className={cn(
                "font-bold",
                size === "tall" && "text-[clamp(2.25rem,1.4rem+4vw,4rem)]",
                fadeUp,
              )}
            >
              <HighlightedTitle title={title} />
            </h1>

            <p
              className={cn(
                "mt-6 max-w-[65ch] text-lg leading-7 md:text-xl md:leading-8",
                centered && "mx-auto",
                fadeUp,
              )}
            >
              {description}
            </p>

            {buttons && (
              <div
                className={cn(
                  "mt-10 flex flex-col gap-4 sm:flex-row",
                  centered && "sm:justify-center",
                )}
              >
                {buttons.map(({ label, href, variant }) => {
                  const pill = buttonStyle === "pill" && variant === "primary";
                  const arrow = (
                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "ease-brand size-5 transition duration-(--motion-base) group-hover:translate-x-1",
                        animated && "duration-(--motion-hover) ease-[ease-out]",
                      )}
                    />
                  );
                  return (
                    <ButtonLink
                      key={label}
                      href={href}
                      variant={variant}
                      target={isExternal(href) ? "_blank" : undefined}
                      rel={isExternal(href) ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group",
                        variant === "primary" && "shadow-secondary/30 shadow-lg",
                        animated &&
                          variant === "primary" &&
                          cn(ctaLiftClassName, "hover:shadow-xl"),
                        pill &&
                          "from-secondary shadow-secondary/35 min-h-14 gap-3 rounded-full bg-linear-to-br to-[color-mix(in_oklab,var(--color-secondary)_72%,var(--color-secondary-hover))] py-2 pr-2 pl-5 whitespace-nowrap sm:gap-4 sm:pl-7",
                      )}
                    >
                      {variant === "secondary" && (
                        <MessageCircle aria-hidden="true" className="size-5" />
                      )}
                      <RollLabel text={label} />
                      {pill ? (
                        <span className="bg-primary/15 flex size-9 shrink-0 items-center justify-center rounded-full sm:size-10">
                          {arrow}
                        </span>
                      ) : (
                        variant === "primary" && arrow
                      )}
                    </ButtonLink>
                  );
                })}
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
