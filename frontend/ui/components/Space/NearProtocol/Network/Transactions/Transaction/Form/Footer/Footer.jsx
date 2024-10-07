import cn from './Footer.module.css';
import { Button } from '../../../../_general/Button/Button.jsx';
import sendTx from '../../../../../../../../assets/sendTransaction.svg';
import { RestorIcon } from '../../../../../../../_general/icons/RestorIcon.jsx';
import { SaveIcon } from '../../../../../../../_general/icons/SaveIcon.jsx';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useFormState } from 'react-hook-form';

export const Footer = ({ form }) => {
  const sendTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onSendTransaction,
  );
  const saveTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onSaveTransaction,
  );
  const revertTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.revertTransaction,
  );
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = form.handleSubmit((formValues) => {
    sendTransaction({ formValues });
  });

  const revert = () => revertTransaction(form);
  const save = () => saveTransaction(form);

  return (
    <div className={cn.bottomBar}>
      <div className={cn.sendTransaction}>
        <Button text="Send Transaction" onClick={onSubmit} src={sendTx} />
      </div>
      {isDirty && (
        <div className={cn.buttonWrapper}>
          <button className={cn.button} type="button" onClick={revert}>
            <RestorIcon style={cn.icon} />
          </button>
          <button className={cn.button} type="button" onClick={save}>
            <SaveIcon style={cn.icon} />
          </button>
        </div>
      )}
    </div>
  );
};
