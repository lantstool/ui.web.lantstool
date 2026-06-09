import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import cn from './Raw.module.scss';

export const Raw = ({ value, copyValue, onCreateEditor, formatLineNumber, copyExtensions }) => (
  <JsonEditor
    readOnly
    value={value}
    copyValue={copyValue}
    showClearBtn={false}
    classes={{
      container: cn.editorContainer,
    }}
    disableLinter
    formatLineNumber={formatLineNumber}
    copyExtensions={copyExtensions}
    title="json"
    onCreateEditor={onCreateEditor}
  />
);
