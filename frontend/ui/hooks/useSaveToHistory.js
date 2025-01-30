import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

export const useSaveToHistory = () => {
  const history = useStoreEntity((store) => store.history);
  const location = useLocation();

  useEffect(() => {
    history.update(location.pathname);
  }, [location.pathname, history]);
};
