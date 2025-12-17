export interface RegistryItem {
  name: string;
  type: "registry:ui" | "registry:component" | "registry:block";
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: Record<string, unknown>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}

export interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:component" | "registry:lib";
  target?: string;
}

export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: string;
    description: string;
  }>;
}
