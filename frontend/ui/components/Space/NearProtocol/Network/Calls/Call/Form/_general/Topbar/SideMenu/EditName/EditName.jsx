import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect } from 'react';
import cn from './EditName.module.scss';

export const EditName = ({ call }) => {
  const { name, callId } = call;
  const updateOneName = useStoreEffect((store) => store.nearProtocol.calls.updateOneName);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, handleSubmit } = form;

  useEffect(() => {
    form.reset({ name });
  }, [name]);

  const editName = handleSubmit((formValues) => {
    updateOneName({ formValues, callId });
  });

  return (
    <div className={cn.container}>
      <input
        {...register('name')}
        onBlur={editName}
        placeholder="Untitled Call"
        className={cn.input}
      />
    </div>
  );
};
