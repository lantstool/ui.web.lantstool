/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useStoreContext } from '../provider/StoreProvider';

export const useStoreEffect = (selector) => {
  const store = useStoreContext();
  const effect = store.effects.useSelector(selector);
  return useCallback((payload) => store.effects.useSelector(selector)(payload), [effect]);
};
