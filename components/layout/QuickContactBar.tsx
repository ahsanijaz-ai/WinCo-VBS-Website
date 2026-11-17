import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RollLabel } from "@/components/ui/RollLabel";
import { site } from "@/content";

/**
 * Quick-contact bar fixed to the bottom of the screen on phones (under 768 px), on every page:
 * WhatsApp and a free consultation, always one tap away (WBS 2.10).
 *
 * - It takes `--quick-bar-h` of space. The footer adds that much padding at the bottom and the
 *   page adds it to `scroll-padding-bottom` (globals.css), so the bar never covers the end of
 *   the page or the element that has keyboard focus.
 * - The mobile menu (z-50) covers it while open.
 * - `data-analytics` names the clicks for the analytics task (3.2).
 */
export function QuickContactBar() {
  const { whatsapp, consultation } = site.quickContact;

  return (
    <nav
      aria-label="Quick contact"
      className="bg-primary/95 border-border fixed inset-x-0 bottom-0 z-20 grid h-(--quick-bar-h) grid-cols-2 content-start gap-3 border-t px-4 pt-3 backdrop-blur-md md:hidden"
    >
      <ButtonLink
        variant="secondary"
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="quick-whatsapp"
        className="px-2"
      >
        <WhatsAppIcon aria-hidden="true" className="size-5" />
        <RollLabel text={whatsapp} />
      </ButtonLink>
      <ButtonLink href={consultation.href} data-analytics="quick-consultation" className="px-2">
        {consultation.label}
      </ButtonLink>
    </nav>
  );
}
