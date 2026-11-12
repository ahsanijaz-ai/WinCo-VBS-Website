/**
 * A button/link label that rolls up letter by letter on hover or focus of an ancestor with the
 * `btn-roll` class (see app/globals.css, used by every button via button-styles.ts). Renders a
 * screen-reader-only copy of the full text plus a decorative, split-into-characters copy, so
 * the accessible name stays the plain label regardless of how it's visually animated.
 */
export function RollLabel({ text }: { text: string }) {
  const chars = Array.from(text);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative inline-flex">
        {chars.map((char, i) => (
          <span key={i} className="roll-char">
            <span className="roll-char-inner" style={{ transitionDelay: `${i * 10}ms` }}>
              {char === " " ? " " : char}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
