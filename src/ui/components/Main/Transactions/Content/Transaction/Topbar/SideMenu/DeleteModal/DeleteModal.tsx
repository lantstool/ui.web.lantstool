import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect } from '../../../../../../../../../react-vault';

export const DeleteModal = ({ isOpen, closeModal, transactionId, navigate, setOpen }: any) => {
  const onDeleteTransaction = useStoreEffect((store: any) => store.transactions.onDeleteTransaction);
  const open = isOpen === 'deleteModal'
  const remove = () => {
    onDeleteTransaction({ transactionId, navigate });
    setOpen(false);
  };
  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <h2 className={cn.title}>Remove transaction from storage</h2>
        <p className={cn.subtitle}>
          Are you sure to remove this transaction? It will also remove all data from this
          transaction.
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
