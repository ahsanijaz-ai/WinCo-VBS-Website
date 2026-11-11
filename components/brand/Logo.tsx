import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/** The alt text from docs/brand.md. Only one of the two images is visible at a time. */
const alt = "WinCo VBS, Virtual Business Solutions";

/**
 * The WinCo VBS logo as a link to the home page. Used in the header and the footer.
 *
 * - Under 768 px only the W mark shows, 40 px tall, because the full wordmark is more than
 *   seven times wider than tall and would not fit next to the menu button.
 * - From 768 px the full wordmark shows: 24 px tall until 1280 px, 36 px tall from 1280 px.
 *   Four nav links plus the consultation button leave little room before that.
 *
 * Both files are SVG, so Next.js serves them as-is and they stay sharp at every size.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex min-h-11 shrink-0 items-center", className)}>
      <Image
        src="/brand/logo-mark.svg"
        alt={alt}
        width={87}
        height={40}
        className="h-10 w-auto md:hidden"
      />
      <Image
        src="/brand/logo.svg"
        alt={alt}
        width={176}
        height={24}
        className="hidden h-6 w-auto md:block xl:h-9"
      />
    </Link>
  );
}
