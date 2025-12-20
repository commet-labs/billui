"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const animatedUsageCardVariants = cva(
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

interface AnimatedUsageCardProps
  extends VariantProps<typeof animatedUsageCardVariants> {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedUsageCard = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardProps
>(({ className, variant, children }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      type: "spring",
      bounce: 0.3,
      duration: 0.6,
    }}
    className={cn(animatedUsageCardVariants({ variant, className }))}
  >
    {children}
  </motion.div>
));
AnimatedUsageCard.displayName = "AnimatedUsageCard";

interface AnimatedUsageCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedUsageCardHeader = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-4 p-4 pb-0",
      className,
    )}
    {...props}
  />
));
AnimatedUsageCardHeader.displayName = "AnimatedUsageCardHeader";

interface AnimatedUsageCardPeriodProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  daysRemaining?: number;
}

const AnimatedUsageCardPeriod = React.forwardRef<
  HTMLSpanElement,
  AnimatedUsageCardPeriodProps
>(({ className, daysRemaining, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  >
    {children ??
      (daysRemaining !== undefined &&
        `${daysRemaining} days remaining in cycle`)}
  </span>
));
AnimatedUsageCardPeriod.displayName = "AnimatedUsageCardPeriod";

interface AnimatedUsageCardActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const AnimatedUsageCardAction = React.forwardRef<
  HTMLButtonElement,
  AnimatedUsageCardActionProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="sm"
    className={cn("rounded-full", className)}
    {...props}
  />
));
AnimatedUsageCardAction.displayName = "AnimatedUsageCardAction";

interface AnimatedUsageCardSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedUsageCardSummary = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardSummaryProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 space-y-3", className)} {...props} />
));
AnimatedUsageCardSummary.displayName = "AnimatedUsageCardSummary";

interface AnimatedUsageCardLabelsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedUsageCardLabels = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardLabelsProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start justify-between gap-4", className)}
    {...props}
  />
));
AnimatedUsageCardLabels.displayName = "AnimatedUsageCardLabels";

interface AnimatedUsageCardLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  amount: number;
  limit?: number;
  currency?: string;
  align?: "left" | "right";
}

const AnimatedUsageCardLabel = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardLabelProps
>(
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
AnimatedUsageCardLabel.displayName = "AnimatedUsageCardLabel";

interface AnimatedUsageCardProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showOverage?: boolean;
}

const AnimatedUsageCardProgress = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardProgressProps
>(({ className, value, max = 100, showOverage = false, ...props }, ref) => {
  const percentage = Math.min((value / max) * 100, 100);
  const isOverage = value > max;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  });
  const width = useTransform(springValue, (v) => `${v}%`);

  React.useEffect(() => {
    motionValue.set(percentage);
  }, [percentage, motionValue]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <motion.div
        className={cn(
          "h-full rounded-full",
          isOverage ? "bg-destructive" : "bg-primary",
        )}
        style={{ width }}
      />
    </div>
  );
});
AnimatedUsageCardProgress.displayName = "AnimatedUsageCardProgress";

interface AnimatedUsageCardListContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  itemCount: number;
  collapsedHeight: number;
  expandedHeight: number;
}

const AnimatedUsageCardListContext =
  React.createContext<AnimatedUsageCardListContextValue | null>(null);

function useAnimatedUsageCardList() {
  const context = React.useContext(AnimatedUsageCardListContext);
  if (!context) {
    throw new Error(
      "useAnimatedUsageCardList must be used within AnimatedUsageCardList",
    );
  }
  return context;
}

const ITEM_HEIGHT = 44;

interface AnimatedUsageCardListProps {
  className?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  /** Number of items to show when collapsed (can be decimal like 1.5 to show partial item) */
  visibleItems?: number;
  /** Enable collapse/expand functionality */
  collapsible?: boolean;
  /** Show dividers between items */
  dividers?: boolean;
}

const AnimatedUsageCardList = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardListProps
>(
  (
    {
      className,
      defaultExpanded = false,
      visibleItems = 1.5,
      collapsible = false,
      dividers = true,
      children,
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const childrenArray = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child),
    );
    const itemCount = childrenArray.length;

    const bounceTransition = {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 1,
    };

    const collapsedHeight = visibleItems * ITEM_HEIGHT;
    const expandedHeight = itemCount * ITEM_HEIGHT;

    return (
      <AnimatedUsageCardListContext.Provider
        value={{
          expanded,
          setExpanded,
          itemCount,
          collapsedHeight,
          expandedHeight,
        }}
      >
        <motion.div
          ref={ref}
          className={cn("relative", collapsible && "pb-2", className)}
          layout
          transition={bounceTransition}
        >
          <motion.div
            className={cn(
              "overflow-hidden",
              dividers && "divide-y divide-border",
            )}
            initial={false}
            animate={{
              height:
                collapsible && !expanded ? collapsedHeight : expandedHeight,
            }}
            transition={bounceTransition}
          >
            {childrenArray}
          </motion.div>

          {collapsible && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-2 bg-linear-to-t from-card via-card/60 to-transparent"
              style={{ height: `${collapsedHeight * 0.6}px` }}
              initial={false}
              animate={{
                opacity: expanded ? 0 : 1,
              }}
              transition={{
                duration: 0.25,
              }}
            />
          )}

          {collapsible && itemCount > 1 && (
            <motion.button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              layout
            >
              <motion.div
                initial={false}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </AnimatedUsageCardListContext.Provider>
    );
  },
);
AnimatedUsageCardList.displayName = "AnimatedUsageCardList";

interface AnimatedUsageCardItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

const AnimatedUsageCardItem = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardItemProps
>(({ className, highlighted = false, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3",
        highlighted && "bg-muted/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AnimatedUsageCardItem.displayName = "AnimatedUsageCardItem";

interface AnimatedUsageCardItemLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const AnimatedUsageCardItemLabel = React.forwardRef<
  HTMLSpanElement,
  AnimatedUsageCardItemLabelProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm text-foreground truncate", className)}
    {...props}
  />
));
AnimatedUsageCardItemLabel.displayName = "AnimatedUsageCardItemLabel";

interface AnimatedUsageCardItemValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  amount?: number;
  currency?: string;
  unit?: string;
}

const AnimatedUsageCardItemValue = React.forwardRef<
  HTMLSpanElement,
  AnimatedUsageCardItemValueProps
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
AnimatedUsageCardItemValue.displayName = "AnimatedUsageCardItemValue";

interface AnimatedUsageCardMeterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  used: number;
  limit: number;
  label: string;
  unit?: string;
  showPercentage?: boolean;
}

const AnimatedUsageCardMeter = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardMeterProps
>(
  (
    { className, used, limit, label, unit, showPercentage = false, ...props },
    ref,
  ) => {
    const percentage = Math.min((used / limit) * 100, 100);
    const isWarning = percentage >= 80;
    const isCritical = percentage >= 95;

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
      stiffness: 120,
      damping: 12,
      mass: 0.8,
    });
    const width = useTransform(springValue, (v) => `${v}%`);

    React.useEffect(() => {
      motionValue.set(percentage);
    }, [percentage, motionValue]);

    return (
      <div
        ref={ref}
        className={cn("px-4 py-3 space-y-2", className)}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-foreground">{label}</span>
          <span className="text-sm tabular-nums text-muted-foreground">
            <AnimatedNumber value={used} />
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
                (<AnimatedNumber value={percentage} decimals={0} />
                %)
              </span>
            )}
          </span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn(
              "h-full rounded-full",
              isCritical
                ? "bg-destructive"
                : isWarning
                  ? "bg-amber-500"
                  : "bg-primary",
            )}
            style={{ width }}
          />
        </div>
      </div>
    );
  },
);
AnimatedUsageCardMeter.displayName = "AnimatedUsageCardMeter";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
}

function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });
  const display = useTransform(springValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
  );

  React.useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

interface AnimatedUsageCardTotalProps {
  className?: string;
  label?: string;
  amount: number;
  currency?: string;
}

const AnimatedUsageCardTotal = React.forwardRef<
  HTMLDivElement,
  AnimatedUsageCardTotalProps
>(({ className, label = "Total", amount, currency = "$" }, ref) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });
  const display = useTransform(springValue, (v) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  );

  React.useEffect(() => {
    motionValue.set(amount);
  }, [amount, motionValue]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3 bg-muted/30 border-t border-border",
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.5,
        delay: 0.1,
      }}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums">
        {currency}
        <motion.span>{display}</motion.span>
      </span>
    </motion.div>
  );
});
AnimatedUsageCardTotal.displayName = "AnimatedUsageCardTotal";

export {
  AnimatedUsageCard,
  AnimatedUsageCardHeader,
  AnimatedUsageCardPeriod,
  AnimatedUsageCardAction,
  AnimatedUsageCardSummary,
  AnimatedUsageCardLabels,
  AnimatedUsageCardLabel,
  AnimatedUsageCardProgress,
  AnimatedUsageCardList,
  AnimatedUsageCardItem,
  AnimatedUsageCardItemLabel,
  AnimatedUsageCardItemValue,
  AnimatedUsageCardMeter,
  AnimatedUsageCardTotal,
  animatedUsageCardVariants,
  useAnimatedUsageCardList,
};

export type {
  AnimatedUsageCardProps,
  AnimatedUsageCardHeaderProps,
  AnimatedUsageCardPeriodProps,
  AnimatedUsageCardActionProps,
  AnimatedUsageCardSummaryProps,
  AnimatedUsageCardLabelsProps,
  AnimatedUsageCardLabelProps,
  AnimatedUsageCardProgressProps,
  AnimatedUsageCardListProps,
  AnimatedUsageCardItemProps,
  AnimatedUsageCardItemLabelProps,
  AnimatedUsageCardItemValueProps,
  AnimatedUsageCardMeterProps,
  AnimatedUsageCardTotalProps,
  AnimatedUsageCardListContextValue,
};
