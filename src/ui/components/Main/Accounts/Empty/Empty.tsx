import addIcon from '../../../../assets/addIcon.svg';
import { Button } from '../../general/Button/Button.tsx';
import { useState } from 'react';
import cn from './Empty.module.css';
import { ImportAccount } from '../general/ImportAccount/ImportAccount.tsx';

export const Empty = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <ImportAccount isOpen={isOpen} setOpen={setOpen} />
      <Button text="Import Account" onClick={openModal} src={addIcon} style="secondary" />
    </div>
  );
};
