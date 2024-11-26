import { Button } from '../../Button/Button.jsx';
import { Modal } from '../../Modal/Modal.jsx';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, children, closeModal, remove, deleteBtnText = 'Delete' }) => (
  <Modal isOpen={isOpen} closeModal={closeModal}>
    <div className={cn.container}>
      <div className={cn.wrapper}>{children}</div>
      <div className={cn.btnWrapper}>
        <Button color="secondary" size="medium" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="danger" size="medium" onClick={remove}>
          {deleteBtnText}
        </Button>
      </div>
    </div>
  </Modal>
);
