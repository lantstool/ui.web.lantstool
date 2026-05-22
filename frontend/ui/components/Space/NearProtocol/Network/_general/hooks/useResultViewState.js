import { useLayoutEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { foldedRanges, foldEffect, forceParsing } from '@codemirror/language';

const findScrollableAncestor = (el) => {
  for (let n = el?.parentElement; n && n !== document.body; n = n.parentElement) {
    const { overflowY } = getComputedStyle(n);
    if (overflowY === 'auto' || overflowY === 'scroll') return n;
  }
  return document.scrollingElement || document.documentElement;
};

const findEditorView = (root) => {
  const cmDom = root?.querySelector('.cm-editor');
  return cmDom ? EditorView.findFromDOM(cmDom) : null;
};

const collectFoldedRanges = (state) => {
  const ranges = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => ranges.push({ from, to }));
  return ranges;
};

export const useResultViewState = ({ ref, viewState, onSave }) => {
  const { scrollTop = 0, foldedRanges: folds = [] } = viewState ?? {};

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || scrollTop <= 0) return undefined;
    const container = findScrollableAncestor(el);

    let observer = null;
    const tryRestore = () => {
      const max = container.scrollHeight - container.clientHeight;
      if (max >= scrollTop) {
        container.scrollTop = scrollTop;
        observer?.disconnect();
        observer = null;
      } else if (max > 0) {
        container.scrollTop = max;
      }
      // Outer scroll change doesn't notify CodeMirror; nudge it to remeasure.
      findEditorView(el)?.requestMeasure?.();
    };
    tryRestore();
    if (container.scrollTop < scrollTop && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(tryRestore);
      observer.observe(el);
      if (container !== el) observer.observe(container);
    }
    return () => observer?.disconnect();
  }, [ref]);

  useLayoutEffect(
    () => () => {
      const el = ref.current;
      if (!el) return;
      const view = findEditorView(el);
      onSave({
        scrollTop: findScrollableAncestor(el)?.scrollTop ?? 0,
        foldedRanges: view ? collectFoldedRanges(view.state) : [],
      });
    },
    [],
  );

  const onCreateEditor = (view) => {
    forceParsing(view, view.state.doc.length, 500);
    if (!folds.length) return;
    const docLen = view.state.doc.length;
    const effects = folds
      .filter(({ from, to }) => from >= 0 && to <= docLen && from < to)
      .map(({ from, to }) => foldEffect.of({ from, to }));
    if (effects.length) view.dispatch({ effects });
  };

  return { onCreateEditor };
};
