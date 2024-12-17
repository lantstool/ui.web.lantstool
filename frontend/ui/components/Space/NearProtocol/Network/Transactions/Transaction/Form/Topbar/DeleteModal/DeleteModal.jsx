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
          Deleting this transaction is permanent and cannot be undone. Be sure to export it 
          if you don’t want to lose any important data.
        `,
        submitButtonText: 'Delete',
      }}
    />
  );
};
