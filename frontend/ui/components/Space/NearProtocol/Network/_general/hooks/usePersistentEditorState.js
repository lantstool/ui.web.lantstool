import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { foldedRanges, foldEffect, forceParsing } from '@codemirror/language';
import { EditorView } from '@uiw/react-codemirror';
import {
  buildModel,
  unwrapRange,
  wrappedPosToOriginal,
  originalPosToWrapped,
} from '../helpers/hardWrapModel.js';

const collectFoldedRanges = (state) => {
  const ranges = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => ranges.push({ from, to }));
  return ranges;
};

/**
 * Controller for the Calls/Transactions "Result" JSON viewer.
 *
 * The whole panel (header + JSON) scrolls as ONE outer container, and the scroll
 * position + folds survive tab switches, re-execution, and leaving/returning.
 *
 * Why hard-wrap: CodeMirror only ESTIMATES off-screen soft-wrapped line heights, so
 * we keep `lineWrapping` OFF and insert real '\n' ourselves (hardWrapModel.js) —
 * every line is one fixed-height row, so the outer-container pixel scroll restore is
 * exact. (Cost of real '\n' — linter off + copy un-wrapping — is paid in JsonEditor
 * and copyExtensions.)
 *
 * Lifecycle: onCreateEditor → wrap (`wrapped`) → restore scroll+folds (`ready`) →
 * save { scrollPosition, foldedRanges } on unmount AND when leaving Raw for Overview.
 *
 * @param {{ current: HTMLElement }} scrollerRef  outer `.result` scroller
 * @param {string} originalJson  the clean (unwrapped) JSON
 * @param {{ scrollPosition: number, foldedRanges: {from:number,to:number}[] }} editorState  persisted snapshot
 * @param {(snapshot: { scrollPosition: number, foldedRanges: object[] }) => void} onSave  persist the snapshot (called on unmount and on a Raw→Overview tab switch)
 * @returns {{ onCreateEditor: Function, value: string, formatLineNumber: Function, ready: boolean, freezeScroll: Function, copyExtensions: object[] }}
 */

export const usePersistentEditorState = ({ scrollerRef, originalJson, editorState, onSave }) => {
  const { scrollPosition = 0, foldedRanges: folds = [] } = editorState || {};

  const [value, setValue] = useState(originalJson);
  // Flipped true after the wrap commits (onCreateEditor's measure write); triggers
  // the restore effect, so it never runs against the short, unwrapped content.
  const [wrapped, setWrapped] = useState(false);
  // Gates the consumer's visibility:hidden. Set false (hide) only when there's
  // something to mask — a scroll jump or a pending wrap (see onCreateEditor).
  const [ready, setReady] = useState(false);

  const viewRef = useRef(null);
  const restoredRef = useRef(false);
  const rafRef = useRef(null);
  // Live outer scrollTop as a plain NUMBER (not a DOM ref): mirrored on every
  // scroll so it survives unmount — React nulls the host ref before our cleanup,
  // so we save from here, not from scrollerRef.current.
  const scrollTopRef = useRef(scrollPosition);
  // True while Raw is the live view; false on Overview. Gates scroll tracking AND the
  // unmount-save, so a stale Overview view can't clobber the saved Raw snapshot.
  const editorAliveRef = useRef(false);
  // Restore target captured at onCreateEditor (frozen Raw pos, or saved pos on first mount).
  const pendingRestoreRef = useRef(scrollPosition);
  const lineNumbersRef = useRef(null); // output line → logical number | null
  const wrappedFromRef = useRef(null); // which originalJson `value` was wrapped from
  // Latest onSave in a ref so the unmount-save (empty deps) calls the current one.
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  // Snapshot the current Raw scroll + folds into the store. MUST run while the Raw
  // editor is alive (viewRef valid) — on Overview viewRef is null/stale.
  const saveSnapshot = () => {
    const view = viewRef.current;
    onSaveRef.current({
      scrollPosition: scrollTopRef.current,
      foldedRanges: view ? collectFoldedRanges(view.state) : [],
    });
  };

  // Re-wrap for the current width without losing folds: a re-wrap replaces the whole
  // doc (wiping fold state), so map folds to original coords, rebuild, map back, and
  // re-fold. Used by the ResizeObserver on a real width change.
  const applyWrap = (view) => {
    const origFolds = collectFoldedRanges(view.state).map(({ from, to }) => ({
      from: wrappedPosToOriginal(view.state, from, lineNumbersRef.current),
      to: wrappedPosToOriginal(view.state, to, lineNumbersRef.current),
    }));

    const model = buildModel(view, originalJson);
    lineNumbersRef.current = model.lineNumbers;
    wrappedFromRef.current = originalJson;
    setValue(model.text);

    if (!origFolds.length) return;

    // Doc updates on React's next commit — wait until it's live, then map folds forward.
    let tries = 0;
    const refold = () => {
      const currentView = viewRef.current;
      if (currentView !== view || !currentView.dom.isConnected) return;
      if (currentView.state.doc.length !== model.text.length) {
        if (tries++ > 10) return;
        requestAnimationFrame(refold);
        return;
      }
      forceParsing(currentView, currentView.state.doc.length, 500);
      currentView.dispatch({
        effects: origFolds.map(({ from, to }) =>
          foldEffect.of({
            from: originalPosToWrapped(from, model.breakOffsets),
            to: originalPosToWrapped(to, model.breakOffsets),
          }),
        ),
      });
    };
    requestAnimationFrame(refold);
  };

  // CodeMirror calls this on each (re)creation — first mount and every switch back to Raw.
  const onCreateEditor = (view) => {
    viewRef.current = view;
    restoredRef.current = false;
    setWrapped(false);
    // Snapshot the scroll to restore before scroll tracking resumes.
    pendingRestoreRef.current = scrollTopRef.current;
    editorAliveRef.current = true;
    // Hide only if there's something to mask: a scroll jump (target > 0) or content
    // that isn't the wrapped form of the CURRENT json (first mount / re-execute). On
    // a tab switch back to Raw the value is already wrapped & usually at the top →
    // reveal immediately, no flash.
    setReady(!(scrollTopRef.current > 0 || wrappedFromRef.current !== originalJson));
    // Defer the wrap until the font is loaded + one measure cycle: at create time
    // defaultCharacterWidth is the 7px default, so cols would be too wide.
    // requestMeasure's read runs after CM has measured the real font.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (viewRef.current !== view || !view.dom.isConnected) return;
      view.requestMeasure({
        read: () => buildModel(view, originalJson),
        write: (model) => {
          if (viewRef.current !== view) return;
          lineNumbersRef.current = model.lineNumbers;
          wrappedFromRef.current = originalJson;
          setValue(model.text);
          setWrapped(true);
        },
      });
    });
  };

  // Keep value synced to the source before the editor exists (e.g. loading → result).
  useEffect(() => {
    if (!viewRef.current) {
      setValue(originalJson);
      wrappedFromRef.current = null; // unwrapped source
    }
  }, [originalJson]);

  // Re-execute makes a fresh editorState (pos 0) without remounting — reset tracking.
  useEffect(() => {
    scrollTopRef.current = scrollPosition;
    pendingRestoreRef.current = scrollPosition;
  }, [editorState]);

  // Safety: never leave the content hidden if the wrap/restore stalls.
  useEffect(() => {
    const revealTimer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(revealTimer);
  }, []);

  // Track outer scrollTop into a ref (survives host ref detachment at unmount).
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      if (editorAliveRef.current) scrollTopRef.current = scroller.scrollTop;
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  // Restore once, after wrap commits. Heights are exact, so the pixel restore is precise.
  useEffect(() => {
    if (!wrapped || restoredRef.current) return;
    const view = viewRef.current;
    const scroller = scrollerRef.current;
    if (!view || !scroller) return;

    const target = pendingRestoreRef.current;

    // Parse the whole doc so highlighting + fold markers exist, then re-apply folds.
    forceParsing(view, view.state.doc.length, 500);
    if (folds.length) {
      view.dispatch({ effects: folds.map(({ from, to }) => foldEffect.of({ from, to })) });
    }

    let tries = 0;
    const tick = () => {
      if (!scroller.isConnected || tries++ > 60) {
        rafRef.current = null;
        setReady(true); // reveal even if we couldn't fully reach the target
        return;
      }
      const max = scroller.scrollHeight - scroller.clientHeight;
      if (max >= target) {
        scroller.scrollTop = target;
        scrollTopRef.current = target;
        restoredRef.current = true;
        // CM virtualizes — request a measure after the programmatic scroll, else
        // the viewport stays blank until the user scrolls.
        view.requestMeasure();
        setReady(true); // scroll is in place → safe to show
        rafRef.current = null;
        return;
      }
      // Not tall enough yet (CM still building rows) — scroll as far as we can
      // (also nudges CM to render more) and retry next frame.
      if (max > 0) {
        scroller.scrollTop = max;
        scrollTopRef.current = max;
        view.requestMeasure();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [wrapped]);

  // Re-wrap only on a real width change. ResizeObserver also fires on initial
  // observe and on gutter-widen; ignoring this avoids a feedback loop that would
  // replace the doc and wipe folds + scroll.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof ResizeObserver === 'undefined') return;
    let lastWidth = scroller.clientWidth;
    let debounceTimer = null;
    const resizeObserver = new ResizeObserver(() => {
      const width = scroller.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (viewRef.current) applyWrap(viewRef.current);
      }, 150);
    });
    resizeObserver.observe(scroller);
    return () => {
      clearTimeout(debounceTimer);
      resizeObserver.disconnect();
    };
  }, [originalJson]);

  // Save on unmount — but ONLY while Raw is alive. On Overview, freezeScroll already
  // saved the Raw snapshot; viewRef is null/stale there, so re-saving would clobber
  // the store with empty folds.
  useLayoutEffect(
    () => () => {
      if (editorAliveRef.current) saveSnapshot();
    },
    [],
  );

  // Gutter shows the logical line number; continuation rows are blank.
  const formatLineNumber = useMemo(
    () => (lineNo) => {
      const map = lineNumbersRef.current;
      if (!map) return String(lineNo);
      const logical = map[lineNo - 1];
      return logical == null ? '' : String(logical);
    },
    [],
  );

  const copyExtensions = useMemo(
    () => [
      // On copy, strip the '\n' we inserted so a selection across a wrap point
      // yields the original unbroken text.
      EditorView.domEventHandlers({
        copy(event, view) {
          const { from, to } = view.state.selection.main;
          if (from === to || !event.clipboardData) return false;
          const text = unwrapRange(view.state, from, to, lineNumbersRef.current);
          event.clipboardData.setData('text/plain', text);
          event.preventDefault();
          return true;
        },
      }),
      // The editor never scrolls itself — don't reserve the scrollbar gutter.
      EditorView.theme({ '.cm-scroller': { scrollbarGutter: 'auto' } }),
    ],
    [],
  );

  // Called on a tab switch with the TARGET mode. Switching TO overview means we are
  // LEAVING Raw → save its scroll+folds NOW, while the view is still alive (Raw
  // remounts on the way back and restore re-applies them). Going TO raw saves
  // nothing — the editor isn't mounted yet. The editorAliveRef check stops a
  // null/stale view from clobbering the store with empty folds (the original bug:
  // saving in the 'raw' branch after navigating away and back).
  const freezeScroll = (viewMode) => {
    if (viewMode === 'overview' && editorAliveRef.current) {
      saveSnapshot();
      if (scrollerRef.current) scrollerRef.current.scrollTop = 0; // overview starts at the top
    }
    editorAliveRef.current = false;
  };

  return { onCreateEditor, value, formatLineNumber, ready, freezeScroll, copyExtensions };
};
