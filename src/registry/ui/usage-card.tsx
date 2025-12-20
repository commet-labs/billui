"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const usageCardVariants = cva(
  "relative min-w-[280px] rounded-2xl border bg-card text-card-foreground",
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

interface UsageCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof usageCardVariants> {}

const UsageCard = React.forwardRef<HTMLDivElement, UsageCardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(usageCardVariants({ variant, className }))}
      {...props}
    />
  ),
);
UsageCard.displayName = "UsageCard";

interface UsageCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const UsageCardHeader = React.forwardRef<HTMLDivElement, UsageCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 p-4 pb-0",
        className,
      )}
      {...props}
    />
  ),
);
UsageCardHeader.displayName = "UsageCardHeader";

interface UsageCardPeriodProps extends React.HTMLAttributes<HTMLSpanElement> {
  daysRemaining?: number;
}

const UsageCardPeriod = React.forwardRef<HTMLSpanElement, UsageCardPeriodProps>(
  ({ className, daysRemaining, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children ??
        (daysRemaining !== undefined &&
          `${daysRemaining} days remaining in cycle`)}
    </span>
  ),
);
UsageCardPeriod.displayName = "UsageCardPeriod";

interface UsageCardActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const UsageCardAction = React.forwardRef<
  HTMLButtonElement,
  UsageCardActionProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="sm"
    className={cn("rounded-full", className)}
    {...props}
  />
));
UsageCardAction.displayName = "UsageCardAction";

interface UsageCardSummaryProps extends React.HTMLAttributes<HTMLDivElement> {}

const UsageCardSummary = React.forwardRef<
  HTMLDivElement,
  UsageCardSummaryProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 space-y-3", className)} {...props} />
));
UsageCardSummary.displayName = "UsageCardSummary";

interface UsageCardLabelsProps extends React.HTMLAttributes<HTMLDivElement> {}

const UsageCardLabels = React.forwardRef<HTMLDivElement, UsageCardLabelsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    />
  ),
);
UsageCardLabels.displayName = "UsageCardLabels";

interface UsageCardLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  amount: number;
  limit?: number;
  currency?: string;
  align?: "left" | "right";
}

const UsageCardLabel = React.forwardRef<HTMLDivElement, UsageCardLabelProps>(
  (
    {
      className,
      label,
      amount,
      limit,
      currency = "$",
      align = "left",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-0.5",
        align === "right" && "items-end",
        className,
      )}
      {...props}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium tabular-nums">
        {currency}
        {amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        {limit !== undefined && (
          <span className="text-muted-foreground">
            {" / "}
            {currency}
            {limit.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        )}
      </span>
    </div>
  ),
);
UsageCardLabel.displayName = "UsageCardLabel";

interface UsageCardProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Progress>, "value"> {
  value: number;
  max?: number;
  showOverage?: boolean;
}

const UsageCardProgress = React.forwardRef<
  React.ComponentRef<typeof Progress>,
  UsageCardProgressProps
>(({ className, value, max = 100, showOverage = false, ...props }, ref) => {
  const percentage = Math.min((value / max) * 100, 100);
  const isOverage = value > max;

  return (
    <Progress
      ref={ref}
      value={percentage}
      className={cn(
        "h-2 bg-muted",
        isOverage && "*:data-[slot=progress-indicator]:bg-destructive",
        className,
      )}
      {...props}
    />
  );
});
UsageCardProgress.displayName = "UsageCardProgress";

interface UsageCardListContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  itemCount: number;
  collapsedHeight: number;
  expandedHeight: number;
}

const UsageCardListContext =
  React.createContext<UsageCardListContextValue | null>(null);

function useUsageCardList() {
  const context = React.useContext(UsageCardListContext);
  if (!context) {
    throw new Error("useUsageCardList must be used within UsageCardList");
  }
  return context;
}

const ITEM_HEIGHT = 44;

interface UsageCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  /** Number of items to show when collapsed (can be decimal like 1.5 to show partial item) */
  visibleItems?: number;
  /** Enable collapse/expand functionality */
  collapsible?: boolean;
  /** Show dividers between items */
  dividers?: boolean;
}

const UsageCardList = React.forwardRef<HTMLDivElement, UsageCardListProps>(
  (
    {
      className,
      defaultExpanded = false,
      visibleItems = 1.5,
      collapsible = false,
      dividers = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const childrenArray = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child),
    );
    const itemCount = childrenArray.length;

    const collapsedHeight = visibleItems * ITEM_HEIGHT;
    const expandedHeight = itemCount * ITEM_HEIGHT;

    return (
      <UsageCardListContext.Provider
        value={{
          expanded,
          setExpanded,
          itemCount,
          collapsedHeight,
          expandedHeight,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", collapsible && "pb-4", className)}
          {...props}
        >
          {/* Content container */}
          <div
            className={cn(
              "overflow-hidden transition-[max-height] duration-300 ease-out",
              dividers && "divide-y divide-border",
            )}
            style={{
              maxHeight:
                collapsible && !expanded
                  ? `${collapsedHeight}px`
                  : `${expandedHeight}px`,
            }}
          >
            {childrenArray}
          </div>

          {/* Fade overlay when collapsed */}
          {collapsible && (
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-4 bg-linear-to-t from-card via-card/80 to-transparent transition-opacity duration-300",
                expanded ? "opacity-0" : "opacity-100",
              )}
              style={{ height: `${collapsedHeight * 0.6}px` }}
            />
          )}

          {/* Toggle button - centered on bottom border */}
          {collapsible && itemCount > 1 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </UsageCardListContext.Provider>
    );
  },
);
UsageCardList.displayName = "UsageCardList";

interface UsageCardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

const UsageCardItem = React.forwardRef<HTMLDivElement, UsageCardItemProps>(
  ({ className, highlighted = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-4 px-4 py-3 transition-colors",
          highlighted && "bg-muted/50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
UsageCardItem.displayName = "UsageCardItem";

interface UsageCardItemLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const UsageCardItemLabel = React.forwardRef<
  HTMLSpanElement,
  UsageCardItemLabelProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm text-foreground truncate", className)}
    {...props}
  />
));
UsageCardItemLabel.displayName = "UsageCardItemLabel";

interface UsageCardItemValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  amount?: number;
  currency?: string;
  unit?: string;
}

const UsageCardItemValue = React.forwardRef<
  HTMLSpanElement,
  UsageCardItemValueProps
>(({ className, amount, currency = "$", unit, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-sm font-medium tabular-nums text-muted-foreground shrink-0",
      className,
    )}
    {...props}
  >
    {children ??
      (amount !== undefined ? (
        <>
          {currency}
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {unit && <span className="text-xs ml-0.5">{unit}</span>}
        </>
      ) : null)}
  </span>
));
UsageCardItemValue.displayName = "UsageCardItemValue";

// Metric bar for showing usage with visual indicator
interface UsageCardMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  used: number;
  limit: number;
  label: string;
  unit?: string;
  showPercentage?: boolean;
}

const UsageCardMeter = React.forwardRef<HTMLDivElement, UsageCardMeterProps>(
  (
    { className, used, limit, label, unit, showPercentage = false, ...props },
    ref,
  ) => {
    const percentage = Math.min((used / limit) * 100, 100);
    const isWarning = percentage >= 80;
    const isCritical = percentage >= 95;

    return (
      <div
        ref={ref}
        className={cn("px-4 py-3 space-y-2", className)}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-foreground">{label}</span>
          <span className="text-sm tabular-nums text-muted-foreground">
            {used.toLocaleString()}
            {unit && ` ${unit}`}
            <span className="text-muted-foreground/60">
              {" "}
              / {limit.toLocaleString()}
              {unit && ` ${unit}`}
            </span>
            {showPercentage && (
              <span
                className={cn(
                  "ml-2",
                  isCritical
                    ? "text-destructive"
                    : isWarning
                      ? "text-amber-500"
                      : "text-muted-foreground",
                )}
              >
                ({percentage.toFixed(0)}%)
              </span>
            )}
          </span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              isCritical
                ? "bg-destructive"
                : isWarning
                  ? "bg-amber-500"
                  : "bg-primary",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  },
);
UsageCardMeter.displayName = "UsageCardMeter";

// Total row for the bottom
interface UsageCardTotalProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  amount: number;
  currency?: string;
}

const UsageCardTotal = React.forwardRef<HTMLDivElement, UsageCardTotalProps>(
  ({ className, label = "Total", amount, currency = "$", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3 bg-muted/30 border-t border-border",
        className,
      )}
      {...props}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums">
        {currency}
        {amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  ),
);
UsageCardTotal.displayName = "UsageCardTotal";

export {
  UsageCard,
  UsageCardHeader,
  UsageCardPeriod,
  UsageCardAction,
  UsageCardSummary,
  UsageCardLabels,
  UsageCardLabel,
  UsageCardProgress,
  UsageCardList,
  UsageCardItem,
  UsageCardItemLabel,
  UsageCardItemValue,
  UsageCardMeter,
  UsageCardTotal,
  usageCardVariants,
  useUsageCardList,
};

export type {
  UsageCardProps,
  UsageCardHeaderProps,
  UsageCardPeriodProps,
  UsageCardActionProps,
  UsageCardSummaryProps,
  UsageCardLabelsProps,
  UsageCardLabelProps,
  UsageCardProgressProps,
  UsageCardListProps,
  UsageCardItemProps,
  UsageCardItemLabelProps,
  UsageCardItemValueProps,
  UsageCardMeterProps,
  UsageCardTotalProps,
  UsageCardListContextValue,
};
