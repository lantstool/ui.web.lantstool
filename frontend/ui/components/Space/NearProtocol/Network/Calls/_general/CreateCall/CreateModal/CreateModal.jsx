import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../_general/Button/Button.jsx';
import { ModalGroup } from './ModalGroup/ModalGroup.jsx';
import { TextareaGroup } from '../../../../../../../_general/TextareaGroup/TextareaGroup.jsx';
import { useEffect } from 'react';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { schema } from './schema.js';

export const CreateModal = ({ styles, closeModal }) => {
  const getCount = useStoreEffect((store) => store.nearProtocol.calls.getCount);
  const createOne = useStoreEffect((store) => store.nearProtocol.calls.createOne);
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = form;

  useEffect(() => {
    (async () => {
      const count = await getCount({ spaceId, networkId });
      setValue('name', `Call#${count + 1}`);
    })();
  }, []);

  const onSubmit = handleSubmit((formValues) => {
    createOne({ spaceId, networkId, formValues, closeModal, navigate });
  });

  return (
    <ModalGroup isOpen={true} closeModal={closeModal} styles={styles} text="Create Call">
      <form onSubmit={onSubmit}>
        <TextareaGroup
          register={register}
          name="name"
          label="Call Name"
          rows={4}
          errors={errors.name?.message}
        />
        <Button disabled={errors.callName} text="Create Call" style="secondary" type="submit" />
      </form>
    </ModalGroup>
  );
};
