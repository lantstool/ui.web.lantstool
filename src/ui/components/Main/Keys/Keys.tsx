import cn from './Keys.module.css';
import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { useEffect, useState } from 'react';
import { ImportModals } from './ImportKeyModals/ImportModals.tsx';
import { List } from './List/List.tsx';
import { TopBar } from './TopBar/TopBar.tsx';
import {Route, useMatch, useParams} from 'react-router-dom';
import { Key } from './Key/Key.tsx';


export const Keys = () => {
  const getKeys = useStoreEffect((store: any) => store.keys.getKeys);
    const records: any = useStoreState((store: any) => store.keys.records);
  const [isOpen, setOpen] = useState(false);


  useEffect(() => {
    getKeys();
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <TopBar openModal={openModal} />
      <ImportModals isOpen={isOpen} setOpen={setOpen} />
      <List />
    </div>
  );
};
