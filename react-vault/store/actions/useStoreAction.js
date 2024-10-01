/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreAction = (selector) => {
  const store = useStoreContext();
  const actions = store.actions.useSelector(selector);
  return useCallback((payload) => store.actions.useSelector(selector)(payload), [actions]);
};
