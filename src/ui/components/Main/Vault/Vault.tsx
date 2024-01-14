import { useStoreState } from '../../../../react-vault';
import cn from './Vault.module.css';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Empty } from './Empty/Empty.tsx';
import { useStoreEffect } from '../../../../react-vault';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useNavigateToSavedRoute } from "../../../../store/slices/navigation/useNavigateToSavedRoute.ts";

export const Vault = () => {
  const onInitPage = useStoreEffect((store: any) => store.vault.onInitPage);
  const list: any = useStoreState((store: any) => store.vault.list);
  const networkId: string = useStoreState((store: any) => store.networks.current.networkId);
  const [loading, setLoading] = useState(true);

  useNavigateToSavedRoute('/:currentNetworkId/vault');

  useEffect(() => {
    onInitPage(setLoading);
  }, [networkId]);

  if (loading) return null;
  if (list.length == 0) return <Empty list={list} />;

  return (
    <div className={cn.container}>
      <Sidebar list={list} />
      <Outlet />
    </div>
  );
};
