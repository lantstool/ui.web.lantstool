import { Modal } from '../../../../../general/Modal/Modal.tsx';
import cn from './ModalGroup.module.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const ModalGroup = ({ children, isOpen, closeModal, prevStep }: any) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div>
          {prevStep && (
            <button onClick={prevStep}>
              <ArrowBackRoundedIcon />
            </button>
          )}
          <button onClick={closeModal}>
            <CloseRoundedIcon />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};
