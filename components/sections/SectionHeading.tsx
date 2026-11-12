import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Extra classes on the h2 itself, e.g. to make one section's heading more prominent. */
  titleClassName?: string;
};

/** Heading block for a page section: the h2 (its id labels the section) and an optional subtitle. */
export function SectionHeading({
  id,
  title,
  subtitle,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 id={id} className={titleClassName}>
        {title}
      </h2>
      {subtitle && <p className="text-secondary mt-3 text-lg font-semibold">{subtitle}</p>}
    </div>
  );
}
