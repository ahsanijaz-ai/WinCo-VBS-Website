import type { CtaButton } from "@/content";
import { cn } from "@/lib/cn";

const base =
  "btn-roll inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-card px-6 text-base font-semibold sm:w-auto " +
  "transition duration-(--motion-base) ease-brand active:scale-[0.97] active:duration-(--motion-fast)";

/** `primary` is solid blue, `secondary` is the blue outline. Same names as the content files. */
const variants = {
  primary: "bg-secondary text-primary hover:bg-secondary-hover",
  secondary: "border border-secondary bg-primary text-secondary hover:bg-secondary-tint",
} satisfies Record<CtaButton["variant"], string>;

/**
 * Button classes shared by ButtonLink (links) and real <button> elements, such as a form submit.
 * At least 48 px tall, full width on phones, automatic width from 640 px.
 */
export function buttonClassName(variant: CtaButton["variant"] = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
