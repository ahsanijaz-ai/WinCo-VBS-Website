import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/**
 * The only page-width wrapper. It is centered, at most 1280 px wide (max-w-site),
 * and keeps --gutter of padding on each side, so every section lines up with the header.
 */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("max-w-site mx-auto w-full px-(--gutter)", className)} {...props} />;
}
