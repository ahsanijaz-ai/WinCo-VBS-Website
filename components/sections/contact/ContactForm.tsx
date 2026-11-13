"use client";

import {
  Building2,
  Layers,
  Mail,
  MapPin,
  MessageSquareMore,
  Phone,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";
import { useActionState, useEffect, useRef, useSyncExternalStore } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { FormField, type FieldControl } from "@/components/sections/contact/FormField";
import { InquirySuccess } from "@/components/sections/contact/InquirySuccess";
import { buttonClassName } from "@/components/ui/button-styles";
import { RevealWords } from "@/components/ui/Reveal";
import { RollLabel } from "@/components/ui/RollLabel";
import { countries, servicesPage, type InquiryFieldName, type InquiryForm } from "@/content";
import { serviceIcons } from "@/lib/service-icons";
import { HONEYPOT_FIELD, INQUIRY_LIMITS, type InquiryState } from "@/lib/inquiry-schema";

const controls = (serviceOptions: string[]): Record<InquiryFieldName, FieldControl> => ({
  fullName: { kind: "input", type: "text", autoComplete: "name", maxLength: INQUIRY_LIMITS.short },
  organization: {
    kind: "input",
    type: "text",
    autoComplete: "organization",
    maxLength: INQUIRY_LIMITS.short,
  },
  email: {
    kind: "input",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    maxLength: INQUIRY_LIMITS.short,
  },
  phone: { kind: "input", type: "tel", autoComplete: "tel", inputMode: "tel", maxLength: 30 },
  country: { kind: "select", options: countries.map((name) => ({ value: name, label: name })) },
  service: {
    kind: "select",
    options: serviceOptions.map((label, index) => ({
      value: label,
      label,
      // Same icons as the service groups (Home cards), message bubble for "General Inquiry / Other".
      icon: servicesPage.groups[index]
        ? serviceIcons[servicesPage.groups[index].icon]
        : MessageSquareMore,
    })),
  },
  message: { kind: "textarea", maxLength: INQUIRY_LIMITS.message },
});

/** Icon in the tile inside each field. */
const fieldIcons: Record<InquiryFieldName, LucideIcon> = {
  fullName: User,
  organization: Building2,
  email: Mail,
  phone: Phone,
  country: MapPin,
  service: Layers,
  message: MessageSquareMore,
};

/** The message box spans both columns from 768 px; every other field takes one column. */
const fullWidth: InquiryFieldName[] = ["message"];

const initialState: InquiryState = { status: "idle" };

/** The query string never changes while the form is on screen, so there is nothing to subscribe to. */
const subscribeToNothing = () => () => {};

/**
 * The service group named in the link, e.g. `/contact?service=marketing-digital-presence`
 * (the "Discuss" buttons on the Services page), as its dropdown label; `undefined` if none.
 * Empty during server rendering, then read from the address bar in the browser.
 */
function usePreselectedService(): string | undefined {
  const search = useSyncExternalStore(
    subscribeToNothing,
    () => window.location.search,
    () => "",
  );
  const id = new URLSearchParams(search).get("service");
  return servicesPage.groups.find((group) => group.id === id)?.title;
}

/** The inquiry form on the contact page. Fields, labels and messages come from content/contact.ts. */
export function ContactForm({ form }: { form: InquiryForm }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const fieldControls = controls(form.serviceOptions);
  const preselectedService = usePreselectedService();

  // After a successful submit the form is replaced, so move focus to the success heading.
  useEffect(() => {
    if (state.status === "success") successHeadingRef.current?.focus();
  }, [state]);

  // After a failed submit, move focus to the first field with an error.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state]);

  if (state.status === "success") {
    return <InquirySuccess form={form} headingRef={successHeadingRef} />;
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form ref={formRef} action={formAction} className="grid gap-6">
      <div>
        <RevealWords
          as="h2"
          standalone={false}
          text={form.title}
          lastWordClassName="text-accent-strong"
          className="text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight font-bold"
        />
        <p className="mt-3">
          Fields marked <span className="text-secondary font-semibold">*</span> are required.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {form.fields.map((field) => (
          <FormField
            // The Service dropdown sets its value once, so give it a new key when the
            // preselected service is known (after hydration) to start it with that value.
            key={field.name === "service" ? `service-${preselectedService ?? ""}` : field.name}
            field={field}
            control={fieldControls[field.name]}
            icon={fieldIcons[field.name]}
            error={errors[field.name]}
            defaultValue={
              values[field.name] ?? (field.name === "service" ? preselectedService : undefined)
            }
            className={fullWidth.includes(field.name) ? "md:col-span-2" : undefined}
          />
        ))}
      </div>

      {/* Honeypot: hidden from people and screen readers, so only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`inquiry-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input
          id={`inquiry-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className={buttonClassName(
            "primary",
            "shadow-secondary/30 min-h-14 gap-3 rounded-2xl px-8 text-lg shadow-lg disabled:cursor-wait disabled:opacity-70",
          )}
        >
          <Send aria-hidden="true" className="size-5" />
          <RollLabel text={pending ? "Sending..." : form.submitLabel} />
        </button>
      </div>
    </form>
  );
}
