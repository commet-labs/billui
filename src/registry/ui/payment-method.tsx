import { cva, type VariantProps } from "class-variance-authority";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { brandLabels, type CardBrand, CardBrandIcons } from "./card-icons";

const paymentMethodVariants = cva(
  "relative flex items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        selected: "border-primary ring-1 ring-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PaymentMethodProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paymentMethodVariants> {}

const PaymentMethod = React.forwardRef<HTMLDivElement, PaymentMethodProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(paymentMethodVariants({ variant, className }))}
      {...props}
    />
  ),
);
PaymentMethod.displayName = "PaymentMethod";

interface PaymentMethodIconProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: CardBrand;
}

const PaymentMethodIcon = React.forwardRef<
  HTMLDivElement,
  PaymentMethodIconProps
>(({ className, brand = "unknown", ...props }, ref) => {
  const Logo = CardBrandIcons[brand] ?? CardBrandIcons.unknown;
  const isGeneric = brand === "unknown";

  return (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-[4px]",
        isGeneric ? "h-8 w-8 text-muted-foreground" : "h-8 w-12",
        className,
      )}
      {...props}
    >
      <Logo className={isGeneric ? "h-6 w-6" : "h-full w-full"} />
    </div>
  );
});
PaymentMethodIcon.displayName = "PaymentMethodIcon";

const PaymentMethodDetails = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
    {...props}
  />
));
PaymentMethodDetails.displayName = "PaymentMethodDetails";

interface PaymentMethodNumberProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  last4?: string;
}

const PaymentMethodNumber = React.forwardRef<
  HTMLSpanElement,
  PaymentMethodNumberProps
>(({ className, last4, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("font-medium text-foreground", className)}
    {...props}
  >
    {children ?? `•••• ${last4}`}
  </span>
));
PaymentMethodNumber.displayName = "PaymentMethodNumber";

interface PaymentMethodExpiryProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  month?: number;
  year?: number;
  expired?: boolean;
}

const PaymentMethodExpiry = React.forwardRef<
  HTMLSpanElement,
  PaymentMethodExpiryProps
>(({ className, month, year, expired, children, ...props }, ref) => {
  const expiryText =
    children ??
    (month && year
      ? `Expires ${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`
      : null);

  return (
    <span
      ref={ref}
      className={cn(
        "text-sm",
        expired ? "text-destructive" : "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {expiryText}
      {expired && " (Expired)"}
    </span>
  );
});
PaymentMethodExpiry.displayName = "PaymentMethodExpiry";

interface PaymentMethodBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {}

const PaymentMethodBadge = React.forwardRef<
  HTMLDivElement,
  PaymentMethodBadgeProps
>(({ className, children, ...props }, ref) => (
  <Badge
    ref={ref}
    variant="secondary"
    className={cn("ml-auto shrink-0", className)}
    {...props}
  >
    {children}
  </Badge>
));
PaymentMethodBadge.displayName = "PaymentMethodBadge";

const PaymentMethodActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-1", className)}
    {...props}
  />
));
PaymentMethodActions.displayName = "PaymentMethodActions";

interface PaymentMethodActionProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  action?: "edit" | "delete" | "more";
}

const PaymentMethodAction = React.forwardRef<
  HTMLButtonElement,
  PaymentMethodActionProps
>(({ className, action = "more", children, ...props }, ref) => {
  const icons = {
    edit: Pencil,
    delete: Trash2,
    more: MoreHorizontal,
  };
  const labels = {
    edit: "Edit",
    delete: "Delete",
    more: "More options",
  };
  const Icon = icons[action];

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8",
        action === "delete" && "hover:text-destructive",
        className,
      )}
      {...props}
    >
      {children ?? <Icon className="h-4 w-4" />}
      <span className="sr-only">{labels[action]}</span>
    </Button>
  );
});
PaymentMethodAction.displayName = "PaymentMethodAction";

export {
  PaymentMethod,
  PaymentMethodIcon,
  PaymentMethodDetails,
  PaymentMethodNumber,
  PaymentMethodExpiry,
  PaymentMethodBadge,
  PaymentMethodActions,
  PaymentMethodAction,
  paymentMethodVariants,
  brandLabels,
  CardBrandIcons,
};

export type {
  PaymentMethodProps,
  PaymentMethodIconProps,
  PaymentMethodNumberProps,
  PaymentMethodExpiryProps,
  PaymentMethodBadgeProps,
  PaymentMethodActionProps,
  CardBrand,
};
