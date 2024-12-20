import { jsonLanguage } from '@codemirror/lang-json';
import { useStoreEffect } from '@react-vault';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../../../../../../../_general/Button/Button.jsx';
import { BaseModal } from '../../../../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { CopyButton } from '../../../../../../../../../../../_general/CopyButton/CopyButton.jsx';
import cn from './ExportModal.module.scss';

export const ExportModal = ({ call, form, closeModal }) => {
  const [data, setData] = useState('');
  const theme = EditorView.theme({ ...baseEditorStyles });
  const exportOneAsJson = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsJson);

  useEffect(() => {
    setData(exportOneAsJson({ call, form }));
  }, [call, form]);

  const downloadZip = () => {
    console.log(data);
  };

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader
        title={`Export ${call.name}`}
        close={closeModal}
        classes={{ container: cn.headerContainer }}
      />
      <CodeMirror
        theme={theme}
        readOnly={true}
        value={data}
        extensions={[jsonLanguage, EditorView.lineWrapping]}
        className={cn.editor}
      />
      <div className={cn.modalFooter}>
        <Button color="secondary" size="medium">
          Download .zip
        </Button>
        <CopyButton value={data} variant="button" button={{ size: 'medium', label: 'Copy JSON' }} />
      </div>
    </BaseModal>
  );
};
