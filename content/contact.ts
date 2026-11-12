import { servicesPage } from "./services";
import { site } from "./site";
import type { ContactPage, CtaButton } from "./types";

const whatsappButton: CtaButton = {
  label: "Chat With Us on WhatsApp",
  href: site.whatsappUrl,
  variant: "primary",
};

export const contactPage: ContactPage = {
  seo: {
    title: "Contact Us | WinCo VBS",
    description:
      "Tell us what your business needs. Contact WinCo VBS by email, WhatsApp, or the inquiry form.",
  },
  hero: {
    title: "Let's Talk Business.",
    description: "Tell Us What Your Business Needs.",
    size: "compact",
    buttons: [whatsappButton],
  },
  intro: [
    "Have a project in mind? Need ongoing business support? Looking for ways to improve your operations? We'd love to hear from you.",
    "Contact WinCo VBS to discuss your goals and explore how we can help.",
  ],
  // Heading and card labels are drafted for the new section and need client approval.
  getInTouch: {
    title: "Get in Touch",
    emailCard: { title: "Email Us", description: "Send us an email anytime." },
    whatsappCard: {
      title: "Chat on WhatsApp",
      description: "Get in touch with our team directly.",
    },
  },
  details: [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" },
    {
      label: "Phone / WhatsApp",
      value: site.phoneDisplay,
      href: `tel:${site.phoneE164}`,
      icon: "phone",
    },
    { label: "Location", value: `${site.address.city}, ${site.address.country}`, icon: "map-pin" },
    { label: "Service Area", value: site.serviceArea, icon: "globe" },
  ],
  form: {
    title: "How Can We Help?",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        name: "organization",
        label: "Business / Organization Name",
        required: false,
        placeholder: "Enter organization name",
      },
      {
        name: "email",
        label: "Email Address",
        required: true,
        placeholder: "Enter your email address",
      },
      {
        name: "phone",
        label: "Phone / WhatsApp",
        required: false,
        placeholder: "Enter your phone number",
      },
      {
        name: "country",
        label: "Country",
        required: false,
        placeholder: "Select your country",
      },
      {
        name: "service",
        label: "Service Interested In",
        required: false,
        placeholder: "Select a service",
      },
      {
        name: "message",
        label: "Tell Us About Your Business Needs",
        required: false,
        placeholder: "Share your requirements, goals, or any specific details...",
      },
    ],
    // Same titles as the service groups, so the two lists can't drift apart.
    serviceOptions: [...servicesPage.groups.map((group) => group.title), "General Inquiry / Other"],
    submitLabel: "Send Inquiry",
    successTitle: "Inquiry Sent Successfully",
    successMessage:
      "Thank you for contacting WinCo VBS. We've received your inquiry and will be in touch as soon as possible.",
    successNote: "Our team will review your request shortly.",
  },
};
