import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../../../_general/Modal/Modal.jsx';
import { useStoreEffect } from '../../../../../../../../../../../react-vault/index.js';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { Subtitle } from '../../../../../_general/Subtitle/Subtitle.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../_general/Button/Button.jsx';

export const DeleteModal = ({ isOpen, callId, setOpen }) => {
  const deleteCall = useStoreEffect((store) => store.calls.deleteCall);
  const navigate = useNavigate();

  const open = isOpen === 'deleteModal';

  const closeModal = () => {
    setOpen(null);
  };

  const remove = () => {
    deleteCall({ callId, navigate });
    setOpen(false);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <Title text="Remove transaction" />
          <div className={cn.closeBtn}>
            <CloseButton close={closeModal} />
          </div>
        </div>
        <Subtitle
          text="Are you sure to remove this call? It will also remove all data from this
          call."
        />
        <Button text="Remove" onClick={remove} style="secondary" />
      </div>
    </Modal>
  );
};
