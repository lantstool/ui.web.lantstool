import { useState } from 'react';
import { Button } from '../../../_general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { Modal } from './Modal/Modal.jsx';

export const CreateCall = ({ styles }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);

  return (
    <>
      <Button text="Create Call" onClick={open} src={addIcon} type="button" />
      {isOpen && <Modal styles={styles} isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
