import { useId, type SVGProps } from "react";

/** Two speech bubbles joining into a chain link: the "Connect" step illustration. */
export function ConnectIcon(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/:/g, "");
  const maskA = `hww-link-a-${uid}`;
  const maskB = `hww-link-b-${uid}`;

  return (
    <svg viewBox="0 0 150 120" fill="none" aria-hidden="true" {...props}>
      <defs>
        <mask id={maskA} maskUnits="userSpaceOnUse" x="40" y="40" width="70" height="34">
          <rect x="48" y="46.5" width="31" height="19" rx="9.5" fill="#fff" />
          <rect x="53.5" y="51.5" width="20" height="9" rx="4.5" fill="#000" />
        </mask>
        <mask id={maskB} maskUnits="userSpaceOnUse" x="40" y="40" width="70" height="34">
          <rect x="69" y="46.5" width="31" height="19" rx="9.5" fill="#fff" />
          <rect x="74.5" y="51.5" width="20" height="9" rx="4.5" fill="#000" />
        </mask>
      </defs>

      <circle cx="70" cy="60" r="43" className="fill-secondary-tint" />

      {/* bubbles drift apart on hover */}
      <path
        d="M14 36a20 20 0 0 1 20-20h36a20 20 0 0 1 20 20v12a20 20 0 0 1-20 20H41l-15 14 3.6-14.6A20 20 0 0 1 14 48z"
        className="fill-secondary stroke-ink ease-brand transition-transform duration-(--motion-base) group-hover:-translate-x-[5px] group-hover:-translate-y-[3px]"
        strokeWidth={3.2}
        strokeLinejoin="round"
      />
      <path
        d="M70 56a18 18 0 0 1 18-18h30a18 18 0 0 1 18 18v10a18 18 0 0 1-18 18h-5l3.4 13.6L100 84H88a18 18 0 0 1-18-18z"
        className="fill-primary stroke-ink ease-brand transition-transform duration-(--motion-base) group-hover:translate-x-[5px] group-hover:translate-y-[3px]"
        strokeWidth={3.2}
        strokeLinejoin="round"
      />

      {/* interlocking chain link */}
      <g
        transform="rotate(-26 74 56)"
        className="ease-brand origin-[74px_56px] transition-transform duration-(--motion-base) group-hover:scale-110"
      >
        <rect
          x="48"
          y="46.5"
          width="31"
          height="19"
          rx="9.5"
          className="fill-primary"
          mask={`url(#${maskA})`}
        />
        <g fill="none" className="stroke-ink" strokeWidth={3}>
          <rect x="48" y="46.5" width="31" height="19" rx="9.5" />
          <rect x="53.5" y="51.5" width="20" height="9" rx="4.5" />
        </g>
        <rect
          x="69"
          y="46.5"
          width="31"
          height="19"
          rx="9.5"
          className="fill-primary"
          mask={`url(#${maskB})`}
        />
        <g fill="none" className="stroke-ink" strokeWidth={3}>
          <rect x="69" y="46.5" width="31" height="19" rx="9.5" />
          <rect x="74.5" y="51.5" width="20" height="9" rx="4.5" />
        </g>
        <path d="M70 46.5h-12a9.5 9.5 0 0 0 0 19h12" className="fill-primary" stroke="none" />
        <g fill="none" className="stroke-ink" strokeWidth={3} strokeLinecap="round">
          <path d="M70 46.5h-12a9.5 9.5 0 0 0 0 19h12" />
          <path d="M70 51.5h-12a4.5 4.5 0 0 0 0 9h12" />
        </g>
      </g>
    </svg>
  );
}
