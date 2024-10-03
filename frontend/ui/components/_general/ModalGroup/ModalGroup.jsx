import { Modal } from '../Modal/Modal.jsx';
import cn from './ModalGroup.module.css';
import { CloseButton } from '../../Space/NearProtocol/Network/_general/CloseButton/CloseButton.jsx';
import { BackIcon } from '../IconsComponents/BackIcon.jsx';

export const ModalGroup = ({ children, isOpen, closeModal, prevStep, text }) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.btnGroup}>
          {prevStep && (
            <div className={cn.prevBtn} onClick={prevStep}>
              <BackIcon style={cn.icon} />
            </div>
          )}
          <h2 className={cn.title}>{text}</h2>
          <div className={cn.closeBtn}>
            <CloseButton close={closeModal} />
          </div>
        </div>
        {children}
      </div>
    </Modal>
  );
};
