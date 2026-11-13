import { Globe, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  Reveal,
  RevealClip,
  RevealFade,
  RevealIcon,
  RevealUnit,
  RevealWords,
} from "@/components/ui/Reveal";
import type { ContactIcon, ContactPage } from "@/content";
import { site } from "@/content";
import { cn } from "@/lib/cn";
import { HeadingWave } from "@/components/sections/HeadingWave";
import { SectionDecor } from "@/components/sections/SectionDecor";

const placeIcons: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  globe: Globe,
};

/**
 * Card: 24 px corners, soft shadow. On hover or keyboard focus it fills with its colour from the
 * bottom-left, like the Home cards (`.contact-card` in globals.css), and the tile, title, text
 * and pill switch colour through the card's CSS variables. Hover lifts it 4 px with a stronger shadow, 200 ms on the
 * brand curve, on hover devices only and never with reduced motion. The scroll reveal moves the
 * list item around the card, the lift moves the card itself, so the two never fight.
 */
const cardClass =
  "contact-card bg-primary relative isolate flex h-full flex-col items-center overflow-hidden rounded-3xl border border-primary p-6 text-center shadow-xl shadow-secondary/10 sm:p-10 " +
  "transition-[translate,box-shadow] duration-(--motion-base) ease-brand motion-safe:hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/15";

/**
 * Card button: a pill showing the address or number. Hover grows it to 1.02 and darkens it a
 * little, 180 ms ease-out; pressed shrinks it to 0.98.
 */
/** Icon tile, title and text colours come from the card's variables (see `.contact-card`). */
const tileClass =
  "contact-card-tile flex size-16 items-center justify-center rounded-2xl bg-(--card-tile-bg) text-(color:--card-tile-fg)";
const titleClass = "contact-card-title mt-6 text-2xl font-bold text-(color:--card-title)";
const textClass = "contact-card-text mt-3 text-(color:--card-text)";

const pillClass =
  "mt-8 min-h-14 gap-3 rounded-full px-5 text-base sm:px-8 sm:text-lg shadow-lg " +
  "duration-(--motion-hover) ease-[ease-out] motion-safe:hover:not-active:scale-[1.02] active:scale-[0.98] " +
  "contact-card-pill bg-(--card-pill-bg) text-(color:--card-pill-fg) hover:bg-[color-mix(in_oklab,var(--card-pill-bg)_88%,var(--color-ink))]";

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

      <Reveal className="contents">
        <RevealUnit className="mx-auto max-w-3xl text-center">
          <RevealIcon>
            <HeadingWave />
          </RevealIcon>
          <RevealWords
            as="h2"
            id="contact-get-in-touch"
            standalone={false}
            text={title}
            lastWordClassName="text-accent-strong"
            className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-tight font-bold"
          />
          <RevealClip as="div" className="mx-auto mt-4 grid max-w-2xl gap-2 text-lg leading-8">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </RevealClip>
        </RevealUnit>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
          <RevealFade as="li">
            <article className={cn(cardClass, "contact-card--blue")}>
              <span
                aria-hidden="true"
                className="bg-secondary-tint absolute -top-24 -left-24 -z-10 size-56 rounded-full blur-md"
              />
              <RevealIcon>
                <span className={tileClass}>
                  <Mail aria-hidden="true" className="size-8" />
                </span>
              </RevealIcon>
              <h3 className={titleClass}>{emailCard.title}</h3>
              <p className={textClass}>{emailCard.description}</p>
              <ButtonLink
                href={`mailto:${site.email}`}
                aria-label={`${emailCard.title}: ${site.email}`}
                className={cn(pillClass, "shadow-secondary/30")}
              >
                <Mail aria-hidden="true" className="size-6 shrink-0" />
                <span className="break-all">{site.email}</span>
              </ButtonLink>
            </article>
          </RevealFade>

          <RevealFade as="li">
            <article className={cn(cardClass, "contact-card--teal")}>
              <span
                aria-hidden="true"
                className="bg-accent-tint absolute -right-24 -bottom-24 -z-10 size-56 rounded-full blur-md"
              />
              <RevealIcon>
                <span className={tileClass}>
                  <Phone aria-hidden="true" className="size-8" />
                </span>
              </RevealIcon>
              <h3 className={titleClass}>{whatsappCard.title}</h3>
              <p className={textClass}>{whatsappCard.description}</p>
              <ButtonLink
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${whatsappCard.title}: ${site.phoneDisplay}`}
                className={cn(pillClass, "shadow-accent-deep/30")}
              >
                <MessageCircle aria-hidden="true" className="size-6 shrink-0" />
                <span className="whitespace-nowrap">{site.phoneDisplay}</span>
              </ButtonLink>
            </article>
          </RevealFade>
        </ul>

        <RevealFade as="div">
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
        </RevealFade>
      </Reveal>
    </Section>
  );
}
