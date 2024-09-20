import addIcon from '../../../../../../assets/addIcon.svg';
import { Button } from '../../_general/Button/Button.jsx';
import { useState } from 'react';
import cn from './Empty.module.css';
import { ImportAccount } from '../general/ImportAccount/ImportAccount.jsx';

export const Empty = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <ImportAccount isOpen={isOpen} setOpen={setOpen} />
      <Button text="Import" onClick={openModal} src={addIcon} style="secondary" />
    </div>
  );
};
