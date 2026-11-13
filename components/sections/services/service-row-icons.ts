import {
  Bot,
  CalendarCheck,
  ChartLine,
  ClipboardList,
  CloudCog,
  CodeXml,
  Compass,
  FileSearch,
  FileText,
  FolderArchive,
  ListChecks,
  MailOpen,
  Megaphone,
  PanelsTopLeft,
  PenTool,
  Presentation,
  Receipt,
  Share2,
  Store,
  Telescope,
  UserPlus,
  UserSearch,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * One outlined icon per service, keyed by the service name in content/services.ts. Outlined on
 * purpose: the scroll reveal draws their strokes in. A renamed or new service falls back to
 * `fallbackServiceIcon` until it gets its own entry here.
 */
export const serviceRowIcons: Record<string, LucideIcon> = {
  // Business & Administrative Support
  "Virtual Administrative Assistance": CalendarCheck,
  "Lead Generation & Client Outreach": UserPlus,
  "Business Documentation": FileText,
  "Digitization & Records Management": FolderArchive,
  "Recruitment Support": UserSearch,
  "Financial Administration": Receipt,
  // Marketing & Digital Presence
  "Social Media Management": Share2,
  "Content Creation & Planning": PenTool,
  "Email Marketing": MailOpen,
  "Digital Marketing Support": Megaphone,
  "Website Content Management": PanelsTopLeft,
  "Marketing Planning": Compass,
  // Business Strategy & Process Improvement
  "Business & Marketing Plans": ClipboardList,
  "Market & Competitor Research": Telescope,
  "Process Improvement": Workflow,
  "Standard Operating Procedures (SOPs)": ListChecks,
  "Business Research": FileSearch,
  "Strategic Documentation": Presentation,
  // Technology & Digital Solutions
  "Website & E-Commerce Development": Store,
  "Custom Software & Applications": CodeXml,
  "AI & Business Automation": Bot,
  "Systems Integration & Cloud Solutions": CloudCog,
  "Data Analytics & Business Intelligence": ChartLine,
  "Technical Consulting & Support": Wrench,
};

export const fallbackServiceIcon: LucideIcon = ClipboardList;
