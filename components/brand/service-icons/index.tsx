import type { ComponentType } from "react";
import type { BrandIconProps } from "./types";
import {
  BusinessDocumentationIcon,
  DigitizationIcon,
  FinancialAdminIcon,
  LeadGenerationIcon,
  RecruitmentIcon,
  VirtualAssistanceIcon,
} from "./admin";
import {
  ContentCreationIcon,
  DigitalMarketingIcon,
  EmailMarketingIcon,
  MarketingPlanningIcon,
  SocialMediaIcon,
  WebsiteContentIcon,
} from "./marketing";
import { PathAdminIcon, PathMarketingIcon, PathStrategyIcon, PathTechnologyIcon } from "./path";
import {
  BusinessPlansIcon,
  BusinessResearchIcon,
  MarketResearchIcon,
  ProcessImprovementIcon,
  SopsIcon,
  StrategicDocumentationIcon,
} from "./strategy";
import {
  AiAutomationIcon,
  CustomSoftwareIcon,
  DataAnalyticsIcon,
  SystemsIntegrationIcon,
  TechnicalSupportIcon,
  WebsiteEcommerceIcon,
} from "./technology";

export type { BrandIconProps } from "./types";

export const brandIcons = {
  // "Find your path" problem cards
  "path-admin": PathAdminIcon,
  "path-marketing": PathMarketingIcon,
  "path-strategy": PathStrategyIcon,
  "path-technology": PathTechnologyIcon,
  // Business & Administrative Support
  "virtual-assistance": VirtualAssistanceIcon,
  "lead-generation": LeadGenerationIcon,
  "business-documentation": BusinessDocumentationIcon,
  digitization: DigitizationIcon,
  recruitment: RecruitmentIcon,
  "financial-admin": FinancialAdminIcon,
  // Marketing & Digital Presence
  "social-media": SocialMediaIcon,
  "content-creation": ContentCreationIcon,
  "email-marketing": EmailMarketingIcon,
  "digital-marketing": DigitalMarketingIcon,
  "website-content": WebsiteContentIcon,
  "marketing-planning": MarketingPlanningIcon,
  // Business Strategy & Process Improvement
  "business-plans": BusinessPlansIcon,
  "market-research": MarketResearchIcon,
  "process-improvement": ProcessImprovementIcon,
  sops: SopsIcon,
  "business-research": BusinessResearchIcon,
  "strategic-documentation": StrategicDocumentationIcon,
  // Technology & Digital Solutions
  "website-ecommerce": WebsiteEcommerceIcon,
  "custom-software": CustomSoftwareIcon,
  "ai-automation": AiAutomationIcon,
  "systems-integration": SystemsIntegrationIcon,
  "data-analytics": DataAnalyticsIcon,
  "technical-support": TechnicalSupportIcon,
} as const satisfies Record<string, ComponentType<BrandIconProps>>;

export type BrandIconName = keyof typeof brandIcons;

export function BrandIcon({ name, ...props }: BrandIconProps & { name: BrandIconName }) {
  const Icon = brandIcons[name];
  return <Icon {...props} />;
}
