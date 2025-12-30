"use client";

import * as React from "react";

/**
 * Hook for components that support both controlled and uncontrolled modes.
 *
 * @param controlledValue - The controlled value (if provided)
 * @param defaultValue - The default value for uncontrolled mode
 * @param onChange - Callback fired when value changes
 * @returns A tuple of [currentValue, setValue]
 *
 * @example
 * ```tsx
 * interface Props {
 *   value?: string;
 *   defaultValue?: string;
 *   onValueChange?: (value: string) => void;
 * }
 *
 * function Input({ value, defaultValue = "", onValueChange }: Props) {
 *   const [currentValue, setValue] = useControllableState(
 *     value,
 *     defaultValue,
 *     onValueChange,
 *   );
 *
 *   return (
 *     <input
 *       value={currentValue}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function useControllableState<T>(
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
