import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, Lock } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const PaymentForm = React.forwardRef<HTMLFormElement, PaymentFormProps>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  ),
);
PaymentForm.displayName = "PaymentForm";

const paymentFormSectionVariants = cva(
  "flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-border shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PaymentFormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paymentFormSectionVariants> {}

const PaymentFormSection = React.forwardRef<
  HTMLDivElement,
  PaymentFormSectionProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(paymentFormSectionVariants({ variant, className }))}
    {...props}
  />
));
PaymentFormSection.displayName = "PaymentFormSection";

const PaymentFormHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
PaymentFormHeader.displayName = "PaymentFormHeader";

const PaymentFormTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold tracking-tight", className)}
    {...props}
  />
));
PaymentFormTitle.displayName = "PaymentFormTitle";

const PaymentFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PaymentFormDescription.displayName = "PaymentFormDescription";

const paymentFormFieldVariants = cva("", {
  variants: {
    variant: {
      /** For simple inputs without their own container styling */
      default:
        "rounded-lg border bg-background transition-all border-input focus-within:ring-2 focus-within:ring-ring focus-within:border-ring px-3 py-2.5",
      /** Error state for default variant */
      error:
        "rounded-lg border bg-background transition-all border-destructive focus-within:ring-2 focus-within:ring-destructive px-3 py-2.5",
      /**
       * For components with their own styling (CardInputGroup, Stripe Elements, etc.)
       * Only renders label + children, no wrapper styles
       */
      unstyled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PaymentFormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paymentFormFieldVariants> {
  /** Label text displayed above the field */
  label?: string;
  /** HTML for attribute for the label. Use "" for group inputs like CardInputGroup */
  htmlFor?: string;
  /** Field name for generating IDs */
  name?: string;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the field */
  description?: string;
  /** Mark field as required */
  required?: boolean;
}

const PaymentFormField = React.forwardRef<
  HTMLDivElement,
  PaymentFormFieldProps
>(
  (
    {
      className,
      label,
      htmlFor,
      name,
      error,
      description,
      required,
      children,
      variant,
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
    const fieldId = name ?? id;
    const errorId = `${fieldId}-error`;
    const descriptionId = `${fieldId}-description`;
    const hasError = !!error;

    // Determine effective variant
    const effectiveVariant =
      hasError && variant !== "unstyled" ? "error" : variant;

    // htmlFor prop allows explicit control:
    // - undefined: use auto-generated fieldId (default)
    // - empty string "": no htmlFor (for group labels like CardInputGroup)
    // - string value: use that value
    const labelFor =
      htmlFor === "" ? undefined : htmlFor !== undefined ? htmlFor : fieldId;

    const fieldStyles = paymentFormFieldVariants({ variant: effectiveVariant });

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {label && (
          <label
            htmlFor={labelFor}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="ml-1 text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {variant === "unstyled" ? (
          children
        ) : (
          <div className={fieldStyles}>{children}</div>
        )}
        {description && !hasError && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
PaymentFormField.displayName = "PaymentFormField";

interface PaymentFormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

const PaymentFormRow = React.forwardRef<HTMLDivElement, PaymentFormRowProps>(
  ({ className, columns = 2, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
        className,
      )}
      {...props}
    />
  ),
);
PaymentFormRow.displayName = "PaymentFormRow";

const PaymentFormFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
));
PaymentFormFooter.displayName = "PaymentFormFooter";

interface PaymentFormSubmitProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean;
  showSecureIcon?: boolean;
}

const PaymentFormSubmit = React.forwardRef<
  HTMLButtonElement,
  PaymentFormSubmitProps
>(
  (
    { className, children, loading, showSecureIcon = true, disabled, ...props },
    ref,
  ) => (
    <Button
      ref={ref}
      type="submit"
      className={cn("w-full gap-2", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : showSecureIcon ? (
        <Lock className="h-4 w-4" />
      ) : null}
      {children}
    </Button>
  ),
);
PaymentFormSubmit.displayName = "PaymentFormSubmit";

interface PaymentFormDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const PaymentFormDivider = React.forwardRef<
  HTMLDivElement,
  PaymentFormDividerProps
>(({ className, label, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex items-center py-2", className)}
    {...props}
  >
    <div className="flex-1 border-t border-border" />
    {label && (
      <span className="mx-4 text-xs uppercase text-muted-foreground">
        {label}
      </span>
    )}
    <div className="flex-1 border-t border-border" />
  </div>
));
PaymentFormDivider.displayName = "PaymentFormDivider";

export {
  PaymentForm,
  PaymentFormSection,
  PaymentFormHeader,
  PaymentFormTitle,
  PaymentFormDescription,
  PaymentFormField,
  PaymentFormRow,
  PaymentFormFooter,
  PaymentFormSubmit,
  PaymentFormDivider,
  paymentFormSectionVariants,
  paymentFormFieldVariants,
};

export type {
  PaymentFormProps,
  PaymentFormSectionProps,
  PaymentFormFieldProps,
  PaymentFormRowProps,
  PaymentFormSubmitProps,
  PaymentFormDividerProps,
};
