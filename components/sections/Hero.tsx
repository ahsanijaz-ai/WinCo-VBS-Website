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
 * - Text never waits for an animation.
 */
export function Hero({ hero }: HeroProps) {
  const { title, description, tagline, buttons, size, image } = hero;
  const titleId = "hero-title";

  return (
    <section
      aria-labelledby={titleId}
      className="from-primary to-primary-alt flex min-h-[calc(100svh-var(--header-h))] items-center bg-linear-to-b"
    >
      <Container className="py-16 md:py-20">
        <div className={cn("grid gap-12", image && "lg:grid-cols-12 lg:items-center")}>
          <div className={cn("max-w-2xl", image && "lg:col-span-7")}>
            {tagline && (
              <p className="bg-secondary-tint text-secondary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
                <span aria-hidden="true" className="bg-accent size-2 rounded-full" />
                {tagline}
              </p>
            )}

            <h1
              id={titleId}
              className={cn(size === "tall" && "text-[clamp(2.25rem,1.4rem+4vw,4rem)]")}
            >
              {title}
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
                  >
                    {label}
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
                priority
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
