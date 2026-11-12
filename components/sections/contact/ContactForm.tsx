"use client";

import { Check } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { FormField, type FieldControl } from "@/components/sections/contact/FormField";
import { buttonClassName } from "@/components/ui/button-styles";
import { RollLabel } from "@/components/ui/RollLabel";
import type { InquiryFieldName, InquiryForm } from "@/content";
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
  country: {
    kind: "input",
    type: "text",
    autoComplete: "country-name",
    maxLength: INQUIRY_LIMITS.short,
  },
  service: { kind: "select", options: serviceOptions, placeholder: "Select a service" },
  message: { kind: "textarea", maxLength: INQUIRY_LIMITS.message },
});

/** The message box spans both columns from 768 px; every other field takes one column. */
const fullWidth: InquiryFieldName[] = ["message"];

const initialState: InquiryState = { status: "idle" };

/** The inquiry form on the contact page. Fields, labels and messages come from content/contact.ts. */
export function ContactForm({ form }: { form: InquiryForm }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldControls = controls(form.serviceOptions);

  // After a failed submit, move focus to the first field with an error.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="bg-secondary-tint rounded-card ease-brand flex items-start gap-4 p-6 transition duration-(--motion-slow) md:p-8 starting:translate-y-2 starting:opacity-0"
      >
        <span className="bg-accent text-ink flex size-11 shrink-0 items-center justify-center rounded-full">
          <Check aria-hidden="true" className="size-6" strokeWidth={2.5} />
        </span>
        <p className="text-ink pt-2 text-lg font-semibold">{form.successMessage}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form ref={formRef} action={formAction} className="grid gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl">{form.title}</h2>
        <p className="mt-2 text-sm">
          Fields marked <span className="text-secondary font-semibold">*</span> are required.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {form.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            control={fieldControls[field.name]}
            error={errors[field.name]}
            defaultValue={values[field.name]}
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
          className={buttonClassName("primary", "disabled:cursor-wait disabled:opacity-70")}
        >
          <RollLabel text={pending ? "Sending..." : form.submitLabel} />
        </button>
      </div>
    </form>
  );
}
