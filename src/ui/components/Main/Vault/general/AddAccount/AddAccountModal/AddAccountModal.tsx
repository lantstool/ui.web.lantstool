import { Modal } from '../../../../../general/Modal/Modal.tsx';
import cn from './AddAccountModal.module.css';
import { Title } from '../../../../general/Title/Title.tsx';
import { CloseButton } from '../../../../general/CloseButton/CloseButton.tsx';
import { Subtitle } from '../../../../general/Subtitle/Subtitle.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { ErrorMessage } from '../../../../general/ErrorMessage/ErrorMessage.tsx';
import { Button } from '../../../../general/Button/Button.tsx';
import { createSchema } from '../addAccountSchema.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';

export const AddAccountModal = ({ list, styles, isOpen, setOpen }: any) => {
  const rpc = useStoreState((store: any) => store.networks.current.url.rpc);
  const onAddAccount = useStoreEffect((store: any) => store.vault.onAddAccount);
  const newSchema = createSchema(list, rpc);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(newSchema) });

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    onAddAccount({ data, closeModal, navigate });
    reset();
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles}>
          <div className={cn.header}>
            <Title text="Add account" />
            <CloseButton close={closeModal} />
          </div>
          <Subtitle
            text="You can add your account to a vault that will store information locally in your
              browser"
          />
          <div>
            <InputGroup register={register} name="accountId" label="Account Id" />
            <ErrorMessage error={errors.accountId?.message} />
          </div>
          <Button text="Add account" style="secondary" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
