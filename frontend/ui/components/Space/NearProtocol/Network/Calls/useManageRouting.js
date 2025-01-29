import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);

  const match = matchPath('/space/:spaceId/near-protocol/:networkId/calls', location.pathname);

  useEffect(() => {
    if (!match) return;

    const destination = history.getDestination(location.pathname);
    if (destination) return navigate(destination, { replace: true });

    history.update(location.pathname);
  }, [location.pathname]);
};
