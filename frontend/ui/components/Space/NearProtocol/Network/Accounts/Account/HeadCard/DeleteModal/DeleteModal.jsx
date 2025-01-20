import { useState } from 'react';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { DeleteModal as GeneralDeleteModal } from '../../../../../../../_general/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = () => {
  const [isOpen, setOpen] = useState(false);
  const { spaceId, networkId, accountId } = useParams();
  const removeAccount = useStoreEffect((store) => store.nearProtocol.accounts.remove);
  const navigate = useNavigate();

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const remove = () => {
    removeAccount({ spaceId, networkId, accountId, navigate, setOpen });
  };

  return (
    <>
      <Button iconLeftStyles={cn.icon} size="medium" color="secondary" onClick={open} />
      {isOpen && (
        <GeneralDeleteModal
          close={close}
          submit={remove}
          text={{
            title: (
              <>
                Remove <span className={cn.accountId}>{accountId}?</span>
              </>
            ),
            description: `Don’t worry, this action will not delete your account from the blockchain.`,
            submitButtonText: 'Remove',
          }}
        />
      )}
    </>
  );
};
