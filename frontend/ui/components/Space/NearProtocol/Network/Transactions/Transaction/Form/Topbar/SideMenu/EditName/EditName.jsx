import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect } from 'react';
import cn from './EditName.module.scss';

export const EditName = ({ transaction }) => {
  const { name, transactionId } = transaction;
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, setValue, reset, handleSubmit } = form;

  useEffect(() => {
    setValue('name', name);
  }, [name]);

  const editName = handleSubmit((formValues) => {
    updateOneName({ formValues, transactionId });
    reset();
  });

  return (
    <div className={cn.container}>
      <input
        {...register('name')}
        onBlur={editName}
        placeholder="Untitled transaction"
        className={cn.input}
      />
    </div>
  );
};
