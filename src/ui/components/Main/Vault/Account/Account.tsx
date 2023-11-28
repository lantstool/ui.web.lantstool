import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';
import {RemoveAccount} from "./RemoveAccount/RemoveAccount.tsx";

export const Account = ({ map, activeAccId }: any) => {
  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>{activeAccId}</h2>
        <div className={cn.buttonGroup}>
          <button className={cn.buttonImport}>Import key</button>
          <RemoveAccount activeAccId={activeAccId}/>
        </div>
      </div>
      <div className={cn.keyWrapper}>
        {map[activeAccId]?.map(
          (accountKey: any) =>
            accountKey.publicKey && <Key key={accountKey.publicKey} accountKey={accountKey} />,
        )}
      </div>
    </div>
  );
};
