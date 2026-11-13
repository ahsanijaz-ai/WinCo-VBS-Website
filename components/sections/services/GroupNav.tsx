"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { twoDigits } from "@/components/sections/services/two-digits";
import { PageLink } from "@/components/ui/PageLink";
import type { ServiceGroup } from "@/content";
import { cn } from "@/lib/cn";

type GroupNavProps = {
  groups: Pick<ServiceGroup, "id" | "title">[];
};

/**
 * The Services group navigator: sticks under the header while the visitor is inside the four
 * groups, and shows where they are.
 *
 * - One link per group (01 to 04 with the full title). The group in the middle of the screen
 *   is marked with Primary Blue text, a tint and `aria-current`; colours change in 200 ms.
 * - A thin Primary Blue bar along the bottom fills as the visitor moves through the groups.
 * - When the links don't fit (under 1280 px) the row scrolls sideways on its own, its edges
 *   fade to show there is more, and the current link is scrolled into view. The page itself
 *   never scrolls sideways.
 * - Real links to `#id`, so they work without JavaScript and with the keyboard.
 */
export function GroupNav({ groups }: GroupNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Current group: the one crossing a line 45% down the screen.
  useEffect(() => {
    const sections = groups
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  // Progress bar: how far the visitor is from the top of the first group to the end of the last.
  useEffect(() => {
    const first = document.getElementById(groups[0]?.id ?? "");
    const last = document.getElementById(groups[groups.length - 1]?.id ?? "");
    const bar = barRef.current;
    if (!first || !last || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const start = first.getBoundingClientRect().top + window.scrollY;
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const progress = end > start ? (window.scrollY - start) / (end - start) : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [groups]);

  // Keep the current link visible inside the row, without moving the page.
  useEffect(() => {
    const row = rowRef.current;
    const link = row?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!row || !link) return;
    const left = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label="Service groups"
      className="bg-primary/95 border-border sticky top-(--header-h) z-30 border-b backdrop-blur-md"
    >
      <Container>
        <div
          ref={rowRef}
          className="-mx-(--gutter) flex h-(--subnav-h) [scrollbar-width:none] items-center overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_var(--gutter),black_calc(100%-var(--gutter)),transparent)] px-(--gutter) [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex shrink-0 items-center gap-1 xl:w-full xl:justify-between">
            {groups.map(({ id, title }, index) => {
              const active = id === activeId;
              return (
                <li key={id}>
                  <PageLink
                    href={`#${id}`}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-2 rounded-full px-3.5 text-sm font-medium whitespace-nowrap",
                      "ease-brand transition-colors duration-(--motion-base)",
                      active
                        ? "bg-secondary-tint text-secondary"
                        : "text-text hover:text-secondary hover:bg-secondary-tint/60",
                    )}
                  >
                    <span aria-hidden="true" className="text-xs font-bold tabular-nums">
                      {twoDigits(index)}
                    </span>
                    {title}
                  </PageLink>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
      <span
        ref={barRef}
        aria-hidden="true"
        style={{ transform: "scaleX(0)" }}
        className="bg-secondary absolute inset-x-0 -bottom-px h-0.5 origin-left"
      />
    </nav>
  );
}
