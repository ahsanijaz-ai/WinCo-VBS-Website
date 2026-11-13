"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type ScrollProgressBarProps = {
  /** Classes for the bar's position and size, e.g. `absolute inset-y-0 left-0 w-1`. */
  className?: string;
};

/**
 * A vertical bar that fills from the top as its block scrolls through the screen, and empties
 * again when scrolling back up. It is tied to the scroll position, not a timed animation.
 *
 * - Only the solid bar shows (no background track); it is `scaleY(progress)`, so only
 *   `transform` changes (cheap, no layout work).
 * - Progress is 0 when the block's top enters 85% down the screen and 1 when its bottom reaches
 *   65% down. Updates run at most once per frame.
 * - With reduced motion the bar is simply full and never moves.
 */
export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const trackRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.transform = "scaleY(1)";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.65;
      const progress = (start - rect.top) / (start - end + rect.height);
      bar.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
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
  }, []);

  return (
    <span
      ref={trackRef}
      aria-hidden="true"
      className={cn("block overflow-hidden rounded-full", className)}
    >
      <span
        ref={barRef}
        className="bg-secondary block size-full origin-top rounded-full will-change-transform"
        style={{ transform: "scaleY(0)" }}
      />
    </span>
  );
}
