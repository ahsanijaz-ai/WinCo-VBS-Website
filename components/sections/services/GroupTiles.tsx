import { ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";
import { ServiceGlyph } from "@/components/brand/ServiceGlyph";
import { PageLink } from "@/components/ui/PageLink";
import type { ServiceGroup } from "@/content";
import { cn } from "@/lib/cn";
import { twoDigits } from "@/components/sections/services/two-digits";

type GroupTilesProps = {
  /** The label above the tiles, e.g. "Explore our solutions below." */
  label: string;
  groups: Pick<ServiceGroup, "id" | "title" | "icon">[];
};

/** The tile shown filled by default, like the featured card on Home (Marketing). */
const FEATURED_INDEX = 1;

/**
 * The Services hero's right-hand block: the page intro ("Explore our solutions below.") as a
 * label, then one tile per service group, each a link to its group further down the page.
 *
 * - Under 1024 px: a row of four small tiles (number and glyph; the title is for screen readers),
 *   so the hero stays one screen tall on phones and tablets.
 * - From 1024 px: a stacked list of four rows (glyph, number and title, arrow), like a small
 *   table of contents. About 330 px tall at every width, so it is always shorter than the hero
 *   text and never makes the hero taller than the first screen.
 * - Hover and keyboard focus use the Home card fill (`.svc-card` in globals.css), so the two
 *   pages feel the same. The tiles fade up one after another on load (220 ms each, 60 ms apart),
 *   and appear at once with reduced motion.
 */
export function GroupTiles({ label, groups }: GroupTilesProps) {
  return (
    <div className="lg:ml-auto lg:w-full lg:max-w-md">
      <p id="services-tiles-label" className="text-ink low:mb-2 mb-3 text-sm font-semibold">
        {label}
      </p>
      <ul
        aria-labelledby="services-tiles-label"
        className="svc-grid grid grid-cols-4 gap-3 lg:grid-cols-1"
      >
        {groups.map(({ id, title, icon }, index) => (
          <li
            key={id}
            style={{ "--fade-y": "12px", animationDelay: `${index * 60}ms` } as CSSProperties}
            className="motion-safe:animate-fade-up flex"
          >
            <PageLink
              href={`#${id}`}
              className={cn(
                "svc-card border-border bg-primary low:p-2 flex w-full flex-col rounded-2xl border p-2.5 shadow-sm sm:p-3",
                "lg:flex-row lg:items-center lg:gap-4 lg:p-3 lg:pr-4",
                "ease-brand transition duration-(--motion-base) hover:-translate-y-1 hover:shadow-lg",
                index === FEATURED_INDEX && "svc-card--featured",
              )}
            >
              <span
                aria-hidden="true"
                className="svc-card-title text-ink/45 low:hidden text-xs font-bold tabular-nums lg:hidden"
              >
                {twoDigits(index)}
              </span>
              <span className="svc-icon low:mt-0 low:max-w-10 mx-auto mt-1 flex aspect-square w-full max-w-16 shrink-0 items-center justify-center rounded-xl p-2 lg:mx-0 lg:mt-0 lg:size-12">
                <ServiceGlyph icon={icon} />
              </span>
              <span className="sr-only lg:not-sr-only lg:flex lg:min-w-0 lg:flex-1 lg:flex-col">
                <span
                  aria-hidden="true"
                  className="svc-card-title text-ink/45 text-xs font-bold tabular-nums"
                >
                  {twoDigits(index)}
                </span>
                <span className="svc-card-title text-ink text-sm leading-5 font-semibold xl:text-base xl:leading-6">
                  {title}
                </span>
              </span>
              <span className="svc-go hidden size-8 shrink-0 items-center justify-center rounded-full border p-1.5 lg:flex">
                <ArrowDown aria-hidden="true" strokeWidth={1.8} className="size-full" />
              </span>
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
