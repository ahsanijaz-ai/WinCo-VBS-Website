"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav-items";

type NavLinkProps = {
  href: string;
  label: string;
  /** The icon element, already sized. It sits left of the label and is decorative. */
  icon: ReactNode;
};

/**
 * One main-navigation link: icon, label and an underline that slides in.
 * It is a client component only because it reads the current path to mark the active page.
 */
export function NavLink({ href, label, icon }: NavLinkProps) {
  const active = isActivePath(usePathname(), href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group text-ink relative inline-flex min-h-11 items-center gap-2 px-3 text-base font-medium whitespace-nowrap",
        "ease-brand hover:text-secondary transition duration-(--motion-base)",
        "active:scale-[0.97] active:duration-(--motion-fast)",
        active && "text-secondary font-semibold",
      )}
    >
      {icon}
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "bg-accent absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 opacity-0",
          "ease-brand transition duration-(--motion-base)",
          "group-hover:scale-x-100 group-hover:opacity-100",
          active && "scale-x-100 opacity-100",
        )}
      />
    </Link>
  );
}
