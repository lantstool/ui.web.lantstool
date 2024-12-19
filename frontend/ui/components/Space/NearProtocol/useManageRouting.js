import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);

  const match = matchPath('/space/:spaceId/near-protocol', location.pathname);

  useEffect(() => {
    if (!match) return;

    const destination = history.getDestination(location.pathname);
    if (destination) return navigate(destination, { replace: true });

    navigate('./networks', { relative: 'path', replace: true });
  }, [location.pathname]);
};
