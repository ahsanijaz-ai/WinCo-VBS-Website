/**
 * Shapes for all site text. Every page reads its text from a typed file in /content,
 * so a copy change touches one file and TypeScript catches missing fields.
 */

/** A link shown as a button. `primary` uses the secondary colour (30%), `accent` is the one key CTA (10%). */
export type CtaButton = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "accent";
};

export type HeroImage = {
  src: string;
  alt: string;
};

/** Input for the shared Hero component. Tall on Home, compact on the other pages. */
export type Hero = {
  title: string;
  description: string;
  /** Extra line under the description, e.g. the Home tagline. */
  tagline?: string;
  /** Up to two buttons. */
  buttons?: [CtaButton] | [CtaButton, CtaButton];
  size: "tall" | "compact";
  image?: HeroImage;
};

export type Seo = {
  title: string;
  description: string;
  /** Path under /public for the share image. Falls back to the site default. */
  ogImage?: string;
};

/** What every page file exports at minimum. */
export type Page = {
  seo: Seo;
  hero: Hero;
};

/** A short block with a heading and body paragraphs. */
export type TextBlock = {
  title: string;
  paragraphs: string[];
};

/** A closing call-to-action band at the bottom of a page. */
export type CallToAction = {
  title: string;
  description: string;
  button: CtaButton;
};

/** Used by What We Do cards (Home) and Why WinCo VBS points (Home). */
export type ValuePoint = {
  title: string;
  description: string;
};

/** Used by How We Work (Home). */
export type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

export type Service = {
  name: string;
  description: string;
};

/** Lucide icon names used by service groups. Icons are imported one by one in the UI. */
export type ServiceIcon = "briefcase" | "megaphone" | "trending-up" | "monitor-smartphone";

export type ServiceGroup = {
  /** Used as the anchor id on /services and as the form dropdown value. */
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  icon: ServiceIcon;
  services: Service[];
  /** Optional line after the list, e.g. "Technology solutions are scoped and quoted..." */
  note?: string;
};

export type SocialLink = {
  name: "Facebook" | "Instagram" | "LinkedIn";
  /** Empty until the client sends the real profile URLs; the UI hides empty links. */
  href: string;
};

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  email: string;
  /** Shown to visitors, e.g. "+1 (246) 269-0471". */
  phoneDisplay: string;
  /** E.164 format for tel: links, e.g. "+12462690471". */
  phoneE164: string;
  /** Full wa.me link. */
  whatsappUrl: string;
  address: {
    city: string;
    country: string;
  };
  serviceArea: string;
  location: string;
  footerText: string;
  copyright: string;
  socials: SocialLink[];
};
