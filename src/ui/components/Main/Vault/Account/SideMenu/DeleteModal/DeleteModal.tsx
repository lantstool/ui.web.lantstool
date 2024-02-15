import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../general/Modal/Modal.tsx';
import { CloseButton } from '../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../general/Title/Title.tsx';
import { Subtitle } from '../../../../general/Subtitle/Subtitle.tsx';
import { Button } from '../../../../general/Button/Button.tsx';

export const DeleteModal = ({ isOpen, closeModal, remove }: any) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <CloseButton close={closeModal} />
          <Title text="Remove account" />
        </div>
        <Subtitle
          text="Are you sure to remove this account from the vault? It will also remove all index from this
        vault. Notice this action only removes data locally from this app and DOESN'T make any
        changes on the blockchain."
        />
        <Button text="Remove" style="secondary" onClick={remove} />
      </div>
    </Modal>
  );
};
