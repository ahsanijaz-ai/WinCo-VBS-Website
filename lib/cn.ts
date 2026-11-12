import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default theme. Our custom easing (`ease-brand`) and corner
 * radius (`rounded-card`) are added here, so a later `ease-*` or `rounded-*` class on the same
 * element replaces them instead of both staying.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      ease: ["brand"],
      radius: ["card"],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts, so the last class wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
