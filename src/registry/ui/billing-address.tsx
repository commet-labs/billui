import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const billingAddressVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "gap-4",
      compact: "gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BillingAddressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof billingAddressVariants> {}

const BillingAddress = React.forwardRef<HTMLDivElement, BillingAddressProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(billingAddressVariants({ variant, className }))}
      {...props}
    />
  ),
);
BillingAddress.displayName = "BillingAddress";

const billingAddressRowVariants = cva("grid", {
  variants: {
    columns: {
      2: "grid-cols-2 gap-3",
      3: "grid-cols-3 gap-3",
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

interface BillingAddressRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof billingAddressRowVariants> {}

const BillingAddressRow = React.forwardRef<
  HTMLDivElement,
  BillingAddressRowProps
>(({ className, columns, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(billingAddressRowVariants({ columns, className }))}
    {...props}
  />
));
BillingAddressRow.displayName = "BillingAddressRow";

const BillingAddressField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
));
BillingAddressField.displayName = "BillingAddressField";

interface BillingAddressLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

const BillingAddressLabel = React.forwardRef<
  HTMLLabelElement,
  BillingAddressLabelProps
>(({ className, children, required, ...props }, ref) => (
  <Label ref={ref} className={cn("text-sm font-medium", className)} {...props}>
    {children}
    {required && (
      <span className="ml-1 text-destructive" aria-hidden="true">
        *
      </span>
    )}
  </Label>
));
BillingAddressLabel.displayName = "BillingAddressLabel";

/**
 * Autocomplete values for billing address fields.
 * These ensure proper browser autofill behavior.
 */
const billingAutocomplete = {
  name: "billing name",
  line1: "billing address-line1",
  line2: "billing address-line2",
  city: "billing address-level2",
  state: "billing address-level1",
  postalCode: "billing postal-code",
  country: "billing country-name",
  countryCode: "billing country",
} as const;

type BillingAddressInputField = keyof typeof billingAutocomplete;

interface BillingAddressInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "autoComplete"> {
  /** Address field type - sets the correct autocomplete value */
  field: BillingAddressInputField;
}

const BillingAddressInput = React.forwardRef<
  HTMLInputElement,
  BillingAddressInputProps
>(({ field, className, ...props }, ref) => (
  <Input
    ref={ref}
    autoComplete={billingAutocomplete[field]}
    className={cn(className)}
    {...props}
  />
));
BillingAddressInput.displayName = "BillingAddressInput";

// Re-export Select components for convenience
const BillingAddressSelect = Select;

const BillingAddressSelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger>
>(({ className, ...props }, ref) => (
  <SelectTrigger ref={ref} className={cn("w-full", className)} {...props} />
));
BillingAddressSelectTrigger.displayName = "BillingAddressSelectTrigger";

const BillingAddressSelectContent = SelectContent;
const BillingAddressSelectItem = SelectItem;
const BillingAddressSelectValue = SelectValue;

export {
  BillingAddress,
  BillingAddressRow,
  BillingAddressField,
  BillingAddressLabel,
  BillingAddressInput,
  BillingAddressSelect,
  BillingAddressSelectTrigger,
  BillingAddressSelectContent,
  BillingAddressSelectItem,
  BillingAddressSelectValue,
  billingAddressVariants,
  billingAddressRowVariants,
  billingAutocomplete,
};

export type {
  BillingAddressProps,
  BillingAddressRowProps,
  BillingAddressLabelProps,
  BillingAddressInputProps,
  BillingAddressInputField,
};
