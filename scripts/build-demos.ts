/**
 * Build script for generating static demo block JSONs from MDX files.
 *
 * Extracts ALL <ComponentPreview example="..." code={...}> from each component's MDX
 * and generates static registry:block JSON files.
 *
 * Run with: pnpm build:demos
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import registryJson from "../registry.json";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "docs");
const REGISTRY_DIR = path.join(ROOT, "src", "registry");
const OUTPUT_DIR = path.join(ROOT, "public", "r");

// Build registry from registry.json (single source of truth)
interface RegistryItem {
  name: string;
  description: string;
  folder: "ui" | "animated";
  dependencies?: string[];
  registryDependencies?: string[];
}

const registry: Record<string, RegistryItem> = Object.fromEntries(
  registryJson.items.map((item) => [
    item.name,
    {
      name: item.name,
      description: item.description,
      folder: item.files[0].path.includes("/animated/")
        ? ("animated" as const)
        : ("ui" as const),
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
    },
  ]),
);

// Map component names to their exports for generating imports
const componentExports: Record<string, string[]> = {
  "billing-address": [
    "BillingAddress",
    "BillingAddressInput",
    "BillingAddressCountry",
    "BillingAddressState",
    "billingFieldConfig",
  ],
  "card-input": [
    "CardInputGroup",
    "CardNumberInput",
    "CardExpiryInput",
    "CardCvcInput",
    "CardBrandIcons",
  ],
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
  ],
  "pricing-table": [
    "PricingTable",
    "PricingTableHeader",
    "PricingTablePlan",
    "PricingTablePlanName",
    "PricingTablePrice",
    "PricingTablePlanDescription",
    "PricingTableAction",
    "PricingTableBody",
    "PricingTableRow",
    "PricingTableFeatureCell",
    "PricingTableSpacer",
    "PricingTableCell",
    "PricingTableFeatureLabel",
  ],
};

// Shadcn components that might be used in example code
const shadcnComponents: Record<string, string> = {
  Label: "label",
  Button: "button",
  Input: "input",
  Badge: "badge",
};

function generateDemoPage(componentName: string, exampleCode: string): string {
  const exports = componentExports[componentName] || [];

  // Detect shadcn components used in the example code
  const shadcnImports: string[] = [];
  for (const [component, file] of Object.entries(shadcnComponents)) {
    if (exampleCode.includes(`<${component}`)) {
      shadcnImports.push(
        `import { ${component} } from "@/components/ui/${file}";`,
      );
    }
  }

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

  // Combine shadcn imports with component imports
  const allImports = [...shadcnImports, importStatement].join("\n");

  return `${allImports}

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      ${exampleCode}
    </div>
  );
}
`;
}

interface ExtractedExample {
  example: string;
  code: string;
}

function extractAllExamplesFromMdx(
  content: string,
  componentName: string,
): ExtractedExample[] {
  const examples: ExtractedExample[] = [];

  // Match <ComponentPreview component="X" example="Y" ... code={`...`}>
  // Handles various attribute orderings
  const regex = /<ComponentPreview[^>]*>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const tag = match[0];

    // Check if this is for our component
    const componentMatch = tag.match(/component=["']([^"']+)["']/);
    if (!componentMatch || componentMatch[1] !== componentName) continue;

    // Extract example prop
    const exampleMatch = tag.match(/example=["']([^"']+)["']/);
    if (!exampleMatch) continue;

    const exampleId = exampleMatch[1];

    // Find the code prop - need to look after the tag start
    const startPos = match.index;
    const codeMatch = content.slice(startPos).match(/code=\{\`([\s\S]*?)\`\}/);
    if (!codeMatch) continue;

    examples.push({
      example: exampleId,
      code: codeMatch[1].trim(),
    });
  }

  return examples;
}

async function findMdxFile(componentName: string): Promise<string | null> {
  // Check components folder
  const componentsPath = path.join(
    CONTENT_DIR,
    "components",
    `${componentName}.mdx`,
  );
  try {
    await fs.access(componentsPath);
    return componentsPath;
  } catch {}

  // Check animated folder
  const animatedPath = path.join(
    CONTENT_DIR,
    "animated",
    `${componentName}.mdx`,
  );
  try {
    await fs.access(animatedPath);
    return animatedPath;
  } catch {}

  return null;
}

async function buildComponentsBundle() {
  console.log("📦 Building components bundle (ui + lib only)...\n");

  const files: Array<{
    path: string;
    content: string;
    type: string;
    target: string;
  }> = [];

  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  // Only include registry:ui and registry:lib items (not blocks)
  const items = registryJson.items.filter(
    (item) => item.type === "registry:ui" || item.type === "registry:lib",
  );

  for (const item of items) {
    if (item.dependencies) {
      for (const dep of item.dependencies) {
        dependencies.add(dep);
      }
    }
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        // Skip billui dependencies (they're included directly)
        if (!dep.includes("billui.com")) {
          registryDependencies.add(dep);
        }
      }
    }

    for (const file of item.files) {
      const filePath = path.join(ROOT, file.path);
      try {
        const content = await fs.readFile(filePath, "utf-8");
        files.push({
          path: file.path,
          content,
          type: file.type,
          target: file.target,
        });
      } catch {
        console.log(`  ⚠ Could not read ${file.path}`);
      }
    }
  }

  const bundle = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "billui",
    type: "registry:block",
    description:
      "All BillUI components and utilities for billing UIs: address forms, card inputs, payment methods, plans, invoices, usage cards, and pricing tables.",
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
    files,
    categories: ["billing"],
  };

  const outputPath = path.join(OUTPUT_DIR, "billui-all.json");
  await fs.writeFile(outputPath, JSON.stringify(bundle, null, 2));
  console.log(`  ✓ billui-all.json (${files.length} files)\n`);
}

async function buildDemos() {
  console.log("🔨 Building demo blocks...\n");

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Build components bundle first
  await buildComponentsBundle();

  let totalDemos = 0;

  for (const [componentName, item] of Object.entries(registry)) {
    // Find the MDX file
    const mdxPath = await findMdxFile(componentName);
    if (!mdxPath) {
      console.log(`  ⚠ ${componentName}: MDX not found, skipping`);
      continue;
    }

    // Read MDX content
    const mdxContent = await fs.readFile(mdxPath, "utf-8");

    // Extract ALL examples with example prop
    const examples = extractAllExamplesFromMdx(mdxContent, componentName);
    if (examples.length === 0) {
      console.log(
        `  ⚠ ${componentName}: No examples with 'example' prop found, skipping`,
      );
      continue;
    }

    // Read the component source
    const folder = item.folder ?? "ui";
    const componentPath = path.join(
      REGISTRY_DIR,
      folder,
      `${componentName}.tsx`,
    );

    let componentContent: string;
    try {
      componentContent = await fs.readFile(componentPath, "utf-8");
    } catch {
      console.log(`  ⚠ ${componentName}: Component file not found, skipping`);
      continue;
    }

    // Generate a demo for each example
    for (const ex of examples) {
      const demoContent = generateDemoPage(componentName, ex.code);

      const registryBlock = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: `${componentName}-demo-${ex.example}`,
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

      // Write the JSON file
      const outputPath = path.join(
        OUTPUT_DIR,
        `${componentName}-demo-${ex.example}.json`,
      );
      await fs.writeFile(outputPath, JSON.stringify(registryBlock, null, 2));
      totalDemos++;
    }

    console.log(`  ✓ ${componentName}: ${examples.length} demo(s)`);
  }

  console.log(`\n✅ Built ${totalDemos} demo blocks successfully!`);
}

buildDemos().catch(console.error);
