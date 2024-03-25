import cn from './Accounts.module.css';
import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { Outlet } from 'react-router-dom';
import { Empty } from './Empty/Empty.tsx';
import { useLoader } from '../../../../store/hooks/useLoader.ts';

export const Accounts = () => {
  const ids: string[] = useStoreState((store: any) => store.accounts.ids);
  const getOnceAccounts = useStoreEffect((store: any) => store.accounts.getOnceAccounts);

  const [isLoading] = useLoader(getOnceAccounts);

  if (isLoading) return null;

  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.accounts}>
      <Outlet />
    </div>
  );
};
