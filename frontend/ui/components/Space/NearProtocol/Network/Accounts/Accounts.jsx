import cn from './Accounts.module.css';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { Empty } from './Empty/Empty.jsx';
import { useLoader } from '../../../../../hooks/useLoader.js';

export const Accounts = () => {
  const ids = useStoreState((store) => store.accounts.ids);
  const getOnceAccounts = useStoreEffect((store) => store.accounts.getOnceAccounts);

  const [isLoading] = useLoader(getOnceAccounts);

  if (isLoading) return null;

  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.accounts}>
      <Outlet />
    </div>
  );
};
