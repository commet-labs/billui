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
// Controlled/Uncontrolled helper hook
// ============================================================================

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = React.useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}

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

interface BillingAddressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /** Controlled country code (ISO 3166-1 alpha-2) */
  country?: string;
  /** Default country code for uncontrolled mode */
  defaultCountry?: string;
  /** Callback when country changes */
  onCountryChange?: (code: string) => void;
}

const BillingAddress = React.forwardRef<HTMLDivElement, BillingAddressProps>(
  (
    {
      className,
      country,
      defaultCountry = "US",
      onCountryChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [countryCode, setCountryCode] = useControllableState(
      country,
      defaultCountry,
      onCountryChange,
    );

    const states = React.useMemo(
      () => getStatesForCountry(countryCode),
      [countryCode],
    );

    const contextValue = React.useMemo(
      () => ({ countryCode, setCountryCode, states }),
      [countryCode, setCountryCode, states],
    );

    return (
      <BillingAddressContext.Provider value={contextValue}>
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
// Input - with correct autocomplete values and unified onValueChange API
// ============================================================================

/**
 * Configuration for billing address fields.
 * Ensures proper browser autofill, accessibility, and UX.
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
    spellCheck: false, // Disabled per UI guidelines for codes
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
    | "autoComplete"
    | "inputMode"
    | "spellCheck"
    | "value"
    | "defaultValue"
    | "onChange"
  > {
  /** Address field type - automatically sets autocomplete, inputMode, and spellCheck */
  field: BillingAddressInputField;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when value changes */
  onValueChange?: (value: string) => void;
  /** Trim whitespace on blur (default: true) */
  trimOnBlur?: boolean;
}

const BillingAddressInput = React.forwardRef<
  HTMLInputElement,
  BillingAddressInputProps
>(
  (
    {
      field,
      className,
      value,
      defaultValue = "",
      onValueChange,
      trimOnBlur = true,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const config = billingFieldConfig[field];
    const [currentValue, setValue] = useControllableState(
      value,
      defaultValue,
      onValueChange,
    );

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (trimOnBlur) {
        const trimmed = currentValue.trim();
        if (trimmed !== currentValue) {
          setValue(trimmed);
        }
      }
      onBlur?.(e);
    };

    return (
      <Input
        ref={ref}
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        autoComplete={config.autocomplete}
        inputMode={config.inputMode}
        spellCheck={config.spellCheck}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);
BillingAddressInput.displayName = "BillingAddressInput";

// ============================================================================
// Country Select
// ============================================================================

interface BillingAddressCountryProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class name */
  className?: string;
  /** Callback fired when country changes */
  onValueChange?: (value: string) => void;
  /** Name attribute for form submission */
  name?: string;
  /** ID attribute */
  id?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
}

const BillingAddressCountry = React.forwardRef<
  HTMLButtonElement,
  BillingAddressCountryProps
>(
  (
    {
      placeholder = "Select country…",
      className,
      onValueChange,
      name,
      id,
      disabled,
    },
    ref,
  ) => {
    const { countryCode, setCountryCode } = useBillingAddressContext();

    const handleValueChange = (newValue: string) => {
      setCountryCode(newValue);
      onValueChange?.(newValue);
    };

    return (
      <>
        {name && <input type="hidden" name={name} value={countryCode} />}
        <Select
          value={countryCode}
          onValueChange={handleValueChange}
          disabled={disabled}
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
  /** Whether the input/select is disabled */
  disabled?: boolean;
  /** Trim whitespace on blur for input mode (default: true) */
  trimOnBlur?: boolean;
}

/**
 * Renders a Select when states are available for the country,
 * otherwise renders an Input for free-form entry.
 *
 * Note: Ref points to a wrapper div with `display: contents` for consistent typing.
 * Use `ref.current?.querySelector('input, button')` if you need the inner element.
 */
const BillingAddressState = React.forwardRef<
  HTMLDivElement,
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
      disabled,
      trimOnBlur = true,
    },
    ref,
  ) => {
    const { states, countryCode } = useBillingAddressContext();

    const [currentValue, setValue] = useControllableState(
      value,
      defaultValue,
      onValueChange,
    );

    const isControlled = value !== undefined;

    // Reset state when country changes
    const prevCountryRef = React.useRef(countryCode);
    React.useEffect(() => {
      if (prevCountryRef.current !== countryCode) {
        prevCountryRef.current = countryCode;
        if (!isControlled) {
          setValue("");
        } else {
          onValueChange?.("");
        }
      }
    }, [countryCode, isControlled, setValue, onValueChange]);

    const handleInputBlur = () => {
      if (trimOnBlur) {
        const trimmed = currentValue.trim();
        if (trimmed !== currentValue) {
          setValue(trimmed);
        }
      }
    };

    // No states available → free-form input
    if (states.length === 0) {
      return (
        <div ref={ref} className="contents">
          <Input
            id={id}
            name={name}
            value={currentValue}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            autoComplete="billing address-level1"
            disabled={disabled}
            className={cn("w-full", className)}
          />
        </div>
      );
    }

    // States available → select dropdown
    return (
      <div ref={ref} className="contents">
        {name && <input type="hidden" name={name} value={currentValue} />}
        <Select
          value={currentValue}
          onValueChange={setValue}
          disabled={disabled}
        >
          <SelectTrigger id={id} className={cn("w-full", className)}>
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
      </div>
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
