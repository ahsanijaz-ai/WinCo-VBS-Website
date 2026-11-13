/** Soft background shapes: a blue glow top left, blue and Teal waves in the bottom corners. */
export function SectionDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-secondary-tint absolute -top-56 -left-56 size-[38rem] rounded-full blur-2xl" />
      <svg
        className="absolute bottom-0 left-0 h-20 w-1/2 sm:h-28 lg:h-32 lg:w-[34%]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path className="fill-secondary/15" d="M0 30C120 40 260 80 400 120H0Z" />
        <path className="fill-secondary" d="M0 70C110 76 230 96 330 120H0Z" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 h-20 w-1/2 sm:h-28 lg:h-32 lg:w-[34%]"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path className="fill-accent-tint" d="M400 20C280 40 140 84 0 120H400Z" />
        <path className="fill-accent/70" d="M400 64C300 74 180 96 80 120H400Z" />
      </svg>
    </div>
  );
}
