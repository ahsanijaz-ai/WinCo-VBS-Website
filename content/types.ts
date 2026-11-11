/**
 * Shapes for all site text. Every page reads its text from a typed file in /content,
 * so a copy change touches one file and TypeScript catches missing fields.
 */

/** A link shown as a button. `primary` is solid blue, `secondary` is the blue outline style. */
export type CtaButton = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
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

/** A section heading with an optional second line, e.g. "Why WinCo VBS?" / "Your Business. Our Focus." */
export type SectionHeading = {
  title: string;
  subtitle?: string;
};

/** A short block with a heading and body paragraphs. */
export type TextBlock = SectionHeading & {
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
  /** What We Do cards link to their group on /services. */
  href?: string;
  icon?: ServiceIcon;
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

export type FooterHeadings = {
  quickLinks: string;
  social: string;
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
  footerHeadings: FooterHeadings;
  copyright: string;
  socials: SocialLink[];
};

/* ---------- Page shapes ---------- */

export type HomePage = Page & {
  intro: TextBlock;
  whatWeDo: SectionHeading & {
    cards: ValuePoint[];
    button: CtaButton;
  };
  whyUs: SectionHeading & {
    points: ValuePoint[];
  };
  howWeWork: SectionHeading & {
    steps: ProcessStep[];
  };
  closingCta: CallToAction;
};

export type AboutPage = Page & {
  about: TextBlock;
  mission: TextBlock;
  vision: TextBlock;
  approach: TextBlock;
  /** Closing line at the bottom of the page. */
  closingTagline: string;
};

export type ServicesPage = Page & {
  /** Line under the hero, e.g. "Explore our solutions below." */
  intro: string;
  groups: ServiceGroup[];
  closingCta: CallToAction;
};

export type ContactIcon = "mail" | "phone" | "map-pin" | "globe";

export type ContactDetail = {
  label: string;
  value: string;
  icon: ContactIcon;
  /** mailto:, tel: or wa.me link. Omitted for plain text like the location. */
  href?: string;
};

/** Field names match the inquiry schema in lib/. */
export type InquiryFieldName =
  "fullName" | "organization" | "email" | "phone" | "country" | "service" | "message";

export type InquiryField = {
  name: InquiryFieldName;
  label: string;
  required: boolean;
};

export type InquiryForm = {
  title: string;
  fields: InquiryField[];
  /** Options for the "Service Interested In" dropdown. */
  serviceOptions: string[];
  submitLabel: string;
  successMessage: string;
};

export type ContactPage = Page & {
  intro: string[];
  details: ContactDetail[];
  whatsappButton: CtaButton;
  form: InquiryForm;
};
