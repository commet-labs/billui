"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CardBrandIcons, type CardBrand } from "./card-icons";

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

function validateCardNumber(cardNumber: string): { isValid: boolean; isComplete: boolean; brand: CardBrand } {
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

interface CardInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardInputGroup = React.forwardRef<HTMLDivElement, CardInputGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center divide-x divide-border overflow-hidden rounded-lg border bg-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
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
  onValidationChange?: (validation: { isValid: boolean; isComplete: boolean }) => void;
  showBrandIcon?: boolean;
}

const CardNumberInput = React.forwardRef<
  HTMLInputElement,
  CardNumberInputProps
>(
  (
    {
      className,
      value: controlledValue,
      onChange,
      onBrandChange,
      onValidationChange,
      showBrandIcon = true,
      placeholder = "1234 1234 1234 1234",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");
    const [brand, setBrand] = React.useState<CardBrand>("unknown");
    const BrandIcon = CardBrandIcons[brand];

    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const validation = validateCardNumber(rawValue);
      const formatted = formatCardNumber(rawValue, validation.brand);

      setBrand(validation.brand);
      onBrandChange?.(validation.brand);
      onValidationChange?.({ isValid: validation.isValid, isComplete: validation.isComplete });

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
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-10 w-full border-0 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          {...props}
        />
        {showBrandIcon && (
          <div className="pointer-events-none absolute right-3 flex h-6 w-9 items-center justify-center">
            <BrandIcon
              className={cn(
                "h-full w-full",
                brand === "unknown" && "h-5 w-5 text-muted-foreground",
              )}
            />
          </div>
        )}
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
}

const CardExpiryInput = React.forwardRef<
  HTMLInputElement,
  CardExpiryInputProps
>(
  (
    {
      className,
      value: controlledValue,
      onChange,
      placeholder = "MM/YY",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");

    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatExpiry(e.target.value);

      if (isControlled) {
        onChange?.(formatted);
      } else {
        setInternalValue(formatted);
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={5}
        className={cn(
          "h-10 w-20 border-0 bg-transparent px-3 text-center text-sm outline-none placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
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
      value: controlledValue,
      onChange,
      brand = "unknown",
      placeholder = "CVC",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState("");
    const maxLength = getCvcMaxLength(brand);

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
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="cc-csc"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          "h-10 w-16 border-0 bg-transparent px-3 text-center text-sm outline-none placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
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
