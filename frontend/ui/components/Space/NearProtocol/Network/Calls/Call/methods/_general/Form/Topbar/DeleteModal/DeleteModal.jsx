import { DeleteModal as Modal } from '../../../../../../../../../../_general/Modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, setOpen, call }) => {
  const removeOne = useStoreEffect((store) => store.nearProtocol.calls.removeOne);
  const navigate = useNavigate();
  const { spaceId, networkId, callId } = useParams();

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => removeOne({ spaceId, networkId, callId, navigate, closeModal });

  return (
    <Modal closeModal={closeModal} remove={remove} isOpen={isOpen}>
      <h1 className={cn.title}>
        Delete <span className={cn.deleteText}>{call.name}?</span>
      </h1>
      <p className={cn.subtitle}>
        Deleting this call is permanent and cannot be undone. Be sure to export it if you don’t want
        to lose any important data.
      </p>
    </Modal>
  );
};
