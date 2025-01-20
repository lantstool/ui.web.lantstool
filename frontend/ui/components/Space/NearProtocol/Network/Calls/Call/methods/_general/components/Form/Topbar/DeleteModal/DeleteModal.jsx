import { DeleteModal as Modal } from '../../../../../../../../../../../_general/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ closeModal, call }) => {
  const removeOne = useStoreEffect((store) => store.nearProtocol.calls.removeOne);
  const navigate = useNavigate();
  const { spaceId, networkId, callId } = useParams();

  const remove = () => removeOne({ spaceId, networkId, callId, navigate, closeModal });

  return (
    <Modal
      close={closeModal}
      submit={remove}
      text={{
        title: (
          <>
            Delete <span className={cn.deleteText}>{call.name}?</span>
          </>
        ),
        description: `
          Are you sure you want to delete this call? 
          This action will permanently remove it. 
          Be sure to export any important data before proceeding.
        `,
        submitButtonText: 'Delete',
      }}
    />
  );
};
