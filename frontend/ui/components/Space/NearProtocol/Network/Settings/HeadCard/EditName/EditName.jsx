import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { EditRenameOutline } from '../../../../../../_general/icons/EditRenameOutline.jsx';
import { useState } from 'react';
import { useStoreEffect } from '@react-vault';
import { schema } from '../schema.js';
import cn from './EditName.module.scss';

export const EditName = ({ networkId }) => {
  const updateOneName = useStoreEffect((store) => store.spaces.updateOneName);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const {
    register,
    watch,
    formState: { isValid },
  } = form;

  const changeMode = () => {
    setIsEditing(!isEditing);
  };

  const value = watch('name');

  const handleBlur = () => {
    if (isValid) {
      updateOneName({ networkId, name: value });
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <input
        {...register('networkId')}
        maxLength={30}
        className={cn.input}
        autoFocus
        onBlur={handleBlur}
      />
    </div>
  ) : (
    <div className={cn.editName} onClick={changeMode}>
      <h2 className={cn.title}>{name}</h2>
      <EditRenameOutline style={cn.icon} />
    </div>
  );
};
