import { cn } from "@/lib/cn";

/**
 * Decorative envelope with a paper plane, shown above the Contact hero heading.
 * Colours come from the tokens: tint blob, Primary Blue envelope, Slate dashed path,
 * Teal paper plane (the one accent on this screen). Hidden from screen readers.
 */
export function EnvelopeIllustration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 150"
      className={cn("h-auto w-40 sm:w-48 lg:w-56", className)}
    >
      {/* Soft blob behind the envelope */}
      <path
        className="fill-secondary-tint"
        d="M78 30c18-14 48-17 70-8 21 9 33 28 31 49-2 22-12 44-34 55-22 12-55 10-74-4-18-13-27-36-23-56 3-15 14-27 30-36z"
      />

      {/* Dashed flight path: a loop on the left, then up to the plane */}
      <path
        className="stroke-ink/45"
        fill="none"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
        d="M74 112c-22 6-44 4-50-6-6-11 8-22 26-20 16 2 26 12 38 14M168 62c10-8 18-17 24-27"
      />

      {/* Envelope */}
      <rect
        x="82"
        y="46"
        width="84"
        height="58"
        rx="9"
        className="fill-primary stroke-secondary"
        strokeWidth="5"
      />
      <path
        className="stroke-secondary"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M88 54l36 28 36-28"
      />
      <path
        className="stroke-secondary/30"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        d="M90 97l22-18M158 97l-22-18"
      />

      {/* Paper plane */}
      <path className="fill-accent" d="M190 30 236 8 214 50 206 36Z" />
      <path className="fill-accent-strong" d="M206 36l30-28-26 32z" />
    </svg>
  );
}
