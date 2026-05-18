import { useEffect, useState } from 'react';

/**
 * Custom React hook that debounce a value after a specified delay.
 *
 *  @param value - The value to debounce.
 *  @param delay - The delay in milliseconds before updating the value.
 *  @returns The debounced value (same type as input).
 */

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup previous timeout if value changes
  }, [value, delay]);

  return debouncedValue;
};
