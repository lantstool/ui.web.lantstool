import { useLayoutEffect } from 'react';

export const usePersistentScroll = ({ ref, scrollPosition = 0, onSave, onAfterRestore }) => {
  useLayoutEffect(() => {
    const el = ref.current;
    let observer = null;

    const tryRestore = () => {
      const maxScrollPos = el.scrollHeight - el.clientHeight;
      // Restore scroll position when content is tall enough
      if (maxScrollPos >= scrollPosition) {
        el.scrollTop = scrollPosition;
        observer?.disconnect();
        observer = null;
      }
      onAfterRestore?.();
    };
    tryRestore();
    // Content may not be fully rendered yet — observe resize to retry restoring scroll
    if (el.scrollTop < scrollPosition && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(tryRestore);
      observer.observe(el);
    }

    return () => observer?.disconnect();
  }, [ref, scrollPosition]);
  // Save scroll position on unmount to restore it on next mount
  useLayoutEffect(
    () => () => {
      const el = ref.current;
      if (!el) return;
      onSave(el.scrollTop);
    },
    [],
  );
};
