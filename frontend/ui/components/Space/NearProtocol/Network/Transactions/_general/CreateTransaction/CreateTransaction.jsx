import { useState } from 'react';
import { Button } from '../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { CreateModal } from './CreateModal/CreateModal.jsx';

export const CreateTransaction = ({ styles }) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = async () => {
    setOpen(true);
  };

  return (
    <>
      <Button text="Create Transaction" onClick={openModal} src={addIcon} type="submit" />
      {isOpen && <CreateModal styles={styles} isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
