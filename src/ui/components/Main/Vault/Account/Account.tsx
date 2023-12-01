import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';
import { RemoveAccount } from './RemoveAccount/RemoveAccount.tsx';
import { useParams } from 'react-router-dom';
import { ImportKey } from './ImportKey/ImportKey.tsx';

export const Account = ({ map }: any) => {
  const { accountId }: any = useParams();
  const accId = accountId.replace(/-dot-/g, '.');

  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>{accId}</h2>
        <div className={cn.buttonGroup}>
          <ImportKey accountId={accId} />
          <RemoveAccount accountId={accId} />
        </div>
      </div>
      <div className={cn.keyWrapper}>
        {map[accId]?.map(
          (accountKey: any) =>
            accountKey.publicKey && <Key key={accountKey.publicKey} accountKey={accountKey} />,
        )}
      </div>
    </div>
  );
};
