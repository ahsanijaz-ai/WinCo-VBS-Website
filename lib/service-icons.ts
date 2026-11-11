import { Briefcase, Megaphone, MonitorSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/content";

/** Lucide icon for each service group name used in the content files. */
export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  briefcase: Briefcase,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  "monitor-smartphone": MonitorSmartphone,
};
