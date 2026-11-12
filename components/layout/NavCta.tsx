"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import { RollLabel } from "@/components/ui/RollLabel";

type NavCtaProps = {
  href: string;
  label: string;
  className?: string;
};

const MAX_PULL = 7;

/**
 * The header's consultation button: a magnetic pull toward the cursor, a soft glow that follows
 * it, and a calendar icon whose rings lift and whose checkmark pops in on hover. The label uses
 * the same shared `RollLabel` every button on the site uses. Scoped to the header only; the
 * shared `ButtonLink` used everywhere else on the site is untouched. Styled by navbar.css,
 * imported once in SiteHeader.tsx.
 */
export function NavCta({ href, label, className }: NavCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;
    const dx = relX - rect.width / 2;
    const dy = relY - rect.height / 2;
    const tx = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.15));
    const ty = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.35));
    el.style.setProperty("--cta-mx", `${relX}px`);
    el.style.setProperty("--cta-my", `${relY}px`);
    el.style.setProperty("--cta-tx", `${tx}px`);
    el.style.setProperty("--cta-ty", `${ty}px`);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--cta-tx", "0px");
    el.style.setProperty("--cta-ty", "0px");
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "nav-cta btn-roll",
        "bg-secondary text-primary hover:bg-secondary-hover rounded-card inline-flex min-h-12 items-center justify-center gap-2 px-6 text-base font-semibold",
        "ease-brand transition-colors duration-(--motion-base)",
        className,
      )}
    >
      <span aria-hidden="true" className="nav-cta-glow" />
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
        <rect x="4" y="5.5" width="16" height="14.5" rx="2" stroke="currentColor" strokeWidth={2} />
        <path d="M4 10h16" stroke="currentColor" strokeWidth={2} />
        <rect
          x="7.5"
          y="3.5"
          width="1.6"
          height="4"
          rx="0.8"
          className="nav-cta-ring"
          fill="currentColor"
        />
        <rect
          x="14.9"
          y="3.5"
          width="1.6"
          height="4"
          rx="0.8"
          className="nav-cta-ring"
          fill="currentColor"
        />
        <path
          d="M8.3 14.6l2.3 2.3 4.8-4.9"
          className="nav-cta-check"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <RollLabel text={label} />
    </Link>
  );
}
