import type { HomePage } from "./types";

export const homePage: HomePage = {
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
  intro: {
    title: "More Than Support. Solutions That Move Your Business Forward.",
    paragraphs: [
      "Running a business involves countless responsibilities. The right support, systems, and expertise can make all the difference.",
      "At WinCo VBS, we help businesses overcome operational challenges, improve the way they work, and create more time to focus on growth.",
      "Whether you need ongoing support or assistance with a specific project, we're here to help you move forward.",
    ],
  },
  whatWeDo: {
    title: "What We Do",
    cards: [
      {
        title: "Business & Administrative Support",
        description:
          "Keep your operations organized with reliable administrative assistance, business coordination, and back-office support.",
        href: "/services#business-administrative-support",
        icon: "briefcase",
      },
      {
        title: "Marketing & Digital Presence",
        description:
          "Strengthen your brand, connect with your audience, and maintain a professional online presence.",
        href: "/services#marketing-digital-presence",
        icon: "megaphone",
      },
      {
        title: "Business Strategy & Process Improvement",
        description:
          "Make informed decisions, improve workflows, and build stronger systems for your business.",
        href: "/services#business-strategy-process-improvement",
        icon: "trending-up",
      },
      {
        title: "Technology & Digital Solutions",
        description:
          "Modernize your operations with websites, custom software, automation, and tailored digital solutions.",
        href: "/services#technology-digital-solutions",
        icon: "monitor-smartphone",
      },
    ],
    button: { label: "View All Services", href: "/services", variant: "primary" },
  },
  whyUs: {
    title: "Why WinCo VBS?",
    subtitle: "Your Business. Our Focus.",
    points: [
      {
        title: "Tailored Solutions",
        description: "Support designed around your business needs, priorities, and goals.",
      },
      {
        title: "Beyond Task Completion - Strategic Guidance",
        description: "We identify opportunities to improve the way your business operates.",
      },
      {
        title: "Flexible Support",
        description:
          "Access the services you need, whether for a single project or ongoing operations.",
      },
      {
        title: "Coordinated Expertise",
        description:
          "Business and specialist technical services managed through one point of contact.",
      },
    ],
  },
  howWeWork: {
    title: "How We Work",
    steps: [
      {
        number: 1,
        title: "Connect",
        description: "Tell us about your business, challenges, and goals.",
      },
      {
        number: 2,
        title: "Plan",
        description: "We identify suitable solutions and agree on a clear approach.",
      },
      {
        number: 3,
        title: "Implement",
        description: "We coordinate and deliver the agreed services.",
      },
      {
        number: 4,
        title: "Improve",
        description: "We review outcomes and explore opportunities for continued improvement.",
      },
    ],
  },
  closingCta: {
    title: "Ready to Work Smarter?",
    description:
      "Let's discuss how WinCo VBS can help your business become more organized, efficient, and prepared for growth.",
    button: { label: "Schedule a Free Consultation", href: "/contact", variant: "primary" },
  },
};
