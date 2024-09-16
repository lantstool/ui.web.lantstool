import { useStoreAction, useStoreEffect } from '../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const App = () => {
  const onInitApp = useStoreEffect((store) => store.onInitApp);
  const setCurrentLocation = useStoreAction((store) => store.navigation.setCurrentLocation);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     await onInitApp({ navigate });
  //     setLoading(false);
  //   })();
  // }, []);

  return loading ? null : <Outlet />;
};
