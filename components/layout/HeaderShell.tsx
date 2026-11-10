"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The sticky `<header>` element. It adds a border and shadow once the page has scrolled.
 * Only this scroll state is client code: the header content is passed in from the server.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "bg-primary ease-brand sticky top-0 z-40 border-b transition duration-(--motion-slow)",
        scrolled ? "border-border shadow-sm" : "border-transparent",
      )}
    >
      {children}
    </header>
  );
}
