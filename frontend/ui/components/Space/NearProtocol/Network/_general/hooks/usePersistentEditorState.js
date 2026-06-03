import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { foldedRanges, foldEffect, forceParsing } from '@codemirror/language';
import { EditorView } from '@uiw/react-codemirror';
import { buildModel, unwrapRange } from '../helpers/hardWrap.js';

const collectFoldedRanges = (state) => {
  const ranges = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => ranges.push({ from, to }));
  return ranges;
};

/*
  Controller for the NEAR Calls/Transactions "Result" JSON viewer.

  WHAT IT GIVES YOU: the whole result panel (header + JSON) scrolls as ONE outer
  container (`.result`), and the scroll position + the user's folds survive tab
  switches (Raw <-> Overview), re-execution, and leaving/returning to the result.

  WHY IT IS NOT JUST "store a number":
   - We want the OUTER container to be the scroller (so the header scrolls away
     together with the JSON, instead of a fixed header).
   - But CodeMirror only ESTIMATES the height of off-screen soft-wrapped lines
     (with `lineWrapping`), so the container's total height — and therefore any
     pixel-based scroll restore — drifts and lands in the wrong place.
   - FIX: keep `lineWrapping` OFF and hard-wrap the text ourselves (hardWrap.js):
     insert REAL '\n' so every line is exactly one row of `lineHeight`. The total
     height is then exact and `container.scrollTop = saved` lands precisely.
     (The price of real newlines in the doc — linter off + copy un-wrapping — is
     paid in JsonEditor and in `editorExtensions` below.)

  LIFECYCLE:
    onCreateEditor → wrap after fonts load + one measure cycle  (sets `wrapped`)
    → restore effect sets scrollTop and re-applies folds        (sets `ready`)
    → on unmount, save { scrollPosition, foldedRanges } via onSave.

  Most refs below exist to fix a specific, real bug — see each one's inline note.

  Params: ref = DOM ref to the outer `.result` scroller; original = the clean
  (unwrapped) JSON string; editorState = persisted { scrollPosition, foldedRanges }
  from the store; onSave = called once on unmount with the new snapshot.
*/


export const usePersistentEditorState = ({ ref, original, editorState, onSave }) => {
  const { scrollPosition = 0, foldedRanges: folds = [] } = editorState || {};

  const [value, setValue] = useState(original);
  // Flips true only via setState in onCreateEditor, so the restore effect runs
  // strictly after the wrapped value is committed (avoids restoring against the
  // still-unwrapped, short content).
  const [wrapped, setWrapped] = useState(false);
  // Gates the consumer's `visibility:hidden`: stays false until the scroll is
  // restored, so the user never sees the content sit at the top for a frame
  // before it jumps to the saved position.
  const [ready, setReady] = useState(false);

  const viewRef = useRef(null);
  const restoredRef = useRef(false);
  const rafRef = useRef(null);
  // The live outer scrollTop as a plain NUMBER (not a DOM ref): mirrored here on
  // every scroll event so the position survives unmount. We save FROM this ref,
  // never from ref.current.scrollTop at unmount — React nulls the host container
  // ref before this cleanup runs, so reading the DOM there would lose it.
  const scrollTopRef = useRef(scrollPosition);
  // scrollTopRef only tracks while the Raw editor is mounted (editorAliveRef) —
  // frozen during Overview so switching tabs preserves the Raw scroll position.
  const editorAliveRef = useRef(false);
  // Scroll target captured at onCreateEditor (frozen Raw position before a tab
  // switch, or the saved editorState position on first mount / re-execute).
  const pendingRestoreRef = useRef(scrollPosition);
  const lineNumbersRef = useRef(null); // output line → logical number | null
  // Hold the latest onSave in a ref so the unmount-save effect (empty deps) can
  // call the current callback without re-subscribing on every render.
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  // Rebuild the wrap model for the CURRENT editor width and push it into the doc.
  // Used by the ResizeObserver when the container is genuinely resized.
  const applyWrap = (view) => {
    const model = buildModel(view, original);
    lineNumbersRef.current = model.lineNumbers;
    setValue(model.text);
  };

  // CodeMirror calls this each time the editor view is (re)created — on first
  // mount and every time we switch back to the Raw tab.
  const onCreateEditor = (view) => {
    viewRef.current = view;
    restoredRef.current = false;
    setReady(false);
    setWrapped(false);
    // Snapshot the scroll to restore before scroll tracking resumes.
    pendingRestoreRef.current = scrollTopRef.current;
    editorAliveRef.current = true;
    // Defer the wrap until (a) the web font is loaded and (b) a CodeMirror
    // measure cycle has run. At onCreateEditor time view.defaultCharacterWidth
    // is still the 7px default (CM hasn't measured yet) — using it makes the
    // columns ~40% too wide, so lineWrapping re-breaks every line into ragged
    // stub rows. requestMeasure's read runs after CM measured the real font.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (viewRef.current !== view || !view.dom.isConnected) return;
      view.requestMeasure({
        read: () => buildModel(view, original),
        write: (model) => {
          if (viewRef.current !== view) return;
          lineNumbersRef.current = model.lineNumbers;
          setValue(model.text);
          setWrapped(true);
        },
      });
    });
  };

  // Keep value synced to the source before the editor exists (e.g. loading → result).
  useEffect(() => {
    if (!viewRef.current) setValue(original);
  }, [original]);

  // Re-execute produces a fresh editorState (scrollPosition 0) without
  // unmounting this hook, so reset scroll tracking to that position.
  useEffect(() => {
    scrollTopRef.current = scrollPosition;
    pendingRestoreRef.current = scrollPosition;
  }, [editorState]);

  // Safety: never leave the content hidden if the wrap/restore stalls.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Track outer scrollTop into a ref (survives host ref detachment at unmount).
  useLayoutEffect(() => {
    const outerEl = ref.current;
    if (!outerEl) return;
    const onScroll = () => {
      if (editorAliveRef.current) scrollTopRef.current = outerEl.scrollTop;
    };
    outerEl.addEventListener('scroll', onScroll, { passive: true });
    return () => outerEl.removeEventListener('scroll', onScroll);
  }, []);

  // Restore once, after the wrapped value is committed. Heights are exact
  // (no soft-wrap), so the pixel restore lands precisely.
  useEffect(() => {
    if (!wrapped || restoredRef.current) return;
    const view = viewRef.current;
    const outerEl = ref.current;
    if (!view || !outerEl) return;

    const target = pendingRestoreRef.current;

    // Parse the full (wrapped) document so highlighting and fold markers are
    // complete, then restore the saved folds.
    forceParsing(view, view.state.doc.length, 500);
    if (folds.length) {
      view.dispatch({ effects: folds.map(({ from, to }) => foldEffect.of({ from, to })) });
    }

    let tries = 0;
    const tick = () => {
      if (!outerEl.isConnected || tries++ > 60) {
        rafRef.current = null;
        setReady(true); // reveal even if we couldn't fully reach the target
        return;
      }
      const max = outerEl.scrollHeight - outerEl.clientHeight;
      if (max >= target) {
        outerEl.scrollTop = target;
        scrollTopRef.current = target;
        restoredRef.current = true;
        // CodeMirror virtualizes — after a programmatic scroll it won't repaint
        // the now-visible region until a measure is requested (otherwise the
        // viewport stays blank until the user scrolls).
        view.requestMeasure();
        setReady(true); // scroll is in place → safe to show
        rafRef.current = null;
        return;
      }
      // Not tall enough to reach the target yet: CodeMirror is still building and
      // measuring rows, so scrollHeight keeps growing over the next frames.
      // Scroll as far as we currently can (this also nudges CM to render more
      // rows) and try again on the next frame.
      if (max > 0) {
        outerEl.scrollTop = max;
        scrollTopRef.current = max;
        view.requestMeasure();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [wrapped]);

  // Re-wrap ONLY when the container width actually changes. ResizeObserver
  // fires on initial observe and also when wrapping widens the gutter — we must
  // ignore those, otherwise a spurious re-wrap replaces the whole document and
  // wipes folds + scroll right after mount. Tracking the container's own width
  // (stable thanks to scrollbar-gutter) avoids that feedback loop.
  useEffect(() => {
    const outerEl = ref.current;
    if (!outerEl || typeof ResizeObserver === 'undefined') return;
    let lastWidth = outerEl.clientWidth;
    let t = null;
    const ro = new ResizeObserver(() => {
      const width = outerEl.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      clearTimeout(t);
      t = setTimeout(() => {
        if (viewRef.current) applyWrap(viewRef.current);
      }, 150);
    });
    ro.observe(outerEl);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [original]);

  // Save scroll + folds on unmount.
  useLayoutEffect(
    () => () => {
      const view = viewRef.current;
      onSaveRef.current({
        scrollPosition: scrollTopRef.current,
        foldedRanges: view ? collectFoldedRanges(view.state) : [],
      });
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

  const editorExtensions = useMemo(
    () => [
      // Strip OUR inserted line breaks from a mouse selection on copy, so copying
      // across a wrap point yields the original unbroken text (the Copy button
      // already copies the clean original; this fixes select + Ctrl/Cmd+C).
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
      // The result editor never scrolls itself (the outer container does), so
      // don't reserve the vertical-scrollbar gutter — reclaim that width.
      EditorView.theme({ '.cm-scroller': { scrollbarGutter: 'auto' } }),
    ],
    [],
  );

  // Call before switching Raw → Overview. The outer container is shared by both
  // tabs, and Overview's content is shorter — so on the switch the browser clamps
  // the container's scrollTop (≈0) and fires a scroll event. Without this, that
  // event would overwrite scrollTopRef and the Raw position would be lost on the
  // way back. Setting editorAliveRef=false makes the scroll listener ignore those
  // events until the Raw editor is recreated (onCreateEditor sets it back true).
  const freezeScroll = () => {
    editorAliveRef.current = false;
  };

  return { onCreateEditor, value, formatLineNumber, ready, freezeScroll, editorExtensions };
};
