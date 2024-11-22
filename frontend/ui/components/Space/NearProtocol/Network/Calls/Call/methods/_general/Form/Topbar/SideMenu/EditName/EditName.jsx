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
  }, [name, callId]);

  const editName = handleSubmit((formValues) => {
    console.log(formValues);
    updateOneName({ formValues, callId });
  });

  return (
    <form className={cn.container} onBlur={editName} key={callId}>
      <input
        {...register('name')}
        placeholder="Untitled Call"
        className={cn.input}
      />
    </form>
  );
};
