import { EditorView } from '@uiw/react-codemirror';

export const theme = (errors) =>
  EditorView.theme({
    '&': {
      color: '#214131',
      backgroundColor: '#ffffff',
      height: '400px',
      borderRadius: '10px',
      border: errors.arguments ? '1px solid red' : 'none',
    },
    '&-focused': {
      border: 'none',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#024a32',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: '#4eb284',
      color: '#ddd',
      border: 'none',
      borderRadius: '8px 0  0 8px',
    },
  });
