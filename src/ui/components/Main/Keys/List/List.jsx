import cn from './List.module.css';
import { useState } from 'react';
import { ImportModals } from '../general/ImportKeyModals/ImportModals.jsx';
import { KeyList } from './KeyList/KeyList.jsx';
import { TopBar } from './TopBar/TopBar.jsx';
import { BottomBar } from './BottomBar/BottomBar.jsx';

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
