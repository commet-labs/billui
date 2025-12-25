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
// Controlled/Uncontrolled helper hook
// ============================================================================

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue];
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
 * Configuration for billing address fields.
 * These ensure proper browser autofill behavior and accessibility.
 */
const billingFieldConfig = {
  name: {
    autocomplete: "billing name",
    inputMode: "text" as const,
    spellCheck: true,
  },
  line1: {
    autocomplete: "billing address-line1",
    inputMode: "text" as const,
    spellCheck: true,
  },
  line2: {
    autocomplete: "billing address-line2",
    inputMode: "text" as const,
    spellCheck: true,
  },
  city: {
    autocomplete: "billing address-level2",
    inputMode: "text" as const,
    spellCheck: true,
  },
  postalCode: {
    autocomplete: "billing postal-code",
    inputMode: "text" as const,
    spellCheck: false, // Disable spellcheck for codes per UI guidelines
  },
} as const;

/** @deprecated Use billingFieldConfig instead */
const billingAutocomplete = {
  name: "billing name",
  line1: "billing address-line1",
  line2: "billing address-line2",
  city: "billing address-level2",
  postalCode: "billing postal-code",
} as const;

type BillingAddressInputField = keyof typeof billingFieldConfig;

interface BillingAddressInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    "autoComplete" | "inputMode" | "spellCheck"
  > {
  /** Address field type - sets the correct autocomplete value */
  field: BillingAddressInputField;
}

const BillingAddressInput = React.forwardRef<
  HTMLInputElement,
  BillingAddressInputProps
>(({ field, className, ...props }, ref) => {
  const config = billingFieldConfig[field];
  return (
    <Input
      ref={ref}
      autoComplete={config.autocomplete}
      inputMode={config.inputMode}
      spellCheck={config.spellCheck}
      className={cn("w-full", className)}
      {...props}
    />
  );
});
BillingAddressInput.displayName = "BillingAddressInput";

// ============================================================================
// Country Select - includes all countries, updates context
// ============================================================================

interface BillingAddressCountryProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Select>,
    "value" | "onValueChange" | "defaultValue"
  > {
  /** Placeholder text for the select */
  placeholder?: string;
  /** Additional class name for the trigger */
  className?: string;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when country changes */
  onValueChange?: (value: string) => void;
  /** Name attribute for form submission */
  name?: string;
  /** ID attribute */
  id?: string;
}

const BillingAddressCountry = React.forwardRef<
  HTMLButtonElement,
  BillingAddressCountryProps
>(
  (
    {
      placeholder = "Select country…",
      className,
      value,
      defaultValue,
      onValueChange,
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const { countryCode, setCountryCode } = useBillingAddressContext();

    // Support controlled mode: if value is provided, use it instead of context
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : countryCode;

    const handleValueChange = (newValue: string) => {
      // Always update context (for state sync)
      setCountryCode(newValue);
      // Notify parent
      onValueChange?.(newValue);
    };

    return (
      <>
        {/* Hidden input for native form submission */}
        {name && <input type="hidden" name={name} value={currentValue} />}
        <Select
          value={currentValue}
          onValueChange={handleValueChange}
          {...props}
        >
          <SelectTrigger ref={ref} id={id} className={cn("w-full", className)}>
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
      </>
    );
  },
);
BillingAddressCountry.displayName = "BillingAddressCountry";

// ============================================================================
// State - Select when states available, Input otherwise
// ============================================================================

interface BillingAddressStateProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class name */
  className?: string;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when state changes */
  onValueChange?: (value: string) => void;
  /** Name attribute for form submission */
  name?: string;
  /** ID attribute */
  id?: string;
}

const BillingAddressState = React.forwardRef<
  HTMLButtonElement | HTMLInputElement,
  BillingAddressStateProps
>(
  (
    {
      placeholder = "State / Province…",
      className,
      value,
      defaultValue = "",
      onValueChange,
      name,
      id,
    },
    ref,
  ) => {
    const { states, countryCode } = useBillingAddressContext();

    // Use controllable state pattern
    const [currentValue, setValue] = useControllableState(
      value,
      defaultValue,
      onValueChange,
    );

    // Track if we're controlled to handle country change differently
    const isControlled = value !== undefined;

    // Reset state when country changes
    const prevCountryRef = React.useRef(countryCode);
    React.useEffect(() => {
      if (prevCountryRef.current !== countryCode) {
        prevCountryRef.current = countryCode;
        // Always notify parent and reset internal state
        // For controlled: parent decides what to do
        // For uncontrolled: we reset and notify
        if (!isControlled) {
          setValue("");
        } else {
          // Still notify parent so they can react
          onValueChange?.("");
        }
      }
    }, [countryCode, isControlled, setValue, onValueChange]);

    // No states available - render as input
    if (states.length === 0) {
      return (
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          name={name}
          value={currentValue}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="billing address-level1"
          className={cn("w-full", className)}
        />
      );
    }

    // States available - render as select with hidden input for form submission
    return (
      <>
        {/* Hidden input for native form submission (Select doesn't submit natively) */}
        {name && <input type="hidden" name={name} value={currentValue} />}
        <Select value={currentValue} onValueChange={setValue}>
          <SelectTrigger
            ref={ref as React.Ref<HTMLButtonElement>}
            id={id}
            className={cn("w-full", className)}
          >
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
      </>
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
  billingFieldConfig,
  billingAutocomplete,
  useBillingAddressContext,
  useControllableState,
};

export type {
  BillingAddressProps,
  BillingAddressInputProps,
  BillingAddressInputField,
  BillingAddressCountryProps,
  BillingAddressStateProps,
};
