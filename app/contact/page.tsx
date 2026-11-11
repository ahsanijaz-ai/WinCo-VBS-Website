import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Hero } from "@/components/sections/Hero";
import { contactPage } from "@/content";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default function ContactPage() {
  const { hero, intro, details, whatsappButton, form } = contactPage;

  return (
    <>
      <Hero hero={hero} />

      <Section tone="alt" aria-label={form.title}>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactDetails intro={intro} details={details} whatsappButton={whatsappButton} />
          </div>
          <div className="bg-primary border-border rounded-card border p-5 sm:p-6 md:p-8 lg:col-span-3">
            <ContactForm form={form} />
          </div>
        </div>
      </Section>
    </>
  );
}
