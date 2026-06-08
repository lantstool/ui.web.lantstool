import { foldedRanges, foldEffect, forceParsing } from '@codemirror/language';
import { EditorView } from '@uiw/react-codemirror';
import {
  buildModel,
  unwrapRange,
  wrappedPosToOriginal,
  originalPosToWrapped,
} from './hardWrapModel.js';

const collectFoldedRanges = (state) => {
  const ranges = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => ranges.push({ from, to }));
  return ranges;
};

// Current folds → original-text coords
const foldsToOriginal = (state, lineNumbers) =>
  collectFoldedRanges(state).map(({ from, to }) => ({
    from: wrappedPosToOriginal(state, from, lineNumbers),
    to: wrappedPosToOriginal(state, to, lineNumbers),
  }));

// Original folds → fold effects (wrapped coords)
const foldEffectsFor = (folds, breakOffsets) =>
  folds.map(({ from, to }) =>
    foldEffect.of({
      from: originalPosToWrapped(from, breakOffsets),
      to: originalPosToWrapped(to, breakOffsets),
    }),
  );

export const createResultEditor = ({
  getScroller,
  onSave,
  originalJson,
  scrollPosition,
  folds,
}) => {
  // --- state ---
  let hidden = true;
  let value = originalJson; // current doc text (original, then wrapped after measure)
  let view = null;
  let scrollTop = scrollPosition;
  let savedFolds = folds; // folds to restore, in original-text coords
  let model = { lineNumbers: null, breakOffsets: [], wrappedFrom: null };
  let pending = null; // { length, run } — run once the doc reaches this length
  // latest external inputs, refreshed each render via update()
  let currentJson = originalJson;
  let currentOnSave = onSave;

  // --- React binding (useSyncExternalStore): keep the snapshot ref stable ---
  const listeners = new Set();
  let snapshot = { value, ready: !hidden };
  const getSnapshot = () => snapshot;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const emit = () => {
    const ready = !hidden;
    if (snapshot.value === value && snapshot.ready === ready) return; // unchanged → keep ref
    snapshot = { value, ready };
    listeners.forEach((listener) => listener());
  };

  const getCurrentFoldsAsOriginal = () => foldsToOriginal(view.state, model.lineNumbers);

  // --- steps ---
  const save = () => {
    const scroller = getScroller();
    currentOnSave({
      scrollPosition: scroller.scrollTop,
      foldedRanges: savedFolds,
    });
  };

  const reveal = () => {
    hidden = false;
    emit();
  };

  // Restore saved scroll + folds synchronously.
  const runRestore = () => {
    const scroller = getScroller();
    if (!view || !scroller) return;

    forceParsing(view, view.state.doc.length, 500); // Parse the whole document
    if (savedFolds.length) {
      view.dispatch({ effects: foldEffectsFor(savedFolds, model.breakOffsets) });
    }
    if (scrollTop > 0) {
      scroller.scrollTop = scrollTop;
      view.requestMeasure();
    }
    reveal();
  };

  const runRefold = (origFolds, breakOffsets) => {
    if (!view) return;
    view.dispatch({ effects: foldEffectsFor(origFolds, breakOffsets) });
  };

  const commitValue = (text, run) => {
    const changed = value !== text;
    value = text;
    if (changed) {
      pending = { length: text.length, run }; // wait for onCmUpdate
      emit();
    } else {
      pending = null;
      emit();
      requestAnimationFrame(run); // doc already matches → run next frame
    }
  };

  const onCmUpdate = (update) => {
    if (!update.docChanged || !pending) return;
    if (update.state.doc.length === pending.length) {
      const run = pending.run;
      pending = null;
      requestAnimationFrame(run);
    }
  };

  // --- events ---
  const attach = (editorView) => {
    view = editorView;
    // Hide until restore. Avoids a flash of the unwrapped text before it re-wraps.
    hidden = scrollTop > 0 || model.wrappedFrom !== currentJson;
    emit();

    editorView.requestMeasure({
      read: () => buildModel(editorView, currentJson),
      write: (wrapModel) => {
        if (view !== editorView) return;
        model = {
          lineNumbers: wrapModel.lineNumbers,
          breakOffsets: wrapModel.breakOffsets,
          wrappedFrom: currentJson,
        };
        commitValue(wrapModel.text, runRestore);
      },
    });
  };

  const widthChanged = () => {
    if (!view || hidden) return;
    const originalFolds = foldsToOriginal(view.state, model.lineNumbers);
    const wrapModel = buildModel(view, currentJson);
    model = {
      lineNumbers: wrapModel.lineNumbers,
      breakOffsets: wrapModel.breakOffsets,
      wrappedFrom: currentJson,
    };
    commitValue(
      wrapModel.text,
      originalFolds.length ? () => runRefold(originalFolds, wrapModel.breakOffsets) : () => {},
    );
  };

  const leave = (mode) => {
    if (mode === 'overview' && view) {
      savedFolds = getCurrentFoldsAsOriginal();
      save();
      const scroller = getScroller();
      scroller.scrollTop = 0;
      view = null; // Drop the live view so dispose/widthChanged skip it
    }
  };

  const dispose = () => {
    if (view) {
      savedFolds = getCurrentFoldsAsOriginal();
      save();
    }
  };

  const resetTargets = (nextScroll, nextFolds) => {
    scrollTop = nextScroll;
    savedFolds = nextFolds;
  };

  const update = (next) => {
    currentOnSave = next.onSave;
    currentJson = next.originalJson;
  };

  // --- stable outputs ---
  const formatLineNumber = (rowNumber) => {
    const lineNumbers = model.lineNumbers;
    if (!lineNumbers) return String(rowNumber);
    const originalLine = lineNumbers[rowNumber - 1];
    return originalLine == null ? '' : String(originalLine);
  };

  // CodeMirror extensions: forward updates + unwrap inserted '\n' on copy.
  const extensions = [
    EditorView.updateListener.of(onCmUpdate),
    EditorView.domEventHandlers({
      copy(event, editorView) {
        const { from, to } = editorView.state.selection.main;
        if (from === to || !event.clipboardData) return false;
        const text = unwrapRange(editorView.state, from, to, model.lineNumbers);
        event.clipboardData.setData('text/plain', text);
        event.preventDefault();
        return true;
      },
    }),
  ];

  return {
    subscribe,
    getSnapshot,
    update,
    attach,
    widthChanged,
    leave,
    dispose,
    resetTargets,
    formatLineNumber,
    extensions,
  };
};
