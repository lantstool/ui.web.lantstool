import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useEffect, useState } from 'react';
import cn from './ImportKey.module.css';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';

export const ImportKey = (accountId: any) => {
  const [isOpen, setOpen]: any = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
  };
  useEffect(() => {}, []);

  return (
    <>
      <button className={cn.buttonImport} onClick={openModal}>
        Import key
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.container}>
          <button onClick={closeModal}>Close</button>
          <h2>Which Access Key do you want to import?</h2>
          <InputGroup />
        </div>
      </Modal>
    </>
  );
};
