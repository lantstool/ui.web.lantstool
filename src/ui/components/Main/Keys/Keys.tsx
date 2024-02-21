import cn from './Keys.module.css';
import { useState } from 'react';
import { ImportModals } from './ImportKeyModals/ImportModals.tsx';
import { List } from './List/List.tsx';
import { TopBar } from './TopBar/TopBar.tsx';
import { BottomBar } from './BottomBar/BottomBar.tsx';

export const Keys = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <TopBar />
      <ImportModals isOpen={isOpen} setOpen={setOpen} />
      <List />
      <BottomBar openModal={openModal} />
    </div>
  );
};
