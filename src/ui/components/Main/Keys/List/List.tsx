import cn from './List.module.css';
import { useState } from 'react';
import { ImportModals } from '../general/ImportKeyModals/ImportModals.tsx';
import { KeyList } from './KeyList/KeyList.tsx';
import { TopBar } from './TopBar/TopBar.tsx';
import { BottomBar } from './BottomBar/BottomBar.tsx';

export const List = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <TopBar />
        <ImportModals isOpen={isOpen} setOpen={setOpen} />
        <KeyList />
        <BottomBar openModal={openModal} />
      </div>
    </div>
  );
};
