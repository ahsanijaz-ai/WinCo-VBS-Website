import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { contactPage } from "@/content";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default function ContactPage() {
  const { hero, intro, details, whatsappButton, form } = contactPage;

  return (
    <>
      {/* TODO: replace with Ahsan's shared Hero component (task 2.1) once it is merged. */}
      <Section aria-labelledby="contact-hero-title">
        <div className="grid max-w-3xl gap-4">
          <h1 id="contact-hero-title">{hero.title}</h1>
          <p className="text-lg md:text-xl">{hero.description}</p>
          {hero.buttons && (
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              {hero.buttons.map((button) => (
                <ButtonLink
                  key={button.label}
                  href={button.href}
                  variant={button.variant}
                  target={button.href.startsWith("http") ? "_blank" : undefined}
                  rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {button.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
      </Section>

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
