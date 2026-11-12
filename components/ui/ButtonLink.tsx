import type { ComponentPropsWithoutRef } from "react";
import type { CtaButton } from "@/content";
import { buttonClassName } from "@/components/ui/button-styles";
import { PageLink } from "@/components/ui/PageLink";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof PageLink> & {
  variant?: CtaButton["variant"];
};

/**
 * A link that looks like a button. At least 48 px tall, so it is easy to tap.
 * Full width on phones and automatic width from 640 px; pass `className` to override.
 * Built on PageLink, so a button to the current page scrolls to its target instead of doing nothing.
 */
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <PageLink className={buttonClassName(variant, className)} {...props} />;
}
