import { useState } from 'react';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { BaseModal } from '../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import {
  ModalFooter
} from '../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import cn from './AddRpcModal.module.scss';

export const AddRpcModal = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const submit = () => {
    close();
  }

  return (
    <>
      <Button
        size="medium"
        color="secondary"
        IconLeft={() => <span className={cn.addIcon} />}
        onClick={open}
      >
        Add RPC
      </Button>
      {isOpen && (
        <BaseModal close={close}>
          <ModalHeader title="Add RPC" close={close} />
          <div className={cn.container}>
           12312
          </div>
          <ModalFooter
            action={{
              label: 'Add',
              onClick: submit,
            }}
          />
        </BaseModal>
      )}
    </>
  );
};
