import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';
import { RemoveAccount } from './RemoveAccount/RemoveAccount.tsx';
import { useParams } from 'react-router-dom';
import { ImportKey } from './ImportKey/ImportKey.tsx';
import { replaceStringToDots } from '../../../../../store/vault/helpers/regularExpressions.ts';
import { useStoreState } from '../../../../../react-vault';

export const Account = ({ map }: any) => {
  const { accountId }: any = useParams();
  const accId = replaceStringToDots(accountId);
  const accountMap: any = useStoreState((store: any) => store.vault.map[accId]);

  if (!accountMap) return <div className={cn.container}>No Tx</div>;
  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>{accId}</h2>
        <div className={cn.buttonGroup}>
          <ImportKey accountId={accId} />
          <RemoveAccount accountId={accId} />
        </div>
      </div>
      <div className={cn.keyContainer}>
        <div className={cn.keyWrapper}>
          {map[accId].list.map(
            (accountKey: any) =>
              accountKey && <Key key={accountKey} keyData={map[accId].map[accountKey]} />,
          )}
        </div>
      </div>
    </div>
  );
};
