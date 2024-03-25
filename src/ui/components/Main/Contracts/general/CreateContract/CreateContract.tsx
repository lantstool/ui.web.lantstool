import { useState } from 'react';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import { Modal } from './Modal/Modal.tsx';

export const CreateContract = ({styles}) => {
  const [isOpen, setOpen]: any = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <Button text="Create Contract" onClick={open} src={addIcon} type="button" style="secondary" />
      {isOpen && <Modal styles={styles} isOpen={isOpen} close={close} />}
    </>
  );
};
