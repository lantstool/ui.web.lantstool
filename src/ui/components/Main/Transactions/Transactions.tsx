import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Empty } from './Empty/Empty.tsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../../store/slices/navigation/useNavigateToSavedRoute.ts';

export const Transactions = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onInitPage = useStoreEffect((store: any) => store.transactions.onInitPage);
  const [loading, setLoading] = useState(true);

  useNavigateToSavedRoute('/:currentNetworkId/transactions');

  useEffect(() => {
    onInitPage(setLoading);
  }, []);

  if (loading) return null;
  if (transactions.list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
