import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../../general/Title/Title.tsx';
import { Subtitle } from '../../../../../general/Subtitle/Subtitle.tsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../general/Button/Button.tsx';

export const DeleteModal = ({ isOpen, contractId, setOpen }: any) => {
  const deleteContract = useStoreEffect((store: any) => store.contracts.deleteContract);
  const navigate = useNavigate();

  const open = isOpen === 'deleteModal';

  const closeModal = () => {
    setOpen(null);
  };

  const remove = () => {
    deleteContract({ contractId, navigate });
    setOpen(false);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <Title text="Remove Contract" />
          <div className={cn.closeWrapper}>
            <CloseButton close={closeModal} />
          </div>
        </div>
        <Subtitle
          text="Are you sure to remove this contract? It will also remove all data from this
          contract."
        />
        <Button text="Remove" onClick={remove} style="secondary" />
      </div>
    </Modal>
  );
};
