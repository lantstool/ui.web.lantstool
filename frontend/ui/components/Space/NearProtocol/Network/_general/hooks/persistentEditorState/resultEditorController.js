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
  const state = {
    hidden: true,
    value: originalJson, // current doc text (original, then wrapped after measure)
    view: null,
    scrollTop: scrollPosition,
    savedFolds: folds, // folds to restore, in original-text coords
    model: { lineNumbers: null, breakOffsets: [], wrappedFrom: null },
    pending: null, // { length, run } — run once the doc reaches this length
    // latest external inputs, refreshed each render via update()
    currentJson: originalJson,
    currentOnSave: onSave,
  };

  // --- React binding (useSyncExternalStore): keep the snapshot ref stable ---
  const listeners = new Set();
  let snapshot = { value: state.value, ready: !state.hidden };

  const getSnapshot = () => snapshot;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const emit = () => {
    const ready = !state.hidden;
    if (snapshot.value === state.value && snapshot.ready === ready) return; // unchanged → keep ref
    snapshot = { value: state.value, ready };
    listeners.forEach((listener) => listener());
  };

  const getCurrentFoldsAsOriginal = () =>
    foldsToOriginal(state.view.state, state.model.lineNumbers);

  // --- steps ---
  const save = () => {
    const scroller = getScroller();
    state.currentOnSave({
      scrollPosition: scroller.scrollTop,
      foldedRanges: state.savedFolds,
    });
  };

  const reveal = () => {
    state.hidden = false;
    emit();
  };

  // Restore saved scroll + folds synchronously.
  const runRestore = () => {
    const scroller = getScroller();
    if (!state.view || !scroller) return;

    forceParsing(state.view, state.view.state.doc.length, 500); // Parse the whole document
    if (state.savedFolds.length) {
      state.view.dispatch({ effects: foldEffectsFor(state.savedFolds, state.model.breakOffsets) });
    }
    if (state.scrollTop > 0) {
      scroller.scrollTop = state.scrollTop;
      state.view.requestMeasure();
    }
    reveal();
  };

  const runRefold = (origFolds, breakOffsets) => {
    if (!state.view) return;
    state.view.dispatch({ effects: foldEffectsFor(origFolds, breakOffsets) });
  };

  const commitValue = (text, run) => {
    const changed = state.value !== text;
    state.value = text;
    if (changed) {
      state.pending = { length: text.length, run }; // wait for onCmUpdate
      emit();
    } else {
      state.pending = null;
      emit();
      requestAnimationFrame(run); // doc already matches → run next frame
    }
  };

  const onCmUpdate = (update) => {
    if (!update.docChanged || !state.pending) return;
    if (update.state.doc.length === state.pending.length) {
      const run = state.pending.run;
      state.pending = null;
      requestAnimationFrame(run);
    }
  };

  // --- events ---
  const attach = (editorView) => {
    state.view = editorView;
    // Hide until restore. Avoids a flash of the unwrapped text before it re-wraps.
    state.hidden = state.scrollTop > 0 || state.model.wrappedFrom !== state.currentJson;
    emit();

    editorView.requestMeasure({
      read: () => buildModel(editorView, state.currentJson),
      write: (wrapModel) => {
        if (state.view !== editorView) return;
        state.model = {
          lineNumbers: wrapModel.lineNumbers,
          breakOffsets: wrapModel.breakOffsets,
          wrappedFrom: state.currentJson,
        };
        commitValue(wrapModel.text, runRestore);
      },
    });
  };

  const widthChanged = () => {
    if (!state.view || state.hidden) return;
    const originalFolds = foldsToOriginal(state.view.state, state.model.lineNumbers);
    const wrapModel = buildModel(state.view, state.currentJson);

    state.model = {
      lineNumbers: wrapModel.lineNumbers,
      breakOffsets: wrapModel.breakOffsets,
      wrappedFrom: state.currentJson,
    };

    commitValue(
      wrapModel.text,
      originalFolds.length ? () => runRefold(originalFolds, wrapModel.breakOffsets) : () => {},
    );
  };

  const leave = (mode) => {
    if (mode === 'overview' && state.view) {
      state.savedFolds = getCurrentFoldsAsOriginal();
      save();
      const scroller = getScroller();
      scroller.scrollTop = 0;
      state.view = null; // Drop the live view so dispose/widthChanged skip it
    }
  };

  const dispose = () => {
    if (state.view) {
      state.savedFolds = getCurrentFoldsAsOriginal();
      save();
    }
  };

  const resetTargets = (nextScroll, nextFolds) => {
    state.scrollTop = nextScroll;
    state.savedFolds = nextFolds;
  };

  const update = (next) => {
    state.currentOnSave = next.onSave;
    state.currentJson = next.originalJson;
  };

  // --- stable outputs ---
  const formatLineNumber = (rowNumber) => {
    const lineNumbers = state.model.lineNumbers;
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
        const text = unwrapRange(editorView.state, from, to, state.model.lineNumbers);
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
