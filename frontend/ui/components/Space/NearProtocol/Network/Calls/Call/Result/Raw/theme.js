import { EditorView } from '@uiw/react-codemirror';

export const theme = EditorView.theme(
  {
    '&': {
      color: '#212529',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRadius: '8px',
      border: '1px solid #E9ECEF',
    },
    '.cm-content': {
      caretColor: '#212529',
    },

    '.cm-line': {
      fontFamily: "Roboto Mono",
      color: '#212529',
    },
    '.ͼe': {
      color: '#212529',
    },
    '.ͼb': {
      color: '#212529',
    },
    '.ͼc': {
      color: '#212529',
    },
    '.ͼd': {
      color: '#212529',
    },

    '&.cm-editor': {
      overflow: 'hidden',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#e9ecef',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#e9ecef',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'none',
    },
    '.cm-gutters': {
      backgroundColor: '#F1F3F5',
      color: '#868E96',
      border: 'none',

    },
    '.cm-lineNumbers .cm-gutterElement': {
      minWidth: '30px',
      fontSize: '15px',
    },

    '.cm-activeLine': {
      backgroundColor: '#f8f9fa',
    },

    '.cm-scroller':{
      fontFamily: "Roboto Mono, sans-serif !important",
    },

    '.cm-foldGutter span': {
      width: '0',
      padding: '0',
    },
  }
);
