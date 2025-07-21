import { DeleteModal as Modal } from '../../../../../../../../_general/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ closeModal, transaction }) => {
  const navigate = useNavigate();
  const { spaceId, networkId, transactionId } = useParams();
  const removeOne = useStoreEffect((store) => store.nearProtocol.transactions.removeOne);

  const remove = () => removeOne({ spaceId, networkId, transactionId, navigate, closeModal });

  return (
    <Modal
      close={closeModal}
      submit={remove}
      text={{
        title: (
          <>
            Delete <span className={cn.deleteText}>{transaction.name}?</span>
          </>
        ),
        description: `
          Are you sure you want to delete this transaction? 
          This action will permanently remove it. 
          Be sure to export any important data before proceeding.
        `,
        submitButtonText: 'Delete',
      }}
    />
  );
};
