import { useCallback } from 'react';
import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreEffect = (selector) => {
  const store = useStoreContext();
  const effect = store.effects.useSelector(selector);
  return useCallback((payload = null) => store.effects.useSelector(selector)(payload), [effect]);
};
