import { useStoreState } from '../../../../react-vault';
import cn from './Vault.module.css';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Account } from './Account/Account.tsx';
import { useStoreEffect } from '../../../../react-vault';
import {useEffect, useState} from 'react';

export const Vault = () => {
  const onInitPage = useStoreEffect((store: any) => store.vault.onInitPage);
  const list: any = useStoreState((store: any) => store.vault.list);
  const map: any = useStoreState((store: any) => store.vault.map);
  const activeAccId: any = useStoreState((store: any) => store.vault.active);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
     onInitPage(setLoading);
  }, [onInitPage]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className={cn.container}>
      <Sidebar list={list} activeAccId={activeAccId} />
      <Account map={map} activeAccId={activeAccId} />
    </div>
  );
};
