import { List } from './List/List.jsx';
import { Empty } from './Empty/Empty.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { useLoader } from '../../../../../../store/hooks/useLoader.js';
import cn from './Transactions.module.css';

export const Transactions = () => {
  const list = useStoreState((store) => store.transactions.list);
  const getOnceTransactions = useStoreEffect((store) => store.transactions.getOnceTransactions);
  const [isLoading] = useLoader(getOnceTransactions);

  if (isLoading) return null;
  if (list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <List />
      <Outlet />
    </div>
  );
};
