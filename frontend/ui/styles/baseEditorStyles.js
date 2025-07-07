export const baseEditorStyles = {
  '&': {
    color: '#212529',
    backgroundColor: '#ffffff',
    height: '100%',
    borderRadius: '8px',
    border: '1px solid #E9ECEF',
  },
  '.cm-content': {
    padding: 0,
    caretColor: '#212529',
  },
  '.cm-matchingBracket': {
    backGroundColor: 'red',
  },
  '.cm-line': {
    fontFamily: 'Roboto Mono',
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
  '.cm-gutters': {
    backgroundColor: '#F1F3F5',
    color: '#868E96',
    border: 'none',

  },
  '.cm-fold-marker': {
    minWidth: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    minWidth: '30px',
    fontSize: '15px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(10,10,10,0.05)',
  },
  '.cm-scroller': {
    fontFamily: 'Roboto Mono, sans-serif !important',
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
    backgroundColor: '#DEE2E6',
  },
  '.cm-foldGutter span': {
    width: '0',
    padding: '0',
  },
};
