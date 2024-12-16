import { jsonLanguage } from '@codemirror/lang-json';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { getFormattedJSON } from '../../../../../../../../../../../../store/helpers/utils.js';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { BaseModal } from '../../../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import cn from './ExportModal.module.scss';
import { methods } from '../../../../../../../../../../../../store/slices/nearProtocol/slices/calls/methods/index.js';

export const ExportModal = ({ call, form, closeModal }) => {
  const theme = EditorView.theme({ ...baseEditorStyles });
  const data = getFormattedJSON(methods.getAccount.exportTransformer({ call, form }));

  const downloadZip = () => {
    console.log(data);
  };

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal}}>
      <ModalHeader title="Export Call" close={closeModal} />
      <CodeMirror
        theme={theme}
        readOnly={true}
        value={data}
        extensions={[jsonLanguage, EditorView.lineWrapping]}
      />
      <div className={cn.modalFooter}>
        <Button color="secondary" size="medium">
          Download .zip
        </Button>
        <Button size="medium" onClick={downloadZip}>
          Copy JSON
        </Button>
      </div>
    </BaseModal>
  );
};
