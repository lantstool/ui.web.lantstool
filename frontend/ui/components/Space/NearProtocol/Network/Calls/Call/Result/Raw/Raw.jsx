import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { getFormattedJSON } from '../../../../../../../../../store/helpers/utils.js';
import { EditorView } from '@uiw/react-codemirror';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';
import cn from './Raw.module.scss';

export const Raw = ({ result, error }) => {
  const data = result ? result : error;
  const theme = EditorView.theme({ ...baseEditorStyles });

  return (
    <div className={cn.raw}>
      <CodeMirror
        theme={theme}
        readOnly={true}
        value={getFormattedJSON(data)}
        extensions={[jsonLanguage, EditorView.lineWrapping]}
      />
    </div>
  );
};
