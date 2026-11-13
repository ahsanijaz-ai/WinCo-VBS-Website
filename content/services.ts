import type { ServicesPage } from "./types";

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
    buttons: [{ label: "Discuss Your Business Needs", href: "/contact", variant: "primary" }],
  },
  intro: "Explore our solutions below.",
  groups: [
    {
      id: "business-administrative-support",
      title: "Business & Administrative Support",
      subtitle: "Stay Organized. Focus on What Matters.",
      intro:
        "We help businesses manage essential responsibilities, improve organization, and reduce administrative pressure.",
      icon: "briefcase",
      listLabel: "Our Services",
      services: [
        {
          name: "Virtual Administrative Assistance",
          description: "Email, calendar, task management, and back-office coordination.",
        },
        {
          name: "Lead Generation & Client Outreach",
          description: "Prospect research, lead development, and follow-up support.",
        },
        {
          name: "Business Documentation",
          description:
            "Reports, proposals, presentations, correspondence, and document formatting.",
        },
        {
          name: "Digitization & Records Management",
          description: "Digital filing, data entry, and information organization.",
        },
        {
          name: "Recruitment Support",
          description:
            "Vacancy coordination, CV screening, shortlisting, and recruitment administration.",
        },
        {
          name: "Financial Administration",
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
      icon: "megaphone",
      listLabel: "Our Services",
      services: [
        {
          name: "Social Media Management",
          description: "Account setup, optimization, content scheduling, and platform management.",
        },
        {
          name: "Content Creation & Planning",
          description: "Branded graphics, social media content, and editorial calendars.",
        },
        {
          name: "Email Marketing",
          description: "Newsletters, promotional campaigns, and customer communication.",
        },
        {
          name: "Digital Marketing Support",
          description: "Campaign coordination, marketing research, and promotional outreach.",
        },
        {
          name: "Website Content Management",
          description: "Website updates, content maintenance, and online information management.",
        },
        {
          name: "Marketing Planning",
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
      icon: "trending-up",
      listLabel: "Our Services",
      services: [
        {
          name: "Business & Marketing Plans",
          description: "Structured planning and implementation support.",
        },
        {
          name: "Market & Competitor Research",
          description: "Industry insights, competitor analysis, and opportunity research.",
        },
        {
          name: "Process Improvement",
          description: "Workflow reviews and operational efficiency recommendations.",
        },
        {
          name: "Standard Operating Procedures (SOPs)",
          description: "Clear documentation of business processes.",
        },
        {
          name: "Business Research",
          description: "Prospect lists, product research, and business information gathering.",
        },
        {
          name: "Strategic Documentation",
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
      icon: "monitor-smartphone",
      listLabel: "Our Solutions",
      services: [
        {
          name: "Website & E-Commerce Development",
          description:
            "Business websites, online stores, landing pages, and interactive digital experiences.",
        },
        {
          name: "Custom Software & Applications",
          description: "Web applications, mobile apps, and tailored business software.",
        },
        {
          name: "AI & Business Automation",
          description:
            "AI assistants, chatbots, intelligent workflows, and automated business processes.",
        },
        {
          name: "Systems Integration & Cloud Solutions",
          description:
            "Connecting business platforms, improving data flow, and supporting digital infrastructure.",
        },
        {
          name: "Data Analytics & Business Intelligence",
          description: "Dashboards, reporting tools, data management, and business insights.",
        },
        {
          name: "Technical Consulting & Support",
          description:
            "Software maintenance, optimization, technical planning, and ongoing support.",
        },
      ],
      note: "Technology solutions are scoped and quoted according to individual project requirements.",
    },
  ],
  closingCta: {
    title: "Not Sure What Your Business Needs?",
    description:
      "You don't need to have all the answers. Tell us about your challenges or goals, and we'll help you explore practical solutions suited to your business.",
    button: { label: "Discuss Your Business Needs", href: "/contact", variant: "primary" },
  },
};
