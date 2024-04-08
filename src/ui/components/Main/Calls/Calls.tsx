import { useEffect, useState } from 'react';
import { List } from './List/List.tsx';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.ts';
import { Empty } from './Empty/Empty.tsx';
import cn from './Calls.module.css';

export const Calls = () => {
  const ids: any = useStoreState((store: any) => store.calls.ids);
  const getCalls = useStoreEffect((store: any) => store.calls.getCalls);
  const [loading, setLoading] = useState(true);

  useNavigateToSavedRoute('/:currentNetworkId/calls');

  useEffect(() => {
    getCalls(setLoading);
  }, []);

  if (loading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List ids={ids} />
      <Outlet />
    </div>
  );
};
