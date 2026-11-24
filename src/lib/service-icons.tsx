// src/lib/service-icons.tsx
import React from "react";
import {
  Code2,
  Code,
  LayoutTemplate,
  ShoppingCart,
  Palette,
  ArrowRightLeft,
  Bug,
  ShieldCheck,
  Shield,
  Gauge,
  Zap,
  Globe,
  Layers,
  Search,
  Server,
  Database,
  Smartphone,
  RefreshCw,
  Wrench,
  Rocket,
  LifeBuoy,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  code2: Code2,
  code: Code,
  layouttemplate: LayoutTemplate,
  shoppingcart: ShoppingCart,
  palette: Palette,
  arrowrightleft: ArrowRightLeft,
  bug: Bug,
  shieldcheck: ShieldCheck,
  shield: Shield,
  gauge: Gauge,
  zap: Zap,
  globe: Globe,
  layers: Layers,
  search: Search,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  refreshcw: RefreshCw,
  wrench: Wrench,
  rocket: Rocket,
  lifebuoy: LifeBuoy,
  sparkles: Sparkles,
};

/**
 * Returns a typed Lucide icon component safely based on icon string identifier.
 * Defaults to Code2 if the name is missing or unknown.
 */
export function getServiceIcon(iconName?: string): LucideIcon {
  if (!iconName) return Code2;
  const normalized = iconName.toLowerCase().replace(/[-_\s]/g, "");
  return SERVICE_ICONS[normalized] || Code2;
}
