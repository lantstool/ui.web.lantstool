import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);

  const match = matchPath('/space/:spaceId/near-protocol/:networkId/utils', location.pathname);

  useEffect(() => {
    if (!match) return;
    // When user visit the utils page for the first time redirect him to the
    // default route;
    const destination = history.getDestination(location.pathname) || './key-generator';
    navigate(destination, { replace: true });
  }, [location.pathname]);
};
