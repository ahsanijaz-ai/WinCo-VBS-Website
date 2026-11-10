import type { Page } from "./types";

// Hero only for now. The rest of the About copy is added in task 2.4.
// The hero description and button are drafted from the copy and need client approval.
export const aboutPage: Page = {
  seo: {
    title: "About Us | WinCo VBS",
    description:
      "WinCo Virtual Business Solutions provides tailored business support, strategic guidance, and digital solutions from Bridgetown, Barbados.",
  },
  hero: {
    title: "About WinCo VBS",
    description:
      "Tailored business support, strategic guidance, and digital solutions for entrepreneurs, professionals, and organizations.",
    size: "compact",
    buttons: [{ label: "Let's Talk Business", href: "/contact", variant: "primary" }],
  },
};
