import { cn } from "@/lib/cn";

/**
 * Decorative "team" illustration above the About hero heading: two people side by side on a
 * soft tint blob, with a small Teal spark (the one accent on this screen). Colours come from the
 * tokens. Hidden from screen readers.
 */
export function TeamIllustration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 150"
      className={cn("h-auto w-40 sm:w-48 lg:w-56", className)}
    >
      {/* Soft blob behind the people */}
      <path
        className="fill-secondary-tint"
        d="M70 34c20-17 54-20 78-9 23 10 37 31 34 54-2 24-15 46-39 56-25 11-58 8-78-7-19-15-27-39-22-60 4-15 13-26 27-34z"
      />

      {/* Person behind, Primary Blue outline */}
      <circle className="fill-primary stroke-secondary" cx="98" cy="58" r="15" strokeWidth="5" />
      <path
        className="fill-primary stroke-secondary"
        strokeWidth="5"
        strokeLinejoin="round"
        d="M68 116c0-19 13-32 30-32s30 13 30 32z"
      />

      {/* Person in front, filled Primary Blue */}
      <circle className="fill-secondary" cx="142" cy="66" r="15" />
      <path className="fill-secondary" d="M110 122c0-19 14-33 32-33s32 14 32 33z" />

      {/* Teal spark */}
      <path className="fill-accent" d="M196 26l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" />
      <circle className="fill-accent/60" cx="182" cy="62" r="4" />
    </svg>
  );
}
