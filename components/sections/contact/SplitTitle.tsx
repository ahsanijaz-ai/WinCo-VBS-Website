/**
 * Colours the last word of a section heading in strong Teal (large text only, 3.8:1),
 * e.g. "Get in [Touch]" or "How Can We [Help?]".
 */
export function SplitTitle({ title }: { title: string }) {
  const cut = title.lastIndexOf(" ");
  if (cut === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, cut + 1)}
      <span className="text-accent-strong">{title.slice(cut + 1)}</span>
    </>
  );
}
