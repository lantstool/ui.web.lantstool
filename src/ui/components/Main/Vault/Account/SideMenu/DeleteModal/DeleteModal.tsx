import cn from '../SideMenu.module.css';
import { Modal } from '../../../../../general/Modal/Modal.tsx';

export const DeleteModal = ({ isOpen, closeModal, remove }: any) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <h2 className={cn.title}>Remove account for vault</h2>
        <p className={cn.subtitle}>
          Are you sure to remove this account from the vault? It will also remove all keys from this
          vault. Notice this action only removes data locally from this app and DOESN'T make any
          changes on the blockchain.
        </p>
        <div className={cn.buttonGroup}>
          <button className={cn.btnRemove} onClick={remove}>
            Remove
          </button>
          <button className={cn.btnClose} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
