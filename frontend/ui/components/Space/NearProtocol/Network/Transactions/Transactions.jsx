import { List } from './List/List.jsx';
import { Empty } from './Empty/Empty.jsx';
import { useStoreState, useStoreEffect } from '../../../../../../../react-vault/index.js';
import { Outlet } from 'react-router-dom';
import { useLoader } from '../../../../../hooks/useLoader.js';
import cn from './Transactions.module.scss';

export const Transactions = () => {
  // const list = useStoreState((store) => store.transactions.list);
  const list = [];
  const map = {};
  // const getOnceTransactions = useStoreEffect((store) => store.transactions.getOnceTransactions);
  // const [isLoading] = useLoader(getOnceTransactions);
  //
  // if (isLoading) return null;
  if (list.length === 0) return <Empty />;

  // return (
  //   <div>
  //     <h1>Transactions</h1>
  //     <Outlet />
  //   </div>
  // );

  return (
    <div className={cn.transactions}>
      <List list={list} map={map} />
      <Outlet />
    </div>
  );
};
