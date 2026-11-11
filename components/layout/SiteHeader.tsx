import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { homePage } from "@/content";
import { navItems } from "@/lib/nav-items";

/**
 * Site header: logo, the four page links with icons, and the consultation button.
 * From 768 px the links show inline; the button joins them from 1280 px, where there is room.
 * Under 768 px the links move into the mobile menu.
 */
export function SiteHeader() {
  const consultation = homePage.closingCta.button;

  return (
    <HeaderShell>
      <Container className="flex h-(--header-h) items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-2">
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
          className="hidden shrink-0 whitespace-nowrap xl:inline-flex"
        >
          {consultation.label}
        </ButtonLink>

        <MobileMenu consultation={{ label: consultation.label, href: consultation.href }} />
      </Container>
    </HeaderShell>
  );
}
