import { useStoreEntity } from '@react-vault';
import { useEffect } from 'react';

export const useEmitOpenPageEvent = (eventData, deps = []) => {
  const [analytics] = useStoreEntity((store) => store.analytics);

  useEffect(() => {
    analytics.openPage();
  }, deps);
};
