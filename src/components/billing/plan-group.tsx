"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { PlanCardPrice } from "./plan-card";

const planGroupVariants = cva("w-full", {
  variants: {
    layout: {
      horizontal: "grid gap-6",
      vertical: "flex flex-col gap-6",
    },
    columns: {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    },
  },
  defaultVariants: {
    layout: "horizontal",
    columns: 3,
  },
});

type BillingPeriod = "month" | "year";

interface PlanGroupContextValue {
  period: BillingPeriod;
  setPeriod: (period: BillingPeriod) => void;
}

const PlanGroupContext = React.createContext<PlanGroupContextValue | null>(
  null,
);

function usePlanGroup() {
  const context = React.useContext(PlanGroupContext);
  if (!context) {
    throw new Error("usePlanGroup must be used within a PlanGroup");
  }
  return context;
}

interface PlanGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof planGroupVariants> {
  defaultPeriod?: BillingPeriod;
  onPeriodChange?: (period: BillingPeriod) => void;
}

const PlanGroup = React.forwardRef<HTMLDivElement, PlanGroupProps>(
  (
    {
      className,
      layout,
      columns,
      defaultPeriod = "month",
      onPeriodChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [period, setPeriodState] =
      React.useState<BillingPeriod>(defaultPeriod);

    const setPeriod = React.useCallback(
      (newPeriod: BillingPeriod) => {
        setPeriodState(newPeriod);
        onPeriodChange?.(newPeriod);
      },
      [onPeriodChange],
    );

    return (
      <PlanGroupContext.Provider value={{ period, setPeriod }}>
        <div ref={ref} className={cn("space-y-8", className)} {...props}>
          {children}
        </div>
      </PlanGroupContext.Provider>
    );
  },
);
PlanGroup.displayName = "PlanGroup";

const PlanGroupHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center gap-4 text-center", className)}
    {...props}
  />
));
PlanGroupHeader.displayName = "PlanGroupHeader";

const PlanGroupTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-3xl font-bold tracking-tight", className)}
    {...props}
  />
));
PlanGroupTitle.displayName = "PlanGroupTitle";

const PlanGroupDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("block text-muted-foreground max-w-2xl", className)}
    {...props}
  />
));
PlanGroupDescription.displayName = "PlanGroupDescription";

interface PlanGroupToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  monthLabel?: string;
  yearLabel?: string;
  yearDiscount?: string;
}

const PlanGroupToggle = React.forwardRef<HTMLDivElement, PlanGroupToggleProps>(
  (
    {
      className,
      monthLabel = "Monthly",
      yearLabel = "Yearly",
      yearDiscount,
      ...props
    },
    ref,
  ) => {
    const { period, setPeriod } = usePlanGroup();

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border bg-muted p-1",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setPeriod("month")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            period === "month"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {monthLabel}
        </button>
        <button
          type="button"
          onClick={() => setPeriod("year")}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
            period === "year"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {yearLabel}
          {yearDiscount && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {yearDiscount}
            </span>
          )}
        </button>
      </div>
    );
  },
);
PlanGroupToggle.displayName = "PlanGroupToggle";

interface PlanGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof planGroupVariants> {}

const PlanGroupContent = React.forwardRef<
  HTMLDivElement,
  PlanGroupContentProps
>(({ className, layout, columns, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      planGroupVariants({ layout, columns }),
      "items-stretch",
      className,
    )}
    {...props}
  />
));
PlanGroupContent.displayName = "PlanGroupContent";

interface PlanPriceProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof PlanCardPrice>,
    "amount" | "originalAmount" | "period"
  > {
  monthlyAmount: number;
  yearlyAmount: number;
  originalMonthlyAmount?: number;
  originalYearlyAmount?: number;
}

const PlanPrice = React.forwardRef<HTMLDivElement, PlanPriceProps>(
  (
    {
      monthlyAmount,
      yearlyAmount,
      originalMonthlyAmount,
      originalYearlyAmount,
      ...props
    },
    ref,
  ) => {
    const { period } = usePlanGroup();

    const amount = period === "month" ? monthlyAmount : yearlyAmount;
    const originalAmount =
      period === "month" ? originalMonthlyAmount : originalYearlyAmount;

    return (
      <PlanCardPrice
        ref={ref}
        amount={amount}
        originalAmount={originalAmount}
        period={period}
        {...props}
      />
    );
  },
);
PlanPrice.displayName = "PlanPrice";

export {
  PlanGroup,
  PlanGroupHeader,
  PlanGroupTitle,
  PlanGroupDescription,
  PlanGroupToggle,
  PlanGroupContent,
  PlanPrice,
  usePlanGroup,
  planGroupVariants,
};

export type {
  PlanGroupProps,
  PlanGroupToggleProps,
  PlanGroupContentProps,
  PlanPriceProps,
  BillingPeriod,
};
