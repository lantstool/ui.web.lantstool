import { Modal } from '../../../../../../general/Modal/Modal.tsx';
import cn from './ModalGroup.module.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.tsx';

export const ModalGroup = ({ children, isOpen, closeModal, prevStep }: any) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.btnGroup}>
          {prevStep && (
            <button className={cn.prevBtn} onClick={prevStep}>
              <ArrowBackRoundedIcon />
            </button>
          )}
          <CloseButton close={closeModal} />
        </div>
        {children}
      </div>
    </Modal>
  );
};
