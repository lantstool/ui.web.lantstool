import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import { useMemo } from 'react';
import cn from './Body.module.css';

const getFormDefaultValues = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
  };
};

export const Body = ({ transaction }: any) => {
  const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);

  const formDefaultValues = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  const form = useForm({ defaultValues: formDefaultValues });

  const onSubmit = form.handleSubmit((data: any) => {
    onSendTransaction(data);
  });

  const save = () => {
    const data = form.getValues();
    onSaveTransaction(data);
  };

  return (
    <>
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div>
            <h3 className={cn.title}>Sender</h3>
            <SignerAccount form={form} />
            <SignerKey form={form} />
          </div>
          <Actions form={form} />
          <To form={form} />
        </form>
      </div>
      <div className={cn.bottomBar}>
        <button type="button" onClick={onSubmit}>
          Sent Transaction
        </button>{' '}
        <button type="button" onClick={save}>
          Save
        </button>
      </div>
    </>
  );
};
