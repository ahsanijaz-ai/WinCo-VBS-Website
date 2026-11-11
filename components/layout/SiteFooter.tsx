import { CalendarDays, Mail, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { homePage, servicesPage, site } from "@/content";
import { navItems } from "@/lib/nav-items";

/** Footer link: white text, Teal on hover (brand rule 6: Primary Blue fails on navy). */
const linkClass =
  "inline-flex min-h-11 items-center text-primary underline-offset-4 transition-colors duration-(--motion-base) ease-brand hover:text-accent hover:underline";

const headingClass = "text-primary mb-4 text-lg font-semibold";

const labelOf = (href: string) => navItems.find((item) => item.href === href)?.label ?? "";

/** A titled footer column: a `<nav>` for link lists, a `<section>` for contact details. */
function FooterColumn({
  as: Tag = "nav",
  id,
  title,
  className,
  children,
}: {
  as?: "nav" | "section";
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag aria-labelledby={id} className={className}>
      <h2 id={id} className={headingClass}>
        {title}
      </h2>
      {children}
    </Tag>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="border-primary/15 flex items-start gap-3 border-b py-2 first:pt-0">
      <Icon aria-hidden="true" className="text-accent mt-2 size-5 shrink-0" />
      <div className="min-w-0">
        <span className="text-primary/70 block pt-2 text-xs leading-4">{label}</span>
        {children}
      </div>
    </li>
  );
}

/**
 * Site footer on every page: Deep Navy, white text (docs/brand.md, rule 6).
 *
 * - Content uses the full screen width with the page gutter (wider gutter from 1280 px),
 *   not the 1280 px page container, so the footer reads as one full-width band.
 * - Four columns from 1024 px (3, 3, 2 and 4 of 12): brand, services, quick links, contact.
 *   The contact column is widest so the consultation button stays on one line. Two columns from
 *   640 px, one on phones. Spacing is kept tight so the footer fits below the header on a laptop.
 * - Focus rings inside the footer are Teal, because Primary Blue on navy is only about 1.7:1.
 * - Social links without a URL are hidden; their row hides too when none are left.
 */
export function SiteFooter() {
  const socials = site.socials.filter((social) => social.href);
  const cta = homePage.closingCta.button;

  return (
    <footer className="bg-navy text-primary [&_:focus-visible]:outline-accent relative isolate overflow-hidden">
      {/* Soft Light Blue glows, decoration only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_8%_10%,color-mix(in_oklab,var(--color-light-blue)_14%,transparent),transparent_70%),radial-gradient(35%_45%_at_100%_100%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_70%)]"
      />

      <div className="w-full px-(--gutter) pt-12 pb-6 md:pt-14 xl:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo tone="dark" />
            <p className="mt-6 font-semibold">{site.tagline}</p>
            <p className="text-primary/80 mt-2 max-w-[40ch]">{site.footerText}</p>
            {socials.length > 0 && (
              <ul aria-label={site.footerHeadings.social} className="mt-6 flex flex-wrap gap-x-6">
                {socials.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterColumn id="footer-services" title={labelOf("/services")} className="lg:col-span-3">
            <ul>
              {servicesPage.groups.map(({ id, title }) => (
                <li key={id}>
                  <Link href={`/services#${id}`} className={linkClass}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn
            id="footer-quick-links"
            title={site.footerHeadings.quickLinks}
            className="lg:col-span-2"
          >
            <ul>
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn
            as="section"
            id="footer-contact"
            title={labelOf("/contact")}
            className="lg:col-span-4"
          >
            <ul>
              <ContactRow icon={MessageCircle} label={site.footerLabels.whatsapp}>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {site.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label={site.footerLabels.email}>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label={site.serviceArea}>
                <p className="flex min-h-11 items-center">
                  {site.address.city}, {site.address.country}
                </p>
              </ContactRow>
            </ul>
            <ButtonLink href={cta.href} className="mt-5 w-full sm:w-full sm:whitespace-nowrap">
              <CalendarDays aria-hidden="true" className="size-5" />
              {cta.label}
            </ButtonLink>
          </FooterColumn>
        </div>

        <div className="border-primary/15 mt-10 border-t pt-6">
          <p className="text-primary/80 text-sm">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
