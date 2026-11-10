import Link from "next/link";
import { site } from "@/content";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * Text placeholder for the logo, built from the site name in content/site.ts.
 * When the client sends the SVG, replace the contents with next/image and keep this file name
 * and the label below, which is the alt text from docs/brand.md. Used in the header and footer.
 */
export function Logo({ className }: LogoProps) {
  const [first, ...rest] = site.shortName.split(" ");

  return (
    <Link
      href="/"
      aria-label="WinCo VBS, Virtual Business Solutions"
      className={cn("text-ink inline-flex min-h-11 items-center text-xl font-bold", className)}
    >
      {first}&nbsp;<span className="text-secondary">{rest.join(" ")}</span>
    </Link>
  );
}
