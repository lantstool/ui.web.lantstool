import { useState } from 'react';
import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { KeySquareBold } from '../../../../../_general/icons/KeySquareBold.jsx';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.empty}>
      <div className={cn.wrapper}>
        <KeySquareBold style={cn.icon} />
        <h2 className={cn.title}>
          Looks empty. Import your first key to begin, or add one directly through a transaction.
        </h2>
      </div>
      <Button onClick={openModal}>Import account</Button>
      <ImportKeyModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
