import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getRegistryItem, registry } from "@/registry/registry";

// Map component names to their exports for generating imports
const componentExports: Record<string, string[]> = {
  "plan-card": [
    "PlanCard",
    "PlanCardHeader",
    "PlanCardBadge",
    "PlanCardTitle",
    "PlanCardDescription",
    "PlanCardPrice",
    "PlanCardFeatures",
    "PlanCardFeature",
    "PlanCardAction",
  ],
  "invoice-card": [
    "InvoiceCard",
    "InvoiceCardIcon",
    "InvoiceCardContent",
    "InvoiceCardHeader",
    "InvoiceCardNumber",
    "InvoiceCardStatus",
    "InvoiceCardDate",
    "InvoiceCardAmount",
    "InvoiceCardActions",
    "InvoiceCardAction",
  ],
  "payment-method": [
    "PaymentMethod",
    "PaymentMethodIcon",
    "PaymentMethodDetails",
    "PaymentMethodNumber",
    "PaymentMethodExpiry",
    "PaymentMethodBadge",
    "PaymentMethodActions",
    "PaymentMethodAction",
  ],
  "usage-card": [
    "UsageCard",
    "UsageCardHeader",
    "UsageCardPeriod",
    "UsageCardAction",
    "UsageCardSummary",
    "UsageCardLabels",
    "UsageCardLabel",
    "UsageCardProgress",
    "UsageCardList",
    "UsageCardItem",
    "UsageCardItemLabel",
    "UsageCardItemValue",
    "UsageCardMeter",
    "UsageCardTotal",
  ],
  "animated-usage-card": [
    "AnimatedUsageCard",
    "AnimatedUsageCardHeader",
    "AnimatedUsageCardPeriod",
    "AnimatedUsageCardAction",
    "AnimatedUsageCardSummary",
    "AnimatedUsageCardLabels",
    "AnimatedUsageCardLabel",
    "AnimatedUsageCardProgress",
    "AnimatedUsageCardList",
    "AnimatedUsageCardItem",
    "AnimatedUsageCardItemLabel",
    "AnimatedUsageCardItemValue",
    "AnimatedUsageCardMeter",
    "AnimatedUsageCardTotal",
  ],
  "plan-group": [
    "PlanGroup",
    "PlanGroupHeader",
    "PlanGroupTitle",
    "PlanGroupDescription",
    "PlanGroupToggle",
    "PlanGroupContent",
    "PlanPrice",
    "PlanCard",
    "PlanCardHeader",
    "PlanCardBadge",
    "PlanCardTitle",
    "PlanCardDescription",
    "PlanCardPrice",
    "PlanCardFeatures",
    "PlanCardFeature",
    "PlanCardAction",
  ],
};

function generateDemoPage(componentName: string, exampleCode: string): string {
  const exports = componentExports[componentName] || [];

  // Special case: plan-group needs imports from both plan-group and plan-card
  let importStatement: string;
  if (componentName === "plan-group") {
    const planGroupExports = [
      "PlanGroup",
      "PlanGroupHeader",
      "PlanGroupTitle",
      "PlanGroupDescription",
      "PlanGroupToggle",
      "PlanGroupContent",
      "PlanPrice",
    ];
    const planCardExports = [
      "PlanCard",
      "PlanCardHeader",
      "PlanCardBadge",
      "PlanCardTitle",
      "PlanCardDescription",
      "PlanCardPrice",
      "PlanCardFeatures",
      "PlanCardFeature",
      "PlanCardAction",
    ];
    importStatement = `import {\n  ${planGroupExports.join(",\n  ")},\n} from "@/components/ui/plan-group";\nimport {\n  ${planCardExports.join(",\n  ")},\n} from "@/components/ui/plan-card";`;
  } else if (exports.length > 0) {
    importStatement = `import {\n  ${exports.join(",\n  ")},\n} from "@/components/ui/${componentName}";`;
  } else {
    importStatement = `import { ${componentName} } from "@/components/ui/${componentName}";`;
  }

  return `${importStatement}

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      ${exampleCode}
    </div>
  );
}
`;
}

/**
 * Dynamic demo block generator for shadcn registry.
 *
 * This endpoint generates registry:block JSON dynamically from inline code examples.
 * Instead of pre-generating static demo files, the example code is passed via
 * base64-encoded query parameter, allowing documentation examples to work
 * directly with v0's "Open in v0" feature.
 *
 * Usage: /r/[component]/demo?code=[base64EncodedJSX]
 *
 * The base64 should be: btoa(encodeURIComponent(jsxCode))
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const url = new URL(request.url);

  // Get the example code from query parameter (base64 encoded)
  const codeParam = url.searchParams.get("code");

  // Remove .json extension if present
  const componentName = name.replace(/\.json$/, "");

  const item = getRegistryItem(componentName);

  if (!item) {
    return NextResponse.json(
      { error: `Component "${componentName}" not found in registry` },
      { status: 404 },
    );
  }

  // Require code parameter - no fallback to static files
  if (!codeParam) {
    return NextResponse.json(
      {
        error: `Missing ?code= parameter. Encode your JSX with btoa(encodeURIComponent(code))`,
      },
      { status: 400 },
    );
  }

  try {
    // Read the component source file
    const componentPath = path.join(
      process.cwd(),
      "src",
      "registry",
      item.folder ?? "ui",
      `${componentName}.tsx`,
    );

    const componentContent = await fs.readFile(componentPath, "utf-8");

    // Decode the base64 code (was encoded with encodeURIComponent + btoa)
    const decoded = Buffer.from(codeParam, "base64").toString("utf-8");
    const exampleCode = decodeURIComponent(decoded);
    const demoContent = generateDemoPage(componentName, exampleCode);

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
          content: demoContent,
          type: "registry:page",
          target: `app/${componentName}/page.tsx`,
        },
        {
          path: `registry/billui/${componentName}/${componentName}.tsx`,
          content: componentContent,
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

/**
 * Generate static params for all registry components.
 * This enables static generation at build time when combined with
 * a build script that pre-generates the demo JSONs.
 */
export function generateStaticParams() {
  return Object.keys(registry).map((name) => ({ name }));
}
