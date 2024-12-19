import { Button } from '../../../../../_general/Button/Button.jsx';
import { useState } from 'react';
import { AccountSquareBold } from '../../../../../_general/icons/AccountSquareBold.jsx';
import { ImportAccount } from '../_general/ImportAccount/ImportAccount.jsx';
import cn from './Empty.module.scss';

export const Empty = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <AccountSquareBold style={cn.icon} />
        <h2 className={cn.title}>
          Nothing here. Import your first account to use it within the app.
        </h2>
      </div>
      <Button onClick={openModal}>Import account</Button>
      {isOpen && <ImportAccount setOpen={setOpen} />}
    </div>
  );
};
