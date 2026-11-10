import { site } from "./site";
import type { Page } from "./types";

// Hero only for now. Contact details and form text are added in task 2.4.
export const contactPage: Page = {
  seo: {
    title: "Contact Us | WinCo VBS",
    description:
      "Tell us what your business needs. Contact WinCo VBS by email, WhatsApp, or the inquiry form.",
  },
  hero: {
    title: "Let's Talk Business.",
    description:
      "Tell Us What Your Business Needs. Have a project in mind? Need ongoing business support? Looking for ways to improve your operations? We'd love to hear from you.",
    size: "compact",
    buttons: [{ label: "Chat With Us on WhatsApp", href: site.whatsappUrl, variant: "primary" }],
  },
};
