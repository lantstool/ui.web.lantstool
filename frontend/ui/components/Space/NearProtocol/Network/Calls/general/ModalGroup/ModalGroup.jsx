import { Modal } from '../../../../../../_general/Modal/Modal.jsx';
import cn from './ModalGroup.module.css';
import { BackIcon } from '../../../../../../_general/IconsComponents/BackIcon.jsx';
import { Title } from '../../../_general/Title/Title.jsx';
import { CloseButton } from '../../../_general/CloseButton/CloseButton.jsx';

export const ModalGroup = ({ isOpen, closeModal, styles, prev, children, text }) => (
  <Modal isOpen={isOpen} close={closeModal}>
    <div className={styles}>
      <div className={cn.header}>
        {prev && (
          <div className={cn.prevBtn} onClick={prev}>
            <BackIcon style={cn.backIcon} />
          </div>
        )}
        <div className={cn.title}>
          <Title text={text} />
        </div>
        <div className={cn.closeBtn}>
          <CloseButton close={closeModal} />
        </div>
      </div>
      {children}
    </div>
  </Modal>
);
