import { Check, Clock } from "lucide-react";
import type { Ref } from "react";
import { Logo } from "@/components/brand/Logo";
import { site, type InquiryForm } from "@/content";

type InquirySuccessProps = {
  form: Pick<InquiryForm, "successTitle" | "successMessage" | "successNote">;
  /** The heading receives focus when the panel appears, so keyboard and screen-reader users land here. */
  headingRef?: Ref<HTMLHeadingElement>;
};

/**
 * Shown in place of the form after a successful submit: the logo with its line, then a tinted
 * panel with a Teal check, the heading, the confirmation from the copy and a short note.
 * It fades up 8 px in 240 ms when it appears.
 */
export function InquirySuccess({ form, headingRef }: InquirySuccessProps) {
  return (
    <div
      role="status"
      className="ease-brand text-center transition duration-(--motion-slow) starting:translate-y-2 starting:opacity-0"
    >
      <div className="flex flex-col items-center">
        <Logo />
        <p className="text-ink mt-3 flex items-center gap-4 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase min-[400px]:tracking-[0.2em] sm:tracking-[0.3em]">
          <span aria-hidden="true" className="bg-secondary/30 hidden h-px w-16 sm:block" />
          {site.logoLine}
          <span aria-hidden="true" className="bg-secondary/30 hidden h-px w-16 sm:block" />
        </p>
      </div>

      <div className="from-secondary-tint to-accent-tint relative isolate mt-8 overflow-hidden rounded-2xl bg-linear-to-br p-6 sm:p-10">
        {/* Soft waves in two corners, decoration only. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 -z-10 h-24 w-1/2"
        >
          <path className="fill-primary/60" d="M0 0h300C220 10 120 40 0 120Z" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
          className="absolute right-0 bottom-0 -z-10 h-24 w-1/2"
        >
          <path className="fill-accent/20" d="M300 120H0C90 112 200 80 300 0Z" />
        </svg>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8 sm:text-left">
          <span className="bg-accent-tint text-accent-deep flex size-24 shrink-0 items-center justify-center rounded-full sm:size-28">
            <Check aria-hidden="true" className="size-12 sm:size-14" strokeWidth={3} />
          </span>
          <span aria-hidden="true" className="bg-secondary/20 hidden w-px self-stretch sm:block" />
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] leading-tight font-bold focus:outline-none"
            >
              {form.successTitle}
            </h2>
            <p className="mt-3 text-lg leading-8">{form.successMessage}</p>
            <p className="mt-5 italic">
              <Clock
                aria-hidden="true"
                className="text-secondary mr-2 inline size-5 align-[-0.2em]"
              />
              {form.successNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
