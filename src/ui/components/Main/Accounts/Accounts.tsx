import cn from './Accounts.module.css';
import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Empty } from './Empty/Empty.tsx';

export const Accounts = () => {
  const ids: string[] = useStoreState((store: any) => store.accounts.ids);
  const getOnceAccounts = useStoreEffect((store: any) => store.accounts.getOnceAccounts);

  useEffect(() => {
    getOnceAccounts();
  }, []);

  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.accounts}>
      <div className={cn.card}>
        <Outlet />
      </div>
    </div>
  );
};
