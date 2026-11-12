import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ctaLiftClassName } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { homePage } from "@/content";
import { navItems } from "@/lib/nav-items";

/**
 * Site header: logo, the four page links with icons, and the consultation button.
 * From 1024 px the links and the button show inline: compact (tighter links, smaller button)
 * until 1280 px, full size from 1280 px. Under 1024 px everything, including the button, moves
 * into the mobile menu, so the consultation button is never hidden. Zooming in a browser makes
 * the page narrower, so this also covers laptops zoomed to 175% or more.
 */
export function SiteHeader() {
  const consultation = homePage.closingCta.button;

  return (
    <HeaderShell>
      <Container className="flex h-(--header-h) items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <NavLink
                  href={href}
                  label={label}
                  icon={
                    <Icon
                      aria-hidden="true"
                      className="ease-brand size-5 shrink-0 transition duration-(--motion-base) group-hover:-translate-y-0.5"
                    />
                  }
                />
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink
          href={consultation.href}
          className={cn(
            "hidden shrink-0 whitespace-nowrap lg:inline-flex lg:px-4 lg:text-sm xl:px-6 xl:text-base",
            ctaLiftClassName,
            "hover:shadow-secondary/25 hover:shadow-md",
          )}
        >
          {consultation.label}
        </ButtonLink>

        <MobileMenu consultation={{ label: consultation.label, href: consultation.href }} />
      </Container>
    </HeaderShell>
  );
}
