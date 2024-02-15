import cn from './Keys.module.css';
import {useStoreEffect, useStoreState} from '../../../../react-vault';
import { useEffect, useState } from 'react';
import { Button } from '../general/Button/Button.tsx';
import addIcon from '../../../assets/addIcon.svg'
import { ImportKeyModal } from './ImportKeyModal/ImportKeyModal.tsx';

export const Keys = () => {
  const getKeys = useStoreEffect((store: any) => store.keys.getKeys);
  const addKey = useStoreEffect((store: any) => store.keys.addKey);
  const keys = useStoreState((store: any) => store.keys)
    console.log(keys)
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getKeys();
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={cn.container}>
      <button onClick={addKey}>x</button>
      <div className={cn.topBar}>
        <div className={cn.button}>
          <Button text="Import Key" onClick={openModal} src={addIcon} style="secondary" />
        </div>
        <h2 className={cn.title}>Key List</h2>
      </div>
      {isOpen && <ImportKeyModal isOpen={isOpen} close={closeModal} />}
      <div className={cn.list}>

      </div>
    </div>
  );
};
