import { useForm } from 'react-hook-form';
import { useStoreEffect } from '../../../../../react-vault';
import { Metadata } from './Metadata/Metadata.tsx';
import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import cn from './Transaction.module.css';

export const Transaction = ({ tx }: any) => {
  const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);

  const form = useForm({ defaultValues: tx });

  const onSubmit = (data: any) => {
    console.log(data);
    onSendTransaction(data);
  };

  const save = () => {
    const data = form.getValues();
    onSaveTransaction(data);
  }

  return (
    <div className={cn.transaction}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn.form}>
        <Metadata form={form} />
        <Actions form={form} />
        <To form={form} />
        <hr />
        <button type="submit">Submit</button>
        {' '}
        <button type="button" onClick={save}>Save</button>
      </form>
    </div>
  );
};
