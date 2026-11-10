import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * Text placeholder for the logo. When the client sends the SVG, replace the contents
 * with next/image (keep this file name and the aria-label). Used in the header and footer.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="WinCo VBS, Virtual Business Solutions: home"
      className={cn("text-ink inline-flex min-h-11 items-center text-xl font-bold", className)}
    >
      WinCo&nbsp;<span className="text-secondary">VBS</span>
    </Link>
  );
}
