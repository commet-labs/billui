"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/shadcn/badge";
import { Button } from "@/registry/shadcn/button";

const pricingCardVariants = cva(
  "relative flex flex-col rounded-2xl border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border",
        highlighted:
          "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary",
        compact: "border-border p-4",
      },
      size: {
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingCardVariants> {}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pricingCardVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
PricingCard.displayName = "PricingCard";

const PricingCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
PricingCardHeader.displayName = "PricingCardHeader";

interface PricingCardBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {}

const PricingCardBadge = React.forwardRef<
  HTMLDivElement,
  PricingCardBadgeProps
>(({ className, ...props }, ref) => (
  <Badge ref={ref} className={cn("w-fit", className)} {...props} />
));
PricingCardBadge.displayName = "PricingCardBadge";

const PricingCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  />
));
PricingCardTitle.displayName = "PricingCardTitle";

const PricingCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PricingCardDescription.displayName = "PricingCardDescription";

interface PricingCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  currency?: string;
  period?: "month" | "year" | "once";
  originalAmount?: number;
}

const PricingCardPrice = React.forwardRef<
  HTMLDivElement,
  PricingCardPriceProps
>(
  (
    {
      className,
      amount,
      currency = "$",
      period = "month",
      originalAmount,
      ...props
    },
    ref,
  ) => {
    const periodLabel = {
      month: "/mo",
      year: "/yr",
      once: "",
    };

    return (
      <div
        ref={ref}
        className={cn("my-6 flex items-baseline gap-1", className)}
        {...props}
      >
        {originalAmount && (
          <span className="text-lg text-muted-foreground line-through">
            {currency}
            {originalAmount}
          </span>
        )}
        <span className="text-4xl font-bold tracking-tight">
          {currency}
          {amount}
        </span>
        {period !== "once" && (
          <span className="text-muted-foreground">{periodLabel[period]}</span>
        )}
      </div>
    );
  },
);
PricingCardPrice.displayName = "PricingCardPrice";

const PricingCardFeatures = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-3 text-sm", className)}
    {...props}
  />
));
PricingCardFeatures.displayName = "PricingCardFeatures";

interface PricingCardFeatureProps extends React.HTMLAttributes<HTMLLIElement> {
  included?: boolean;
}

const PricingCardFeature = React.forwardRef<
  HTMLLIElement,
  PricingCardFeatureProps
>(({ className, included = true, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex items-center gap-3",
      !included && "text-muted-foreground",
      className,
    )}
    {...props}
  >
    {included ? (
      <Check className="h-4 w-4 shrink-0 text-primary" />
    ) : (
      <X className="h-4 w-4 shrink-0 text-muted-foreground" />
    )}
    <span>{children}</span>
  </li>
));
PricingCardFeature.displayName = "PricingCardFeature";

interface PricingCardActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const PricingCardAction = React.forwardRef<
  HTMLButtonElement,
  PricingCardActionProps
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn("mt-6 w-full", className)} {...props} />
));
PricingCardAction.displayName = "PricingCardAction";

export {
  PricingCard,
  PricingCardHeader,
  PricingCardBadge,
  PricingCardTitle,
  PricingCardDescription,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardAction,
  pricingCardVariants,
};

export type {
  PricingCardProps,
  PricingCardBadgeProps,
  PricingCardPriceProps,
  PricingCardFeatureProps,
  PricingCardActionProps,
};
