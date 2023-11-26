import { useForm } from 'react-hook-form';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { Metadata } from './Metadata/Metadata.tsx';
import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import cn from './Transaction.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Form = ({ transaction, onSendTransaction, onSaveTransaction }: any) => {
  const form = useForm({ defaultValues: transaction });
  console.log('render form');
  const onSubmit = (data: any) => {
    console.log(data);
    onSendTransaction(data);
  };

  const save = () => {
    const data = form.getValues();
    onSaveTransaction(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn.form}>
      <Metadata form={form} />
      <Actions form={form} />
      <To form={form} />
      <hr />
      <button type="submit">Submit</button>{' '}
      <button type="button" onClick={save}>
        Save
      </button>
    </form>
  );
};

export const Transaction = () => {
  const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);
  const transactions: any = useStoreState((store: any) => store.transactions);
  const { transactionId }: any = useParams();

  const transaction = transactions.map[transactionId];

  if (!transaction) return <div>No Tx</div>;

  return (
    <div className={cn.transaction}>
      <Form
        key={transactionId}
        transaction={transaction}
        onSendTransaction={onSendTransaction}
        onSaveTransaction={onSaveTransaction}
      />
    </div>
  );
};
