import { Input } from '../../../../../../../_general/input/Input/Input.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.js';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';

export const Note = ({ note }) => {
  const updateOneNote = useStoreEffect((store) => store.nearProtocol.accounts.updateOneNote);
  const { spaceId, networkId, accountId } = useParams();

  const form = useForm({
    defaultValues: { note },
    resolver: yupResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  const editName = handleSubmit((formValues) => {
    if (!isDirty) return;
    updateOneNote({ spaceId, networkId, accountId, formValues, reset });
  });

  return (
    <Input
      onBlur={editName}
      name="note"
      error={errors?.note?.message}
      control={control}
      register={register}
      label="Leave a short note about this account"
    />
  );
};
