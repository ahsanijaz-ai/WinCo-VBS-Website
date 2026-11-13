"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/** Same props as next/link (including `ref`, passed straight through), with a string `href`. */
type PageLinkProps = ComponentProps<typeof Link> & { href: string };

/**
 * A `next/link` for site navigation that also handles links to the page you are already on.
 *
 * Next.js keeps the scroll position when the target page is the current one, so such a link
 * would do nothing. Here, a plain left click on a link to the current path:
 * - with a `#id` (e.g. `/contact#inquiry-form`) scrolls to that element,
 * - without one, scrolls back to the top.
 * The scroll is smooth, or instant with reduced motion. Keyboard focus moves to the target
 * (the element, or the main content) so screen-reader and keyboard users land there too.
 * Links to other pages navigate as normal, and Next.js then jumps to any `#id` itself.
 * Ctrl, Cmd, Shift and middle clicks still behave normally (new tab or window).
 */
export function PageLink({ href, onClick, ...props }: PageLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const plainClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const [path, hash] = href.split("#");
    if (event.defaultPrevented || !plainClick || path !== pathname) return;

    const target = hash ? document.getElementById(hash) : null;
    if (hash && !target) return;

    event.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
      window.history.replaceState(null, "", `#${hash}`);
    } else {
      window.scrollTo({ top: 0, behavior });
    }

    // Wait two frames: a nav menu may still be closing and keeping <main> inert for a moment.
    const focusTarget = target ?? document.getElementById("main");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true })),
    );
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
