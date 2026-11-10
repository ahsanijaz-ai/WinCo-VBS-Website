import type { Page } from "./types";

// Hero only for now. The service groups are added in task 2.4.
export const servicesPage: Page = {
  seo: {
    title: "Our Services | WinCo VBS",
    description:
      "Administrative support, marketing, business strategy, and technology solutions designed to help your business operate more effectively.",
  },
  hero: {
    title: "Practical Solutions. Meaningful Business Impact.",
    description:
      "From everyday business support to strategic improvements and technology, WinCo VBS provides flexible services designed to help your business operate more effectively.",
    size: "compact",
    buttons: [{ label: "Discuss Your Business Needs", href: "/contact", variant: "primary" }],
  },
};
