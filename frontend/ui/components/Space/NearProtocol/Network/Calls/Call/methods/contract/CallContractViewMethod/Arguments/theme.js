import { EditorView } from '@uiw/react-codemirror';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';

export const theme = (errors) =>
  EditorView.theme({
    ...baseEditorStyles,
    '&': {
      color: '#212529',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRadius: '0 0 8px 8px ',
      border: errors.arguments ? '1px solid #CA2C2C' : '1px solid #E9ECEF',
    },
  });
