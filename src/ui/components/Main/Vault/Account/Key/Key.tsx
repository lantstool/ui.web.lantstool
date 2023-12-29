import cn from './Key.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { PrivateItem } from './PrivateItem/PrivateItem.tsx';
import { PublicItem } from './PublicItem/PublicItem.tsx';
import { RemoveButton } from '../../../../general/Buttons/RemoveButton/RemoveButton.tsx';
import { Label } from './Label/Label.tsx';

export const Key = ({ keyData }: any) => {
  const { permission, storageType, publicKey, privateKey, seedPhrase }: any = keyData;
  const onRemoveKey = useStoreEffect((store: any) => store.vault.onRemoveKey);
  const permissions = permission === 'FullAccess' ? 'Full access' : 'Function call';
  const permissionType = permission === 'FullAccess' ? 'fullAccess' : 'functionCall';
  const receiverId = permission !== 'FullAccess' ? `: ${permission?.FunctionCall.receiver_id}` : '';

  const removeKey = () => {
    onRemoveKey(keyData);
  };

  return (
    <div className={cn.key}>
      <div className={cn.container}>
        <div className={cn.infoGroup}>
          <Label text={storageType} type={storageType} />
          <Label text={`${permissions} ${receiverId}`} type={permissionType} />
        </div>
        <RemoveButton remove={removeKey} />
      </div>
      <PublicItem text={publicKey} />
      <PrivateItem text={privateKey} />
      {seedPhrase && <PrivateItem text={seedPhrase} />}
    </div>
  );
};
