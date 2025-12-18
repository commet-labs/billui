import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/docs/component-preview";
import {
  PaymentMethod,
  PaymentMethodAction,
  PaymentMethodActions,
  PaymentMethodBadge,
  PaymentMethodDetails,
  PaymentMethodExpiry,
  PaymentMethodIcon,
  PaymentMethodNumber,
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
  PlanGroupContent,
  PlanGroupDescription,
  PlanGroupHeader,
  PlanGroupTitle,
  PlanGroupToggle,
  PlanPrice,
} from "@/registry/ui";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    TypeTable,
    ComponentPreview,
    PaymentMethod,
    PaymentMethodIcon,
    PaymentMethodDetails,
    PaymentMethodNumber,
    PaymentMethodExpiry,
    PaymentMethodBadge,
    PaymentMethodActions,
    PaymentMethodAction,
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
