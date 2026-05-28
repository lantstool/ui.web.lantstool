import { useLayoutEffect, useRef } from 'react';
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
  const rafRef = useRef(null);

  usePersistentScroll({
    ref,
    scrollPosition,
    // CodeMirror requires a measure after scroll restore to render correctly
    onAfterRestore: () => findEditorView(ref.current)?.requestMeasure?.(),
    onSave: (sp) => {
      const editorView = findEditorView(ref.current);
      onSave({
        scrollPosition: sp,
        foldedRanges: editorView ? collectFoldedRanges(editorView.state) : [],
      });
    },
  });

  const onCreateEditor = (view) => {
    forceParsing(view, view.state.doc.length, 500);
    if (folds.length) {
      const effects = folds.map(({ from, to }) => foldEffect.of({ from, to }));
      view.dispatch({ effects });
    }

    const outerEl = ref.current;
    if (!outerEl) return;

    // Wait for Roboto Mono (font-display: swap → cm-content height shifts ~50px
    // after font swap). Without this, we restore against pre-swap heights.
    document.fonts.ready.then(() => {
      // Force CodeMirror to drop cached pre-swap measurements.
      view.requestMeasure({ read: () => {} });

      let attempts = 0;
      const tick = () => {
        if (!outerEl.isConnected || attempts++ >= 60) {
          rafRef.current = null;
          return;
        }
        const max = outerEl.scrollHeight - outerEl.clientHeight;
        if (max >= scrollPosition) {
          outerEl.scrollTop = scrollPosition;
          rafRef.current = null;
          return;
        }
        if (max > 0 && outerEl.scrollTop < max) {
          outerEl.scrollTop = max;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    });
  };

  useLayoutEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    [],
  );

  return { onCreateEditor };
};
