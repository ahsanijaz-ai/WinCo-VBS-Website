import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** `alt` gives the section the alternate background (#F4F7FB). */
  tone?: "default" | "alt";
  /**
   * `true` (default): the section is at least one screen tall below the header, with its content
   * centred, so the next section or the footer only shows after scrolling. Taller content makes
   * the section grow, so nothing is cut off. Set `false` only for special cases.
   */
  fullScreen?: boolean;
};

/**
 * Every page section: --section-y padding at the top and bottom, content inside a Container.
 * By default each section fills the screen below the header, like the hero.
 * Give it `aria-labelledby` pointing at its heading so screen readers can find it.
 */
export function Section({
  tone = "default",
  fullScreen = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-(--section-y)",
        fullScreen && "flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center",
        tone === "alt" && "bg-primary-alt",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
