import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { createResultEditor } from './resultEditorController.js';
import { useReWrapOnResize } from './useReWrapOnResize.js';

/**
 * Wires React/CodeMirror events to the controller and binds its snapshot to render.
 * The effects here only forward events — all orchestration lives in the controller.
 */
export const usePersistentEditorState = ({ scrollerRef, originalJson, editorState, onSave }) => {
  const { scrollPosition, foldedRanges } = editorState;
  const controllerRef = useRef(null);
  // Create the controller once
  if (controllerRef.current === null) {
    controllerRef.current = createResultEditor({
      getScroller: () => scrollerRef.current,
      onSave,
      originalJson,
      scrollPosition,
      folds: foldedRanges,
    });
  }
  const controller = controllerRef.current;

  // Feed the latest onSave/originalJson each render (they change while the controller lives)
  controller.update({ onSave, originalJson });

  const { value, ready } = useSyncExternalStore(controller.subscribe, controller.getSnapshot);

  // Re-execute → fresh editorState (pos 0): reset restore targets + folds.
  useEffect(() => {
    controller.resetTargets(scrollPosition, foldedRanges);
  }, [editorState]);
  // Re-wrap on a real width change
  useReWrapOnResize(scrollerRef, originalJson, () => controller.widthChanged());
  // Save on unmount
  useLayoutEffect(() => () => controller.dispose(), []);

  return {
    value,
    ready,
    onCreateEditor: controller.attach,
    leave: controller.leave,
    formatLineNumber: controller.formatLineNumber,
    copyExtensions: controller.extensions,
  };
};
