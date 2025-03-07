import { useEffect, useState } from 'react';

/**
 * Custom React hook that debounce a value after a specified delay.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds before updating the value.
 * @returns {any} - The debounced value.
 */

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup previous timeout if value changes
  }, [value, delay]);

  return debouncedValue;
};
