import { useState } from 'react';
import { Modal } from '../../../../../../../general/Modal/Modal.tsx';
import { appendAction } from './appendAction.ts';
import cn from './AddAction.module.css';

export const AddAction = ({ append }: any) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const createAccount = () => {
    appendAction.createAccount(append);
    closeModal();
  };

  const transfer = () => {
    appendAction.transfer(append);
    closeModal();
  };

  const addKey = () => {
    appendAction.addKey(append);
    closeModal();
  };

  const functionCall = () => {
    appendAction.functionCall(append);
    closeModal();
  };

  const deployContract = () => {
    appendAction.deployContract(append);
    closeModal();
  };

  return (
    <>
      <button className={cn.addAction} onClick={openModal} type="button">
        Add Action
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.modal}>
          <h3>Choose Action</h3>
          <button onClick={createAccount}> Create Account</button>
          <button onClick={transfer}>Transfer</button>
          <button onClick={addKey}>Add Key</button>
          <button onClick={deployContract}>Deploy Contract</button>
          <button onClick={functionCall}>Function Call</button>
        </div>
      </Modal>
    </>
  );
};
