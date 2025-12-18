import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/shadcn/badge";
import { Button } from "@/registry/shadcn/button";

const planCardVariants = cva(
  "relative rounded-2xl border bg-card text-card-foreground transition-all duration-200",
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
      layout: {
        vertical: "flex flex-col min-w-[280px]",
        horizontal: "flex flex-row items-center gap-6 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      layout: "vertical",
    },
  },
);

interface PlanCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof planCardVariants> {}

const PlanCard = React.forwardRef<HTMLDivElement, PlanCardProps>(
  ({ className, variant, size, layout, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(planCardVariants({ variant, size, layout, className }))}
      {...props}
    />
  ),
);
PlanCard.displayName = "PlanCard";

const PlanCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
PlanCardHeader.displayName = "PlanCardHeader";

interface PlanCardBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {}

const PlanCardBadge = React.forwardRef<HTMLDivElement, PlanCardBadgeProps>(
  ({ className, ...props }, ref) => (
    <Badge ref={ref} className={cn("w-fit", className)} {...props} />
  ),
);
PlanCardBadge.displayName = "PlanCardBadge";

const PlanCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  />
));
PlanCardTitle.displayName = "PlanCardTitle";

const PlanCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PlanCardDescription.displayName = "PlanCardDescription";

interface PlanCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  currency?: string;
  period?: "month" | "year" | "once";
  originalAmount?: number;
}

const PlanCardPrice = React.forwardRef<HTMLDivElement, PlanCardPriceProps>(
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
PlanCardPrice.displayName = "PlanCardPrice";

const PlanCardFeatures = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-3 text-sm", className)}
    {...props}
  />
));
PlanCardFeatures.displayName = "PlanCardFeatures";

interface PlanCardFeatureProps extends React.HTMLAttributes<HTMLLIElement> {
  included?: boolean;
}

const PlanCardFeature = React.forwardRef<HTMLLIElement, PlanCardFeatureProps>(
  ({ className, included = true, children, ...props }, ref) => (
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
  ),
);
PlanCardFeature.displayName = "PlanCardFeature";

interface PlanCardActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const PlanCardAction = React.forwardRef<HTMLButtonElement, PlanCardActionProps>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} className={cn("mt-6 w-full", className)} {...props} />
  ),
);
PlanCardAction.displayName = "PlanCardAction";

export {
  PlanCard,
  PlanCardHeader,
  PlanCardBadge,
  PlanCardTitle,
  PlanCardDescription,
  PlanCardPrice,
  PlanCardFeatures,
  PlanCardFeature,
  PlanCardAction,
  planCardVariants,
};

export type {
  PlanCardProps,
  PlanCardBadgeProps,
  PlanCardPriceProps,
  PlanCardFeatureProps,
  PlanCardActionProps,
};
