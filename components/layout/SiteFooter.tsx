import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { site } from "@/content";
import { navItems } from "@/lib/nav-items";

/** Footer link: white text, Teal on hover (brand rule 6: Primary Blue fails on navy). */
const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-primary underline-offset-4 transition-colors duration-(--motion-base) ease-brand hover:text-accent hover:underline";

const headingClass = "text-primary mb-4 text-base font-semibold";

/**
 * Site footer on every page: Deep Navy with white text (docs/brand.md, rule 6).
 * Brand block, quick links, contact details and social links, then the copyright line.
 * Focus rings inside the footer are Teal, because Primary Blue on navy is only about 1.7:1.
 * Social links without a URL are hidden; the heading hides too when none are left.
 */
export function SiteFooter() {
  const socials = site.socials.filter((social) => social.href);

  return (
    <footer className="bg-navy text-primary [&_:focus-visible]:outline-accent">
      <Container className="pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="dark" />
            <p className="mt-6 font-semibold">{site.tagline}</p>
            <p className="text-primary/80 mt-2 max-w-[45ch]">{site.footerText}</p>
          </div>

          <nav aria-labelledby="footer-quick-links" className="md:col-span-3">
            <h2 id="footer-quick-links" className={headingClass}>
              {site.footerHeadings.quickLinks}
            </h2>
            <ul>
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <ul className="grid gap-1">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail aria-hidden="true" className="text-accent size-5 shrink-0" />
                  <span>
                    <span className="text-primary/80">{site.footerLabels.email}: </span>
                    {site.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <MessageCircle aria-hidden="true" className="text-accent size-5 shrink-0" />
                  <span>
                    <span className="text-primary/80">{site.footerLabels.whatsapp}: </span>
                    {site.phoneDisplay}
                  </span>
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <div className="mt-8">
                <h2 className={headingClass}>{site.footerHeadings.social}</h2>
                <ul className="flex flex-wrap gap-x-6">
                  {socials.map(({ name, href }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="border-primary/15 text-primary/80 mt-12 border-t pt-8 text-sm">
          {site.copyright}
        </p>
      </Container>
    </footer>
  );
}
