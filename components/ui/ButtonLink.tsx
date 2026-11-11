import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { CtaButton } from "@/content";
import { buttonClassName } from "@/components/ui/button-styles";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: CtaButton["variant"];
};

/**
 * A link that looks like a button. At least 48 px tall, so it is easy to tap.
 * Full width on phones and automatic width from 640 px; pass `className` to override.
 */
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}
