"use client";

import Link from "next/link";
import registryJson from "../../../registry.json";

export function ComponentsList() {
  const components = registryJson.items;

  const getComponentPath = (name: string) => {
    if (name.startsWith("animated-")) {
      return `/docs/animated/${name}`;
    }
    return `/docs/components/${name}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 not-prose my-6">
      {components.map((component) => (
        <Link
          key={component.name}
          href={getComponentPath(component.name)}
          className="text-sm font-medium hover:underline underline-offset-4 capitalize"
        >
          {component.name.replace(/-/g, " ")}
        </Link>
      ))}
    </div>
  );
}
