import type { Metadata } from "next";

/**
 * Developer-only reference page that shows every design token in one place.
 * Use it to check colour, type and spacing by eye. It is hidden from search engines
 * and must be deleted before launch.
 */
export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "--color-primary", swatch: "bg-primary border border-border", share: "60%" },
  { token: "--color-primary-alt", swatch: "bg-primary-alt border border-border", share: "60%" },
  { token: "--color-secondary", swatch: "bg-secondary", share: "30%" },
  { token: "--color-secondary-hover", swatch: "bg-secondary-hover", share: "30%" },
  {
    token: "--color-secondary-tint",
    swatch: "bg-secondary-tint border border-border",
    share: "30%",
  },
  { token: "--color-border", swatch: "bg-border", share: "30%" },
  { token: "--color-accent", swatch: "bg-accent", share: "10%" },
  { token: "--color-ink", swatch: "bg-ink", share: "text" },
  { token: "--color-text", swatch: "bg-text", share: "text" },
] as const;

const spacing = [
  { step: "1", px: 4, bar: "w-1" },
  { step: "2", px: 8, bar: "w-2" },
  { step: "3", px: 12, bar: "w-3" },
  { step: "4", px: 16, bar: "w-4" },
  { step: "6", px: 24, bar: "w-6" },
  { step: "8", px: 32, bar: "w-8" },
  { step: "12", px: 48, bar: "w-12" },
  { step: "16", px: 64, bar: "w-16" },
  { step: "20", px: 80, bar: "w-20" },
  { step: "24", px: 96, bar: "w-24" },
] as const;

const motion = [
  { token: "--motion-fast", ms: 170, box: "duration-(--motion-fast)" },
  { token: "--motion-base", ms: 200, box: "duration-(--motion-base)" },
  { token: "--motion-slow", ms: 240, box: "duration-(--motion-slow)" },
] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-(--section-y) first:pt-0">
      <h2 className="mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="max-w-site mx-auto w-full px-(--gutter) py-12">
      <h1 className="mb-12">Design tokens</h1>

      <Block title="Colour">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map(({ token, swatch, share }) => (
            <li key={token} className="flex items-center gap-4">
              <span className={`rounded-card size-16 shrink-0 ${swatch}`} />
              <span>
                <span className="text-ink block font-semibold">{token}</span>
                <span className="block text-sm">{share}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Type">
        <div className="grid gap-6">
          <h1>Heading 1: Smarter Solutions. Stronger Businesses.</h1>
          <h2>Heading 2: Practical Solutions</h2>
          <h3>Heading 3: Business and Administrative Support</h3>
          <p className="max-w-[65ch] text-lg leading-7 md:text-xl md:leading-8">
            Lead text. We help businesses simplify operations, strengthen their digital presence,
            and improve efficiency through tailored business support.
          </p>
          <p className="max-w-[65ch]">
            Body text at 16 px on a 24 px line. Paragraphs stop at 65 characters so lines stay easy
            to read on wide screens.
          </p>
        </div>
      </Block>

      <Block title="Spacing scale">
        <ul className="grid gap-3">
          {spacing.map(({ step, px, bar }) => (
            <li key={step} className="flex items-center gap-4">
              <span className="w-24 text-sm">
                step {step} ({px} px)
              </span>
              <span className={`rounded-card bg-secondary h-4 ${bar}`} />
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Layout values">
        <ul className="grid gap-4">
          <li className="flex items-center gap-4">
            <span className="w-40 text-sm">--gutter (side padding)</span>
            <span className="rounded-card bg-accent h-4 w-(--gutter)" />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-40 text-sm">--section-y (section padding)</span>
            <span className="rounded-card bg-accent h-(--section-y) w-4" />
          </li>
          <li className="flex items-center gap-4">
            <span className="w-40 text-sm">--header-h (header height)</span>
            <span className="rounded-card bg-accent h-(--header-h) w-4" />
          </li>
        </ul>
        <p className="mt-6 text-sm">
          These values change at 768 px and 1024 px. Resize the window to watch them grow.
        </p>
      </Block>

      <Block title="Shape and width">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="rounded-card border-border bg-secondary-tint size-16 border" />
            <span className="text-sm">rounded-card (8 px)</span>
          </div>
          <div className="max-w-site rounded-card bg-secondary-tint h-4 w-full" />
          <p className="text-sm">
            max-w-site (1280 px outer width). The bar stops at the page container width.
          </p>
        </div>
      </Block>

      <Block title="Motion">
        <p className="mb-6 text-sm">
          Hover each box (on a device that can hover) to see its duration.
        </p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {motion.map(({ token, ms, box }) => (
            <li
              key={token}
              className={`rounded-card bg-secondary-tint ease-brand hover:bg-secondary hover:text-primary p-6 transition-colors ${box}`}
            >
              <span className="block font-semibold">{token}</span>
              <span className="block text-sm">{ms} ms</span>
            </li>
          ))}
        </ul>
      </Block>
    </main>
  );
}
