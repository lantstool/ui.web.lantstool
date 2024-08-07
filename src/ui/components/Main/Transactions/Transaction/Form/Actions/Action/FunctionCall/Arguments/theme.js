import { EditorView } from '@uiw/react-codemirror';

export const theme = (errors) =>
  EditorView.theme({
    '&': {
      color: 'var(--Text-Dark);',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRadius: '10px',
      border: errors.arguments ? '1px solid red' : '1px solid var(--Color-Green-1500)',
    },
    '&-focused': {
      border: '1px solid var(--Color-Green-1500)',
    },
    '.cm-content': {
      caretColor: 'var(--Color-Green-1500)',
    },
    '&.cm-editor': {
      overflow: 'hidden',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'var(--Color-Green-500)',
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
      backgroundColor: 'var(--Color-Olive-300)',
      color: '#ffffff',
      border: 'none',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      minWidth: '30px',
      fontSize: '15px',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(219,240,230,0.2)',
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
      backgroundColor: 'var(--Color-Green-500)',
    },
    '.cm-foldGutter span': {
      padding: '0 2px',
    },
  });
