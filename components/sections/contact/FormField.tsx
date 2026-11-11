import { AlertCircle, ChevronDown } from "lucide-react";
import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import type { InquiryField } from "@/content";
import { cn } from "@/lib/cn";

/** Browser settings per field: keyboard type and autofill, so phones show the right keyboard. */
export type FieldControl =
  | {
      kind: "input";
      type: HTMLInputTypeAttribute;
      autoComplete: HTMLInputAutoCompleteAttribute;
      inputMode?: "text" | "email" | "tel";
      maxLength: number;
    }
  | { kind: "select"; options: string[]; placeholder: string }
  | { kind: "textarea"; maxLength: number };

type FormFieldProps = {
  field: InquiryField;
  control: FieldControl;
  error?: string;
  defaultValue?: string;
  className?: string;
};

const controlBase =
  "block w-full min-h-12 rounded-card border bg-primary px-4 py-3 text-base text-ink " +
  "transition-colors duration-(--motion-base) ease-brand hover:border-secondary focus:border-secondary";

/** One labelled form field with its error message. Errors are linked for screen readers. */
export function FormField({ field, control, error, defaultValue, className }: FormFieldProps) {
  const id = `inquiry-${field.name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    required: field.required,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(controlBase, error ? "border-error" : "border-border"),
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-ink mb-2 block text-sm font-semibold">
        {field.label}
        {field.required && (
          <span aria-hidden="true" className="text-secondary">
            {" "}
            *
          </span>
        )}
      </label>

      {control.kind === "input" && (
        <input
          {...shared}
          type={control.type}
          autoComplete={control.autoComplete}
          inputMode={control.inputMode}
          maxLength={control.maxLength}
        />
      )}

      {control.kind === "select" && (
        <div className="relative">
          <select {...shared} className={cn(shared.className, "appearance-none pr-12")}>
            <option value="">{control.placeholder}</option>
            {control.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="text-secondary pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2"
          />
        </div>
      )}

      {control.kind === "textarea" && (
        <textarea
          {...shared}
          rows={6}
          maxLength={control.maxLength}
          className={cn(shared.className, "min-h-40 resize-y")}
        />
      )}

      {error && (
        <p id={errorId} className="text-error mt-2 flex items-start gap-1.5 text-sm">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
