import cn from './Empty.module.css';
import { useState } from 'react';
import { ImportModals } from '../general/ImportKeyModals/ImportModals.jsx';
import { Button } from '../../general/Button/Button.jsx';
import addIcon from '../../../../assets/addIcon.svg';

export const Empty = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <ImportModals isOpen={isOpen} setOpen={setOpen} />
      <Button text="Import key" onClick={openModal} src={addIcon} style="secondary" />
    </div>
  );
};
