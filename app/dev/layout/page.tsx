import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Developer-only page for checking the layout primitives: Container, Section and ButtonLink.
 * Every outlined bar should start and end at the same edges at every screen width.
 * Returns 404 on the live production site. Delete it before the client signs off.
 */
export const metadata: Metadata = {
  title: "Layout check",
  robots: { index: false, follow: false },
};

function Bar({ label }: { label: string }) {
  return (
    <div className="rounded-card border-secondary bg-secondary-tint text-ink border px-4 py-3 text-sm font-semibold">
      {label}
    </div>
  );
}

export default function LayoutCheckPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <>
      <Section aria-labelledby="layout-default">
        <Logo className="mb-8" />
        <h1 id="layout-default">Layout check</h1>
        <div className="mt-8 grid gap-4">
          <Bar label="Container: full width up to 1280 px, with the side padding on each side" />
          <p className="max-w-[65ch]">
            Paragraph text stops at 65 characters. Resize the window and watch the bar above: its
            left edge must line up with the heading at every width, and the page must never scroll
            sideways.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/dev/layout">Primary button</ButtonLink>
            <ButtonLink href="/dev/layout" variant="secondary">
              Secondary button
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="layout-alt">
        <h2 id="layout-alt">Alternate section</h2>
        <div className="mt-8 grid gap-4">
          <Bar label="Same container, same edges, alternate background" />
        </div>
      </Section>
    </>
  );
}
