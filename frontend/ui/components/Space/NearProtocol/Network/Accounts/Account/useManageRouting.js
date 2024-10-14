import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const match = matchPath(
    '/space/:spaceId/near-protocol/:networkId/accounts/:accountId',
    location.pathname,
  );

  useEffect(() => {
    if (!match) return;
    navigate('./details', { relative: 'path', replace: true });
  }, [location.pathname]);
};
