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
        If you encounter technical issues or want to erase all content,
        you can reset it, but all data will be lost forever.
        `,
        inputLabelText: 'Type RESET to confirm',
        submitButtonText: 'Reset',
      }}
    />
  );
};

/*
<BaseModal isOpen={isResetApp} closeModal={closeModal}>
      <div className={cn.textWrapper}>
        <h2 className={cn.title}>Reset the app?</h2>
        <p className={cn.subtitle}>
          If you encounter technical issues or want to erase all content, you can reset it, but all
          data will be lost forever.
        </p>
      </div>
      <Input
        name="reset"
        error={errors?.reset?.message}
        control={control}
        label="Type RESET to confirm"
        copy={false}
      />
      <div className={cn.buttonWrapper}>
        <Button color="secondary" size="medium" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={!isValid} color="danger" size="medium" onClick={onSubmit}>
          Reset
        </Button>
      </div>
    </BaseModal>
 */
