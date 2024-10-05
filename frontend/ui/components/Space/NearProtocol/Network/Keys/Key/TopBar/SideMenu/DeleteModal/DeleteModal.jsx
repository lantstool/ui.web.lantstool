import cn from './DeleteModal.module.scss';
import { Modal } from '../../../../../../../../_general/Modal/Modal.jsx';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { Subtitle } from '../../../../../_general/Subtitle/Subtitle.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';

export const DeleteModal = ({ isOpen, closeModal, remove }) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <CloseButton close={closeModal} />
          <Title text="Remove key" />
        </div>
        <Subtitle
          text="Are you sure to remove this key from the keys? Notice this action only removes key locally from this app and DOESN'T make any
        changes on the blockchain."
        />
        <Button text="Remove" style="secondary" onClick={remove} />
      </div>
    </Modal>
  );
};
