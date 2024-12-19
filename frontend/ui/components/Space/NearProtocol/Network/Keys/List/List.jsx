import { useState } from 'react';
import { KeyList } from './KeyList/KeyList.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import cn from './List.module.scss';

export const List = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <div className={cn.topbar}>
          <div className={cn.wrapper}>
            <h1 className={cn.title}>Keys</h1>
            <p className={cn.subtitle}>Here you'll find the keys used throughout this space.</p>
          </div>
          <Button size="medium" onClick={openModal}>
            Import
          </Button>
        </div>
      </div>
      <KeyList />
      <ImportKeyModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
