import type { SVGProps } from "react";

/** A clipboard with a flag and three ticks popping in: the "Plan" step illustration. */
export function PlanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 150 140" fill="none" aria-hidden="true" {...props}>
      <circle cx="66" cy="80" r="45" className="fill-secondary-tint" />

      <path d="M104 18v34" className="stroke-ink" strokeWidth={3.4} strokeLinecap="round" />
      {/* flag waves on hover */}
      <path
        d="M104 20h26l-7.5 9.5L130 39h-26z"
        className="fill-secondary stroke-ink ease-brand origin-[104px_29px] transition-transform duration-(--motion-base) group-hover:-translate-y-[3px] group-hover:scale-x-110"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      <rect
        x="28"
        y="36"
        width="76"
        height="94"
        rx="10"
        className="fill-primary stroke-ink"
        strokeWidth={3.4}
      />
      <rect
        x="36"
        y="46"
        width="60"
        height="76"
        rx="6"
        className="fill-secondary-tint stroke-border"
        strokeWidth={2.4}
      />
      <rect
        x="52"
        y="28"
        width="28"
        height="17"
        rx="5.5"
        className="fill-secondary-tint stroke-ink"
        strokeWidth={3}
      />
      <circle cx="66" cy="27" r="5" className="fill-secondary-tint stroke-ink" strokeWidth={3} />

      {/* ticks pop in sequence on hover */}
      <g
        className="stroke-secondary"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M44 60.5l4.6 4.6 8.4-8.6"
          className="ease-brand origin-[50px_61px] transition-transform duration-(--motion-fast) group-hover:scale-125"
        />
        <path
          d="M44 78.5l4.6 4.6 8.4-8.6"
          className="ease-brand origin-[50px_79px] transition-transform delay-75 duration-(--motion-fast) group-hover:scale-125"
        />
        <path
          d="M44 96.5l4.6 4.6 8.4-8.6"
          className="ease-brand origin-[50px_97px] transition-transform delay-150 duration-(--motion-fast) group-hover:scale-125"
        />
      </g>
      <rect
        x="42"
        y="106"
        width="14"
        height="14"
        rx="3.5"
        className="fill-secondary stroke-ink"
        strokeWidth={2.8}
      />

      <g className="stroke-ink" strokeWidth={3.2} strokeLinecap="round">
        <path d="M64 61h24" />
        <path d="M64 79h24" />
        <path d="M64 97h24" />
        <path d="M64 113h24" />
      </g>
    </svg>
  );
}
