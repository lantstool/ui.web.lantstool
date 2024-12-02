import { useState } from 'react';
import { Modal } from '../../../../../../../../_general/modals/Modal/Modal.jsx';
import { appendAction } from './appendAction.js';
import cn from './AddAction.module.css';
import { Button } from '../../../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../../../assets/addIcon.svg';
import { Item } from './Item/Item.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';

export const AddAction = ({ append, fields }) => {
  const [isOpen, setOpen] = useState(false);
  const isCreateAccount = fields.length < 1;

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

  const deployContract = () => {
    appendAction.deployContract(append);
    closeModal();
  };

  const deleteKey = () => {
    appendAction.deleteKey(append);
    closeModal();
  };

  const deleteAccount = () => {
    appendAction.deleteAccount(append);
    closeModal();
  };

  const functionCall = () => {
    appendAction.functionCall(append);
    closeModal();
  };

  return (
    <>
      <div className={cn.btnContainer}>
        <Button text="Add Action" onClick={openModal} src={addIcon} />
      </div>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.modal}>
          <div className={cn.header}>
            <div className={cn.title}>
              <Title text="Choose Action" />
            </div>
            <div className={cn.closeBtn}>
              <CloseButton close={closeModal} />
            </div>
          </div>
          <Item onClick={createAccount} disabled={!isCreateAccount} text="Create Account" />
          <Item onClick={transfer} text="Transfer" />
          <Item onClick={functionCall} text="FunctionCall" />
          <Item onClick={addKey} text="Add Key" />
          <Item onClick={deployContract} text="Deploy Contract" />
          <Item onClick={deleteKey} text="Delete Key" />
          <Item onClick={deleteAccount} text="Delete Account" />
        </div>
      </Modal>
    </>
  );
};
