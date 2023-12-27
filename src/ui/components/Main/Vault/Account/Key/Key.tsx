import cn from './Key.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { PrivateItem } from './PrivateItem/PrivateItem.tsx';
import { PublicItem } from './PublicItem/PublicItem.tsx';
import { RemoveButton } from '../../../../general/Buttons/RemoveButton/RemoveButton.tsx';
import { Label } from './Label/Label.tsx';

export const Key = ({ account }: any) => {
  const onRemoveKey = useStoreEffect((store: any) => store.vault.onRemoveKey);
  const permission = account.permission === 'FullAccess' ? 'Full access' : 'Function call';
  const receiverId = account.receiverId === null ? '' : account.receiverId;
  const removeKey = () => {
    onRemoveKey(account);
  };

  return (
    <div className={cn.key}>
      <div className={cn.container}>
        <div className={cn.infoGroup}>
          <Label name={account.storageType} type="ledger" />
          <Label name={`${permission} ${receiverId}`} type="functionCall" />
        </div>
        <RemoveButton remove={removeKey} />
      </div>
      <PublicItem name={account.publicKey} />
      <PrivateItem name={account.privateKey} />
      {account.seedPhrase && <PrivateItem name={account.seedPhrase} />}
    </div>
  );
};
