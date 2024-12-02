import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { getFormattedJSON } from '../../../../../../../../../store/helpers/utils.js';
import { theme } from './theme.js';
import cn from './Raw.module.scss';

export const Raw = ({ result, error }) => {
  const data = result ? result : error;
  return (
    <div className={cn.raw}>
      <CodeMirror
        theme={theme}
        readOnly={true}
        editable={false}
        value={getFormattedJSON(data)}
        extensions={[jsonLanguage, EditorView.lineWrapping]}
      />
    </div>
  );
};
