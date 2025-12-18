import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getRegistryItem } from "@/registry/registry";
import type { RegistryItem } from "@/registry/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  // Remove .json extension if present
  const componentName = name.replace(/\.json$/, "");

  const item = getRegistryItem(componentName);

  if (!item) {
    return NextResponse.json(
      { error: `Component "${componentName}" not found in registry` },
      { status: 404 },
    );
  }

  try {
    // Read the component source file
    const componentPath = path.join(
      process.cwd(),
      "src",
      "registry",
      "ui",
      `${componentName}.tsx`,
    );

    const content = await fs.readFile(componentPath, "utf-8");

    // Transform imports for distribution:
    // @/registry/shadcn/* -> @/components/ui/*
    const transformedContent = content
      .replace(/@\/registry\/shadcn\//g, "@/components/ui/")
      .replace(/@\/registry\/ui\//g, "@/components/ui/");

    const registryItem: RegistryItem = {
      ...item,
      files: [
        {
          path: `ui/${componentName}.tsx`,
          content: transformedContent,
          type: "registry:ui",
          target: `components/ui/${componentName}.tsx`,
        },
      ],
    };

    return NextResponse.json(registryItem);
  } catch (error) {
    console.error(
      `Error reading component file for "${componentName}":`,
      error,
    );
    return NextResponse.json(
      { error: `Failed to load component "${componentName}"` },
      { status: 500 },
    );
  }
}
