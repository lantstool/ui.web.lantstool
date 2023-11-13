import { useEffect, useRef, useState } from 'react';
import { useStoreContext } from '../provider/StoreProvider';

export const useStoreState = (selector) => {
  const store = useStoreContext();
  const [, provokeUpdate] = useState(false);
  const selectorRef = useRef();
  const stateSliceRef = useRef();

  selectorRef.current = selector;
  stateSliceRef.current = store.state.useSelector(selector);

  useEffect(() => {
    const unsubscribe = store.state.subscribe((state) => {
      if (Object.is(stateSliceRef.current, selectorRef.current(state))) return;
      provokeUpdate((v) => !v);
    });

    return () => {
      unsubscribe();
    };
  }, [store.state]);

  return stateSliceRef.current;
};
