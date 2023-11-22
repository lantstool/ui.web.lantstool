import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import cn from './AddAccount.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { useForm } from 'react-hook-form';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';

export const AddAccount = () => {
  const [isOpen, setOpen] = useState(false);
  const form = useForm();
  const { register, reset } = form;
  const onAddAccount = useStoreEffect((store: any) => store.vault.onAddAccount);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    onAddAccount({ data, closeModal });
    reset();
  };
  return (
    <>
      <button className={cn.buttonModal} onClick={openModal}>
        Add account
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.modal}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn.form}>
            <h2 className={cn.title}>Add account for Vault</h2>
            <p className={cn.subTitle}>
              You can add your account to a vault that will store information locally in your
              browser.
            </p>
            <InputGroup register={register} name="accountId" label="Account Id" />
            <div className={cn.buttonGroup}>
              <button type="submit" className={cn.buttonAdd}>
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
