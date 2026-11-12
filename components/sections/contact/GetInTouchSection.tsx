import { Globe, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactIcon, ContactPage } from "@/content";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { SectionDecor } from "@/components/sections/contact/SectionDecor";
import { SplitTitle } from "@/components/sections/contact/SplitTitle";

const placeIcons: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  globe: Globe,
};

/**
 * Card: 24 px corners, soft shadow. Hover lifts it 4 px with a stronger shadow, 200 ms on the
 * brand curve, on hover devices only and never with reduced motion. The entrance uses
 * `transform`, the lift uses `translate`, so the two never fight.
 */
const cardClass =
  "reveal-item bg-primary relative isolate flex h-full flex-col items-center overflow-hidden rounded-3xl border border-primary p-6 text-center shadow-xl shadow-secondary/10 sm:p-10 " +
  "transition-[translate,box-shadow] duration-(--motion-base) ease-brand motion-safe:hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/15";

/**
 * Card button: a pill showing the address or number. Hover grows it to 1.02 and darkens it a
 * little, 180 ms ease-out; pressed shrinks it to 0.98.
 */
const pillClass =
  "mt-8 min-h-14 gap-3 rounded-full px-5 text-base sm:px-8 sm:text-lg shadow-lg " +
  "duration-(--motion-hover) ease-[ease-out] motion-safe:hover:not-active:scale-[1.02] active:scale-[0.98]";

/** Small brand wave above the heading, Primary Blue fading into Teal. */
function HeadingWave() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 24" className="mx-auto mb-4 h-5 w-24 sm:h-6 sm:w-28">
      <defs>
        <linearGradient id="git-wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-secondary)" />
          <stop offset="1" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#git-wave)"
        d="M2 16C22 4 38 4 58 12s38 8 60-6c-14 18-40 20-60 12S20 10 2 16Z"
      />
    </svg>
  );
}

type GetInTouchSectionProps = Pick<ContactPage, "intro" | "getInTouch" | "details">;

/** "Get in Touch": heading, the intro from the copy, and the Email and WhatsApp cards. */
export function GetInTouchSection({ intro, getInTouch, details }: GetInTouchSectionProps) {
  const { title, emailCard, whatsappCard } = getInTouch;
  const placeDetails = details.filter((detail) => !detail.href);

  return (
    <Section
      tone="alt"
      aria-labelledby="contact-get-in-touch"
      className="relative isolate overflow-hidden pb-[calc(var(--section-y)+4rem)]"
    >
      <SectionDecor />

      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal-item">
            <HeadingWave />
            <h2
              id="contact-get-in-touch"
              className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-tight font-bold"
            >
              <SplitTitle title={title} />
            </h2>
          </div>
          <div className="reveal-item mx-auto mt-4 grid max-w-2xl gap-2 text-lg leading-8">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
          <li>
            <article className={cardClass}>
              <span
                aria-hidden="true"
                className="bg-secondary-tint absolute -top-24 -left-24 -z-10 size-56 rounded-full blur-md"
              />
              <span className="bg-secondary-tint text-secondary flex size-16 items-center justify-center rounded-2xl">
                <Mail aria-hidden="true" className="size-8" />
              </span>
              <h3 className="mt-6 text-2xl font-bold">{emailCard.title}</h3>
              <p className="mt-3">{emailCard.description}</p>
              <ButtonLink
                href={`mailto:${site.email}`}
                aria-label={`${emailCard.title}: ${site.email}`}
                className={cn(
                  pillClass,
                  "shadow-secondary/30 hover:bg-[color-mix(in_oklab,var(--color-secondary)_82%,var(--color-secondary-hover))]",
                )}
              >
                <Mail aria-hidden="true" className="size-6 shrink-0" />
                <span className="break-all">{site.email}</span>
              </ButtonLink>
            </article>
          </li>

          <li>
            <article className={cardClass}>
              <span
                aria-hidden="true"
                className="bg-accent-tint absolute -right-24 -bottom-24 -z-10 size-56 rounded-full blur-md"
              />
              <span className="bg-accent-tint text-accent-deep flex size-16 items-center justify-center rounded-2xl">
                <Phone aria-hidden="true" className="size-8" />
              </span>
              <h3 className="mt-6 text-2xl font-bold">{whatsappCard.title}</h3>
              <p className="mt-3">{whatsappCard.description}</p>
              <ButtonLink
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${whatsappCard.title}: ${site.phoneDisplay}`}
                className={cn(
                  pillClass,
                  "bg-accent-deep shadow-accent-deep/30 hover:bg-[color-mix(in_oklab,var(--color-accent-deep)_82%,var(--color-ink))]",
                )}
              >
                <MessageCircle aria-hidden="true" className="size-6 shrink-0" />
                <span className="whitespace-nowrap">{site.phoneDisplay}</span>
              </ButtonLink>
            </article>
          </li>
        </ul>
      </Reveal>

      <ul className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-x-8 gap-y-3 text-center sm:flex-row sm:flex-wrap">
        {placeDetails.map(({ label, value, icon }) => {
          const Icon = placeIcons[icon];
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
