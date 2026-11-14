import { BrandIcon } from "@/components/brand/service-icons";
import type { Service } from "@/content";
import { cn } from "@/lib/cn";

type ServiceItemCardProps = {
  service: Service;
  /** Detailed multi-colour icon sets (Business Strategy) get a slightly bigger glyph. */
  iconScale?: "default" | "large";
  className?: string;
};

/** One service within a group's list: icon tile, title and description. */
export function ServiceItemCard({
  service,
  iconScale = "default",
  className,
}: ServiceItemCardProps) {
  return (
    <article
      className={cn(
        "border-border bg-primary ease-brand hover:border-secondary flex gap-3 rounded-2xl border p-4 transition duration-(--motion-base) hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <span className="bg-secondary-tint flex size-11 shrink-0 items-center justify-center self-start rounded-xl p-2">
        <BrandIcon
          name={service.icon}
          className={cn("size-full", iconScale === "large" && "scale-110")}
        />
      </span>
      <div className="min-w-0">
        <h3 className="text-ink text-[15px] leading-5 font-bold">{service.title}</h3>
        <p className="text-text mt-1 text-sm leading-5">{service.description}</p>
      </div>
    </article>
  );
}
