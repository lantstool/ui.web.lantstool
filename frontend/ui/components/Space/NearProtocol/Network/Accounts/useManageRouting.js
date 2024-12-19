import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

export const useManageRouting = () => {
  const location = useLocation();
  const history = useStoreEntity((store) => store.history);

  const match = matchPath('/space/:spaceId/near-protocol/:networkId/accounts/*', location.pathname);

  useEffect(() => {
    if (!match) return;
    history.update(match.pathnameBase);
  }, [location.pathname]);
};
