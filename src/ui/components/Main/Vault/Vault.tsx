import { useStoreState } from '../../../../react-vault';
import cn from './Vault.module.css';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Account } from './Account/Account.tsx';
import { Empty } from './Empty/Empty.tsx';
import { useStoreEffect } from '../../../../react-vault';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

export const Vault = () => {
  const onInitPage = useStoreEffect((store: any) => store.vault.onInitPage);
  const list: any = useStoreState((store: any) => store.vault.list);
  const map: any = useStoreState((store: any) => store.vault.map);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onInitPage(setLoading);
  }, [onInitPage]);

  if (loading) return <p>Loading...</p>;
  if (list.length == 0) return <Empty list={list} />;

  return (
    <div className={cn.container}>
      <Sidebar list={list} />
      <Routes>
        <Route path=":accountId" element={<Account map={map} />} />
      </Routes>
    </div>
  );
};
