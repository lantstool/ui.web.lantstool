import { useStoreEffect } from '@react-vault';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseModal } from '../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../_general/modals/ModalHeader/ModalHeader.jsx';
import { ModalFooter } from '../../_general/modals/ModalFooter/ModalFooter.jsx';
import { FileUploader } from '../../_general/fileUploader/FileUploader/FileUploader.jsx';
import cn from './RestoreFromBackup.module.scss';

export const RestoreFromBackup = ({ closeModal }) => {
  const navigate = useNavigate();
  const restoreFromBackup = useStoreEffect((store) => store.restoreFromBackup);
  const [file, setFile] = useState(null);

  const restore = () => {
    restoreFromBackup({ file, navigate });
  };

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader title="Restore from backup" close={closeModal} />
      <div className={cn.bodyWrapper}>
        <p className={cn.description}>
          Use this to restore the entire app data with multiple spaces and settings - upload a
          lantstool-backup-[date].zip file.
        </p>
        <FileUploader
          file={file}
          setFile={setFile}
          callToActionText="Select a .zip file or drag&drop it here"
          allowedFileTypes={{ 'application/zip': ['.zip'] }}
        />
      </div>
      <ModalFooter
        action={{
          label: 'Restore',
          onClick: restore,
          disabled: !file,
        }}
      />
    </BaseModal>
  );
};
