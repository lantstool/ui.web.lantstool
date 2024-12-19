import { useState } from 'react';
import { Button } from '../../../../_general/Button/Button.jsx';
import { TrashBinOutline } from '../../../../_general/icons/TrashBinOutline.jsx';
import { DeleteConfirmationModal } from '../../../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';

export const DeleteModal = ({ space: { spaceId, name } }) => {
  const [isOpen, setOpen] = useState(false);
  const remove = useStoreEffect((store) => store.spaces.remove);
  const navigate = useNavigate();

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const onSubmit = () => remove({ spaceId, navigate });

  return (
    <>
      <Button onClick={open} color="danger" IconLeft={TrashBinOutline} size="medium">
        Delete space
      </Button>
      {isOpen && (
        <DeleteConfirmationModal
          close={close}
          submit={onSubmit}
          confirmationValue={name}
          text={{
            title: `Delete ${name}?`,
            description: `
              Deleting this space is permanent and cannot be undone. This will remove all data
              within the space, including accounts, keys, transactions, calls, and networks.
            `,
            inputLabelText: 'Enter the space name to confirm',
            submitButtonText: 'Delete',
          }}
        />
      )}
    </>
  );
};
