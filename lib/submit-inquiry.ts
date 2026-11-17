import type { InquiryFieldName } from "@/content";
import {
  HONEYPOT_FIELD,
  inquirySchema,
  toFieldErrors,
  type Inquiry,
  type InquiryState,
} from "@/lib/inquiry-schema";

const FIELD_NAMES: InquiryFieldName[] = [
  "fullName",
  "organization",
  "email",
  "phone",
  "country",
  "service",
  "message",
];

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Sends a valid inquiry to Web3Forms, which emails it to the address the access key belongs to.
 * The free plan only accepts requests from the browser, so this runs on the client. The access
 * key is public by design (it can only send to that one address). Returns true when sent.
 */
async function sendToWeb3Forms(inquiry: Inquiry): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New inquiry from ${inquiry.fullName}`,
        from_name: "WinCo VBS Website",
        // Replying to the email goes straight to the visitor.
        replyto: inquiry.email,
        // Labels as they appear in the email.
        Name: inquiry.fullName,
        Email: inquiry.email,
        Organization: inquiry.organization || "-",
        Phone: inquiry.phone || "-",
        Country: inquiry.country || "-",
        Service: inquiry.service || "-",
        Message: inquiry.message || "-",
      }),
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
    return response.ok && result?.success === true;
  } catch {
    // Offline, blocked or timed out.
    return false;
  }
}

/**
 * Handles a contact form submission in the browser: checks every field with the shared schema
 * (the browser checks the required fields first), then sends it through Web3Forms.
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

  const sent = await sendToWeb3Forms(parsed.data);
  if (!sent) {
    // Keep what they typed so they can try again.
    return { status: "error", fieldErrors: {}, values, sendFailed: true };
  }

  return { status: "success" };
}
