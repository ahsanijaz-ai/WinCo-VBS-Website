import type { ServiceIcon } from "@/content";
import { cn } from "@/lib/cn";

/** Traced line icons for the Services hero pills, one stroke colour so it recolours with `currentColor`. */
const paths: Record<ServiceIcon, string[]> = {
  briefcase: [
    "M36 26 V20 a4 4 0 0 1 4 -4 H56 a4 4 0 0 1 4 4 V26",
    "M56.00 50.67 Q69.00 49.59 82.00 45.00 V30 a4 4 0 0 0 -4 -4 H18 a4 4 0 0 0 -4 4 V45 Q27.00 49.59 40.00 50.67",
    "M18 56 V76 a4 4 0 0 0 4 4 H74 a4 4 0 0 0 4 -4 V56",
  ],
  megaphone: [
    "M32 32 H22 a10 10 0 0 0 0 20 H32 Z",
    "M32 32 C42 32 50 29 58 24",
    "M32 52 C42 52 50 55 58 60",
    "M27 52 L31 67 Q32 71 36 71 Q40 71 40.6 67 L43 53",
    "M76 30 L83 25 M77 42 H86 M76 54 L83 59",
  ],
  "trending-up": ["M14 12 V80 H84", "M26 64 L42 44 L54 56 L80 30", "M65 30 H80 V45"],
  "monitor-smartphone": [
    "M79 31 V22 a6 6 0 0 0 -6 -6 H21 a6 6 0 0 0 -6 6 V60",
    "M55 71 H15 a6 6 0 0 1 -6 -6 V60 H38 Q40 64.5 45 64.5 H48 Q51 64.5 53 60 H55 Z",
    "M71.5 73 H78.5",
  ],
};

/** The rect each icon adds on top of its paths (briefcase's clasp, megaphone's handle, the phone). */
const rects: Record<
  ServiceIcon,
  { x: number; y: number; width: number; height: number; rx: number } | null
> = {
  briefcase: { x: 42, y: 44, width: 12, height: 12, rx: 2.5 },
  megaphone: { x: 58, y: 17, width: 10, height: 50, rx: 5 },
  "trending-up": null,
  "monitor-smartphone": { x: 61, y: 34, width: 28, height: 46, rx: 5 },
};

type ServiceLineIconProps = {
  icon: ServiceIcon;
  className?: string;
};

/**
 * Single-colour traced line icon for the Services hero pills (briefcase, megaphone, chart,
 * laptop + phone). Unlike `ServiceGlyph`'s two-tone fill, every stroke here is `currentColor`,
 * so it recolours cleanly with the pill's icon background on hover and when featured.
 */
export function ServiceLineIcon({ icon, className }: ServiceLineIconProps) {
  const rect = rects[icon];
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block size-full", className)}
      aria-hidden="true"
    >
      {paths[icon].map((d) => (
        <path key={d} d={d} />
      ))}
      {rect && <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={rect.rx} />}
    </svg>
  );
}
