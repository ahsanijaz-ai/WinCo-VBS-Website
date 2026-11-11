import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/** Heading block for a page section: the h2 (its id labels the section) and an optional subtitle. */
export function SectionHeading({ id, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="text-secondary mt-3 text-lg font-semibold">{subtitle}</p>}
    </div>
  );
}
