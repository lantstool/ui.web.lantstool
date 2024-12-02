import { useStoreEffect } from '@react-vault';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../_general/Button/Button.jsx';
import { CloseCircleOutline } from '../../_general/icons/CloseCircleOutline.jsx';
import { Modal } from '../../_general/Modal/Modal.jsx';
import { FileUploader } from '../../_general/FileUploader/FileUploader.jsx';
import cn from './RestoreFromBackup.module.scss';

export const RestoreFromBackup = ({ closeModal }) => {
  const navigate = useNavigate();
  const restoreFromBackup = useStoreEffect((store) => store.restoreFromBackup);
  const [file, setFile] = useState(null);

  const restore = () => {
    restoreFromBackup({ file, navigate });
  };

  return (
    <Modal isOpen closeModal={closeModal}>
      <div className={cn.container}>
        <div className={cn.head}>
          <h1 className={cn.title}>Restore from backup</h1>
          <Button
            color="tertiary"
            size="small"
            IconLeft={CloseCircleOutline}
            onClick={closeModal}
          />
        </div>
        <p className={cn.subtitle}>
          Use this to restore the entire app data with multiple spaces and settings - upload a
          lantstool-backup-[date].zip file. If you want to import just a single space, use the
          Import Space option.
        </p>
        <FileUploader
          file={file}
          setFile={setFile}
          callToActionText="Select a .zip file or drag&drop it here"
          allowedFileTypes={{ 'application/zip': ['.zip'] }}
        />
        <div className={cn.button}>
          <Button size="medium" type="submit" onClick={restore} disabled={!file}>
            Restore
          </Button>
        </div>
      </div>
    </Modal>
  );
};
