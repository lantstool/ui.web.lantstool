import { Outlet } from 'react-router-dom';
import { useStoreEffect } from '../../../../react-vault';
import { useEffect } from 'react';

export const RoutWrapper = () => {
  const getKeys = useStoreEffect((store: any) => store.keys.getKeys);

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};
