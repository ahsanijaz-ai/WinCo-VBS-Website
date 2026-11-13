import { ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";
import { ServiceGlyph } from "@/components/brand/ServiceGlyph";
import { PageLink } from "@/components/ui/PageLink";
import type { ServiceGroup } from "@/content";
import { cn } from "@/lib/cn";
import { twoDigits } from "@/components/sections/services/two-digits";

type GroupTilesProps = {
  groups: Pick<ServiceGroup, "id" | "title" | "icon">[];
};

/** The tile shown filled by default, like the featured card on Home (Marketing). */
const FEATURED_INDEX = 1;

/**
 * The Services hero's right-hand block: one tile per service group, each a link to its group
 * further down the page.
 *
 * - Under 1024 px: a row of four small tiles (number and glyph; the title is for screen readers),
 *   so the hero stays about one screen tall on phones.
 * - From 1024 px: a 2 x 2 grid with the right column set 32 px lower, and the group titles shown.
 * - Hover and keyboard focus use the Home card fill (`.svc-card` in globals.css), so the two
 *   pages feel the same. The tiles fade up one after another on load (220 ms each, 60 ms apart),
 *   and appear at once with reduced motion.
 */
export function GroupTiles({ groups }: GroupTilesProps) {
  return (
    <ul className="svc-grid grid grid-cols-4 gap-3 lg:ml-auto lg:max-w-md lg:grid-cols-2 lg:gap-5 lg:pb-8">
      {groups.map(({ id, title, icon }, index) => (
        <li
          key={id}
          style={{ "--fade-y": "12px", animationDelay: `${index * 60}ms` } as CSSProperties}
          className={cn("motion-safe:animate-fade-up flex", index % 2 === 1 && "lg:translate-y-8")}
        >
          <PageLink
            href={`#${id}`}
            className={cn(
              "svc-card border-border bg-primary flex w-full flex-col rounded-2xl border p-2.5 shadow-sm sm:p-3 lg:p-5",
              "ease-brand transition duration-(--motion-base) hover:-translate-y-1 hover:shadow-lg",
              index === FEATURED_INDEX && "svc-card--featured",
            )}
          >
            <span className="flex items-start justify-between gap-2">
              <span
                aria-hidden="true"
                className="svc-card-title text-ink/45 text-xs font-bold tabular-nums lg:text-sm"
              >
                {twoDigits(index)}
              </span>
              <span className="svc-go hidden size-8 shrink-0 items-center justify-center rounded-full border p-1.5 lg:flex">
                <ArrowDown aria-hidden="true" strokeWidth={1.8} className="size-full" />
              </span>
            </span>
            <span className="svc-icon mx-auto mt-1 flex aspect-square w-full max-w-16 items-center justify-center rounded-xl p-2 lg:mx-0 lg:mt-6 lg:size-16 lg:p-2.5">
              <ServiceGlyph icon={icon} />
            </span>
            <span className="svc-card-title text-ink sr-only lg:not-sr-only lg:mt-4 lg:text-base lg:leading-6 lg:font-semibold">
              {title}
            </span>
          </PageLink>
        </li>
      ))}
    </ul>
  );
}
