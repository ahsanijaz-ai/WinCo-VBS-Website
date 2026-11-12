import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default theme. Our custom easing (`ease-brand`) is added
 * here, so a later `ease-*` class on the same element replaces it instead of both staying.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      ease: ["brand"],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts, so the last class wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
