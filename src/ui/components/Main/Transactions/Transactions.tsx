import { useEffect, useState } from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Transaction } from './Transaction/Transaction.tsx';
import { Empty } from './Empty/Empty.tsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';

export const Transactions = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onInitPage = useStoreEffect((store: any) => store.transactions.onInitPage);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const match: any = useMatch('/transactions/:transactionId');
  const transaction = transactions.map[match?.params?.transactionId];

  useEffect(() => {
    onInitPage(setLoading);
  }, [onInitPage]);

  if (loading) return <h3>Loading...</h3>;
  if (transactions.list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <Sidebar activeTransactionId={transaction?.transactionId} />
      <Routes>
        <Route index element={<div>Select TX</div>} />
        <Route path=":transactionId" element={<Transaction />} />
      </Routes>
    </div>
  );
};
