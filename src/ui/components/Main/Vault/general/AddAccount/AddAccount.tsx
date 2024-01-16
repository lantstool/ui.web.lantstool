import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import cn from './AddAccount.module.css';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { useForm } from 'react-hook-form';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './addAccountSchema.ts';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../general/Title/Title.tsx';
import { Subtitle } from '../../../general/Subtitle/Subtitle.tsx';
import { ErrorMessage } from '../../../general/ErrorMessage/ErrorMessage.tsx';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../../assets/addIcon.svg';

export const AddAccount = ({ list, styles }: any) => {
  const rpc = useStoreState((store: any) => store.networks.current.url.rpc);
  const onAddAccount = useStoreEffect((store: any) => store.vault.onAddAccount);
  const [isOpen, setOpen]: any = useState(false);
  const navigate = useNavigate();

  const newSchema = createSchema(list, rpc);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(newSchema) });

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    onAddAccount({ data, closeModal, navigate });
    reset();
  };

  return (
    <>
      <Button text="Add account" onClick={openModal} src={addIcon} />
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
    </>
  );
};
