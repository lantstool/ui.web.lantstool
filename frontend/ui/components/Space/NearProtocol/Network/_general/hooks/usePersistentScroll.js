import { useLayoutEffect, useRef } from 'react';

export const usePersistentScroll = ({ scrollerRef, scrollPosition = 0, onSave, enabled = true, onAfterRestore }) => {
  const restoredRef = useRef(false);

  useLayoutEffect(() => {
    if (!enabled || restoredRef.current) return;
    const scroller = scrollerRef.current;
    let observer = null;

    const tryRestore = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      // Restore scroll position when content is tall enough
      if (max >= scrollPosition) {
        scroller.scrollTop = scrollPosition;
        restoredRef.current = true; // restore once — don't fight later user scroll
        observer?.disconnect();
        observer = null;
      } else if (max > 0) {
        scroller.scrollTop = max;
      }
      onAfterRestore?.();
    };
    tryRestore();
    // Content may not be fully rendered yet — observe resize to retry restoring scroll
    if (scroller.scrollTop < scrollPosition && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(tryRestore);
      observer.observe(scroller);
    }

    return () => observer?.disconnect();
  }, [scrollerRef, scrollPosition, enabled]);
  // Save scroll position on unmount to restore it on next mount
  useLayoutEffect(
    () => () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      onSave(scroller.scrollTop);
    },
    [],
  );
};
