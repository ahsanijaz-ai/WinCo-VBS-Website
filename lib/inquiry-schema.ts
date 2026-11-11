import { z } from "zod";
import { contactPage } from "@/content";
import type { InquiryFieldName } from "@/content";

/** Name of the hidden honeypot field. People never see it; bots fill it in. */
export const HONEYPOT_FIELD = "website";

/** Longest values we accept, so nobody can post huge payloads through the form. */
export const INQUIRY_LIMITS = {
  short: 120,
  message: 3000,
} as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Please keep this under ${max} characters.` })
    .optional()
    .default("");

/**
 * Rules for the contact form. The server action validates every submission with this schema,
 * and the field names match `InquiryFieldName` in content/types.ts.
 */
export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { error: "Please enter your full name." })
    .max(INQUIRY_LIMITS.short, { error: "Please keep your name under 120 characters." }),
  organization: optionalText(INQUIRY_LIMITS.short),
  email: z
    .email({ error: "Please enter a valid email address, like name@example.com." })
    .max(INQUIRY_LIMITS.short),
  phone: z
    .string()
    .trim()
    .max(30, { error: "Please keep the phone number under 30 characters." })
    .regex(/^[0-9+()\-.\s]*$/, { error: "Please use only numbers, spaces and + ( ) -." })
    .optional()
    .default(""),
  country: optionalText(INQUIRY_LIMITS.short),
  service: z
    .union([z.enum(contactPage.form.serviceOptions as [string, ...string[]]), z.literal("")])
    .optional()
    .default(""),
  message: optionalText(INQUIRY_LIMITS.message),
}) satisfies z.ZodType<Partial<Record<InquiryFieldName, string>>>;

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryFieldErrors = Partial<Record<InquiryFieldName, string>>;

/** What the server action sends back to the form. */
export type InquiryState =
  | { status: "idle" }
  | {
      status: "error";
      fieldErrors: InquiryFieldErrors;
      values: Partial<Record<InquiryFieldName, string>>;
    }
  | { status: "success" };

/** Turns a failed parse into one message per field, for showing under each input. */
export function toFieldErrors(error: z.ZodError): InquiryFieldErrors {
  const flat = z.flattenError(error).fieldErrors as Partial<Record<InquiryFieldName, string[]>>;
  const result: InquiryFieldErrors = {};
  for (const [name, messages] of Object.entries(flat) as [InquiryFieldName, string[]][]) {
    if (messages?.[0]) result[name] = messages[0];
  }
  return result;
}
