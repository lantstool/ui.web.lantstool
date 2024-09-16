import { useStoreEffect } from '../../../react-vault/index.js';
import { useMatch, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useNavigateToSavedRoute = (triggerPattern, fallbackRoute) => {
  const navigateTo = useStoreEffect((store) => store.navigation.navigateTo);
  const match = useMatch(triggerPattern);
  const navigate = useNavigate();

  useEffect(() => {
    if (match) navigateTo({ match, navigate, fallbackRoute });
  }, [match]);
};
