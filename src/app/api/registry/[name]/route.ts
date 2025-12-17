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

  const item = getRegistryItem(name);

  if (!item) {
    return NextResponse.json(
      { error: `Component "${name}" not found in registry` },
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
      `${name}.tsx`,
    );

    const content = await fs.readFile(componentPath, "utf-8");

    const registryItem: RegistryItem = {
      ...item,
      files: [
        {
          path: `ui/${name}.tsx`,
          content,
          type: "registry:ui",
          target: `components/ui/${name}.tsx`,
        },
      ],
    };

    return NextResponse.json(registryItem);
  } catch (error) {
    console.error(`Error reading component file for "${name}":`, error);
    return NextResponse.json(
      { error: `Failed to load component "${name}"` },
      { status: 500 },
    );
  }
}
