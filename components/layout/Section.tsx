import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** `alt` gives the section the alternate background (#F4F7FB). */
  tone?: "default" | "alt";
};

/**
 * Every page section: --section-y padding at the top and bottom, content inside a Container.
 * Give it `aria-labelledby` pointing at its heading so screen readers can find it.
 */
export function Section({ tone = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-(--section-y)", tone === "alt" && "bg-primary-alt", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
