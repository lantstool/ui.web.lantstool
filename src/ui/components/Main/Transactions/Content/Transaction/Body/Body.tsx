import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import cn from './Body.module.css';

export const Body = ({ transaction }: any) => {
  const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);
  const form = useForm({ defaultValues: transaction });

  const onSubmit = form.handleSubmit((data: any) => {
    console.log(data);
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
            <h3>Sender</h3>
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
