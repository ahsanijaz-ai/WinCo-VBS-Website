import { Globe, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RollLabel } from "@/components/ui/RollLabel";
import type { ContactIcon, ContactPage } from "@/content";

const icons: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  globe: Globe,
};

type ContactDetailsProps = Pick<ContactPage, "intro" | "details" | "whatsappButton">;

/** Left column of the contact page: intro text, the four contact details, and the WhatsApp button. */
export function ContactDetails({ intro, details, whatsappButton }: ContactDetailsProps) {
  return (
    <div className="grid gap-8">
      <div className="grid max-w-[65ch] gap-4">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {details.map(({ label, value, href, icon }) => {
          const Icon = icons[icon];
          const body = (
            <>
              <span className="bg-secondary-tint text-secondary rounded-card flex size-11 shrink-0 items-center justify-center">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="text-ink block text-sm font-semibold">{label}</span>
                <span
                  className={
                    href
                      ? "text-secondary block break-words underline-offset-4 group-hover:underline"
                      : "block break-words"
                  }
                >
                  {value}
                </span>
              </span>
            </>
          );

          return (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  className="group bg-primary border-border rounded-card ease-brand hover:border-secondary flex min-h-11 items-center gap-4 border p-4 transition-colors duration-(--motion-base)"
                >
                  {body}
                </a>
              ) : (
                <div className="bg-primary border-border rounded-card flex min-h-11 items-center gap-4 border p-4">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <ButtonLink
        href={whatsappButton.href}
        variant={whatsappButton.variant}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle aria-hidden="true" className="size-5" />
        <RollLabel text={whatsappButton.label} />
      </ButtonLink>
    </div>
  );
}
