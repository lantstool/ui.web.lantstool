import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { DeleteConfirmationModal } from '../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';

export const ResetAppModal = ({ setResetApp }) => {
  const navigate = useNavigate();
  const resetApp = useStoreEffect((store) => store.resetApp);

  const closeModal = () => setResetApp(false);
  const submit = () => resetApp({ navigate });

  return (
    <DeleteConfirmationModal
      close={closeModal}
      submit={submit}
      confirmationValue="RESET"
      text={{
        title: 'Reset the app?',
        description: `
          Are you sure you want to erase all content and start fresh? 
          This action will permanently delete all data.
        `,
        inputLabelText: 'Type RESET to confirm',
        submitButtonText: 'Reset',
      }}
    />
  );
};
