"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  COUNTRIES,
  getStatesForCountry,
  type IState,
} from "./billing-address-data";

// ============================================================================
// Context
// ============================================================================

interface BillingAddressContextValue {
  countryCode: string;
  setCountryCode: (code: string) => void;
  states: IState[];
}

const BillingAddressContext =
  React.createContext<BillingAddressContextValue | null>(null);

function useBillingAddressContext() {
  const context = React.useContext(BillingAddressContext);
  if (!context) {
    throw new Error(
      "BillingAddress components must be used within a BillingAddress provider",
    );
  }
  return context;
}

// ============================================================================
// Root Component
// ============================================================================

interface BillingAddressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default country code (ISO 3166-1 alpha-2) */
  defaultCountry?: string;
}

const BillingAddress = React.forwardRef<HTMLDivElement, BillingAddressProps>(
  ({ className, defaultCountry = "US", children, ...props }, ref) => {
    const [countryCode, setCountryCode] = React.useState(defaultCountry);
    const states = React.useMemo(
      () => getStatesForCountry(countryCode),
      [countryCode],
    );

    return (
      <BillingAddressContext.Provider
        value={{ countryCode, setCountryCode, states }}
      >
        <div
          ref={ref}
          className={cn("flex flex-col gap-4", className)}
          {...props}
        >
          {children}
        </div>
      </BillingAddressContext.Provider>
    );
  },
);
BillingAddress.displayName = "BillingAddress";

// ============================================================================
// Input - with correct autocomplete values
// ============================================================================

/**
 * Autocomplete values for billing address fields.
 * These ensure proper browser autofill behavior.
 */
const billingAutocomplete = {
  name: "billing name",
  line1: "billing address-line1",
  line2: "billing address-line2",
  city: "billing address-level2",
  postalCode: "billing postal-code",
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
    className={cn("w-full", className)}
    {...props}
  />
));
BillingAddressInput.displayName = "BillingAddressInput";

// ============================================================================
// Country Select - includes all countries, updates context
// ============================================================================

interface BillingAddressCountryProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Select>,
    "value" | "onValueChange"
  > {
  /** Placeholder text for the select */
  placeholder?: string;
  /** Additional class name for the trigger */
  className?: string;
  /** Callback fired when country changes */
  onValueChange?: (value: string) => void;
}

const BillingAddressCountry = React.forwardRef<
  HTMLButtonElement,
  BillingAddressCountryProps
>(({ placeholder = "Select country", className, onValueChange, ...props }, ref) => {
  const { countryCode, setCountryCode } = useBillingAddressContext();

  const handleValueChange = (newValue: string) => {
    setCountryCode(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Select value={countryCode} onValueChange={handleValueChange} {...props}>
      <SelectTrigger ref={ref} className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.isoCode} value={country.isoCode}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
BillingAddressCountry.displayName = "BillingAddressCountry";

// ============================================================================
// State Select - includes states from context, updates automatically
// ============================================================================

interface BillingAddressStateProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Select>,
    "onValueChange"
  > {
  /** Placeholder text for the select */
  placeholder?: string;
  /** Additional class name for the trigger */
  className?: string;
  /** Callback fired when state changes */
  onValueChange?: (value: string) => void;
}

const BillingAddressState = React.forwardRef<
  HTMLButtonElement,
  BillingAddressStateProps
>(
  (
    { placeholder = "Select state", className, value, onValueChange, ...props },
    ref,
  ) => {
    const { states, countryCode } = useBillingAddressContext();
    const [internalValue, setInternalValue] = React.useState<string>("");

    // Reset state when country changes
    const prevCountryRef = React.useRef(countryCode);
    React.useEffect(() => {
      if (prevCountryRef.current !== countryCode) {
        setInternalValue("");
        prevCountryRef.current = countryCode;
      }
    }, [countryCode]);

    const currentValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    // Don't render if no states available
    if (states.length === 0) {
      return null;
    }

    return (
      <Select
        value={currentValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SelectTrigger ref={ref} className={cn("w-full", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state.isoCode} value={state.isoCode}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
BillingAddressState.displayName = "BillingAddressState";

// ============================================================================
// Exports
// ============================================================================

export {
  BillingAddress,
  BillingAddressInput,
  BillingAddressCountry,
  BillingAddressState,
  billingAutocomplete,
  useBillingAddressContext,
};

export type {
  BillingAddressProps,
  BillingAddressInputProps,
  BillingAddressInputField,
  BillingAddressCountryProps,
  BillingAddressStateProps,
};
