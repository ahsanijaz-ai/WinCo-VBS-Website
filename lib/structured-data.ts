import { site } from "@/content";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

const organizationId = `${siteUrl}/#organization`;

/**
 * Business data for search engines (schema.org JSON-LD), built only from `content/site.ts`.
 *
 * - `Organization`, not `LocalBusiness`: Google expects a street address for local business
 *   results, and the business has none to publish.
 * - Social profiles are added only once their URLs are filled in, so empty links never appear.
 */
export function siteStructuredData() {
  const sameAs = site.socials.map((social) => social.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        logo: absoluteUrl("/brand/logo.svg"),
        slogan: site.tagline,
        description: site.footerText,
        email: site.email,
        telephone: site.phoneE164,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressCountry: site.address.countryCode,
        },
        areaServed: "Worldwide",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: site.phoneE164,
          availableLanguage: "English",
        },
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        publisher: { "@id": organizationId },
      },
    ],
  };
}
