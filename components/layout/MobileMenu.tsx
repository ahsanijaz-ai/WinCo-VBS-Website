"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CtaButton } from "@/content";
import { cn } from "@/lib/cn";
import { isActivePath, navItems } from "@/lib/nav-items";

type MobileMenuProps = {
  /** The consultation button shown at the bottom of the panel. */
  consultation: Pick<CtaButton, "label" | "href">;
};

const bar =
  "absolute inset-x-0 h-0.5 rounded-full bg-current transition duration-(--motion-base) ease-brand";

/**
 * Hamburger button and menu panel for screens under 768 px (W3C disclosure pattern:
 * a button with aria-expanded that shows a list of ordinary links, no role="menu").
 *
 * Closes on Escape (focus returns to the button), on a tap outside, after choosing a link,
 * and whenever the page changes, including browser back and forward.
 */
export function MobileMenu({ consultation }: MobileMenuProps) {
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The menu is open only for the page it was opened on, so a route change closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOn(null);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpenOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="rounded-card text-ink inline-flex size-11 items-center justify-center"
      >
        <span aria-hidden="true" className="relative block h-3.5 w-5">
          <span className={cn(bar, "top-0", open && "translate-y-1.5 rotate-45")} />
          <span className={cn(bar, "top-1.5", open && "opacity-0")} />
          <span className={cn(bar, "bottom-0", open && "-translate-y-1.5 -rotate-45")} />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        inert={!open}
        className={cn(
          "bg-primary border-border absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b shadow-sm",
          "ease-brand transition-[opacity,translate,visibility]",
          open
            ? "visible translate-y-0 opacity-100 duration-(--motion-slow)"
            : "invisible -translate-y-2 opacity-0 duration-(--motion-base)",
        )}
      >
        <nav aria-label="Mobile" className="px-(--gutter) py-4">
          <ul className="grid gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-card text-ink flex min-h-12 items-center gap-3 px-3 text-lg font-medium",
                      "ease-brand hover:bg-secondary-tint transition duration-(--motion-base)",
                      "active:bg-secondary-tint active:scale-[0.97] active:duration-(--motion-fast)",
                      active && "bg-secondary-tint text-secondary font-semibold",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-6 shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={consultation.href} onClick={close} className="mt-4">
            {consultation.label}
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
