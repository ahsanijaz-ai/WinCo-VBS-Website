import type { ComponentType, SVGProps } from "react";

export type WhyUsIconKey = "tailored" | "guidance" | "support" | "expertise";

/**
 * Custom brand illustrations for the "Why WinCo VBS?" cards. Colours come from the site's own
 * tokens (`--color-ink`, `--color-secondary`, `--color-primary`, `--color-secondary-tint`,
 * `--color-primary-alt`), no new palette. The data-reveal-* attributes are hover-animation hooks,
 * styled in app/globals.css.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  "aria-hidden": true,
  focusable: false,
  className: "h-full w-auto overflow-visible",
} as const;

function TailoredIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 98 74" {...base} {...props}>
      <rect
        x="44.4"
        y="14.1"
        width="12"
        height="9"
        rx="2.5"
        transform="rotate(45 50.4 21.6)"
        className="fill-secondary"
      />
      <g className="stroke-ink" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M66 4h17l9 9v27a3 3 0 0 1-3 3H66a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
          className="fill-primary"
        />
        <path d="M83 4v6a3 3 0 0 0 3 3h6z" className="fill-secondary-tint" />
        <path d="M32 14a26 26 0 0 1 26 26v26H32a26 26 0 0 1 0-52z" className="fill-primary-alt" />
        <path d="M58 52h36v14H58z" className="fill-primary" />
        <path d="M94 52v19" />
      </g>
      <circle
        cx="32"
        cy="40"
        r="19.5"
        className="stroke-secondary"
        strokeWidth="3.2"
        strokeDasharray="1.6 3.5"
        opacity=".5"
      />
      <circle cx="32" cy="40" r="13" className="fill-primary stroke-ink" strokeWidth="2.6" />
      <g data-reveal-rotate="" className="stroke-ink" strokeWidth="2" strokeLinecap="round">
        <path d="M32 31.5v17M23.5 40h17" />
      </g>
      <circle cx="32" cy="40" r="4.2" className="fill-secondary" />
      <g className="stroke-ink" strokeLinecap="round">
        <path d="M47.5 58h6.5M47.5 62h6.5" strokeWidth="1.8" opacity=".65" />
        <path
          d="M63 66v-4M67.5 66v-4M72 66v-8M76.5 66v-4M81 66v-4M85.5 66v-8M90 66v-4"
          strokeWidth="1.8"
        />
        <path d="M69 26.5h17M69 32.5h17M69 38h9" strokeWidth="2" opacity=".8" />
      </g>
      <path d="M69 20h11" className="stroke-secondary" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M68.5 52h7l-3.5 5z" className="fill-secondary" />
    </svg>
  );
}

function GuidanceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 84 72" {...base} {...props}>
      <g className="stroke-ink" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="40" width="22" height="22" rx="3" className="fill-primary" />
        <path d="M13.5 51l4.6 4.6L23 46.5" />
        <path
          data-reveal-dash=""
          d="M34 51C50 51 51 41 42 36C33 31 39 22 64 23"
          strokeDasharray="5 7"
        />
        <path d="M66 6v28" />
      </g>
      <path data-reveal-wave="" d="M66 7H46l6 8-6 8h20z" className="fill-secondary" />
    </svg>
  );
}

function SupportIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 84 76" {...base} {...props}>
      <g className="stroke-ink" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 44V32a24 24 0 0 1 48 0v12" />
        <rect x="10" y="38" width="12" height="19" rx="6" className="fill-primary" />
        <rect x="58" y="38" width="12" height="19" rx="6" className="fill-primary" />
        <path d="M16 57v3a7 7 0 0 0 7 7h7" />
        <rect x="29" y="63.5" width="11" height="7" rx="3.5" className="fill-primary" />
      </g>
      <circle cx="62" cy="60" r="11" className="fill-primary stroke-secondary" strokeWidth="2.6" />
      <g
        data-reveal-spin=""
        className="stroke-secondary"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M56.5 56.5a7 7 0 0 1 11 2" />
        <path d="M67.5 63.5a7 7 0 0 1-11-2" />
        <path d="M67.8 54.6l-.3 4.3-4.2-.9" />
        <path d="M56.2 65.4l.3-4.3 4.2.9" />
      </g>
    </svg>
  );
}

function ExpertiseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 84 78" {...base} {...props}>
      <g className="stroke-ink" strokeWidth="2.2" strokeLinecap="round">
        <path d="M26 24l12 10M58 24L46 34M26 54l12-10M58 54L46 44" />
      </g>
      <circle data-reveal-pulse="" cx="42" cy="39" r="12" className="fill-secondary" />
      <g className="fill-primary">
        <circle cx="42" cy="35" r="4" />
        <path d="M34 48a8 8 0 0 1 16 0z" />
      </g>
      <g className="fill-primary stroke-ink" strokeWidth="2.4">
        <circle data-reveal-node="1" cx="18" cy="20" r="9" />
        <circle data-reveal-node="2" cx="66" cy="20" r="9" />
        <circle data-reveal-node="3" cx="18" cy="58" r="9" />
        <circle data-reveal-node="4" cx="66" cy="58" r="9" />
      </g>
      <g className="stroke-ink" strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="18" cy="20" r="2.8" strokeWidth="2.2" />
        <path d="M18 14.4v2.2M18 23.4v2.2M12.4 20h2.2M21.4 20h2.2" strokeWidth="2.6" />
        <path
          d="M62.6 23.4v-3.4M66 23.4v-6.4M69.4 23.4v-4.6"
          className="stroke-secondary"
          strokeWidth="2.6"
        />
        <circle cx="18" cy="58" r="2.8" strokeWidth="2.2" />
        <path d="M18 52.4v2.2M18 61.4v2.2M12.4 58h2.2M21.4 58h2.2" strokeWidth="2.6" />
        <path
          d="M66 52.8l5 2v4.2c0 2.9-2 5-5 6-3-1-5-3.1-5-6v-4.2z"
          className="fill-secondary"
          stroke="none"
        />
      </g>
    </svg>
  );
}

export const whyUsIcons: Record<WhyUsIconKey, ComponentType<IconProps>> = {
  tailored: TailoredIcon,
  guidance: GuidanceIcon,
  support: SupportIcon,
  expertise: ExpertiseIcon,
};
