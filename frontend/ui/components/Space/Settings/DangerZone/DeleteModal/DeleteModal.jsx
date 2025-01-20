import { useState } from 'react';
import { Button } from '../../../../_general/Button/Button.jsx';
import { DeleteConfirmationModal } from '../../../../_general/modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ space: { spaceId, name } }) => {
  const [isOpen, setOpen] = useState(false);
  const remove = useStoreEffect((store) => store.spaces.remove);
  const navigate = useNavigate();

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const onSubmit = () => remove({ spaceId, navigate });

  return (
    <>
      <Button onClick={open} color="danger" iconLeftStyles={cn.icon} size="medium">
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
              Are you sure you want to delete this space? This action will permanently 
              remove all data within the space, including networks, keys and more.
            `,
            inputLabelText: 'Enter the space name to confirm',
            submitButtonText: 'Delete',
          }}
        />
      )}
    </>
  );
};
