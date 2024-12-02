import { Modal } from '../../_general/modals/Modal/Modal.jsx';
import { Button } from '../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import cn from './ResetHistoryModal.module.scss';

export const ResetHistoryModal = ({ setResetHistory, isResetHistory }) => {
  const resetHistory = useStoreEffect((store) => store.resetHistory);
  const navigate = useNavigate();

  const closeModal = () => setResetHistory(false);
  const clearHistory = () => resetHistory({ navigate });

  return (
    <Modal isOpen={isResetHistory} closeModal={closeModal}>
      <div className={cn.resetHistoryModal}>
        <div className={cn.wrapper}>
          <h1 className={cn.title}>Reset history?</h1>
          <p className={cn.subtitle}>
            Reset the app navigation history if the app redirects you incorrectly. Don’t worry, this
            won’t delete any important data.
          </p>
        </div>
        <div className={cn.btnWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="danger" size="medium" onClick={clearHistory}>
            Reset
          </Button>
        </div>
      </div>
    </Modal>
  );
};
