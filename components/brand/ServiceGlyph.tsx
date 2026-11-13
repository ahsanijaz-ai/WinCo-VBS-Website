import type { ServiceIcon } from "@/content";
import { cn } from "@/lib/cn";
import { iconPaths, type GlyphName } from "@/components/brand/service-glyph-paths";

/** Content icon name to traced glyph. */
const glyphFor: Record<ServiceIcon, GlyphName> = {
  briefcase: "briefcase",
  megaphone: "megaphone",
  "trending-up": "trend",
  "monitor-smartphone": "devices",
};

type ServiceGlyphProps = {
  icon: ServiceIcon;
  className?: string;
};

/**
 * The traced brand glyph for a service group (used on Home and Services). The main layer takes
 * `currentColor`, so the parent sets its colour; the detail layer is always Deep Navy.
 * Decorative: hidden from screen readers.
 */
export function ServiceGlyph({ icon, className }: ServiceGlyphProps) {
  const { viewBox, blue, accent } = iconPaths[glyphFor[icon]];
  return (
    <svg viewBox={viewBox} className={cn("block size-full", className)} aria-hidden="true">
      <path d={accent} className="fill-secondary-hover" />
      <path d={blue} fillRule="evenodd" className="fill-current" />
    </svg>
  );
}
