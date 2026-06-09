import { useEffect } from 'react';

// Call `onWidthChange` (debounced 150ms) only on the scroller width change.
// Skip ResizeObserver runs from height changes or at first render.
export const useReWrapOnResize = (scrollerRef, resetKey, onWidthChange) => {
  useEffect(() => {
    const scroller = scrollerRef.current;
    let lastWidth = scroller.clientWidth;
    let debounceTimer = null;

    const resizeObserver = new ResizeObserver(() => {
      const width = scroller.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(onWidthChange, 150);
    });
    resizeObserver.observe(scroller);
    return () => {
      clearTimeout(debounceTimer);
      resizeObserver.disconnect();
    };
  }, [resetKey]);
};
