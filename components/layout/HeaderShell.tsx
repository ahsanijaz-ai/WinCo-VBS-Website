"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The sticky `<header>` element. Transparent over the hero; once the page scrolls past ~20px it
 * animates to a frosted-glass bar (semi-opaque white, blurred, a faint accent-coloured bottom
 * border, a soft shadow). Only this scroll state is client code: the header content is passed
 * in from the server.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "ease-brand sticky top-0 isolate z-40 border-b transition-[border-color] duration-(--motion-slow)",
        scrolled ? "border-secondary/10" : "border-transparent",
      )}
    >
      {/*
       * The frosted background lives on this layer, not on <header> itself. A backdrop-filter
       * (or transform) on an ancestor makes it the containing block for position: fixed
       * children, which squeezed the full-screen mobile menu into the 64 px header bar and
       * pushed its off-screen panel into a sideways scroll once the page was scrolled.
       */}
      <div
        aria-hidden="true"
        className={cn(
          "ease-brand pointer-events-none absolute inset-0 -z-10 transition-[background-color,backdrop-filter,box-shadow] duration-(--motion-slow)",
          scrolled ? "bg-primary/80 shadow-md backdrop-blur-md" : "bg-primary/0 shadow-none",
        )}
      />
      {children}
    </header>
  );
}
