import cn from './RemoveAccount.module.css';
import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../react-vault';

export const RemoveAccount = (activeAccId: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const onRemoveAccount = useStoreEffect((store: any) => store.vault.onRemoveAccount);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
  };
  const onRemove = () => {
    onRemoveAccount(activeAccId);
    setOpen(false)
  };

  return (
    <>
      <button className={cn.buttonRemove} onClick={openModal}>
        Remove
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.container}>
          <h2 className={cn.title}>Remove account for vault</h2>
          <p className={cn.subtitle}>
            Are you sure to remove this account from the vault? It will also remove all keys from this
            vault. Notice this action only removes data locally from this app and DOESN'T make any
            changes on the blockchain.
          </p>
          <div className={cn.buttonGroup}>
            <button className={cn.btnRemove} onClick={onRemove}>
              Remove
            </button>
            <button className={cn.btnClose} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
