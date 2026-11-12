import { cn } from "@/lib/cn";

import { iconPaths } from "./service-icon-paths";

export type ServiceIconName = "briefcase" | "megaphone" | "trend" | "devices";

/** Traced brand glyphs: the fill layer inherits currentColor (tile state), the detail layer uses secondary-hover. */
export function WhatWeDoIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const { viewBox, blue, accent } = iconPaths[name];
  return (
    <svg viewBox={viewBox} className={cn("block size-full", className)} aria-hidden="true">
      <path d={accent} className="fill-secondary-hover" />
      <path d={blue} fillRule="evenodd" className="fill-current" />
    </svg>
  );
}
