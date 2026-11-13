import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavCta } from "@/components/layout/NavCta";
import "@/components/layout/navbar.css";
import { NavList } from "@/components/layout/NavList";
import { homePage } from "@/content";

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
          <NavList />
        </nav>

        <NavCta
          href={consultation.href}
          label={consultation.label}
          className="hidden shrink-0 whitespace-nowrap lg:inline-flex lg:px-4 lg:text-sm xl:px-6 xl:text-base"
        />

        <MobileMenu consultation={{ label: consultation.label, href: consultation.href }} />
      </Container>
    </HeaderShell>
  );
}
