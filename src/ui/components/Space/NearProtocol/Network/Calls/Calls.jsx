import { List } from './List/List.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../../../store/slices/navigation/useNavigateToSavedRoute.js';
import { Empty } from './Empty/Empty.jsx';
import cn from './Calls.module.css';
import { useLoader } from '../../../../../../store/hooks/useLoader.js';

export const Calls = () => {
  const ids = useStoreState((store) => store.calls.ids);
  const getOnceCalls = useStoreEffect((store) => store.calls.getOnceCalls);
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
