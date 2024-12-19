import { DeleteModal } from '../../_general/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';

export const ResetHistoryModal = ({ setResetHistory }) => {
  const resetHistory = useStoreEffect((store) => store.resetHistory);
  const navigate = useNavigate();

  const closeModal = () => setResetHistory(false);
  const clearHistory = () => resetHistory({ navigate });

  return (
    <DeleteModal
      close={closeModal}
      submit={clearHistory}
      text={{
        title: 'Reset history?',
        description: `
        Reset the app navigation history if the app redirects you incorrectly. 
        Don’t worry, this won’t delete any important data.
        `,
        submitButtonText: 'Reset',
      }}
    />
  );
};
/*
<BaseModal isOpen={isResetHistory} closeModal={closeModal}>
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
    </BaseModal>
 */
