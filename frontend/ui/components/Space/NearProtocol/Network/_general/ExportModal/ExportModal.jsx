import { useStoreAction } from '@react-vault';
import { useEffect, useState } from 'react';
import { Button } from '@gc/Button/Button.jsx';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import cn from './ExportModal.module.scss';

// origin is call or transaction
export const ExportModal = ({
  origin,
  form,
  closeModal,
  exportOneAsJson,
  exportOneAsJsonFile,
  exportOneAsZip,
}) => {
  const [data, setData] = useState('');
  const setNotification = useStoreAction((store) => store.setNotification);

  useEffect(() => {
    exportOneAsJson({ origin, form, setData });
  }, [origin, form]);

  const downloadJson = () => {
    exportOneAsJsonFile({ origin, form, closeModal });
  };

  const downloadZip = () => {
    exportOneAsZip({ origin, form, closeModal });
  };

  const afterCopyCallback = () => {
    closeModal();
    setNotification({ isOpen: true, message: 'Copied to the clipboard', variant: 'success' });
  };

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader
        title={`Export ${origin.name}`}
        close={closeModal}
        classes={{ container: cn.headerContainer }}
      />
      <JsonEditor
        value={data}
        readOnly
        title="json"
        showClearBtn={false}
        classes={{ container: cn.editorContainer }}
        dynamicErrorSpace
        withLineWrapping
      />
      <div className={cn.modalFooter}>
        <Button color="secondary" size="medium" onClick={downloadZip}>
          Download .zip
        </Button>
        <Button color="secondary" size="medium" onClick={downloadJson}>
          Download .json
        </Button>
        <CopyButton
          value={data}
          variant="button"
          button={{ size: 'medium', label: 'Copy JSON' }}
          callback={afterCopyCallback}
        />
      </div>
    </BaseModal>
  );
};
