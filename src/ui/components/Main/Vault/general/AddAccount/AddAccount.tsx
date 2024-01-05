import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState, useRef } from 'react';
import cn from './AddAccount.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { useForm } from 'react-hook-form';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './addAccountSchema.ts';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../general/Title/Title.tsx';
import { Subtitle } from '../../../general/Subtitle/Subtitle.tsx';
import { ErrorMessage } from '../../../general/ErrorMessage/ErrorMessage.tsx';

export const AddAccount = ({ list, styles }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const timerRef: any = useRef(null);
  const navigate = useNavigate();

  const onAddAccount = useStoreEffect((store: any) => store.vault.onAddAccount);
  const newSchema = createSchema(list, timerRef);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', resolver: yupResolver(newSchema) });

  const openModal = () => setOpen(true);
  const closeModal = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
    reset();
  };
  const onClick = () => {
    clearTimeout(timerRef.current);
    timerRef.current = 0;
  };
  const onSubmit = (data: any) => {
    onAddAccount({ data, closeModal, navigate });
    reset();
  };
  return (
    <>
      <button className={cn.buttonModal} onClick={openModal}>
        Add account
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles}>
            <div className={cn.header}>
              <Title text="Add account" />
              <CloseButton close={closeModal} />
            </div>
            <Subtitle
              text="You can add your account to a vault that will store information locally in your
              browser."
            />
            <div>
              <InputGroup register={register} name="accountId" label="Account Id" />
              <ErrorMessage error={errors.accountId?.message} />
            </div>
            <button onClick={onClick} type="submit" className={cn.btnAddAccount}>
              Add account
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
