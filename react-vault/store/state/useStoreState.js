import { useEffect, useState } from 'react';
import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreState = (selector, dependencies = []) => {
  const store = useStoreContext();
  const [selectedState, setSelectedState] = useState(store.state.useSelector(selector));

  useEffect(() => {
    setSelectedState(store.state.useSelector(selector));

    const unsubscribe = store.state.subscribe((state) => {
      if (Object.is(selectedState, selector(state))) return;
      setSelectedState(selector(state));
    });

    return () => unsubscribe();
  }, dependencies);

  return selectedState;
};
