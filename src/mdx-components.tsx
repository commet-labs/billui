import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { ComponentPreview } from "@/components/docs/component-preview";
import {
  PlanCard,
  PlanCardAction,
  PlanCardBadge,
  PlanCardDescription,
  PlanCardFeature,
  PlanCardFeatures,
  PlanCardHeader,
  PlanCardPrice,
  PlanCardTitle,
  PlanGroup,
  PlanGroupHeader,
  PlanGroupTitle,
  PlanGroupDescription,
  PlanGroupToggle,
  PlanGroupContent,
  PlanPrice,
} from "@/components/billing";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    TypeTable,
    ComponentPreview,
    PlanCard,
    PlanCardHeader,
    PlanCardBadge,
    PlanCardTitle,
    PlanCardDescription,
    PlanCardPrice,
    PlanCardFeatures,
    PlanCardFeature,
    PlanCardAction,
    PlanGroup,
    PlanGroupHeader,
    PlanGroupTitle,
    PlanGroupDescription,
    PlanGroupToggle,
    PlanGroupContent,
    PlanPrice,
    ...components,
  };
}
