import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.ts';
import { Button } from '../../../../general/Button/Button.tsx';
import { Modal as GeneralModal } from '../../../../../general/Modal/Modal.tsx';
import { CloseButton } from '../../../../general/CloseButton/CloseButton.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { ErrorMessage } from '../../../../general/ErrorMessage/ErrorMessage.tsx';
import addIcon from '../../../../../../assets/addIcon.svg';
import cn from './Modal.module.css';

export const Modal = ({ isOpen, close, styles }: any) => {
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
            <h2 className={cn.title}>Create Contract</h2>
            <div className={cn.closeBtn}>
              <CloseButton close={close} />
            </div>
          </div>
          <div className={cn.wrapper}>
            <p className={cn.subtitle}>Select the name of the contract you want to create.</p>
            <InputGroup register={register} name="name" label="Contract Name" />
            <ErrorMessage error={errors.name?.message} />
          </div>
          <Button src={addIcon} text="Create Contract" style="secondary" type="submit" />
        </div>
      </form>
    </GeneralModal>
  );
};
