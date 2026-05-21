import { Button } from '@gc/Button/Button.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { CreateAccount } from '../../../../../_general/CreateAccount/CreateAccount.jsx';
import { ImportAccount } from '../../../../../_general/ImportAccount/ImportAccount.jsx';
import cn from './Tip.module.scss';

export const Tip = ({ form }) => {
  const [isCreateOpen, openCreate, closeCreate] = useToggler();
  const [isImportOpen, openImport, closeImport] = useToggler();

  const { setValue } = form;

  const onCreated = ({ accountId, publicKey }) => {
    setValue('signerId', { value: accountId, label: accountId });
    setValue('signerKey', { value: publicKey, label: publicKey });
  };

  const setAccount = (value) => {
    setValue('signerId', { value, label: value });
    setValue('signerKey', null);
  };

  return (
    <div className={cn.tip}>
      <div className={cn.tipContainer}>
        <div className={cn.tipWrapper}>
          <div className={cn.tipIcon} />
          <h2 className={cn.tipTitle}>Tip</h2>
        </div>
        <p className={cn.tipText}>Create or import an account to send a transaction</p>
      </div>
      <div className={cn.btnWrapper}>
        <Button onClick={openImport} size="medium" color="secondary">
          Import
        </Button>
        <Button onClick={openCreate} size="medium">
          Create
        </Button>
      </div>
      {isCreateOpen && <CreateAccount closeModal={closeCreate} onCreated={onCreated} />}
      {isImportOpen && <ImportAccount closeModal={closeImport} setAccount={setAccount} />}
    </div>
  );
};
