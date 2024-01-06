import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect } from '../../../../../../../../../react-vault';
import { CloseButton } from '../../../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../../../general/Title/Title.tsx';
import { Subtitle } from '../../../../../../general/Subtitle/Subtitle.tsx';
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({ isOpen, transactionId, setOpen }: any) => {
  const onDeleteTransaction = useStoreEffect(
    (store: any) => store.transactions.onDeleteTransaction,
  );
  const navigate = useNavigate();

  const open = isOpen === 'deleteModal';

  const closeModal = () => {
    setOpen(null);
  };

  const remove = () => {
    onDeleteTransaction({ transactionId, navigate });
    setOpen(false);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <Title text="Remove transaction" />
          <CloseButton close={closeModal} />
        </div>
        <Subtitle
          text="Are you sure to remove this transaction? It will also remove all data from this
          transaction."
        />
        <button className={cn.btnRemove} onClick={remove}>
          Remove
        </button>
      </div>
    </Modal>
  );
};
