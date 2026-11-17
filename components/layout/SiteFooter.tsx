import { CalendarDays, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageLink } from "@/components/ui/PageLink";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
import { RollLabel } from "@/components/ui/RollLabel";
import { homePage, servicesPage, site } from "@/content";
import { navItems } from "@/lib/nav-items";

/** Footer link: white text, Teal on hover (brand rule 6: Primary Blue fails on navy). */
const linkClass =
  "inline-flex min-h-11 items-center text-primary underline-offset-4 transition-colors duration-(--motion-base) ease-brand hover:text-accent hover:underline";

const headingClass = "text-primary mb-3 text-xl font-bold tracking-tight 2xl:text-2xl";

/**
 * `text` with its `highlight` words large, extra bold and Teal (Teal on navy passes contrast,
 * brand rule 4). Falls back to plain text if the words are not in the sentence.
 */
function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (start === -1) return text;
  const end = start + highlight.length;
  return (
    <>
      {text.slice(0, start)}
      <strong className="text-accent text-xl leading-tight font-extrabold 2xl:text-2xl">
        {text.slice(start, end)}
      </strong>
      {text.slice(end)}
    </>
  );
}

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

/** A contact detail: a large Teal icon, then a small white label over the bold value. */
function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: true }>;
  label?: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 2xl:gap-4">
      <Icon aria-hidden={true} className="text-accent size-7 shrink-0 2xl:size-8" />
      <div className="min-w-0 font-bold">
        {label && <span className="text-primary block text-sm font-normal">{label}</span>}
        {children}
      </div>
    </li>
  );
}

/**
 * Decoration under the brand text: a dotted Teal world map sitting on the glowing top of a
 * globe, for the "all around the world" message. The globe spills past the column to the left
 * edge of the footer and under the services column, and fades out at the bottom.
 */
function WorldDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-4 select-none">
      <div className="absolute top-0 right-[-90%] -bottom-16 left-[-40%] -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <div className="border-light-blue/50 absolute top-[42%] left-[30%] aspect-square w-[95%] -translate-x-1/2 rounded-full border-t bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-light-blue)_10%,transparent),transparent)] shadow-[0_-18px_60px_-20px_var(--color-light-blue)]" />
      </div>
      <Image
        src="/brand/world-dots.svg"
        alt=""
        width={101}
        height={52}
        className="h-auto w-full max-w-[20rem] drop-shadow-[0_0_6px_color-mix(in_oklab,var(--color-accent)_55%,transparent)]"
      />
    </div>
  );
}

/**
 * Site footer on every page: Deep Navy, white text (docs/brand.md, rule 6). Follows the
 * client-approved footer mockup.
 *
 * - Content uses the full screen width with the page gutter (wider gutter from 1280 px),
 *   not the 1280 px page container, so the footer reads as one full-width band.
 * - Four columns from 1024 px (brand and contact widest), two from 640 px, one on phones. Sizes
 *   stay compact on laptops (and zoomed-in screens) and grow to the mockup sizes from 1536 px. The brand column has the large tagline, the sentence with
 *   "All Around the World." in large Teal, and the dotted world map on a glowing globe.
 * - Contact rows: large Teal icons, small white labels, bold values, thin lines between rows.
 * - Focus rings inside the footer are Teal, because Primary Blue on navy is only about 1.7:1.
 * - Social links without a URL are hidden; their row hides too when none are left.
 */
export function SiteFooter() {
  const socials = site.socials.filter((social) => social.href);
  const cta = homePage.closingCta.button;

  return (
    <footer className="bg-navy text-primary [&_:focus-visible]:outline-accent relative isolate overflow-hidden">
      {/* Deeper navy at the top left, a soft lift at the bottom right. Decoration only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-navy)_70%,var(--color-ink))_0%,var(--color-navy)_60%,color-mix(in_oklab,var(--color-navy)_88%,var(--color-light-blue))_100%)]"
      />

      <div className="w-full px-(--gutter) pt-12 pb-6 md:pt-14 xl:px-16">
        <Reveal className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_0.6fr_1.3fr] 2xl:gap-x-12">
          <RevealFade as="div">
            <Logo tone="dark" className="[&_img]:h-9 2xl:[&_img]:h-11" />
            <p className="mt-3 max-w-[22ch] text-xl leading-tight font-bold tracking-tight 2xl:text-2xl">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-[36ch] text-base leading-7 2xl:text-lg">
              <HighlightedText text={site.footerText} highlight={site.footerHighlight} />
            </p>
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
            <WorldDecor />
          </RevealFade>

          <RevealFade as="div">
            <FooterColumn id="footer-services" title={labelOf("/services")}>
              <ul className="pl-2 text-base 2xl:text-lg">
                {servicesPage.groups.map(({ id, title }) => (
                  <li key={id}>
                    <Link href={`/services#${id}`} className={`${linkClass} py-1 leading-6`}>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </RevealFade>

          <RevealFade as="div">
            <FooterColumn id="footer-quick-links" title={site.footerHeadings.quickLinks}>
              <ul className="pl-2 text-base 2xl:text-lg">
                {navItems.map(({ href, label }) => (
                  <li key={href}>
                    <PageLink href={href} className={linkClass}>
                      {label}
                    </PageLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </RevealFade>

          <RevealFade as="div">
            <FooterColumn as="section" id="footer-contact" title={labelOf("/contact")}>
              <ul className="divide-primary/30 divide-y text-base 2xl:text-lg">
                <ContactRow icon={WhatsAppIcon} label={site.footerLabels.whatsapp}>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} min-h-8`}
                  >
                    {site.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow icon={Mail} label={site.footerLabels.email}>
                  <a href={`mailto:${site.email}`} className={`${linkClass} min-h-8 break-all`}>
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow icon={MapPin}>
                  <p className="flex min-h-11 items-center">
                    {site.address.city}, {site.address.country}
                  </p>
                </ContactRow>
              </ul>
              <ButtonLink
                href={cta.href}
                className="mt-5 w-full rounded-xl px-4 sm:w-full sm:whitespace-nowrap 2xl:min-h-13 2xl:text-lg"
              >
                <CalendarDays aria-hidden="true" className="size-5 2xl:size-6" />
                <RollLabel text={cta.label} />
              </ButtonLink>
            </FooterColumn>
          </RevealFade>
        </Reveal>

        <div className="border-primary/40 mt-8 border-t pt-5">
          <p className="text-primary text-sm 2xl:text-base">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
