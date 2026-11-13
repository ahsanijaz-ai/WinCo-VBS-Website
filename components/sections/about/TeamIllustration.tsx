import { cn } from "@/lib/cn";

/**
 * Decorative "team" illustration above the About hero heading: two people side by side on a
 * soft tint blob. Colours come from the tokens. Hidden from screen readers.
 *
 * On page load (see `.team-*` in globals.css) the blob grows in, the back person's outline draws
 * itself, the front person rises into place, then both bob gently twice and stop. On hover the
 * blob swells, the two people lift and lean toward each other and the back person's fill tints.
 * The load animation runs on the outer groups, the hover on the inner `.team-h-*` groups, so the
 * two never fight. With reduced motion nothing moves.
 */
export function TeamIllustration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 150"
      className={cn("team-art h-auto w-40 overflow-visible sm:w-48 lg:w-56", className)}
    >
      {/* Soft blob behind the people */}
      <g className="team-blob">
        <path
          className="team-h-blob fill-secondary-tint"
          d="M70 34c20-17 54-20 78-9 23 10 37 31 34 54-2 24-15 46-39 56-25 11-58 8-78-7-19-15-27-39-22-60 4-15 13-26 27-34z"
        />
      </g>

      {/* Person behind, Primary Blue outline (drawn in on load, tints on hover) */}
      <g className="team-back">
        <g className="team-h-back">
          <circle
            className="stroke-secondary fill-[var(--team-back-fill,var(--color-primary))]"
            cx="98"
            cy="58"
            r="15"
            strokeWidth="5"
            pathLength={1}
          />
          <path
            className="stroke-secondary fill-[var(--team-back-fill,var(--color-primary))]"
            strokeWidth="5"
            strokeLinejoin="round"
            pathLength={1}
            d="M68 116c0-19 13-32 30-32s30 13 30 32z"
          />
        </g>
      </g>

      {/* Person in front, filled Primary Blue (rises on load) */}
      <g className="team-front">
        <g className="team-h-front">
          <circle className="fill-secondary" cx="142" cy="66" r="15" />
          <path className="fill-secondary" d="M110 122c0-19 14-33 32-33s32 14 32 33z" />
        </g>
      </g>
    </svg>
  );
}
