"use client";

import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav-items";
import { PageLink } from "@/components/ui/PageLink";
import { RollLabel } from "@/components/ui/RollLabel";

type NavLinkProps = {
  href: string;
  label: string;
  /** The bespoke animated icon for this item (see nav-icons.tsx). */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * One desktop nav link: an icon hidden until hover/focus (visible at rest when active), the
 * same roll-up letter label every button on the site uses (RollLabel), and a dot under the
 * label on the active route. The sliding pill behind the row is owned by the parent `NavList`,
 * not this component. Styled by navbar.css (imported once in SiteHeader.tsx) plus the shared
 * roll-letter rules in app/globals.css.
 */
export function NavLink({ href, label, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    // PageLink: clicking the current page's own link scrolls back to the top (with reduced
    // motion and keyboard focus handled) instead of doing nothing.
    <PageLink
      href={href}
      data-nav-item
      aria-current={active ? "page" : undefined}
      className={cn(
        "nav-item btn-roll",
        "relative inline-flex min-h-11 items-center px-3 text-base font-medium whitespace-nowrap xl:px-4",
        "ease-brand transition-colors duration-(--motion-base)",
        active ? "text-secondary font-semibold" : "text-ink hover:text-secondary",
      )}
    >
      <span aria-hidden="true" className={cn("nav-icon-wrap", active && "nav-icon-wrap--active")}>
        <Icon className="size-full" />
      </span>

      <span className="relative inline-flex">
        <RollLabel text={label} />
        {active && <span className="nav-active-dot" />}
      </span>
    </PageLink>
  );
}
