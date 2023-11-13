import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Transaction } from './Transaction/Transaction.tsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { useEffect, useState } from 'react';

export const Transactions = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onInitPage = useStoreEffect((store: any) => store.transactions.onInitPage);
  const tx = transactions.map[transactions.active];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onInitPage(setLoading);
  }, [onInitPage]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={cn.container}>
      <Sidebar />
      <Transaction tx={tx} key={tx.transactionId} />
    </div>
  );
};
