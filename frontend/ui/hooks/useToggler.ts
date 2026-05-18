import { useCallback, useState } from 'react';

type UseTogglerResult = [isOpen: boolean, open: () => void, close: () => void];

export const useToggler = (defaultState: boolean = false): UseTogglerResult => {
  const [isOpen, setOpen] = useState(defaultState);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return [isOpen, open, close];
};
