import cn from './List.module.css';
import { useState } from 'react';
import { BottomBar } from './BottomBar/BottomBar.tsx';
import { ImportAccount } from '../general/ImportAccount/ImportAccount.tsx';
import { AccountsList } from './AccountsList/AccountsList.tsx';

export const List = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.topbar}>Accounts</div>
      <AccountsList />
      {isOpen && <ImportAccount isOpen={isOpen} setOpen={setOpen} />}
      <BottomBar openModal={openModal} />
    </div>
  );
};
