import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '../../../../react-vault/index.js';

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);
  const match = matchPath('/space', location.pathname);

  useEffect(() => {
    if (!match) return;

    const destination = history.getDestination(location.pathname);
    if (destination) return navigate(destination, { replace: true });

    navigate('../spaces', { relative: 'path', replace: true });
  }, [location.pathname]);
};
