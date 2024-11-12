import {EditRenameOutline} from '../../../../_general/icons/EditRenameOutline.jsx';
import { useState } from 'react';
import { useStoreEffect } from '@react-vault';
import cn from './EditName.module.scss';

export const EditName = ({ name, form, spaceId }) => {
  const updateOne = useStoreEffect((store) => store.spaces.updateOne);
  const [isEditing, setIsEditing] = useState(false);

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
      updateOne({ spaceId, name: value });
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <input
        {...register('name')}
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
