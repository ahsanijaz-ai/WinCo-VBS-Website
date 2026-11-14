import type { SVGProps } from "react";

/** WhatsApp brand mark (line style). Lucide has no brand logos, so this one lives in components/brand. */
export function WhatsAppIcon(props: Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 9.2c.2 2.6 2.6 5.2 5.8 5.8l1.2-1.3-2-1-.9.6c-.9-.4-1.8-1.3-2.2-2.2l.6-.9-1-2L9 9.2z" />
    </svg>
  );
}
