import { useState } from 'react';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteConfirmationModal } from '../../../../../../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import cn from './DeleteKeyModal.module.scss';

export const DeleteKeyModal = () => {
  const { spaceId, networkId, publicKey } = useParams();
  const removeKey = useStoreEffect((store) => store.nearProtocol.keys.removeKey);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const submit = () => {
    removeKey({ spaceId, networkId, publicKey, navigate });
  };

  return (
    <>
      <Button onClick={open} color="danger" iconLeftStyles={cn.icon} size="medium">
        Remove key
      </Button>
      {isOpen && (
        <DeleteConfirmationModal
          close={close}
          submit={submit}
          confirmationValue={publicKey}
          text={{
            title: (
              <>
                Remove
                <br />
                {publicKey}?
              </>
            ),
            description: `
              Be sure to save this key elsewhere before removing it to avoid losing access to the
              associated account(-s).
            `,
            inputLabelText: 'Paste this key to confirm',
            submitButtonText: 'Remove',
          }}
          baseModalClasses={{ modal: cn.modal }}
        />
      )}
    </>
  );
};
