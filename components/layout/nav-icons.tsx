import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Home: the roof drops into place, the door narrows. */
export function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 11.5 12 4l8 7.5"
        className="nav-house-roof"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="10.3"
        y="14"
        width="3.4"
        height="6"
        rx="0.6"
        className="nav-house-door"
        fill="currentColor"
      />
    </svg>
  );
}

/** About Us: the head nods, the body outline draws in. */
export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="7.5" r="3.2" className="nav-person-head" fill="currentColor" />
      <path
        d="M5 20c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5"
        className="nav-person-body"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Services: three stacked layers build bottom-to-top. */
export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3 3 8l9 5 9-5-9-5Z"
        className="nav-layer-top"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.5 12 17l9-4.5"
        className="nav-layer-mid"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3 16.5 12 21l9-4.5"
        className="nav-layer-bottom"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Contact Us: the flap folds open, a letter peeks out. */
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth={2} />
      <rect
        x="9.5"
        y="9.5"
        width="5"
        height="3.5"
        rx="0.5"
        className="nav-mail-letter"
        fill="currentColor"
      />
      <path
        d="M4 7.5 12 13l8-5.5"
        className="nav-mail-flap"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformBox: "fill-box" }}
      />
    </svg>
  );
}
