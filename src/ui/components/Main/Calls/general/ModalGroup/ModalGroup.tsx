import { Modal } from '../../../../general/Modal/Modal.jsx';
import cn from './ModalGroup.module.css';
import { BackIcon } from '../../../../../assets/components/BackIcon.jsx';
import { Title } from '../../../general/Title/Title.tsx';
import { CloseButton } from '../../../general/CloseButton/CloseButton.tsx';

export const ModalGroup = ({ isOpen, closeModal, styles, prev, children, text }: any) => (
  <Modal isOpen={isOpen} close={closeModal}>
    <div className={styles}>
      <div className={cn.header}>
        {prev && (
          <div className={cn.prevBtn} onClick={prev}>
            <BackIcon style={cn.backIcon} />
          </div>
        )}
        <div className={cn.title}>
          <Title text={text}/>
        </div>
        <div className={cn.closeBtn}>
          <CloseButton close={closeModal} />
        </div>
      </div>
      {children}
    </div>
  </Modal>
);
