import type { RegistryIndex, RegistryItem } from "./types";

export const REGISTRY_NAME = "billui";
export const REGISTRY_HOMEPAGE = "https://billui.com";

export const registryIndex: RegistryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: REGISTRY_NAME,
  homepage: REGISTRY_HOMEPAGE,
  items: [
    {
      name: "pricing-card",
      type: "registry:ui",
      description:
        "A composable pricing card component for displaying subscription plans",
    },
  ],
};

export const registry: Record<string, RegistryItem> = {
  "pricing-card": {
    name: "pricing-card",
    type: "registry:ui",
    description:
      "A composable pricing card component for displaying subscription plans",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [], // Will be populated dynamically from source files
  },
};

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry[name];
}

export function getAllRegistryItems(): RegistryItem[] {
  return Object.values(registry);
}
