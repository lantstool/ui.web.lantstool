import { useEffect, useState } from 'react';
import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreState = (selector, dependencies = []) => {
  const store = useStoreContext();
  const [selectedState, setSelectedState] = useState(store.state.useSelector(selector));

  useEffect(() => {
    setSelectedState(store.state.useSelector(selector));

    const unsubscribe = store.state.subscribe((state) => {
      const sliceState = selector(state);
      setSelectedState((prevState) => (Object.is(prevState, sliceState) ? prevState : sliceState));
    });

    return () => unsubscribe();
  }, dependencies);

  return selectedState;
};