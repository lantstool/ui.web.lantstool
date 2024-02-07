import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.ts';
import { Button } from '../../../../general/Button/Button.tsx';
import { Modal as GeneralModal } from '../../../../../general/Modal/Modal.tsx';
import { Title } from '../../../../general/Title/Title.tsx';
import { CloseButton } from '../../../../general/CloseButton/CloseButton.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { ErrorMessage } from '../../../../general/ErrorMessage/ErrorMessage.tsx';
import cn from './Modal.module.css';

export const Modal = ({ styles, isOpen, close }: any) => {
  const createCall = useStoreEffect((store: any) => store.calls.createCall);
  const getCallsCount = useStoreEffect((store: any) => store.calls.getCallsCount);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: 'Call' },
  });


  const onSubmit = (formValues: any) => {
    createCall({ formValues, close, navigate });
  };

  useEffect(() => {
    (async () => {
      const count = await getCallsCount();
      setValue('name', `Call#${count}`);
    })();
  }, [isOpen]);

  return (
    <GeneralModal isOpen={isOpen} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles}>
          <div className={cn.header}>
            <Title text="Create Call" />
            <CloseButton close={close} />
          </div>
          <div>
            <InputGroup
              register={register}
              name="name"
              label="Call Name"
              textarea={true}
              rows={4}
            />
            <ErrorMessage error={errors.name?.message} />
          </div>
          <Button text="Create Call" style="secondary" type="submit" />
        </div>
      </form>
    </GeneralModal>
  );
};
