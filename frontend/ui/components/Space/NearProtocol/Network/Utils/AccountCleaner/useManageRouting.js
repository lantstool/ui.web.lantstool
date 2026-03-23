import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

/**
  This page available only on mainnet as the service for fetching a paginated state
  is available only on mainnet; If user will try to reach the page from any other networks
  via entering the URL - we will redirect him to 404;
 */
export const useManageRouting = (isAvailableNetwork) => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);

  useEffect(() => {
    if (isAvailableNetwork) {
      history.update(location.pathname);
    } else {
      navigate('/page-not-found', {
        replace: true,
        state: { message: `Page ${location.pathname} not found` },
      });
    }
  }, [isAvailableNetwork]);
};
