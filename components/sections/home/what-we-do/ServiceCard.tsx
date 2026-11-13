import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

import { ServiceGlyph } from "@/components/brand/ServiceGlyph";
import type { ServiceIcon } from "@/content";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ServiceIcon;
  /** Shown in the raised/featured state by default. */
  featured?: boolean;
};

/**
 * A softer-cornered variant of the site's standard card (rounded-2xl instead of the 8 px
 * `rounded-card` token, deliberately, for a calmer feel in this grid), with a circle clip-path
 * colour fill on hover/focus (pure CSS, see .svc-card* in app/globals.css).
 */
export function ServiceCard({ title, description, href, icon, featured }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "svc-card group border-border ease-brand bg-primary flex h-full flex-col rounded-2xl border p-6 transition duration-(--motion-base) hover:-translate-y-1 hover:shadow-lg",
        featured && "svc-card--featured",
      )}
    >
      <div className="svc-icon flex size-16 shrink-0 items-center justify-center rounded-xl p-2.5">
        <ServiceGlyph icon={icon} />
      </div>
      <h3 className="svc-card-title mt-5">{title}</h3>
      <p className="svc-card-text mt-2 flex-1">{description}</p>
      <span className="svc-go mt-5 flex size-10 shrink-0 items-center justify-center rounded-full border p-2.5">
        <ArrowRight strokeWidth={1.7} className="size-full" />
      </span>
    </Link>
  );
}
