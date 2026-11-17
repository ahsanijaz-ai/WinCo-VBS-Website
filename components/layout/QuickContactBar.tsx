import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RollLabel } from "@/components/ui/RollLabel";
import { site } from "@/content";

/** Mobile-only bottom bar on /services: quick WhatsApp and consultation CTAs, always in reach. */
export function StickyServiceContact() {
  return (
    <nav
      aria-label="Quick contact"
      className="bg-primary/95 border-border fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-3 border-t px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md md:hidden"
    >
      <ButtonLink
        variant="secondary"
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2"
      >
        <WhatsAppIcon aria-hidden="true" className="size-5" />
        <RollLabel text="WhatsApp" />
      </ButtonLink>
      <ButtonLink href="/contact#inquiry-form" className="px-2">
        Free Consultation
      </ButtonLink>
    </nav>
  );
}
