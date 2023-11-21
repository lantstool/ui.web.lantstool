import { useStoreState } from '../../../../react-vault';
import cn from './Vault.module.css';
import { Sidebar } from './Sidebar/Sidebar.tsx';
import { Account } from './Account/Account.tsx';

export const Vault = () => {
  const list: any = useStoreState((store: any) => store.vault.list);
  const map: any = useStoreState((store: any) => store.vault.map);
  const activeAccId: any = useStoreState((store: any) => store.vault.active);

  return (
    <div className={cn.container}>
      <Sidebar list={list} activeAccId={activeAccId}/>
      <Account map={map} activeAccId={activeAccId} />
    </div>
  );
};
