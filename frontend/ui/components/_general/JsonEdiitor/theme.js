import { EditorView } from '@uiw/react-codemirror';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';

export const theme = (error) =>
  EditorView.theme({
    ...baseEditorStyles,
    '&': {
      color: '#212529',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRadius: '0 0 8px 8px ',
      border: error ? 'solid #CA2C2C' : 'solid #E9ECEF',
      borderWidth: '0 1px 1px',
    },
  });
