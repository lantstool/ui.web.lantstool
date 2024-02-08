import { useEffect, useState } from 'react';
import { CallsList } from './CallsList/CallsList.tsx';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.ts';
import { Empty } from './Empty/Empty.tsx';
import cn from './Calls.module.css';

export const Calls = () => {
  const calls: any = useStoreState((store: any) => store.calls);
  const getCalls = useStoreEffect((store: any) => store.calls.getCalls);
  const [loading, setLoading] = useState(true);

  useNavigateToSavedRoute('/:currentNetworkId/calls');

  useEffect(() => {
    getCalls(setLoading);  // TODO fetch only ids, not all data
  }, []);

  if (loading) return null;
  if (calls.list.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <CallsList />
      <Outlet />
    </div>
  );
};
