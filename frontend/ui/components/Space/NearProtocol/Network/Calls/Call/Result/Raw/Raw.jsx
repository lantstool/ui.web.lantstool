import { getFormattedJSON } from '../../../../../../../../../store/helpers/utils.js';
import { JsonEditor } from '@gc/jsonEditor/JsonEditor/JsonEditor.jsx';
import cn from './Raw.module.scss';

export const Raw = ({ result, error }) => {
  const data = result ? result : error;

  return (
    <JsonEditor
      readOnly
      value={getFormattedJSON(data)}
      showClearBtn={false}
      classes={{
        container: cn.editorContainer,
      }}
      withLineWrapping
    />
  );
};
