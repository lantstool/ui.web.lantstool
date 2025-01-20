import { useState } from 'react';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal } from '../../../../../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ network }) => {
  const { networkId, spaceId } = network;
  const removeOne = useStoreEffect((store) => store.nearProtocol.networks.removeOne);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const submit = () => removeOne({ spaceId, networkId, navigate });

  return (
    <>
      <Button onClick={open} color="danger" iconLeftStyles={cn.icon} size="medium">
        Delete network
      </Button>
      {isOpen && (
        <DeleteConfirmationModal
          close={close}
          submit={submit}
          confirmationValue={networkId}
          text={{
            title: `Delete ${networkId}?`,
            description: (
              <>
                Are you sure you want to delete this network?
                This action will permanently remove all data within the network,
                including keys, accounts and more.
              </>
            ),
            inputLabelText: 'Enter the network ID to confirm',
            submitButtonText: 'Delete',
          }}
        />
      )}
    </>
  );
};
