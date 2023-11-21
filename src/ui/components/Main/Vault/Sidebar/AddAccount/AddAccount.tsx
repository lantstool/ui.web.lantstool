import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import cn from './AddAccount.module.css';

export const AddAccount = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <button className={cn.buttonModal} onClick={openModal}>
        Add account
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.modal}>
          <h2>Add account for Vault</h2>
            <p>Account name:</p>
          <input className={cn.input} />
          <button className={cn.buttonAdd}>Add account</button>
        </div>
      </Modal>
    </>
  );
};
