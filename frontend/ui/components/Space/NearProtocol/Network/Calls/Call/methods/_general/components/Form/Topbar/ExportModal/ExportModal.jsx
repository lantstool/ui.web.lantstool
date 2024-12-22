import { useStoreAction, useStoreEffect } from '@react-vault';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../../../../../../../_general/Button/Button.jsx';
import { BaseModal } from '../../../../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { CopyButton } from '../../../../../../../../../../../_general/CopyButton/CopyButton.jsx';
import { JsonEditor } from '../../../../../../../../../../../_general/jsonEditor/JsonEditor/JsonEditor.jsx';
import cn from './ExportModal.module.scss';

export const ExportModal = ({ call, form, closeModal }) => {
  const [data, setData] = useState('');
  const exportOneAsJson = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsJson);
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsZip);
  const setNotification = useStoreAction((store) => store.setNotification);

  useEffect(() => {
    setData(exportOneAsJson({ call, form }));
  }, [call, form]);

  const downloadZip = () => {
    exportOneAsZip({ call, form, closeModal });
  };

  const afterCopyCallback = () => {
    closeModal();
    setNotification({ isOpen: true, message: 'Copied to the clipboard', variant: 'success' });
  };

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader
        title={`Export ${call.name}`}
        close={closeModal}
        classes={{ container: cn.headerContainer }}
      />
      <JsonEditor
        value={data}
        readOnly
        showClearBtn={false}
        classes={{ container: cn.editorContainer }}
        dynamicErrorSpace
      />
      <div className={cn.modalFooter}>
        <Button color="secondary" size="medium" onClick={downloadZip}>
          Download .zip
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
