import { useSyncExternalStore } from 'react';
import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreState = (selector) => {
  const store = useStoreContext();
  return useSyncExternalStore(store.state.subscribe, () => store.state.useSelector(selector));
};
