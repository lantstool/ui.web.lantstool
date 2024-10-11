import { useParams } from 'react-router-dom';
import { Button } from '../../../../_general/Button/Button.jsx';
import sendTx from '../../../../../../../../assets/sendTransaction.svg';
import { RestorIcon } from '../../../../../../../../assets/components/RestorIcon.jsx';
import { SaveIcon } from '../../../../../../../../assets/components/SaveIcon.jsx';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useFormState } from 'react-hook-form';
import cn from './Footer.module.scss';

export const Footer = ({ form }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const sendOne = useStoreEffect((store) => store.nearProtocol.transactions.sendOne);
  const save = useStoreEffect((store) => store.nearProtocol.transactions.save);
  const revertTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.revertTransaction,
  );
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = form.handleSubmit((formValues) => {
    sendOne({ formValues, spaceId, networkId, transactionId });
  });

  const revert = () => revertTransaction(form);
  const saveTx = () => save({ form, transactionId });

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
          <button className={cn.button} type="button" onClick={saveTx}>
            <SaveIcon style={cn.icon} />
          </button>
        </div>
      )}
    </div>
  );
};
