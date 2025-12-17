"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";

const pricingCardVariants = cva(
  "relative flex flex-col rounded-2xl border bg-fd-card text-fd-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-fd-border",
        highlighted:
          "border-fd-primary shadow-lg shadow-fd-primary/10 ring-1 ring-fd-primary",
        compact: "border-fd-border p-4",
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

const pricingCardBadgeVariants = cva(
  "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-fd-primary text-fd-primary-foreground",
        secondary: "bg-fd-secondary text-fd-secondary-foreground",
        outline: "border border-fd-primary text-fd-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PricingCardBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pricingCardBadgeVariants> {}

const PricingCardBadge = React.forwardRef<
  HTMLSpanElement,
  PricingCardBadgeProps
>(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(pricingCardBadgeVariants({ variant, className }))}
    {...props}
  />
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
    className={cn("text-sm text-fd-muted-foreground", className)}
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
          <span className="text-lg text-fd-muted-foreground line-through">
            {currency}
            {originalAmount}
          </span>
        )}
        <span className="text-4xl font-bold tracking-tight">
          {currency}
          {amount}
        </span>
        {period !== "once" && (
          <span className="text-fd-muted-foreground">
            {periodLabel[period]}
          </span>
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
      !included && "text-fd-muted-foreground",
      className,
    )}
    {...props}
  >
    {included ? (
      <Check className="h-4 w-4 shrink-0 text-fd-primary" />
    ) : (
      <X className="h-4 w-4 shrink-0 text-fd-muted-foreground" />
    )}
    <span>{children}</span>
  </li>
));
PricingCardFeature.displayName = "PricingCardFeature";

const pricingCardActionVariants = cva(
  "mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90",
        outline:
          "border border-fd-border bg-fd-background hover:bg-fd-accent hover:text-fd-accent-foreground",
        secondary:
          "bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PricingCardActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pricingCardActionVariants> {
  asChild?: boolean;
}

const PricingCardAction = React.forwardRef<
  HTMLButtonElement,
  PricingCardActionProps
>(({ className, variant, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(pricingCardActionVariants({ variant, className }))}
    {...props}
  />
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
  pricingCardBadgeVariants,
  pricingCardActionVariants,
};

export type {
  PricingCardProps,
  PricingCardBadgeProps,
  PricingCardPriceProps,
  PricingCardFeatureProps,
  PricingCardActionProps,
};
