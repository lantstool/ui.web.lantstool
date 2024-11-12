import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { TrashBinOutline } from '../../../_general/icons/TrashBinOutline.jsx';
import { useState } from 'react';
import { Button } from '../../../_general/Button/Button.jsx';
import cn from './DangerZone.module.scss';

export const DangerZone = ({space}) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={cn.dangerZone}>
        <h2 className={cn.title}>Danger zone</h2>
        <div className={cn.container}>
          <div className={cn.warningWrapper}>
            <h2 className={cn.subtitle}>Delete this space</h2>
            <p className={cn.warningText}>
              Deleting a space is permanent and cannot be undone, be careful.
            </p>
          </div>
          <Button onClick={openModal} color="danger" IconLeft={TrashBinOutline} size="medium">
            Delete space
          </Button>
        </div>
      </div>
      <DeleteModal isOpen={isOpen} setOpen={setOpen} space={space}/>
    </>
  );
};
