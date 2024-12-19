import { useCallback, useState } from 'react';

export const useToggler = (defaultState = false) => {
  const [isOpen, setOpen] = useState(defaultState);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return [isOpen, open, close];
};
