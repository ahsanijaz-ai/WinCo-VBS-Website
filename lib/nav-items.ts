import { Briefcase, House, Mail, Users, type LucideIcon } from "lucide-react";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
};

/** The four main pages. Single source of truth for the header, the mobile menu and the footer. */
export const navItems: readonly NavItem[] = [
  { label: "Home", href: "/", icon: House },
  { label: "About Us", href: "/about", icon: Users },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

/** True when `pathname` is the page behind `href`. Home only matches the exact `/`. */
export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
