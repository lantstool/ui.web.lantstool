import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect, useState } from 'react';
import { EditRenameOutline } from '../../../../../../../../../../_general/icons/EditRenameOutline.jsx';
import cn from './EditName.module.scss';

export const EditName = ({ call }) => {
  const { name, callId } = call;
  const updateOneName = useStoreEffect((store) => store.nearProtocol.calls.updateOneName);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, handleSubmit } = form;

  useEffect(() => {
    form.reset({ name });
  }, [name, callId]);

  const editName = handleSubmit((formValues) => {
    updateOneName({ formValues, callId });
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
      <EditRenameOutline style={cn.icon} />
    </div>
  );
};
