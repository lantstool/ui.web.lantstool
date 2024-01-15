import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Content } from './Content/Content.tsx';
import { Empty } from './Empty/Empty.tsx';
import cn from './Transactions.module.css';
import { useStoreState, useStoreEffect } from '../../../../react-vault';

export const Transactions = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const networkId: any = useStoreState((store: any) => store.networks.current.networkId);
  const onInitPage = useStoreEffect((store: any) => store.transactions.onInitPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onInitPage(setLoading);
  }, [networkId]);

  if (loading) return <h3>Loading...</h3>;
  if (transactions.list.length === 0) return <Empty />;

  return (
    <div className={cn.transactions}>
      <Sidebar />
      <Routes>
        <Route index element={<div>Select TX</div>} />
        <Route path=":transactionId" element={<Content />} />
      </Routes>
    </div>
  );
};
