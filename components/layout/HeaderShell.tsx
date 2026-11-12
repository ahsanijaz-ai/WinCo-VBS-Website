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
        "ease-brand sticky top-0 z-40 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-(--motion-slow)",
        scrolled
          ? "bg-primary/80 border-secondary/10 shadow-md backdrop-blur-md"
          : "bg-primary/0 border-transparent shadow-none",
      )}
    >
      {children}
    </header>
  );
}
