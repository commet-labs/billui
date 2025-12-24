"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type CardBrand, CardBrandIcons } from "./card-icons";

// Context to share card brand between components in a CardInputGroup
interface CardInputContextValue {
  brand: CardBrand;
  setBrand: (brand: CardBrand) => void;
}

const CardInputContext = React.createContext<CardInputContextValue | null>(
  null,
);

function useCardInputContext() {
  return React.useContext(CardInputContext);
}

function detectCardBrand(cardNumber: string): CardBrand {
  const number = cardNumber.replace(/\s/g, "");

  if (!number) return "unknown";

  // Visa: starts with 4
  if (/^4/.test(number)) return "visa";

  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return "mastercard";

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(number)) return "amex";

  // Discover: starts with 6011, 644-649, 65
  if (/^6011|^64[4-9]|^65/.test(number)) return "discover";

  // Diners Club: starts with 36, 38, or 300-305
  if (/^36|^38|^30[0-5]/.test(number)) return "diners";

  // JCB: starts with 35
  if (/^35/.test(number)) return "jcb";

  // UnionPay: starts with 62
  if (/^62/.test(number)) return "unionpay";

  return "unknown";
}

function validateLuhn(cardNumber: string): boolean {
  const number = cardNumber.replace(/\s/g, "");

  if (!number || !/^\d+$/.test(number)) return false;

  let sum = 0;
  let isEven = false;

  // Loop through digits from right to left
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

function isCardNumberComplete(cardNumber: string, brand: CardBrand): boolean {
  const number = cardNumber.replace(/\s/g, "");
  const maxLength = getCardMaxLength(brand);
  return number.length === maxLength;
}

function validateCardNumber(cardNumber: string): {
  isValid: boolean;
  isComplete: boolean;
  brand: CardBrand;
} {
  const brand = detectCardBrand(cardNumber);
  const isComplete = isCardNumberComplete(cardNumber, brand);
  const isValid = isComplete && validateLuhn(cardNumber);

  return { isValid, isComplete, brand };
}

function getCardMaxLength(brand: CardBrand): number {
  // Amex has 15 digits, others have 16
  return brand === "amex" ? 15 : 16;
}

function getCvcMaxLength(brand: CardBrand): number {
  // Amex has 4-digit CVC, others have 3
  return brand === "amex" ? 4 : 3;
}

function formatCardNumber(value: string, brand: CardBrand): string {
  const number = value.replace(/\D/g, "");
  const maxLength = getCardMaxLength(brand);
  const truncated = number.slice(0, maxLength);

  // Amex format: 4-6-5
  if (brand === "amex") {
    const parts = [
      truncated.slice(0, 4),
      truncated.slice(4, 10),
      truncated.slice(10, 15),
    ].filter(Boolean);
    return parts.join(" ");
  }

  // Standard format: 4-4-4-4
  const parts = truncated.match(/.{1,4}/g) || [];
  return parts.join(" ");
}

function formatExpiry(value: string): string {
  const number = value.replace(/\D/g, "");
  const truncated = number.slice(0, 4);

  if (truncated.length >= 2) {
    return `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
  }
  return truncated;
}

function validateExpiry(expiry: string): {
  isValid: boolean;
  isComplete: boolean;
  isExpired: boolean;
} {
  const cleaned = expiry.replace(/\D/g, "");

  // Not complete until we have 4 digits (MMYY)
  if (cleaned.length < 4) {
    return { isValid: false, isComplete: false, isExpired: false };
  }

  const month = parseInt(cleaned.slice(0, 2), 10);
  const year = parseInt(cleaned.slice(2, 4), 10);

  // Invalid month
  if (month < 1 || month > 12) {
    return { isValid: false, isComplete: true, isExpired: false };
  }

  // Check if expired
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Get last 2 digits
  const currentMonth = now.getMonth() + 1; // 1-indexed

  const isExpired =
    year < currentYear || (year === currentYear && month < currentMonth);

  return {
    isValid: !isExpired,
    isComplete: true,
    isExpired,
  };
}

interface CardInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
}

const CardInputGroup = React.forwardRef<HTMLDivElement, CardInputGroupProps>(
  ({ className, children, error, ...props }, ref) => {
    const [brand, setBrand] = React.useState<CardBrand>("unknown");

    return (
      <CardInputContext.Provider value={{ brand, setBrand }}>
        <div
          ref={ref}
          className={cn(
            "flex items-center divide-x divide-border overflow-hidden rounded-lg border bg-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
            error &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </CardInputContext.Provider>
    );
  },
);
CardInputGroup.displayName = "CardInputGroup";

interface CardNumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: string;
  onChange?: (value: string) => void;
  onBrandChange?: (brand: CardBrand) => void;
  onValidationChange?: (validation: {
    isValid: boolean;
    isComplete: boolean;
  }) => void;
  showBrandIcon?: boolean;
  showValidation?: boolean;
}

const CardNumberInput = React.forwardRef<
  HTMLInputElement,
  CardNumberInputProps
>(
  (
    {
      className,
      id,
      name,
      value: controlledValue,
      onChange,
      onBrandChange,
      onValidationChange,
      showBrandIcon = true,
      showValidation = true,
      placeholder = "1234 1234 1234 1234",
      ...props
    },
    ref,
  ) => {
    const context = useCardInputContext();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputName = name ?? "cc-number";
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");
    const [internalBrand, setInternalBrand] =
      React.useState<CardBrand>("unknown");
    const [validationState, setValidationState] = React.useState<{
      isComplete: boolean;
      isValid: boolean;
    }>({ isComplete: false, isValid: false });

    // Use context brand if available, otherwise use internal state
    const brand = context?.brand ?? internalBrand;
    const BrandIcon = CardBrandIcons[brand];

    const value = isControlled ? controlledValue : internalValue;
    const hasError =
      showValidation && validationState.isComplete && !validationState.isValid;
    const isValidComplete =
      showValidation && validationState.isComplete && validationState.isValid;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      // Detect brand first to know how to format
      const detectedBrand = detectCardBrand(rawValue);
      // Format (and truncate) the value
      const formatted = formatCardNumber(rawValue, detectedBrand);
      // Validate with the formatted/truncated value to ensure correct state
      const validation = validateCardNumber(formatted);

      // Update both context (if available) and internal state
      context?.setBrand(validation.brand);
      setInternalBrand(validation.brand);
      setValidationState({
        isComplete: validation.isComplete,
        isValid: validation.isValid,
      });
      onBrandChange?.(validation.brand);
      onValidationChange?.({
        isValid: validation.isValid,
        isComplete: validation.isComplete,
      });

      if (isControlled) {
        onChange?.(formatted);
      } else {
        setInternalValue(formatted);
      }
    };

    return (
      <div className={cn("relative flex flex-1 items-center", className)}>
        <input
          ref={ref}
          id={inputId}
          name={inputName}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full border-0 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground",
            hasError && "text-destructive",
          )}
          aria-invalid={hasError}
          {...props}
        />
        <div className="pointer-events-none absolute right-3 flex items-center gap-2">
          {showValidation && validationState.isComplete && (
            <div className="flex h-5 w-5 items-center justify-center">
              {hasError ? (
                <svg
                  className="h-4 w-4 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              ) : isValidComplete ? (
                <svg
                  className="h-4 w-4 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : null}
            </div>
          )}
          {showBrandIcon && (
            <div className="flex h-6 w-9 items-center justify-center">
              <BrandIcon
                className={cn(
                  "h-full w-full",
                  brand === "unknown" && "h-5 w-5 text-muted-foreground",
                )}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
CardNumberInput.displayName = "CardNumberInput";

interface CardExpiryInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (validation: {
    isValid: boolean;
    isComplete: boolean;
    isExpired: boolean;
  }) => void;
  showValidation?: boolean;
}

const CardExpiryInput = React.forwardRef<
  HTMLInputElement,
  CardExpiryInputProps
>(
  (
    {
      className,
      id,
      name,
      value: controlledValue,
      onChange,
      onValidationChange,
      showValidation = true,
      placeholder = "MM/YY",
      ...props
    },
    ref,
  ) => {
    const context = useCardInputContext();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputName = name ?? "cc-exp";
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");
    const [validationState, setValidationState] = React.useState<{
      isComplete: boolean;
      isValid: boolean;
      isExpired: boolean;
    }>({ isComplete: false, isValid: false, isExpired: false });

    // When inside CardInputGroup, center text; otherwise left-align
    const isGrouped = context !== null;

    const value = isControlled ? controlledValue : internalValue;
    const hasError =
      showValidation && validationState.isComplete && !validationState.isValid;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatExpiry(e.target.value);
      const validation = validateExpiry(formatted);

      setValidationState(validation);
      onValidationChange?.(validation);

      if (isControlled) {
        onChange?.(formatted);
      } else {
        setInternalValue(formatted);
      }
    };

    return (
      <div className={cn("relative flex items-center", !isGrouped && "flex-1")}>
        <input
          ref={ref}
          id={inputId}
          name={inputName}
          type="text"
          inputMode="numeric"
          autoComplete="cc-exp"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={5}
          className={cn(
            "h-10 border-0 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground",
            isGrouped ? "w-20 text-center" : "w-full",
            hasError && "text-destructive",
            className,
          )}
          aria-invalid={hasError}
          {...props}
        />
        {showValidation && validationState.isComplete && (
          <div className="pointer-events-none absolute right-1 flex h-4 w-4 items-center justify-center">
            {hasError ? (
              <svg
                className="h-3.5 w-3.5 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            ) : (
              <svg
                className="h-3.5 w-3.5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    );
  },
);
CardExpiryInput.displayName = "CardExpiryInput";

interface CardCvcInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: string;
  onChange?: (value: string) => void;
  brand?: CardBrand;
}

const CardCvcInput = React.forwardRef<HTMLInputElement, CardCvcInputProps>(
  (
    {
      className,
      id,
      name,
      value: controlledValue,
      onChange,
      brand: brandProp,
      placeholder = "CVC",
      ...props
    },
    ref,
  ) => {
    const context = useCardInputContext();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputName = name ?? "cc-csc";
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");

    // Priority: explicit prop > context > default
    const brand = brandProp ?? context?.brand ?? "unknown";
    const maxLength = getCvcMaxLength(brand);

    // When inside CardInputGroup, center text; otherwise left-align
    const isGrouped = context !== null;

    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);

      if (isControlled) {
        onChange?.(rawValue);
      } else {
        setInternalValue(rawValue);
      }
    };

    return (
      <div className={cn("relative flex items-center", !isGrouped && "flex-1")}>
        <input
          ref={ref}
          id={inputId}
          name={inputName}
          type="text"
          inputMode="numeric"
          autoComplete="cc-csc"
          value={value}
          onChange={handleChange}
          placeholder={brand === "amex" ? "CVVC" : placeholder}
          maxLength={maxLength}
          className={cn(
            "h-10 border-0 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground",
            isGrouped ? "w-16 text-center" : "w-full",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CardCvcInput.displayName = "CardCvcInput";

export {
  CardInputGroup,
  CardNumberInput,
  CardExpiryInput,
  CardCvcInput,
  CardBrandIcons,
  detectCardBrand,
  validateLuhn,
  validateCardNumber,
  validateExpiry,
  isCardNumberComplete,
  formatCardNumber,
  formatExpiry,
  getCardMaxLength,
  getCvcMaxLength,
};

export type {
  CardBrand,
  CardInputGroupProps,
  CardNumberInputProps,
  CardExpiryInputProps,
  CardCvcInputProps,
};
