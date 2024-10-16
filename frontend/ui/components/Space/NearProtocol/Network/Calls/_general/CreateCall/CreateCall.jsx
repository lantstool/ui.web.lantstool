import { useState } from 'react';
import { Button } from '../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { CreateModal  } from './CreateModal/CreateModal.jsx';

export const CreateCall = ({ styles }) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button text="Create Call" onClick={openModal} src={addIcon} type="button" />
      {isOpen && <CreateModal styles={styles} closeModal={closeModal} />}
    </>
  );
};
