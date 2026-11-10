/** First tab stop on every page. It stays hidden until it gets keyboard focus. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="focus:rounded-card focus:bg-primary focus:text-ink sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-(--gutter) focus:z-50 focus:px-4 focus:py-2 focus:font-semibold focus:shadow-sm"
    >
      Skip to main content
    </a>
  );
}
