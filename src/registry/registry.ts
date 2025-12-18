import type { RegistryIndex, RegistryItem } from "./types";

export const REGISTRY_NAME = "billui";
export const REGISTRY_HOMEPAGE = "https://billui.com";

export const registryIndex: RegistryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: REGISTRY_NAME,
  homepage: REGISTRY_HOMEPAGE,
  items: [
    {
      name: "plan-card",
      type: "registry:ui",
      description:
        "A card for displaying pricing tiers and subscription plans.",
    },
    {
      name: "plan-group",
      type: "registry:ui",
      description:
        "A container for displaying multiple pricing plans with a monthly/yearly toggle.",
    },
    {
      name: "invoice-card",
      type: "registry:ui",
      description: "A card for displaying invoice details and billing history.",
    },
    {
      name: "payment-method",
      type: "registry:ui",
      description:
        "A card for displaying saved payment methods like credit cards.",
    },
    {
      name: "usage-card",
      type: "registry:ui",
      description:
        "A card for displaying usage metrics, billing cycle progress and itemized charges.",
    },
  ],
};

export const registry: Record<string, RegistryItem> = {
  "plan-card": {
    name: "plan-card",
    type: "registry:ui",
    description: "A card for displaying pricing tiers and subscription plans.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [], // Will be populated dynamically from source files
  },
  "plan-group": {
    name: "plan-group",
    type: "registry:ui",
    description:
      "A container for displaying multiple pricing plans with a monthly/yearly toggle.",
    dependencies: [],
    registryDependencies: ["plan-card"],
    files: [], // Will be populated dynamically from source files
  },
  "invoice-card": {
    name: "invoice-card",
    type: "registry:ui",
    description:
      "A card component for displaying invoice details and billing history.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [], // Will be populated dynamically from source files
  },
  "payment-method": {
    name: "payment-method",
    type: "registry:ui",
    description:
      "A card for displaying saved payment methods like credit cards.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [], // Will be populated dynamically from source files
  },
  "usage-card": {
    name: "usage-card",
    type: "registry:ui",
    description:
      "A card for displaying usage metrics, billing cycle progress and itemized charges.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [], // Will be populated dynamically from source files
  },
};

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry[name];
}

export function getAllRegistryItems(): RegistryItem[] {
  return Object.values(registry);
}
