"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

type PageLinkProps = ComponentPropsWithoutRef<typeof Link> & { href: string };

/**
 * A `next/link` for site navigation that also handles clicking the page you are already on.
 *
 * Next.js keeps the scroll position when the target page is the current one, so a nav link to
 * the current page would do nothing. Here, a plain left click on a link to the current path
 * scrolls back to the top instead: smoothly, or instantly with reduced motion. Keyboard focus
 * moves to the main content so screen-reader and keyboard users land at the top too.
 * Ctrl, Cmd, Shift and middle clicks still behave normally (new tab or window).
 */
export function PageLink({ href, onClick, ...props }: PageLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const plainClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (event.defaultPrevented || !plainClick || href !== pathname) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // Wait two frames: a nav menu may still be closing and keeping <main> inert for a moment.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true })),
    );
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
