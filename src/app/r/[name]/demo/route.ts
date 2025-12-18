import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getRegistryItem } from "@/registry/registry";

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

  try {
    // Read the component source file
    const componentPath = path.join(
      process.cwd(),
      "src",
      "registry",
      "ui",
      `${componentName}.tsx`,
    );

    const componentContent = await fs.readFile(componentPath, "utf-8");

    // Transform imports for distribution
    const transformedComponentContent = componentContent
      .replace(/@\/registry\/shadcn\//g, "@/components/ui/")
      .replace(/@\/registry\/ui\//g, "@/components/ui/");

    // Generate demo content - either from query param or use default
    let demoContent: string;

    if (codeParam) {
      // Decode the base64 code (was encoded with encodeURIComponent + btoa)
      const decoded = Buffer.from(codeParam, "base64").toString("utf-8");
      const exampleCode = decodeURIComponent(decoded);
      demoContent = generateDemoPage(componentName, exampleCode);
    } else {
      // Try to read the default demo file
      const demoPath = path.join(
        process.cwd(),
        "src",
        "registry",
        "demos",
        `${componentName}-demo.tsx`,
      );

      const defaultDemo = await fs
        .readFile(demoPath, "utf-8")
        .catch(() => null);

      if (defaultDemo) {
        demoContent = defaultDemo
          .replace(/@\/registry\/ui\//g, "@/components/ui/")
          .replace(/@\/registry\/shadcn\//g, "@/components/ui/");
      } else {
        return NextResponse.json(
          {
            error: `Demo for "${componentName}" not found. Provide ?code= parameter.`,
          },
          { status: 404 },
        );
      }
    }

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
