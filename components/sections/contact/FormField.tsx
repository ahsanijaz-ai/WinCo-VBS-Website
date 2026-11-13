import { AlertCircle, type LucideIcon } from "lucide-react";
import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import type { InquiryField } from "@/content";
import { cn } from "@/lib/cn";
import { SelectField, type SelectOption } from "@/components/sections/contact/SelectField";

/** Browser settings per field: keyboard type and autofill, so phones show the right keyboard. */
export type FieldControl =
  | {
      kind: "input";
      type: HTMLInputTypeAttribute;
      autoComplete: HTMLInputAutoCompleteAttribute;
      inputMode?: "text" | "email" | "tel";
      maxLength: number;
    }
  | { kind: "select"; options: readonly SelectOption[] }
  | { kind: "textarea"; maxLength: number };

type FormFieldProps = {
  field: InquiryField;
  control: FieldControl;
  /** Icon shown in a small tile inside the field, on the left. Decorative. */
  icon: LucideIcon;
  error?: string;
  defaultValue?: string;
  className?: string;
};

/**
 * Field look: 12 px corners, room on the left for the icon tile, 16 px text. The border keeps
 * the 3:1 input colour. On focus the border turns Primary Blue with a soft glow and a light tint,
 * which is the visible focus indicator (6.6:1), so the global outline is not doubled on top.
 */
const controlBase =
  "block w-full min-h-14 rounded-xl border bg-primary py-3 pr-4 pl-15 text-base text-ink " +
  "placeholder:text-[color-mix(in_oklab,var(--color-text)_80%,white)] " +
  "transition-[border-color,box-shadow,background-color] duration-(--motion-base) ease-brand " +
  "hover:border-secondary focus:border-secondary focus-visible:outline-none " +
  "focus:bg-linear-to-r focus:from-secondary-tint focus:to-primary " +
  "focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-secondary)_15%,transparent)]";

/** One labelled form field with its icon and error message. Errors are linked for screen readers. */
export function FormField({
  field,
  control,
  icon: Icon,
  error,
  defaultValue,
  className,
}: FormFieldProps) {
  const id = `inquiry-${field.name}`;
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const shared = {
    id,
    name: field.name,
    required: field.required,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(controlBase, error ? "border-error" : "border-input-border"),
  };

  const tile = (
    <span
      aria-hidden="true"
      className={cn(
        "bg-secondary-tint text-secondary pointer-events-none absolute left-3 flex size-9 items-center justify-center rounded-lg",
        control.kind === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2",
      )}
    >
      <Icon className="size-5" />
    </span>
  );

  return (
    <div className={className}>
      <label id={labelId} htmlFor={id} className="text-ink mb-2 block font-semibold">
        {field.label}
        {field.required && (
          <span aria-hidden="true" className="text-secondary">
            {" "}
            *
          </span>
        )}
      </label>

      <div className="relative">
        {control.kind === "input" && (
          <input
            {...shared}
            type={control.type}
            autoComplete={control.autoComplete}
            inputMode={control.inputMode}
            maxLength={control.maxLength}
            placeholder={field.placeholder}
          />
        )}

        {control.kind === "select" && (
          <SelectField
            id={id}
            name={field.name}
            labelId={labelId}
            options={control.options}
            placeholder={field.placeholder}
            icon={Icon}
            defaultValue={defaultValue}
            invalid={Boolean(error)}
            describedBy={error ? errorId : undefined}
          />
        )}

        {control.kind === "textarea" && (
          <textarea
            {...shared}
            rows={5}
            maxLength={control.maxLength}
            placeholder={field.placeholder}
            className={cn(shared.className, "min-h-40 resize-y pt-4")}
          />
        )}

        {control.kind !== "select" && tile}
      </div>

      {error && (
        <p id={errorId} className="text-error mt-2 flex items-start gap-1.5 text-sm">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
