"use server";

import {
  HONEYPOT_FIELD,
  inquirySchema,
  toFieldErrors,
  type InquiryState,
} from "@/lib/inquiry-schema";
import type { InquiryFieldName } from "@/content";

const FIELD_NAMES: InquiryFieldName[] = [
  "fullName",
  "organization",
  "email",
  "phone",
  "country",
  "service",
  "message",
];

/**
 * Handles a contact form submission. Validates every field on the server with the shared schema,
 * even though the browser checks the required fields first.
 */
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // A filled honeypot means a bot. Pretend it worked so the bot learns nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success" };
  }

  const values = Object.fromEntries(
    FIELD_NAMES.map((name) => [name, String(formData.get(name) ?? "")]),
  ) as Record<InquiryFieldName, string>;

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", fieldErrors: toFieldErrors(parsed.error), values };
  }

  // TODO(2.6): send parsed.data to wincovbs@gmail.com once the email method is decided.

  return { status: "success" };
}
