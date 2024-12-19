import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEffect, useStoreEntity } from '@react-vault';

/*
 We start this handler only if user navigate to '/' path - this is a technical route,
 and we don't have a content to show to the user on this page. It means that the app
 has to decide where to redirect the user next.
 */

export const useManageRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);
  const getCount = useStoreEffect((store) => store.spaces.getCount);
  const match = matchPath('/', location.pathname);

  useEffect(() => {
    // Ignore all routes except this one - we have different handlers for different routes
    if (!match || !history) return;
    // If history has the record about user's last visit - redirect him to it
    const destination = history.getDestination(location.pathname);
    if (destination) return navigate(destination, { replace: true });
    // Next, we can have a situation either this is the user's first visit or user
    // cleared the history - if user already familiar with the app (has at least 1 space) -
    // lead him to the Spaces page
    (async () => {
      const count = await getCount();
      const destination = count === 0 ? '/get-started' : '/spaces';
      navigate(destination, { replace: true });
    })();
  }, [location.pathname, history]);
};
