import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Transaction } from './Transaction/Transaction.tsx';
import { Empty } from './Empty/Empty.tsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';

export const Transactions = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onInitPage = useStoreEffect((store: any) => store.transactions.onInitPage);
  const [loading, setLoading] = useState(true);
  const tx = transactions?.map[transactions?.active];

  useEffect(() => {
    onInitPage(setLoading);
  }, [onInitPage]);

  if (loading) return <p>Loading...</p>;

  if (transactions.list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <Sidebar />
      <Transaction tx={tx} key={tx.transactionId} />
    </div>
  );
};
