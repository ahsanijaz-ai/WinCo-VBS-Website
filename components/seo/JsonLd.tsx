/**
 * Prints structured data as a `<script type="application/ld+json">`.
 * `<` is escaped as `<`, as the Next.js JSON-LD guide recommends, so no value can close
 * the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
