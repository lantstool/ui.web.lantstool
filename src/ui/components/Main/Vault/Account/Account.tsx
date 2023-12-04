import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';
import { RemoveAccount } from './RemoveAccount/RemoveAccount.tsx';
import { useParams } from 'react-router-dom';
import { ImportKey } from './ImportKey/ImportKey.tsx';
import { replaceStringToDots } from '../../../../../store/vault/helpers/replaceDots.ts';

export const Account = ({ map }: any) => {
  const { accountId }: any = useParams();
  const accId = replaceStringToDots(accountId);

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
        {map[accId]?.list?.map(
          (accountKey: any) =>
            accountKey && (
              <Key key={accountKey} publicKey={accountKey} account={map[accId].map[accountKey]} />
            ),
        )}
      </div>
    </div>
  );
};
