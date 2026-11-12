import { useId, type SVGProps } from "react";

/** Three interlocking gears that spin faster on hover: the "Implement" step illustration. */
export function ImplementIcon(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/:/g, "");
  const gear = `hww-gear-${uid}`;
  const href = `#${gear}`;

  return (
    <svg viewBox="0 0 160 140" fill="none" aria-hidden="true" {...props}>
      <defs>
        <g id={gear}>
          <circle r={20} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x={-5.5}
              y={-28}
              width={11}
              height={12}
              rx={3}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </defs>

      <circle cx="70" cy="72" r="43" className="fill-secondary-tint/80" />

      {/* gears idle slowly, accelerate on hover */}
      <g className="origin-center animate-[spin_9s_linear_infinite] [transform-box:fill-box] group-hover:[animation-duration:3s]">
        <g transform="translate(54 74) scale(1.1)">
          <use
            href={href}
            className="fill-secondary stroke-ink"
            strokeWidth={3.1}
            strokeLinejoin="round"
          />
          <use href={href} className="fill-secondary" />
          <circle r={8.5} className="fill-primary stroke-ink" strokeWidth={3.1} />
        </g>
      </g>

      <g className="origin-center animate-[spin_12s_linear_infinite_reverse] [transform-box:fill-box] group-hover:[animation-duration:2.4s]">
        <g transform="translate(115 34) scale(.72)">
          <use
            href={href}
            className="fill-primary stroke-ink"
            strokeWidth={4.3}
            strokeLinejoin="round"
          />
          <use href={href} className="fill-primary" />
          <circle r={8.5} className="fill-secondary-tint stroke-ink" strokeWidth={4.3} />
        </g>
      </g>

      <g className="origin-center animate-[spin_7s_linear_infinite] [transform-box:fill-box] group-hover:[animation-duration:2s]">
        <g transform="translate(117 96) scale(.68)">
          <use
            href={href}
            className="fill-secondary-hover stroke-ink"
            strokeWidth={4.6}
            strokeLinejoin="round"
          />
          <use href={href} className="fill-secondary-hover" />
          <circle r={8.5} className="fill-primary stroke-ink" strokeWidth={4.6} />
        </g>
      </g>
    </svg>
  );
}
