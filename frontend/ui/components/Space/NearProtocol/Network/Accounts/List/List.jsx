import cn from './List.module.scss';
import { useState } from 'react';
import { BottomBar } from './BottomBar/BottomBar.jsx';
import { ImportAccount } from '../_general/ImportAccount/ImportAccount.jsx';
import { AccountsList } from './AccountsList/AccountsList.jsx';

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
