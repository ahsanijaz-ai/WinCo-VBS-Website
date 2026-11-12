import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { EnvelopeIllustration } from "@/components/sections/contact/EnvelopeIllustration";
import { Hero } from "@/components/sections/Hero";
import { contactPage } from "@/content";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default function ContactPage() {
  const { hero, intro, details, whatsappButton, form } = contactPage;

  return (
    <>
      <Hero
        hero={hero}
        align="center"
        illustration={<EnvelopeIllustration />}
        animated
        buttonStyle="pill"
      />

      <Section tone="alt" fullScreen={false} aria-label={form.title}>
        <Reveal className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <RevealFade as="div" className="lg:col-span-2">
            <ContactDetails intro={intro} details={details} whatsappButton={whatsappButton} />
          </RevealFade>
          <RevealFade
            as="div"
            className="bg-primary border-border rounded-card border p-5 sm:p-6 md:p-8 lg:col-span-3"
          >
            <ContactForm form={form} />
          </RevealFade>
        </Reveal>
      </Section>
    </>
  );
}
