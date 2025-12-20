import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus, X } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingTableVariants = cva(
  "relative w-full overflow-hidden rounded-2xl border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-border shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingTableVariants> {}

const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pricingTableVariants({ variant, className }))}
      {...props}
    />
  ),
);
PricingTable.displayName = "PricingTable";

interface PricingTableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 3 | 4 | 5;
}

const PricingTableHeader = React.forwardRef<
  HTMLDivElement,
  PricingTableHeaderProps
>(({ className, columns = 4, ...props }, ref) => {
  const colsClass = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };
  return (
    <div
      ref={ref}
      className={cn("grid border-b bg-muted/30", colsClass[columns], className)}
      {...props}
    />
  );
});
PricingTableHeader.displayName = "PricingTableHeader";

interface PricingTablePlanProps extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

const PricingTablePlan = React.forwardRef<
  HTMLDivElement,
  PricingTablePlanProps
>(({ className, highlighted, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center gap-1 p-6 text-center",
      highlighted && "bg-primary/5 ring-2 ring-inset ring-primary",
      className,
    )}
    {...props}
  />
));
PricingTablePlan.displayName = "PricingTablePlan";

interface PricingTableBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {}

const PricingTableBadge = React.forwardRef<
  HTMLDivElement,
  PricingTableBadgeProps
>(({ className, ...props }, ref) => (
  <Badge ref={ref} className={cn("mb-2", className)} {...props} />
));
PricingTableBadge.displayName = "PricingTableBadge";

const PricingTablePlanName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
));
PricingTablePlanName.displayName = "PricingTablePlanName";

interface PricingTablePriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  currency?: string;
  period?: "month" | "year" | "once";
}

const PricingTablePrice = React.forwardRef<
  HTMLDivElement,
  PricingTablePriceProps
>(({ className, amount, currency = "$", period = "month", ...props }, ref) => {
  const periodLabel = {
    month: "/mo",
    year: "/yr",
    once: "",
  };

  return (
    <div
      ref={ref}
      className={cn("mt-2 flex items-baseline gap-0.5", className)}
      {...props}
    >
      <span className="text-3xl font-bold tracking-tight">
        {currency}
        {amount}
      </span>
      {period !== "once" && (
        <span className="text-sm text-muted-foreground">
          {periodLabel[period]}
        </span>
      )}
    </div>
  );
});
PricingTablePrice.displayName = "PricingTablePrice";

const PricingTablePlanDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
));
PricingTablePlanDescription.displayName = "PricingTablePlanDescription";

interface PricingTableActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const PricingTableAction = React.forwardRef<
  HTMLButtonElement,
  PricingTableActionProps
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn("mt-4 w-full", className)} {...props} />
));
PricingTableAction.displayName = "PricingTableAction";

const PricingTableBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("divide-y", className)} {...props} />
));
PricingTableBody.displayName = "PricingTableBody";

interface PricingTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 3 | 4 | 5;
}

const PricingTableRow = React.forwardRef<HTMLDivElement, PricingTableRowProps>(
  ({ className, columns = 4, ...props }, ref) => {
    const colsClass = {
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
    };
    return (
      <div
        ref={ref}
        className={cn("grid items-stretch", colsClass[columns], className)}
        {...props}
      />
    );
  },
);
PricingTableRow.displayName = "PricingTableRow";

const PricingTableFeatureCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center self-stretch px-6 py-4 text-sm font-medium",
      className,
    )}
    {...props}
  />
));
PricingTableFeatureCell.displayName = "PricingTableFeatureCell";

/** Empty spacer cell for the header's first column */
const PricingTableSpacer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
PricingTableSpacer.displayName = "PricingTableSpacer";

type CellValue = boolean | string | "partial";

interface PricingTableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  value: CellValue;
  highlighted?: boolean;
}

const PricingTableCell = React.forwardRef<
  HTMLDivElement,
  PricingTableCellProps
>(({ className, value, highlighted, ...props }, ref) => {
  const renderValue = () => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground/50" />
      );
    }
    if (value === "partial") {
      return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center self-stretch px-6 py-4",
        highlighted && "bg-primary/5",
        className,
      )}
      {...props}
    >
      {renderValue()}
    </div>
  );
});
PricingTableCell.displayName = "PricingTableCell";

const PricingTableFeatureLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/50",
      className,
    )}
    {...props}
  />
));
PricingTableFeatureLabel.displayName = "PricingTableFeatureLabel";

export {
  PricingTable,
  PricingTableHeader,
  PricingTablePlan,
  PricingTableBadge,
  PricingTablePlanName,
  PricingTablePrice,
  PricingTablePlanDescription,
  PricingTableAction,
  PricingTableBody,
  PricingTableRow,
  PricingTableFeatureCell,
  PricingTableSpacer,
  PricingTableCell,
  PricingTableFeatureLabel,
  pricingTableVariants,
};

export type {
  PricingTableProps,
  PricingTableHeaderProps,
  PricingTablePlanProps,
  PricingTableBadgeProps,
  PricingTablePriceProps,
  PricingTableActionProps,
  PricingTableRowProps,
  PricingTableCellProps,
  CellValue,
};
