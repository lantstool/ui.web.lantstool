import { EditorView } from '@uiw/react-codemirror';
import { baseEditorStyles } from '@styles/baseEditorStyles.js';
import { HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

export const theme = (error, contentMinHeight) =>
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
    '.cm-content, .cm-gutter': {
      minHeight: contentMinHeight,
    },
    '.cm-scroller': {
      outline: 'none',
      overflowX: 'auto',
      scrollbarColor: '#ced4da #f7f9fa', // thumb color + track color
      scrollbarWidth: 'thin', // auto | thin | none
      scrollbarGutter: 'stable',
    },
  });

export const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: '#1a73e8' },
  { tag: tags.string, color: '#188038' },
  { tag: tags.number, color: '#e37400' },
  { tag: tags.bool, color: '#c5221f' },
  { tag: tags.null, color: '#5f6368' },
  { tag: tags.punctuation, color: '#dadce0' },
]);
