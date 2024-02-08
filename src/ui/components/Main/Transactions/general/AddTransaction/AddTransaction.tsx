import { useState } from 'react';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import { AddTransactionModal } from './AddTransactionModal/AddTransactionModal.tsx';

export const AddTransaction = ({ styles }: any) => {
  const [isOpen, setOpen]: any = useState(false);

  const openModal = async () => {
    setOpen(true);
  };

  return (
    <>
      <Button text="Add transaction" onClick={openModal} src={addIcon} type="submit" />
      {isOpen && <AddTransactionModal styles={styles} isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
