import { useRef, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useStoreState } from '@react-vault';
import { debounce } from 'lodash';

export const useResizableSidebar = ({ initialWidth, onResizeEnd }) => {
  const isSidebarMinimized = useStoreState((store) => store.nearProtocol.isSidebarMinimized);
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(initialWidth);
  const nextWidth = useRef(initialWidth);

  // Applies CSS-defined min-width and dynamic max-width based on screen size
  const applyCssLimits = (value) => {
    if (!ref.current) return value;

    const style = getComputedStyle(ref.current);
    const min = parseFloat(style.minWidth);

    const screenWidth = window.innerWidth;
    const mainSidebarWidth = isSidebarMinimized ? 57 : 199; //Main sidebar width
    const max = screenWidth - 632 - mainSidebarWidth; // 632 - 10 padding, 622 - content width

    return Math.max(min, Math.min(max, value));
  };

  const debouncedResizeEnd = useMemo(
    () =>
      debounce((width) => {
        onResizeEnd?.(width);
      }, 100),
    [onResizeEnd],
  );

  // Applies width with limits and triggers onResizeEnd callback
  const updateWidth = useCallback((value) => {
    const limited = applyCssLimits(value);
    if (nextWidth.current === limited) return;

    nextWidth.current = limited;
    if (ref.current) ref.current.style.width = `${limited}px`;

    debouncedResizeEnd(limited);
  }, []);

  // Runs once on mount: ensures initial width respects updated zoom/screen
  useLayoutEffect(() => {
    if (ref.current) updateWidth(ref.current.offsetWidth);
  }, []);

  // Updates width on every window resize to avoid overflowing content area
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) updateWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarMinimized]);

  useEffect(() => {
    if (!ref.current) return;

    const current = ref.current.offsetWidth;
    const limited = applyCssLimits(current);

    if (current !== limited) {
      ref.current.classList.remove('resizing');
      requestAnimationFrame(() => {
        nextWidth.current = limited;
        ref.current.style.width = `${limited}px`;
        onResizeEnd?.(limited);
      });
    }
  }, [isSidebarMinimized]);

  // Called on every mousemove while dragging
  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const delta = e.clientX - startX.current;
    const newWidth = applyCssLimits(startWidth.current + delta);

    nextWidth.current = newWidth;
    ref.current.style.width = `${newWidth}px`;
  };

  // Finalizes drag and triggers onResizeEnd callback
  const handleMouseUp = () => {
    isDragging.current = false;
    ref.current?.style.removeProperty('transition');
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    onResizeEnd?.(nextWidth.current);
  };

  // Starts dragging: records initial mouse position and width
  const handleMouseDown = (e) => {
    if (!ref.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = ref.current.offsetWidth;
    ref.current.style.transition = 'none';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Memoized width value with CSS limits applied
  const newWidth = useMemo(() => applyCssLimits(initialWidth), [initialWidth]);

  return {
    sidebarRef: ref,
    handleMouseDown,
    newWidth,
  };
};
