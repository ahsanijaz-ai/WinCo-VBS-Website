"use client";

import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  /** Optional icon shown in a small tile in front of the option. */
  icon?: LucideIcon;
};

type SelectFieldProps = {
  id: string;
  name: string;
  /** id of the visible <label>, which names the field for screen readers. */
  labelId: string;
  options: readonly SelectOption[];
  placeholder: string;
  /** Icon in the tile at the left of the field. */
  icon: LucideIcon;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
};

/** Tallest the open list may get; it also never runs past the bottom (or top) of the form. */
const MAX_LIST_HEIGHT = 288;
const MIN_LIST_HEIGHT = 160;

/**
 * A select-only combobox (WAI-ARIA pattern) styled to match the form: the trigger shows the
 * icon tile, a divider, the value and a chevron; the list opens in a rounded panel that fits
 * inside the form, with option icons, a blue bar and check on the chosen option.
 *
 * Keyboard: Enter, Space or the arrow keys open it; the arrows, Home, End, Page Up and Page Down
 * move; Enter or Space choose; Escape closes; typing letters jumps to a matching option.
 * The value is submitted through a hidden input named `name`, like a normal select.
 */
export function SelectField({
  id,
  name,
  labelId,
  options,
  placeholder,
  icon: Icon,
  defaultValue = "",
  invalid,
  describedBy,
}: SelectFieldProps) {
  const listId = useId();
  const allOptions = [{ value: "", label: placeholder }, ...options];
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [placement, setPlacement] = useState<{ up: boolean; maxHeight: number }>({
    up: false,
    maxHeight: MAX_LIST_HEIGHT,
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const selectedIndex = Math.max(
    0,
    allOptions.findIndex((option) => option.value === value),
  );
  const selected = allOptions[selectedIndex];

  /** Opens below if there is room inside the form, otherwise above, and caps the height. */
  const openList = useCallback((startIndex: number) => {
    const trigger = triggerRef.current;
    const bounds = trigger?.closest("form")?.getBoundingClientRect();
    const rect = trigger?.getBoundingClientRect();
    if (rect && bounds) {
      const below = Math.min(bounds.bottom, window.innerHeight) - rect.bottom - 12;
      const above = rect.top - Math.max(bounds.top, 0) - 12;
      const up = below < MIN_LIST_HEIGHT && above > below;
      const room = up ? above : below;
      setPlacement({ up, maxHeight: Math.max(MIN_LIST_HEIGHT, Math.min(MAX_LIST_HEIGHT, room)) });
    }
    setActive(startIndex);
    setOpen(true);
  }, []);

  const choose = (index: number) => {
    setValue(allOptions[index].value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Keep the active option in view while moving through the list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  // Close when clicking anywhere outside the field.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /** Jumps to the next option whose label starts with what has been typed in the last 0.5 s. */
  const jumpTo = (char: string) => {
    const t = typeahead.current;
    window.clearTimeout(t.timer);
    t.text += char.toLowerCase();
    t.timer = window.setTimeout(() => (t.text = ""), 500);
    const from = open ? active : selectedIndex;
    const order = [...allOptions.keys()].map(
      (i) => (from + (t.text.length === 1 ? 1 : 0) + i) % allOptions.length,
    );
    const match = order.find((i) => i > 0 && allOptions[i].label.toLowerCase().startsWith(t.text));
    if (match === undefined) return;
    if (open) setActive(match);
    else setValue(allOptions[match].value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = allOptions.length - 1;
    const keys: Record<string, () => void> = open
      ? {
          ArrowDown: () => setActive((i) => Math.min(last, i + 1)),
          ArrowUp: () => setActive((i) => Math.max(0, i - 1)),
          Home: () => setActive(0),
          End: () => setActive(last),
          PageDown: () => setActive((i) => Math.min(last, i + 10)),
          PageUp: () => setActive((i) => Math.max(0, i - 10)),
          Enter: () => choose(active),
          " ": () => choose(active),
          Escape: () => setOpen(false),
          Tab: () => setOpen(false),
        }
      : {
          ArrowDown: () => openList(selectedIndex),
          ArrowUp: () => openList(selectedIndex),
          Enter: () => openList(selectedIndex),
          " ": () => openList(selectedIndex),
          Home: () => openList(0),
          End: () => openList(last),
        };
    const action = keys[event.key];
    if (action) {
      if (event.key !== "Tab") event.preventDefault();
      action();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      jumpTo(event.key);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList(selectedIndex))}
        onKeyDown={onKeyDown}
        className={cn(
          "flex min-h-14 w-full items-center gap-3 rounded-xl border py-2 pr-4 pl-3 text-left text-base",
          "bg-primary ease-brand transition-[border-color,box-shadow,background-color] duration-(--motion-base)",
          "hover:border-secondary focus:border-secondary focus-visible:outline-none",
          "focus:from-secondary-tint focus:to-primary focus:bg-linear-to-r",
          "focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-secondary)_15%,transparent)]",
          open &&
            "border-secondary shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-secondary)_15%,transparent)]",
          invalid ? "border-error" : !open && "border-input-border",
        )}
      >
        <span
          aria-hidden="true"
          className="bg-secondary-tint text-secondary flex size-9 shrink-0 items-center justify-center rounded-lg"
        >
          <Icon className="size-5" />
        </span>
        <span aria-hidden="true" className="bg-border h-7 w-px shrink-0" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            value ? "text-ink" : "text-[color-mix(in_oklab,var(--color-text)_80%,white)]",
          )}
        >
          {selected.label}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "text-secondary ease-brand size-5 shrink-0 transition-transform duration-(--motion-base)",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          style={{ maxHeight: placement.maxHeight }}
          className={cn(
            "bg-primary border-border shadow-secondary/10 absolute inset-x-0 z-30 overflow-y-auto overscroll-contain rounded-2xl border p-2 shadow-xl",
            "ease-brand origin-top transition duration-(--motion-fast) starting:scale-y-95 starting:opacity-0",
            placement.up ? "bottom-full mb-2 origin-bottom" : "top-full mt-2",
          )}
        >
          {allOptions.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isActive = index === active;
            const OptionIcon = option.icon;
            return (
              <li
                key={option.value || "placeholder"}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onMouseMove={() => setActive(index)}
                onClick={() => choose(index)}
                className={cn(
                  "relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 select-none",
                  index === 0 && "text-[color-mix(in_oklab,var(--color-text)_80%,white)]",
                  isActive && !isSelected && "bg-primary-alt",
                  isSelected && "bg-secondary-tint text-secondary font-semibold",
                )}
              >
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="bg-secondary absolute inset-y-2 left-0 w-1 rounded-full"
                  />
                )}
                {OptionIcon && (
                  <span
                    aria-hidden="true"
                    className="bg-secondary-tint text-secondary flex size-9 shrink-0 items-center justify-center rounded-lg"
                  >
                    <OptionIcon className="size-5" />
                  </span>
                )}
                <span className="min-w-0 flex-1">{option.label}</span>
                {isSelected && index > 0 && (
                  <span
                    aria-hidden="true"
                    className="bg-secondary text-primary flex size-6 shrink-0 items-center justify-center rounded-full"
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
