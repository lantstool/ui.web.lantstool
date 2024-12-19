import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect, useState } from 'react';
import cn from './EditName.module.scss';

export const EditName = ({ transaction }) => {
  const { name, transactionId } = transaction;
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, reset, handleSubmit } = form;

  useEffect(() => {
    reset({ name });
  }, [name, transactionId]);

  const editName = handleSubmit((formValues) => {
    updateOneName({ formValues, transactionId });
    setIsEditing(false);
  });

  const changeMode = () => {
    setIsEditing(!isEditing);
  };

  return isEditing ? (
    <div>
      <input
        {...register('name')}
        className={cn.input}
        autoFocus
        maxLength={100}
        onBlur={editName}
      />
    </div>
  ) : (
    <div className={cn.editName} onClick={changeMode}>
      <h2 className={cn.title}>{name}</h2>
      <span className={cn.icon} />
    </div>
  );
};
