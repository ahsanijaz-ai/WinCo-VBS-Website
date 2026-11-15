"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { ServiceItemCard } from "@/components/sections/services/ServiceItemCard";
import { RevealFade } from "@/components/ui/Reveal";
import type { Service } from "@/content";
import { cn } from "@/lib/cn";

/** Cards after this index are hidden on phones until "Show more" is pressed. */
const MOBILE_VISIBLE = 3;

type ServiceListProps = {
  services: readonly Service[];
  iconScale?: "default" | "large";
};

/**
 * A group's services: two columns from 640 px. On phones only the first three show; "Show more
 * services" reveals the rest, with the plus icon rotating into a cross while open.
 */
export function ServiceList({ services, iconScale }: ServiceListProps) {
  const [open, setOpen] = useState(false);
  const gridId = useId();
  const hiddenCount = Math.max(services.length - MOBILE_VISIBLE, 0);

  return (
    <>
      <ul id={gridId} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service, index) => (
          <RevealFade
            key={service.title}
            as="li"
            className={cn(index >= MOBILE_VISIBLE && !open && "max-sm:hidden")}
          >
            <ServiceItemCard service={service} iconScale={iconScale} />
          </RevealFade>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={gridId}
          onClick={() => setOpen((value) => !value)}
          className="border-border text-ink ease-brand hover:border-secondary mt-3 flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-semibold transition duration-(--motion-base) sm:hidden"
        >
          <span>{open ? "Show fewer services" : `Show ${hiddenCount} more services`}</span>
          <Plus
            aria-hidden="true"
            strokeWidth={2}
            className={cn(
              "text-secondary ease-brand size-5 transition-transform duration-(--motion-base)",
              open && "rotate-45",
            )}
          />
        </button>
      )}
    </>
  );
}
