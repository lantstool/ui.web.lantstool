import { get } from 'lodash';
import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '../../../../../../../react-vault/index.js';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

export const useHandleNavigation = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);

  const match = matchPath(
    '/space/:spaceId/near-protocol/:networkId/accounts/*',
    location.pathname,
  );

  useEffect(() => {
    if (!match) return;
    const { spaceId, networkId } = match.params;

    // if (
    //   get(history.get(), ['', 'space', spaceId, 'near-protocol', networkId, 'accounts', 'next'])
    // ) {
    //   const destination = getDestination(history.get(), [
    //     '',
    //     'space',
    //     spaceId,
    //     'near-protocol',
    //     networkId,
    //     'accounts',
    //   ]).join('/');
    //   return navigate(destination, { replace: true });
    // }
    // If it's a first visit or user made double click and want to go exactly to the transactions page
    history.update(['', 'space', spaceId, 'near-protocol', networkId, 'accounts']);
  }, [location.pathname]);
};
