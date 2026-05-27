import { usePersistentScroll } from './usePersistentScroll.js';
import { foldedRanges, foldEffect, forceParsing } from '@codemirror/language';
import { EditorView } from '@uiw/react-codemirror';

export const findEditorView = (root) => {
  const cmDom = root?.querySelector('.cm-editor');
  return cmDom ? EditorView.findFromDOM(cmDom) : null;
};

export const collectFoldedRanges = (state) => {
  const ranges = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => ranges.push({ from, to }));
  return ranges;
};

export const usePersistentEditorState = ({ ref, editorState, onSave }) => {
  const { scrollPosition, foldedRanges: folds } = editorState;

  usePersistentScroll({
    ref,
    scrollPosition,
    // CodeMirror requires a measure after scroll restore to render correctly
    onAfterRestore: () => findEditorView(ref.current)?.requestMeasure?.(),
    onSave: (sp) => {
      const EditorView = findEditorView(ref.current);
      onSave({
        scrollPosition: sp,
        foldedRanges: EditorView ? collectFoldedRanges(EditorView.state) : [],
      });
    },
  });
  // Restores fold state from the previous session
  const onCreateEditor = (view) => {
    // CodeMirror only parses the first ~100 lines by default,
    // rest gets parsed lazily which causes to visual bugs, to avoid it we forceParsing
    forceParsing(view, view.state.doc.length, 500);
    if (!folds.length) return;
    const effects = folds.map(({ from, to }) => foldEffect.of({ from, to }));
    if (effects.length) view.dispatch({ effects });
  };

  return { onCreateEditor };
};
