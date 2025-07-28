import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect, useState } from 'react';
import cnm from 'classnames';
import cn from './EditName.module.scss';

export const EditName = ({ name, itemId, updateName, styles }) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, reset, handleSubmit, setValue } = form;

  useEffect(() => {
    reset({ name });
  }, [name, itemId]);

  const editName = handleSubmit((formValues) => {
    formValues.name ? updateName(formValues) : setValue('name', name);
    setIsEditing(false);
  });

  const changeMode = () => {
    setIsEditing(!isEditing);
  };

  return isEditing ? (
    <input
      {...register('name')}
      className={cnm(cn.input, styles)}
      autoFocus
      maxLength={100}
      onBlur={editName}
    />
  ) : (
    <div className={cnm(cn.editName, styles)} onClick={changeMode}>
      <h2 className={cn.title}>{name}</h2>
      <span className={cn.icon} />
    </div>
  );
};
