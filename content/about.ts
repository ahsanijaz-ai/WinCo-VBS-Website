import type { AboutPage } from "./types";

// The hero description and button are drafted from the copy and need client approval.
export const aboutPage: AboutPage = {
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
  about: {
    title: "About WinCo VBS",
    paragraphs: [
      "WinCo Virtual Business Solutions provides tailored business support, strategic guidance, and digital solutions to entrepreneurs, professionals, and organizations. We help businesses streamline operations, improve efficiency, and build stronger foundations for sustainable growth.",
      "We believe that strong businesses are built on more than great products and services. They need effective systems, organized operations, informed decisions, and the right support. That's where WinCo comes in.",
      "We provide administrative support, marketing services, business research, strategic planning, process improvement, and digital solutions tailored to each client's needs.",
      "By combining our business support capabilities with specialist technical expertise, we help organizations address challenges and implement practical solutions through a coordinated, client-focused approach.",
      "Whether you're starting, growing, or improving an established business, our focus is helping you operate more efficiently and confidently.",
    ],
  },
  mission: {
    title: "Our Mission",
    paragraphs: [
      "To support businesses through reliable assistance, strategic thinking, and practical solutions that improve efficiency, strengthen operations, and support sustainable growth.",
    ],
  },
  // Corrected wording from the client. Do not use the shorter line from the PDF.
  vision: {
    title: "Our Vision",
    paragraphs: [
      "To become a trusted business solutions provider helping entrepreneurs, business owners, executives, and organizations work smarter, embrace innovation, and achieve their goals.",
    ],
  },
  approach: {
    title: "Our Approach",
    subtitle: "Understanding First. Solutions Second.",
    paragraphs: [
      "We take the time to understand your business before recommending a solution. Our approach combines practical support, strategic thinking, and specialist expertise to address your priorities and create meaningful improvements.",
      "We value professionalism, confidentiality, accountability, and building lasting business relationships.",
    ],
  },
  closingTagline: "Your Business, Organized and Optimized.",
};
