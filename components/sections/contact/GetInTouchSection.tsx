import { Globe, Mail, MapPin, MessageCircle, Phone, Send, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactIcon, ContactPage } from "@/content";
import { site } from "@/content";
import { cn } from "@/lib/cn";

const icons: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  globe: Globe,
};

/**
 * Card hover: lift 4 px with a stronger shadow, 200 ms on the brand curve. Hover devices only,
 * and no lift with reduced motion. The entrance uses `transform`, the lift uses `translate`,
 * so the two never fight.
 */
const cardClass =
  "reveal-item bg-primary border-border rounded-card flex h-full flex-col items-center border p-8 text-center shadow-sm sm:p-10 " +
  "transition-[translate,box-shadow] duration-(--motion-base) ease-brand motion-safe:hover:-translate-y-1 hover:shadow-lg";

/**
 * Card button hover: grow to 1.02 and darken slightly toward Deep Navy, 180 ms ease-out.
 * Pressed: 0.98. Overrides the standard button hover colour and press scale.
 */
const cardButtonClass =
  "duration-(--motion-hover) ease-[ease-out] motion-safe:hover:not-active:scale-[1.02] active:scale-[0.98] " +
  "hover:bg-[color-mix(in_oklab,var(--color-secondary)_82%,var(--color-secondary-hover))]";

function CardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="bg-secondary-tint text-secondary flex size-16 items-center justify-center rounded-full">
      <Icon aria-hidden="true" className="size-7" />
    </span>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-2xl font-bold">{children}</h3>;
}

type GetInTouchSectionProps = Pick<ContactPage, "intro" | "getInTouch" | "details">;

/** "Get in Touch": heading, the intro from the copy, and the Email and WhatsApp cards. */
export function GetInTouchSection({ intro, getInTouch, details }: GetInTouchSectionProps) {
  const { title, emailCard, whatsappCard } = getInTouch;
  const placeDetails = details.filter((detail) => !detail.href);

  return (
    <Section tone="alt" aria-labelledby="contact-get-in-touch">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="contact-get-in-touch" className="reveal-item">
            {title}
          </h2>
          <div className="reveal-item mt-4 grid gap-2 text-lg leading-8">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <li>
            <article className={cn(cardClass, "justify-center")}>
              <CardIcon icon={Mail} />
              <CardTitle>{emailCard.title}</CardTitle>
              <a
                href={`mailto:${site.email}`}
                className="text-secondary mt-3 text-lg font-semibold break-all underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <ButtonLink href={`mailto:${site.email}`} className={cn("mt-8", cardButtonClass)}>
                <Send aria-hidden="true" className="size-5" />
                {emailCard.buttonLabel}
              </ButtonLink>
            </article>
          </li>

          <li>
            <article className={cardClass}>
              <CardIcon icon={MessageCircle} />
              <CardTitle>{whatsappCard.title}</CardTitle>
              <p className="mt-2 text-xs font-semibold tracking-[0.2em] uppercase">
                {whatsappCard.eyebrow}
              </p>
              <div className="border-border mt-6 w-full border-t pt-6">
                <p className="text-ink text-lg font-semibold">{site.phoneDisplay}</p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardButtonClass}
                  >
                    <MessageCircle aria-hidden="true" className="size-5" />
                    {whatsappCard.whatsappLabel}
                  </ButtonLink>
                  <ButtonLink href={`tel:${site.phoneE164}`} variant="secondary">
                    <Phone aria-hidden="true" className="size-5" />
                    {whatsappCard.callLabel}
                  </ButtonLink>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </Reveal>

      <ul className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-x-8 gap-y-3 text-center sm:flex-row sm:flex-wrap">
        {placeDetails.map(({ label, value, icon }) => {
          const Icon = icons[icon];
          return (
            <li key={label} className="flex items-center gap-2">
              <Icon aria-hidden="true" className="text-secondary size-5 shrink-0" />
              <span>
                <span className="text-ink font-semibold">{label}:</span> {value}
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
