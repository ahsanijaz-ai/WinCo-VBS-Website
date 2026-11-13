import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { EnvelopeIllustration } from "@/components/sections/contact/EnvelopeIllustration";
import { GetInTouchSection } from "@/components/sections/contact/GetInTouchSection";
import { SectionDecor } from "@/components/sections/contact/SectionDecor";
import { Hero } from "@/components/sections/Hero";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
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

      {/* id: target of every "Schedule a Free Consultation" button (/contact#inquiry-form). */}
      <Section
        id="inquiry-form"
        tabIndex={-1}
        tone="alt"
        aria-label={form.title}
        className="relative isolate overflow-hidden pb-[calc(var(--section-y)+4rem)] focus:outline-none"
      >
        <SectionDecor />
        <Reveal className="contents">
          <RevealFade
            as="div"
            className="bg-primary/90 border-primary shadow-secondary/10 mx-auto max-w-4xl rounded-3xl border p-6 shadow-xl backdrop-blur-sm sm:p-10"
          >
            <ContactForm form={form} />
          </RevealFade>
        </Reveal>
      </Section>
    </>
  );
}
