import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
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
} from "@/components/billing/pricing-card";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
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
