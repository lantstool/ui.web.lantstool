import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState, useRef } from 'react';
import cn from './AddAccount.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { useForm } from 'react-hook-form';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './addAccountSchema.ts';
import { useNavigate } from 'react-router-dom';

export const AddAccount = ({ list }: any) => {
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
        <div className={cn.modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
            <h2 className={cn.title}>Add account for Vault</h2>
            <p className={cn.subTitle}>
              You can add your account to a vault that will store information locally in your
              browser.
            </p>
            <div>
              <InputGroup register={register} name="accountId" label="Account Id" />
              <p className={cn.error}>{errors.accountId?.message}</p>
            </div>

            <div className={cn.buttonGroup}>
              <button onClick={onClick} type="submit" className={cn.buttonAdd}>
                Add account
              </button>
              <button onClick={closeModal} className={cn.buttonClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
