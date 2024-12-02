import cn from './List.module.scss';
import { useState } from 'react';
import { ImportAccount } from '../_general/ImportAccount/ImportAccount.jsx';
import { AccountsList } from './AccountsList/AccountsList.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';

export const List = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.accountList}>
      <div className={cn.topbar}>
        <div className={cn.wrapper}>
          <h1 className={cn.title}>Accounts</h1>
          <p className={cn.subtitle}>Here you'll find the accounts used throughout this space.</p>
        </div>
        <Button size="medium" onClick={openModal}>
          Import
        </Button>
      </div>
      <AccountsList />
      {isOpen && <ImportAccount setOpen={setOpen} />}
    </div>
  );
};
