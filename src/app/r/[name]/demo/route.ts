import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getRegistryItem } from "@/registry/registry";

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

    // Read the demo file
    const demoPath = path.join(
      process.cwd(),
      "src",
      "registry",
      "demos",
      `${componentName}-demo.tsx`,
    );

    const [componentContent, demoContent] = await Promise.all([
      fs.readFile(componentPath, "utf-8"),
      fs.readFile(demoPath, "utf-8").catch(() => null),
    ]);

    if (!demoContent) {
      return NextResponse.json(
        { error: `Demo for "${componentName}" not found` },
        { status: 404 },
      );
    }

    // Transform imports for distribution
    const transformedComponentContent = componentContent
      .replace(/@\/registry\/shadcn\//g, "@/components/ui/")
      .replace(/@\/registry\/ui\//g, "@/components/ui/");

    const transformedDemoContent = demoContent
      .replace(/@\/registry\/ui\//g, "@/components/ui/")
      .replace(/@\/registry\/shadcn\//g, "@/components/ui/");

    const registryBlock = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `${componentName}-demo`,
      type: "registry:block",
      description: item.description,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
      files: [
        {
          path: `registry/billui/${componentName}/page.tsx`,
          content: transformedDemoContent,
          type: "registry:page",
          target: `app/${componentName}/page.tsx`,
        },
        {
          path: `registry/billui/${componentName}/${componentName}.tsx`,
          content: transformedComponentContent,
          type: "registry:component",
          target: `components/ui/${componentName}.tsx`,
        },
      ],
      meta: {
        iframeHeight: "600px",
      },
      categories: ["billing"],
    };

    return NextResponse.json(registryBlock);
  } catch (error) {
    console.error(`Error reading files for "${componentName}":`, error);
    return NextResponse.json(
      { error: `Failed to load demo for "${componentName}"` },
      { status: 500 },
    );
  }
}
