import { List } from './List/List.tsx';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.ts';
import { Empty } from './Empty/Empty.tsx';
import cn from './Calls.module.css';
import { useLoader } from '../../../../store/hooks/useLoader.js';

export const Calls = () => {
  const ids: any = useStoreState((store: any) => store.calls.ids);
  const getOnceCalls = useStoreEffect((store: any) => store.calls.getOnceCalls);
  const [isLoading] = useLoader(getOnceCalls);

  useNavigateToSavedRoute('/:currentNetworkId/calls');

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List ids={ids} />
      <Outlet />
    </div>
  );
};
