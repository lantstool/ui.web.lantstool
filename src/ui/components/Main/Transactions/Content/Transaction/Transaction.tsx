import { useForm } from 'react-hook-form';
import { Topbar } from './Topbar/Topbar.tsx';
import { Metadata } from './Metadata/Metadata.tsx';
import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import cn from './Transaction.module.css';

export const Transaction = ({ transaction, onSendTransaction, onSaveTransaction }: any) => {
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
    <div className={cn.transaction}>
      <Topbar form={form} />
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <Metadata form={form} />
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
    </div>
  );
};
