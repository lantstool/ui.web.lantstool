import { List } from './List/List.tsx';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.ts';
import { Empty } from './Empty/Empty.tsx';
import { useLoader } from "../../../../store/hooks/useLoader.ts";
import cn from './Contracts.module.css';

export const Contracts = () => {
  const ids: any = useStoreState((store: any) => store.contracts.ids);
  const loadContractsOnce = useStoreEffect((store: any) => store.contracts.loadContractsOnce);
  const [isLoading] = useLoader(loadContractsOnce);

  useNavigateToSavedRoute('/:currentNetworkId/contracts');

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.calls}>
      <List ids={ids} />
      <Outlet />
    </div>
  );
};
