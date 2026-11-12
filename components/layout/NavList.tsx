"use client";

import { useState, type FocusEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/nav-items";

import { HomeIcon, LayersIcon, MailIcon, PersonIcon } from "./nav-icons";
import { NavLink } from "./NavLink";

/** Bespoke animated icon per route, used only in this desktop nav row (not the mobile menu). */
const DESKTOP_ICONS: Record<string, typeof HomeIcon> = {
  "/": HomeIcon,
  "/about": PersonIcon,
  "/services": LayersIcon,
  "/contact": MailIcon,
};

type PillState = {
  left: number;
  width: number;
  visible: boolean;
};

/**
 * The desktop nav row: a single pill highlight that glides to sit behind whichever item has
 * pointer or keyboard focus, measured from the item's own offsetLeft/offsetWidth. It fades out
 * (not width-collapses) when the pointer or focus leaves the whole row. Styled by navbar.css,
 * imported once in SiteHeader.tsx.
 */
export function NavList() {
  const [pill, setPill] = useState<PillState>({ left: 0, width: 0, visible: false });

  const moveTo = (el: HTMLElement) => {
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  };

  const onPointerOver = (event: PointerEvent<HTMLUListElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-nav-item]");
    if (target) moveTo(target);
  };

  const onFocus = (event: FocusEvent<HTMLUListElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-nav-item]");
    if (target) moveTo(target);
  };

  const hidePill = () => setPill((current) => ({ ...current, visible: false }));

  return (
    <ul
      className="relative flex items-center gap-1 xl:gap-2"
      onPointerOver={onPointerOver}
      onPointerLeave={hidePill}
      onFocus={onFocus}
      onBlur={hidePill}
    >
      <span
        aria-hidden="true"
        className={cn("nav-pill", pill.visible && "nav-pill--visible")}
        style={{ transform: `translateX(${pill.left}px)`, width: `${pill.width}px` }}
      />
      {navItems.map(({ href, label }) => (
        <li key={href}>
          <NavLink href={href} label={label} icon={DESKTOP_ICONS[href] ?? HomeIcon} />
        </li>
      ))}
    </ul>
  );
}
