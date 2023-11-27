import cn from './Sidebar.module.css';
import cnm from 'classnames';
import { useStoreAction } from '../../../../../react-vault';
import {AddAccount} from "./AddAccount/AddAccount.tsx";
export const Sidebar = ({ list, activeAccId }: any) => {
  const setActiveAccount = useStoreAction((store: any) => store.vault.setActiveAccount);
  const onClick = (id: any) => setActiveAccount(id);
//Ask about this creating new component "Account" for mapping
  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        {list.map((accountId: any) => (
          <div onClick={() => onClick(accountId)} key={accountId}>
            <p className={cnm(cn.text, activeAccId === accountId && cn.active)}>{accountId}</p>
          </div>
        ))}
      </div>
        <AddAccount list={list}/>
    </div>
  );
};
