import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import cn from './Raw.module.scss';


export const Raw = ({ value, copyValue, onCreateEditor, formatLineNumber, extraExtensions }) => {
  return (
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
      extraExtensions={extraExtensions}
      title="json"
      onCreateEditor={onCreateEditor}
    />
  );
};
