import { useForm } from 'react-hook-form';
import { useStoreAction } from '@react-vault';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import { Topbar } from './Topbar/Topbar.jsx';
import { ActionBar } from './ActionBar/ActionBar.jsx';
import cn from './Form.module.scss';

export const Form = ({ transaction, draft }) => {
  const { transactionId, body } = transaction;
  const setDraft = useStoreAction((store) => store.nearProtocol.transactions.setDraft);
  const form = useForm({ defaultValues: body });

  useEffect(() => {
    form.reset(draft);
    return () => setDraft({ transactionId, draft: form.getValues() });
  }, [transactionId]);

  return (
    <div className={cn.form}>
      <form className={cn.formContainer}>
        <Topbar transaction={transaction} />
        <div className={cn.label}>
          <span className={cn.icon} />
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
