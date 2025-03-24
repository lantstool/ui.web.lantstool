import { useStoreEntity } from '@react-vault';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useEmitVisitPageEvent = () => {
  const location = useLocation();
  const analytics = useStoreEntity((store) => store.analytics);

  useEffect(() => {
    if (!analytics) return;

    analytics.emitEvent({
      payload: {
        eventType: 'visit-page',
        eventData: {
          page: location.pathname,
        },
      },
    });
  }, [location.pathname, analytics]);
};
