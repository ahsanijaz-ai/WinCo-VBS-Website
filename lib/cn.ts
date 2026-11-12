import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default theme. Our colour tokens, easing (`ease-brand`) and
 * corner radius (`rounded-card`) are added here, so a later class of the same kind on the same
 * element (for example `bg-accent-deep` after `bg-secondary`) replaces the earlier one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "primary",
        "primary-alt",
        "secondary",
        "secondary-hover",
        "secondary-tint",
        "accent",
        "accent-strong",
        "accent-deep",
        "accent-tint",
        "border",
        "input-border",
        "ink",
        "text",
        "navy",
        "light-blue",
        "error",
      ],
      ease: ["brand"],
      radius: ["card"],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts, so the last class wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
