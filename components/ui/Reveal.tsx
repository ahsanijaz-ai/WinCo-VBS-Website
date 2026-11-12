"use client";

import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";

type Stroke = readonly [el: SVGGeometryElement, length: number];

type UnitState = {
  strokes: Stroke[];
  timer: number | undefined;
};

/** Reads a millisecond design token (e.g. `--reveal-stagger: 140ms`) off an element. */
function readMs(el: Element, token: string, fallback: number): number {
  const raw = getComputedStyle(el).getPropertyValue(token).trim();
  if (!raw) return fallback;
  const value = Number.parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value : value * 1000;
}

/**
 * Drives the scroll-in choreography (see app/globals.css) for every `[data-reveal-unit]`
 * inside `rootRef` (the root itself counts too, if it carries the attribute): each gets
 * `.reveal-in` when it enters the viewport and `.reveal-done` once its entrance has finished
 * (its transitions are then torn down so hover is never delayed), staggered in DOM order, and
 * replays if it fully leaves and re-enters. No-ops under `prefers-reduced-motion` or without
 * `IntersectionObserver`, leaving content in its plain, fully visible state either way.
 */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const stagger = readMs(root, "--reveal-stagger", 140);
    const settle = readMs(root, "--reveal-settle", 2100);

    const mark = root.querySelector<HTMLElement>("[data-reveal-mark]");
    const units = root.matches("[data-reveal-unit]")
      ? [root, ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-unit]"))]
      : Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-unit]"));
    const state = new Map<HTMLElement, UnitState>();

    const collectStrokes = (unit: HTMLElement): Stroke[] => {
      const found: Stroke[] = [];
      unit
        .querySelectorAll<SVGGeometryElement>(
          "[data-reveal-icon] svg path, [data-reveal-icon] svg circle, [data-reveal-icon] svg rect",
        )
        .forEach((el) => {
          if (el.hasAttribute("stroke-dasharray")) return;
          const stroke = getComputedStyle(el).stroke;
          if (!stroke || stroke === "none") return;
          const length = el.getTotalLength();
          if (length > 0) found.push([el, length + 2]);
        });
      return found;
    };

    const stateOf = (unit: HTMLElement): UnitState => {
      let s = state.get(unit);
      if (!s) {
        s = { strokes: collectStrokes(unit), timer: undefined };
        state.set(unit, s);
      }
      return s;
    };

    const armStrokes = (unit: HTMLElement) => {
      for (const [el, length] of stateOf(unit).strokes) {
        el.style.transition = "none";
        el.style.strokeDasharray = `${length} ${length}`;
        el.style.strokeDashoffset = `${length}`;
      }
    };

    const drawStrokes = (unit: HTMLElement, delay: number) => {
      stateOf(unit).strokes.forEach(([el], i) => {
        el.getBoundingClientRect(); // commit the armed state before transitioning
        el.style.transition = `stroke-dashoffset var(--reveal-dur-draw) var(--ease-reveal-in-out) ${
          delay + 220 + i * 45
        }ms`;
        el.style.strokeDashoffset = "0";
      });
    };

    const clearStrokes = (unit: HTMLElement) => {
      for (const [el] of stateOf(unit).strokes) {
        el.style.transition = "";
        el.style.strokeDasharray = "";
        el.style.strokeDashoffset = "";
      }
    };

    const enter = (unit: HTMLElement, delay: number) => {
      if (unit.classList.contains("reveal-in")) return;
      const s = stateOf(unit);
      unit.style.setProperty("--d", `${delay}ms`);
      drawStrokes(unit, delay);
      unit.classList.add("reveal-in");
      window.clearTimeout(s.timer);
      s.timer = window.setTimeout(() => {
        unit.classList.add("reveal-done");
        clearStrokes(unit);
      }, delay + settle);
    };

    const leave = (unit: HTMLElement) => {
      if (!unit.classList.contains("reveal-in")) return;
      window.clearTimeout(stateOf(unit).timer);
      unit.classList.remove("reveal-in", "reveal-done");
      armStrokes(unit);
    };

    root.classList.add("reveal-js");
    units.forEach(armStrokes);

    const enterObserver = new IntersectionObserver(
      (entries) => {
        const batch = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => units.indexOf(a) - units.indexOf(b));
        batch.forEach((unit, i) => enter(unit, i * stagger));
        if (batch.length > 0 && mark) mark.dataset.on = "1";
      },
      { threshold: 0, rootMargin: "0px 0px -14% 0px" },
    );

    const leaveObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) leave(entry.target as HTMLElement);
        }
        if (mark && !units.some((unit) => unit.classList.contains("reveal-in"))) {
          mark.dataset.on = "0";
        }
      },
      { threshold: 0 },
    );

    for (const unit of units) {
      enterObserver.observe(unit);
      leaveObserver.observe(unit);
    }

    return () => {
      enterObserver.disconnect();
      leaveObserver.disconnect();
      root.classList.remove("reveal-js");
      if (mark) delete mark.dataset.on;
      for (const unit of units) {
        window.clearTimeout(state.get(unit)?.timer);
        clearStrokes(unit);
        unit.classList.remove("reveal-in", "reveal-done");
        unit.style.removeProperty("--d");
      }
    };
  }, [rootRef]);
}

type RevealTag = "div" | "section" | "li" | "article" | "h2" | "h3" | "p" | "span" | "button";

type RevealProps = {
  as?: RevealTag;
  /** This element is itself the one thing to reveal (a single card/panel), not a group. */
  asUnit?: boolean;
  /** Only meaningful with `asUnit`: opts into the icon/line/text hover polish in globals.css. */
  hoverGroup?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Root scroll-reveal driver: observes every `[data-reveal-unit]` inside itself (headings, cards,
 * list items placed with `RevealUnit`/`RevealWords`/`RevealFade`/etc.) and staggers their
 * entrance in DOM order. One `<Reveal>` per logical group of things that should reveal together
 * (typically one per `<Section>`).
 */
export function Reveal({
  as = "div",
  asUnit = false,
  hoverGroup = false,
  id,
  className,
  children,
}: RevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={rootRef as Ref<never>}
      id={id}
      data-reveal-unit={asUnit ? "" : undefined}
      data-reveal-hover={asUnit && hoverGroup ? "" : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

type RevealUnitProps = {
  as?: RevealTag;
  /** Opts this unit into the icon/line/text hover polish in globals.css. */
  hoverGroup?: boolean;
  className?: string;
  children: ReactNode;
};

/** Marks one staggered entry inside an ancestor `<Reveal>` group (a card, a list item, a block). */
export function RevealUnit({
  as = "div",
  hoverGroup = false,
  className,
  children,
}: RevealUnitProps) {
  const Tag = as as ElementType;
  return (
    <Tag data-reveal-unit="" data-reveal-hover={hoverGroup ? "" : undefined} className={className}>
      {children}
    </Tag>
  );
}

type RevealWordsProps = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  text: string;
  /** This heading is its own top-level unit (default). Set `false` to nest it inside a `RevealUnit`. */
  standalone?: boolean;
};

/** Masked word reveal for headings: each word rises from behind a mask, one after another. */
export function RevealWords({
  as = "h2",
  id,
  className,
  text,
  standalone = true,
}: RevealWordsProps) {
  const Tag = as as ElementType;
  const words = text.split(" ");
  return (
    <Tag id={id} data-reveal-unit={standalone ? "" : undefined} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="reveal-word">
            <span style={{ "--w": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

type RevealClipProps = {
  as?: "p" | "div" | "span";
  className?: string;
  children: ReactNode;
  /** Set `true` to make this its own top-level unit instead of nesting inside a `RevealUnit`. */
  standalone?: boolean;
};

/** Clip-path wipe (left to right) for taglines and lead paragraphs. */
export function RevealClip({ as = "p", className, children, standalone = false }: RevealClipProps) {
  const Tag = as as ElementType;
  return (
    <Tag data-reveal-clip="" data-reveal-unit={standalone ? "" : undefined} className={className}>
      {children}
    </Tag>
  );
}

type RevealLineProps = {
  className?: string;
  standalone?: boolean;
};

/** Line draw (scaleX from left) for dividers and rules. */
export function RevealLine({ className, standalone = false }: RevealLineProps) {
  return (
    <div data-reveal-line="" data-reveal-unit={standalone ? "" : undefined} className={className} />
  );
}

type RevealIconProps = {
  className?: string;
  children: ReactNode;
  standalone?: boolean;
};

/**
 * Spring pop-in (fade + translateY + scale + slight rotate) for icons and images. Also draws
 * the stroke of any outlined inline SVG placed inside it (paths/circles/rects with a visible
 * `stroke`), via `useScrollReveal`'s stroke collection.
 */
export function RevealIcon({ className, children, standalone = false }: RevealIconProps) {
  return (
    <div data-reveal-icon="" data-reveal-unit={standalone ? "" : undefined} className={className}>
      {children}
    </div>
  );
}

type RevealFadeProps = {
  as?: RevealTag;
  className?: string;
  children: ReactNode;
  /** This element is its own top-level unit (default): a card, list item or button. Set `false`
   * to nest it inside a `RevealUnit` instead, e.g. a description under a title. */
  standalone?: boolean;
  /** A second fade-up tier, ~90ms behind the primary one (e.g. body text under a heading). */
  secondary?: boolean;
};

/** Staggered fade-up for body text, cards, list items and buttons. */
export function RevealFade({
  as = "div",
  className,
  children,
  standalone = true,
  secondary = false,
}: RevealFadeProps) {
  const Tag = as as ElementType;
  const fadeAttr = secondary ? "data-reveal-fade-secondary" : "data-reveal-fade";
  return (
    <Tag
      {...{ [fadeAttr]: "" }}
      data-reveal-unit={standalone ? "" : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
