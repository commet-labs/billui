/**
 * Remark plugin that automatically extracts JSX children from <ComponentPreview>
 * and injects them as the `code` prop at build time.
 *
 * Before (in your MDX):
 * <ComponentPreview component="plan-card" example="preview">
 *   <PlanCard>...</PlanCard>
 * </ComponentPreview>
 *
 * After (at build time, code prop is auto-injected):
 * <ComponentPreview component="plan-card" example="preview" code={`<PlanCard>...</PlanCard>`}>
 *   <PlanCard>...</PlanCard>
 * </ComponentPreview>
 */
import type { Root } from "mdast";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

function isComponentPreview(node: unknown): node is MdxJsxFlowElement {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    "name" in node &&
    node.name === "ComponentPreview"
  );
}

function hasCodeProp(node: MdxJsxFlowElement): boolean {
  return (node.attributes || []).some(
    (attr) =>
      attr.type === "mdxJsxAttribute" &&
      attr.name === "code" &&
      attr.value !== null &&
      attr.value !== undefined,
  );
}

function getChildrenSource(
  node: MdxJsxFlowElement,
  fileContent: string,
): string | null {
  if (!node.children || node.children.length === 0) {
    return null;
  }

  // Find the first and last child with position info
  const firstChild = node.children[0];
  const lastChild = node.children[node.children.length - 1];

  if (!firstChild?.position?.start || !lastChild?.position?.end) {
    return null;
  }

  const startOffset = firstChild.position.start.offset;
  const endOffset = lastChild.position.end.offset;

  if (startOffset === undefined || endOffset === undefined) {
    return null;
  }

  const source = fileContent.slice(startOffset, endOffset);
  return source.trim();
}

export function remarkComponentPreview(): Transformer<Root, Root> {
  return (tree: Root, file: VFile) => {
    const fileContent = file.value as string;

    if (!fileContent) {
      return;
    }

    visit(tree, (node) => {
      if (!isComponentPreview(node)) {
        return;
      }

      // Skip if code prop already exists
      if (hasCodeProp(node)) {
        return;
      }

      const childrenSource = getChildrenSource(node, fileContent);

      if (!childrenSource) {
        return;
      }

      // Inject the code prop as a simple string attribute
      // MDX will handle the template literal conversion
      node.attributes = node.attributes || [];

      const codeAttr: MdxJsxAttribute = {
        type: "mdxJsxAttribute",
        name: "code",
        value: {
          type: "mdxJsxAttributeValueExpression",
          value: `\`${childrenSource.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\``,
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "TemplateLiteral",
                    expressions: [],
                    quasis: [
                      {
                        type: "TemplateElement",
                        value: {
                          raw: childrenSource
                            .replace(/\\/g, "\\\\")
                            .replace(/`/g, "\\`")
                            .replace(/\$\{/g, "\\${"),
                          cooked: childrenSource,
                        },
                        tail: true,
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      };

      node.attributes.push(codeAttr);
    });
  };
}

export default remarkComponentPreview;
