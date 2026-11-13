import type { ComponentPropsWithoutRef } from "react";
import type { CtaButton } from "@/content";
import { buttonClassName } from "@/components/ui/button-styles";
import { PageLink } from "@/components/ui/PageLink";
import { RollLabel } from "@/components/ui/RollLabel";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof PageLink> & {
  variant?: CtaButton["variant"];
};

/**
 * A link that looks like a button. At least 48 px tall, so it is easy to tap.
 * Full width on phones and automatic width from 640 px; pass `className` to override.
 * A plain text label rolls up on hover/focus (see RollLabel); pass an icon plus the label as
 * separate children (icon first) and wrap the label in `<RollLabel>` yourself to keep the roll
 * when there's also an icon. Built on PageLink, so a button to the current page scrolls to its
 * target instead of doing nothing.
 */
export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <PageLink className={buttonClassName(variant, className)} {...props}>
      {typeof children === "string" ? <RollLabel text={children} /> : children}
    </PageLink>
  );
}
