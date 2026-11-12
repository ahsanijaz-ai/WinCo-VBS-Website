import type { SVGProps } from "react";

/** A growing bar chart with a rising arrow: the "Improve" step illustration. */
export function ImproveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 130" fill="none" aria-hidden="true" {...props}>
      <circle cx="76" cy="60" r="45" className="fill-primary/15" />

      {/* bars grow from the axis on hover */}
      <rect
        x="34"
        y="74"
        width="27"
        height="38"
        rx="4"
        className="fill-primary stroke-ink ease-brand origin-[47px_112px] transition-transform duration-(--motion-base) group-hover:scale-y-110"
        strokeWidth={3.2}
      />
      <rect
        x="68"
        y="56"
        width="27"
        height="56"
        rx="4"
        className="fill-primary/70 stroke-ink ease-brand origin-[81px_112px] transition-transform delay-75 duration-(--motion-base) group-hover:scale-y-110"
        strokeWidth={3.2}
      />
      <rect
        x="102"
        y="36"
        width="27"
        height="76"
        rx="4"
        className="fill-primary stroke-ink ease-brand origin-[115px_112px] transition-transform delay-150 duration-(--motion-base) group-hover:scale-y-110"
        strokeWidth={3.2}
      />

      <path d="M24 112h112" className="stroke-ink" strokeWidth={3.8} strokeLinecap="round" />

      <g
        className="stroke-ink"
        strokeWidth={4.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* arrow redraws itself on hover */}
        <path
          d="M32 96C58 96 76 80 90 58c9-14 17-26 28-36"
          pathLength={240}
          className="ease-brand transition-[stroke-dashoffset] duration-(--motion-slow) [stroke-dasharray:240] [stroke-dashoffset:240] group-hover:[stroke-dashoffset:0]"
        />
        <path
          d="M100 18h20v20"
          className="ease-brand origin-[110px_28px] transition-transform duration-(--motion-base) group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        />
      </g>
    </svg>
  );
}
