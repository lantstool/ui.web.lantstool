import { useStoreAction, useStoreEffect } from "../../react-vault";
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";

export const RootLoader = () => {
  const onInitApp = useStoreEffect((store: any) => store.onInitApp);
  const setCurrentLocation = useStoreAction((store: any) => store.navigation.setCurrentLocation);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await onInitApp();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setCurrentLocation(location);
  }, [location, setCurrentLocation]);

  return loading ? null : <Outlet />;
};
