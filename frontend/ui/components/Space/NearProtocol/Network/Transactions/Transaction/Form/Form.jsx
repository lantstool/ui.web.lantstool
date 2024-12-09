import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '@react-vault';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import { AccountCircleOutline } from '../../../../../../_general/icons/AccountCircleOutline.jsx';
import { Topbar } from './Topbar/Topbar.jsx';
import { ActionBar } from './Topbar/ActionBar/ActionBar.jsx';
import cn from './Form.module.scss';

export const Form = ({ transaction }) => {
  const { transactionId, body } = transaction;
  const draft = useStoreState(
    (store) => store.nearProtocol.transactions.drafts[transactionId],
    [transactionId],
  );
  const setDraft = useStoreAction((store) => store.nearProtocol.transactions.setDraft);

  const form = useForm({ defaultValues: body });

  useEffect(() => {
    form.reset(body);
    if (draft) form.reset(draft, { keepDefaultValues: true });
    return () => setDraft({ transactionId, draft: form.getValues() });
  }, [transactionId]);

  return (
    <div className={cn.form}>
      <form className={cn.formContainer}>
        <Topbar form={form} transaction={transaction} />
        <div className={cn.details}>
          <AccountCircleOutline style={cn.icon} />
          <h3 className={cn.title}>Signer details</h3>
        </div>
        <SignerId form={form} />
        <SignerKey form={form} />
        <Actions form={form} />
        <ReceiverId form={form} />
        <ActionBar form={form} transaction={transaction} />
      </form>
    </div>
  );
};
