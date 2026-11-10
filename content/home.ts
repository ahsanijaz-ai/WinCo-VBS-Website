import type { Page } from "./types";

// Hero only for now. The rest of the Home copy is added in task 2.4.
export const homePage: Page = {
  seo: {
    title: "WinCo VBS | Smarter Solutions. Stronger Businesses.",
    description:
      "Business support, strategic guidance, and technology solutions for entrepreneurs and organizations in Barbados, the Caribbean and worldwide.",
  },
  hero: {
    title: "Smarter Solutions. Stronger Businesses.",
    description:
      "We help businesses simplify operations, strengthen their digital presence, and improve efficiency through tailored business support, strategic guidance, and technology solutions.",
    tagline: "Your Business, Organized and Optimized.",
    size: "tall",
    buttons: [
      { label: "Explore Our Services", href: "/services", variant: "primary" },
      { label: "Let's Talk Business", href: "/contact", variant: "secondary" },
    ],
  },
};
