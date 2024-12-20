import { DeleteModal as Modal } from '../../../../../../../../_general/modals/DeleteModal/DeleteModal.jsx';
import cn from './ConfirmationModal.module.scss';

export const ConfirmationModal = ({ closeModal, transaction, onSubmit, confirmationType }) => {
  return (
    <Modal
      close={closeModal}
      submit={onSubmit}
      text={{
        title: (
          <>
            Send <span className={cn.deleteText}>{transaction.name}?</span>
          </>
        ),
        description:
          confirmationType === 'beneficiaryConfirmation'
            ? `
          Sending this transaction is permanent and cannot be undone.
          Beneficiary Id not exist in blockchain if you confirm this transaction the funds will be dispersed among validators.
        `
            : `
          Sending This Transaction Will Remove the Last FullAccess Key, Permanently Locking Your Account
        `,
        submitButtonText: 'Send',
      }}
    />
  );
};
