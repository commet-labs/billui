import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import {
  PricingCard,
  PricingCardAction,
  PricingCardBadge,
  PricingCardDescription,
  PricingCardFeature,
  PricingCardFeatures,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardTitle,
} from "@/components/billing";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    TypeTable,
    PricingCard,
    PricingCardHeader,
    PricingCardBadge,
    PricingCardTitle,
    PricingCardDescription,
    PricingCardPrice,
    PricingCardFeatures,
    PricingCardFeature,
    PricingCardAction,
    ...components,
  };
}
