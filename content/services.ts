import { site } from "./site";
import type { ServicesPage } from "./types";

const contactHref = (id: string) => `/contact?service=${id}#inquiry-form`;

export const servicesPage: ServicesPage = {
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
  },
  intro: "Explore our solutions below.",
  findYourPath: {
    eyebrow: "What do you need help with?",
    heading: "Start with the problem. We'll match the service.",
    seeServices: "See services",
    unsure: {
      text: "Not sure which one fits?",
      consultation: { label: "Schedule a Free Consultation", href: "/contact#inquiry-form" },
      whatsapp: { label: "Message us on WhatsApp", href: site.whatsappUrl },
      mobile: { label: "Talk to us", href: "/contact#inquiry-form" },
    },
  },
  groups: [
    {
      id: "business-administrative-support",
      title: "Business & Administrative Support",
      subtitle: "Stay Organized. Focus on What Matters.",
      intro:
        "We help businesses manage essential responsibilities, improve organization, and reduce administrative pressure.",
      cta: {
        label: "Delegate My Admin Work",
        href: contactHref("business-administrative-support"),
        variant: "primary",
      },
      bestFor: ["Founders", "Busy small teams", "Growing businesses"],
      listLabel: "Our Services",
      problem: {
        icon: "path-admin",
        title: "Too much admin, not enough time",
        description: "Hand off email, documents, records and finance admin.",
      },
      services: [
        {
          icon: "virtual-assistance",
          title: "Virtual Administrative Assistance",
          description: "Email, calendar, task management, and back-office coordination.",
        },
        {
          icon: "lead-generation",
          title: "Lead Generation & Client Outreach",
          description: "Prospect research, lead development, and follow-up support.",
        },
        {
          icon: "business-documentation",
          title: "Business Documentation",
          description:
            "Reports, proposals, presentations, correspondence, and document formatting.",
        },
        {
          icon: "digitization",
          title: "Digitization & Records Management",
          description: "Digital filing, data entry, and information organization.",
        },
        {
          icon: "recruitment",
          title: "Recruitment Support",
          description:
            "Vacancy coordination, CV screening, shortlisting, and recruitment administration.",
        },
        {
          icon: "financial-admin",
          title: "Financial Administration",
          description:
            "Invoice tracking, accounts payable and receivable support, and payroll administration assistance.",
        },
      ],
    },
    {
      id: "marketing-digital-presence",
      title: "Marketing & Digital Presence",
      subtitle: "Build Visibility. Strengthen Your Brand.",
      intro:
        "We help businesses establish and maintain a professional digital presence that supports customer engagement and business growth.",
      cta: {
        label: "Grow My Presence",
        href: contactHref("marketing-digital-presence"),
        variant: "primary",
      },
      bestFor: ["Local businesses", "Service brands", "New launches"],
      listLabel: "Our Services",
      problem: {
        icon: "path-marketing",
        title: "Nobody can find or remember my business",
        description: "Social, content, email and a plan that keeps you visible.",
      },
      services: [
        {
          icon: "social-media",
          title: "Social Media Management",
          description: "Account setup, optimization, content scheduling, and platform management.",
        },
        {
          icon: "content-creation",
          title: "Content Creation & Planning",
          description: "Branded graphics, social media content, and editorial calendars.",
        },
        {
          icon: "email-marketing",
          title: "Email Marketing",
          description: "Newsletters, promotional campaigns, and customer communication.",
        },
        {
          icon: "digital-marketing",
          title: "Digital Marketing Support",
          description: "Campaign coordination, marketing research, and promotional outreach.",
        },
        {
          icon: "website-content",
          title: "Website Content Management",
          description: "Website updates, content maintenance, and online information management.",
        },
        {
          icon: "marketing-planning",
          title: "Marketing Planning",
          description: "Marketing strategies, brand messaging, and promotional planning.",
        },
      ],
    },
    {
      id: "business-strategy-process-improvement",
      title: "Business Strategy & Process Improvement",
      subtitle: "Better Systems. Smarter Decisions.",
      intro:
        "We help businesses identify opportunities, improve workflows, and develop practical strategies for more efficient operations.",
      cta: {
        label: "Fix My Processes",
        href: contactHref("business-strategy-process-improvement"),
        variant: "primary",
      },
      bestFor: ["Owners wearing every hat", "Teams with messy workflows", "Planning a next stage"],
      listLabel: "Our Services",
      iconScale: "large",
      problem: {
        icon: "path-strategy",
        title: "Things feel messy and I'm unsure what's next",
        description: "Research, plans and SOPs that turn chaos into a system.",
      },
      services: [
        {
          icon: "business-plans",
          title: "Business & Marketing Plans",
          description: "Structured planning and implementation support.",
        },
        {
          icon: "market-research",
          title: "Market & Competitor Research",
          description: "Industry insights, competitor analysis, and opportunity research.",
        },
        {
          icon: "process-improvement",
          title: "Process Improvement",
          description: "Workflow reviews and operational efficiency recommendations.",
        },
        {
          icon: "sops",
          title: "Standard Operating Procedures (SOPs)",
          description: "Clear documentation of business processes.",
        },
        {
          icon: "business-research",
          title: "Business Research",
          description: "Prospect lists, product research, and business information gathering.",
        },
        {
          icon: "strategic-documentation",
          title: "Strategic Documentation",
          description: "Business proposals, pitch decks, reports, and data presentations.",
        },
      ],
    },
    {
      id: "technology-digital-solutions",
      title: "Technology & Digital Solutions",
      subtitle: "Technology That Works for Your Business.",
      intro:
        "We help businesses modernize operations through practical digital solutions, coordinating specialist technical expertise based on project requirements.",
      cta: {
        label: "Scope My Project",
        href: contactHref("technology-digital-solutions"),
        variant: "primary",
      },
      bestFor: ["Businesses going digital", "Teams needing automation", "Custom software needs"],
      listLabel: "Our Solutions",
      note: "Technology solutions are scoped and quoted according to individual project requirements.",
      problem: {
        icon: "path-technology",
        title: "I need a website, app or automation",
        description: "Websites, custom software, AI automation and integrations.",
      },
      services: [
        {
          icon: "website-ecommerce",
          title: "Website & E-Commerce Development",
          description:
            "Business websites, online stores, landing pages, and interactive digital experiences.",
        },
        {
          icon: "custom-software",
          title: "Custom Software & Applications",
          description: "Web applications, mobile apps, and tailored business software.",
        },
        {
          icon: "ai-automation",
          title: "AI & Business Automation",
          description:
            "AI assistants, chatbots, intelligent workflows, and automated business processes.",
        },
        {
          icon: "systems-integration",
          title: "Systems Integration & Cloud Solutions",
          description:
            "Connecting business platforms, improving data flow, and supporting digital infrastructure.",
        },
        {
          icon: "data-analytics",
          title: "Data Analytics & Business Intelligence",
          description: "Dashboards, reporting tools, data management, and business insights.",
        },
        {
          icon: "technical-support",
          title: "Technical Consulting & Support",
          description:
            "Software maintenance, optimization, technical planning, and ongoing support.",
        },
      ],
    },
  ],
  closingCta: {
    title: "Not Sure What Your Business Needs?",
    description:
      "You don't need to have all the answers. Tell us about your challenges or goals, and we'll help you explore practical solutions suited to your business.",
    button: {
      label: "Discuss Your Business Needs",
      href: "/contact#inquiry-form",
      variant: "primary",
    },
  },
};
