import { useId } from "react";

/** Small brand wave above a section heading, Primary Blue fading into Teal. Decorative. */
export function HeadingWave() {
  const gradientId = useId();
  return (
    <svg aria-hidden="true" viewBox="0 0 120 24" className="mx-auto mb-4 h-5 w-24 sm:h-6 sm:w-28">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-secondary)" />
          <stop offset="1" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M2 16C22 4 38 4 58 12s38 8 60-6c-14 18-40 20-60 12S20 10 2 16Z"
      />
    </svg>
  );
}
