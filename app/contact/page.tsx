import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { EnvelopeIllustration } from "@/components/sections/contact/EnvelopeIllustration";
import { GetInTouchSection } from "@/components/sections/contact/GetInTouchSection";
import { Hero } from "@/components/sections/Hero";
import { contactPage } from "@/content";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

/** Contact page: hero, Get in Touch (email and WhatsApp cards), then the inquiry form. */
export default function ContactPage() {
  const { hero, intro, getInTouch, details, form } = contactPage;

  return (
    <>
      <Hero
        hero={hero}
        align="center"
        illustration={<EnvelopeIllustration />}
        animated
        buttonStyle="pill"
      />

      <GetInTouchSection intro={intro} getInTouch={getInTouch} details={details} />

      <Section aria-label={form.title}>
        <div className="bg-primary border-border rounded-card mx-auto max-w-3xl border p-5 shadow-sm sm:p-6 md:p-8">
          <ContactForm form={form} />
        </div>
      </Section>
    </>
  );
}
