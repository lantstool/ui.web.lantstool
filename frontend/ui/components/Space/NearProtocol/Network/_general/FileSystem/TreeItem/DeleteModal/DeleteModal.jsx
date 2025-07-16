import { DeleteModal as Modal } from '@gc/modals/DeleteModal/DeleteModal.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ closeModal, item }) => {
  const navigate = useNavigate();
  const { spaceId, networkId, transactionId } = useParams();
  const removeOne = useStoreEffect((store) => store.nearProtocol.folders.removeOne);

  const remove = () =>
    removeOne({ spaceId, networkId, transactionId, item, navigate, closeModal });

  return (
    <Modal
      close={closeModal}
      submit={remove}
      text={{
        title: (
          <>
            Delete <span className={cn.deleteText}>{item.name}?</span>
          </>
        ),
        description: `
          Are you sure you want to delete this folder? 
          This action will permanently remove all transactions in this folder. 
          Be sure to export any important data before proceeding.
        `,
        submitButtonText: 'Delete',
      }}
    />
  );
};
