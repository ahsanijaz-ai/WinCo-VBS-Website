import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The brand "W" mark used as a large, low-opacity background watermark (not a clickable logo,
 * so it's a separate component from `Logo`, aria-hidden and decorative only). Low opacity so it
 * reads as a subtle texture, not a second logo competing with the real one in the header.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.svg"
      alt=""
      aria-hidden="true"
      width={335}
      height={155}
      className={cn("h-auto w-full opacity-[0.07]", className)}
    />
  );
}
