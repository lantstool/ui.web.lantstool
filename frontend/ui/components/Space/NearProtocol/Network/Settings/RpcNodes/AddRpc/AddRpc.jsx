import { useState } from 'react';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import cn from './AddRpc.module.scss';

export const AddRpc = ({ network }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

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
      {isOpen && <Modal close={close} network={network} />}
    </>
  );
};
