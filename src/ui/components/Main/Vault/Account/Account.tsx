import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';
import { SideMenu } from './SideMenu/SideMenu.tsx';
import { useParams } from 'react-router-dom';
import { ImportKey } from './ImportKey/ImportKey.tsx';
import { replaceStringToDots } from '../../../../../store/slices/vault/helpers/regularExpressions.ts';
import { useStoreState } from '../../../../../react-vault';

export const Account = () => {
  const { accountId }: any = useParams();
  const map: any = useStoreState((store: any) => store.vault.map);
  const accId = replaceStringToDots(accountId);
  const accountMap: any = useStoreState((store: any) => store.vault.map[accId]);

  if (!accountMap) return <div className={cn.container}>No Tx</div>;

  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>{accId}</h2>
        <div className={cn.buttonGroup}>
          <ImportKey accountId={accId} />
          <SideMenu accountId={accId} />
        </div>
      </div>
      <div className={cn.keyContainer}>
        {map[accId].list.map(
          (accountKey: any) =>
            accountKey && <Key key={accountKey} keyData={map[accId].map[accountKey]} />,
        )}
      </div>
    </div>
  );
};
