import { useState } from 'react';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import { AddAccountModal } from './AddAccountModal/AddAccountModal.tsx';

export const AddAccount = ({ list, styles }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <Button text="Add account" onClick={openModal} src={addIcon} />
      {isOpen && <AddAccountModal list={list} styles={styles} isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
