"use client";

import { CalendarDays, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CtaButton } from "@/content";
import { cn } from "@/lib/cn";
import { isActivePath, navItems } from "@/lib/nav-items";

type MobileMenuProps = {
  /** The consultation button shown at the bottom of the panel. */
  consultation: Pick<CtaButton, "label" | "href">;
};

/** Each row starts 15 ms after the one above, so rows and button are in place within 240 ms. */
const STAGGER_MS = 15;

/**
 * Hamburger button and full-screen menu panel for screens under 768 px.
 *
 * - The panel slides in from the right in 240 ms; the rows fade and slide in one after another.
 * - It is a modal dialog: focus moves to the close button, Tab stays inside the panel,
 *   the page behind is inert and does not scroll.
 * - It closes on Escape, on the close button, after choosing a link, on any page change
 *   (including browser back) and when the screen widens to 768 px. Focus returns to the
 *   hamburger button when the visitor closes it by keyboard or the close button.
 */
export function MobileMenu({ consultation }: MobileMenuProps) {
  const pathname = usePathname();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The menu is open only for the page it was opened on, so a route change closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const closeAndReturnFocus = () => {
    setOpenOn(null);
    openButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const main = document.getElementById("main");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    // Wait one frame: the panel only becomes visible, and so focusable, after this render.
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
        openButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      // Keep Tab inside the panel.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpenOn(pathname)}
        className={cn(
          "bg-primary/90 border-accent/40 shadow-accent/20 inline-flex h-11 items-center justify-center rounded-full border-[1.5px] px-3.5 shadow-md backdrop-blur-md",
          "ease-brand hover:border-accent transition duration-(--motion-fast) active:scale-[0.94]",
        )}
      >
        {/* Three bars of different lengths, the middle one in the accent colour. */}
        <svg aria-hidden="true" width="18" height="12" viewBox="0 0 18 12" className="text-ink">
          <rect x="0" y="0" width="18" height="2" rx="1" fill="currentColor" />
          <rect x="3" y="5" width="15" height="2" rx="1" className="fill-accent" />
          <rect x="0" y="10" width="12" height="2" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "bg-primary fixed inset-0 z-50 flex flex-col",
          "ease-brand",
          open
            ? "visible translate-x-0 transition-[translate] duration-(--motion-slow)"
            : "invisible translate-x-full transition-[translate,visibility] duration-(--motion-base)",
        )}
      >
        <div className="border-ink/10 flex h-(--header-h) shrink-0 items-center justify-between border-b px-(--gutter)">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={closeAndReturnFocus}
            className="rounded-card bg-ink/5 text-ink hover:bg-ink/10 ease-brand inline-flex size-11 items-center justify-center transition duration-(--motion-fast) active:scale-[0.94]"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-(--gutter) py-6">
          <ul>
            {navItems.map(({ href, label, icon: Icon }, index) => {
              const active = isActivePath(pathname, href);
              return (
                <li
                  key={href}
                  style={{ transitionDelay: open ? `${index * STAGGER_MS}ms` : "0ms" }}
                  className={cn(
                    "border-ink/10 border-b",
                    "ease-brand transition-[opacity,translate] duration-(--motion-fast)",
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                  )}
                >
                  <Link
                    href={href}
                    onClick={() => setOpenOn(null)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex min-h-16 items-center gap-4 py-3 text-2xl font-bold tracking-tight",
                      "ease-brand transition duration-(--motion-base) active:scale-[0.98]",
                      active ? "text-secondary" : "text-ink hover:text-secondary",
                    )}
                  >
                    <Icon aria-hidden="true" className="text-secondary size-6 shrink-0" />
                    <span
                      className={cn(
                        "underline-offset-8",
                        active && "decoration-accent underline decoration-2",
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: open ? `${navItems.length * STAGGER_MS}ms` : "0ms" }}
          className={cn(
            "shrink-0 px-(--gutter) pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            "ease-brand transition-[opacity,translate] duration-(--motion-fast)",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <ButtonLink
            href={consultation.href}
            onClick={() => setOpenOn(null)}
            className="shadow-secondary/25 w-full shadow-lg sm:w-full"
          >
            <CalendarDays aria-hidden="true" className="size-5" />
            {consultation.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
