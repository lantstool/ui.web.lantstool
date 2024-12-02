import { Modal } from '../../../../../../../_general/modals/Modal/Modal.jsx';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useParams, useNavigate } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, setOpen }) => {
  const { spaceId, networkId, accountId } = useParams();
  const removeAccount = useStoreEffect((store) => store.nearProtocol.accounts.remove);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  };

  const remove = () => {
    removeAccount({ spaceId, networkId, accountId, navigate, setOpen });
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className={cn.container}>
        <div className={cn.wrapper}>
          <h1 className={cn.title}>
            Remove <span className={cn.accountId}>{accountId}?</span>
          </h1>
          <p className={cn.subtitle}>
            No worries, this action will not delete this account from blockchain.
          </p>
        </div>
        <div className={cn.btnWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="danger" size="medium" onClick={remove}>
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};
