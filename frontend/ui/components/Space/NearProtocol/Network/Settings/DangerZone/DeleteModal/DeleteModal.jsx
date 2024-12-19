import { TrashBinOutline } from '../../../../../../_general/icons/TrashBinOutline.jsx';
import { useState } from 'react';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal } from '../../../../../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';

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
      <Button onClick={open} color="danger" IconLeft={TrashBinOutline} size="medium">
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
                Deleting this network is permanent and cannot be undone. This will remove all data
                within the network including accounts,
                <b> keys</b>, transactions, etc.
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
