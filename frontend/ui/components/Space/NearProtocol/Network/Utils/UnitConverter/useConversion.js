import { useEffect } from 'react';
import { useDebounce } from '@hooks/useDebounce.js';

export const useConversion = (from, to, converterFn, setValue, decimals, delay = 200) => {
  const debouncedValue = useDebounce(from, delay);

  useEffect(() => {
    // if (debouncedValue === '') {
    //   setValue(to, '');
    //   return;
    // }

    try {
      const convertedValue = converterFn(debouncedValue, decimals.value);
      setValue(to, convertedValue, { shouldDirty: true });
    } catch (e) {

    }

  }, [debouncedValue, decimals, setValue]);
};
