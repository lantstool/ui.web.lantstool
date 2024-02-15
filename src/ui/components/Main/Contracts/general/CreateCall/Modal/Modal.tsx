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
  const createContract = useStoreEffect((store: any) => store.contracts.createContract);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  const onSubmit = (formValues: any) => {
    createContract({ formValues, close, navigate });
  };

  return (
    <GeneralModal isOpen={isOpen} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles}>
          <div className={cn.header}>
            <Title text="Create Contract" />
            <CloseButton close={close} />
          </div>
          <div>
            <InputGroup register={register} name="name" label="Contract Name" />
            <ErrorMessage error={errors.name?.message} />
          </div>
          <Button text="Create Contract" style="secondary" type="submit" />
        </div>
      </form>
    </GeneralModal>
  );
};
