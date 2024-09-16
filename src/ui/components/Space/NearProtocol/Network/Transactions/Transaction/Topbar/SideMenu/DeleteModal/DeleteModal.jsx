import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../../../general/Modal/Modal.jsx';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../general/Title/Title.jsx';
import { Subtitle } from '../../../../../general/Subtitle/Subtitle.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../general/Button/Button.jsx';

export const DeleteModal = ({ isOpen, transactionId, setOpen }) => {
  const onDeleteTransaction = useStoreEffect((store) => store.transactions.onDeleteTransaction);
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
        <Button text="Remove" onClick={remove} style="secondary" />
      </div>
    </Modal>
  );
};
