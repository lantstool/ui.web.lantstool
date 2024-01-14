import { useStoreAction, useStoreEffect } from "../../react-vault";
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const RootLoader = () => {
  const onInitApp = useStoreEffect((store: any) => store.onInitApp);
  const setCurrentLocation = useStoreAction((store: any) => store.navigation.setCurrentLocation);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await onInitApp({ navigate });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === '/') return; // Skip initial render when location is '/'
    setCurrentLocation(location);// TODO rename to save
  }, [location, setCurrentLocation]);

  return loading ? null : <Outlet />;
};
