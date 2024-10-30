import { Button } from '../../../../../../_general/Button/Button.jsx';
import { TrashBinOutline } from '../../../../../../_general/icons/TrashBinOutline.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useState } from 'react';
import cn from './DangerZone.module.scss';

export const DangerZone = () => {
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
            <h2 className={cn.subtitle}>Delete this key</h2>
            <p className={cn.warningText}>
              Save this key elsewhere before removal to avoid losing account access.
            </p>
          </div>
          <Button onClick={openModal} color="danger" IconLeft={TrashBinOutline} size="medium">
            Remove key
          </Button>
        </div>
      </div>
      <DeleteModal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
};
