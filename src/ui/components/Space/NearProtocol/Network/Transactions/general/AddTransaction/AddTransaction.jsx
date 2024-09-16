import { useState } from 'react';
import { Button } from '../../../general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { AddTransactionModal } from './AddTransactionModal/AddTransactionModal.jsx';

export const AddTransaction = ({ styles }) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = async () => {
    setOpen(true);
  };

  return (
    <>
      <Button text="Create Transaction" onClick={openModal} src={addIcon} type="submit" />
      {isOpen && <AddTransactionModal styles={styles} isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
