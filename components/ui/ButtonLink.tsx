import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { CtaButton } from "@/content";
import { cn } from "@/lib/cn";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-card px-6 text-base font-semibold " +
  "transition duration-(--motion-base) ease-brand active:scale-[0.97] active:duration-(--motion-fast)";

/** `primary` is solid blue, `secondary` is the blue outline. Same names as the content files. */
const variants = {
  primary: "bg-secondary text-primary hover:bg-secondary-hover",
  secondary: "border border-secondary bg-primary text-secondary hover:bg-secondary-tint",
} satisfies Record<CtaButton["variant"], string>;

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: CtaButton["variant"];
};

/** A link that looks like a button. At least 48 px tall, so it is easy to tap. */
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
