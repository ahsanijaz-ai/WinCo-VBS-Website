import type { ComponentType, SVGProps } from "react";

import { ConnectIcon } from "./icons/ConnectIcon";
import { ImplementIcon } from "./icons/ImplementIcon";
import { ImproveIcon } from "./icons/ImproveIcon";
import { PlanIcon } from "./icons/PlanIcon";

/** One illustration per How We Work step, in content order (Connect, Plan, Implement, Improve). */
export const howWeWorkIcons: readonly ComponentType<SVGProps<SVGSVGElement>>[] = [
  ConnectIcon,
  PlanIcon,
  ImplementIcon,
  ImproveIcon,
];
