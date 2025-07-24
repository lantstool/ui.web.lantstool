import { useRef, useMemo } from 'react';

export const useResizableSidebar = ({ initialWidth, onResizeEnd }) => {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(initialWidth);
  const nextWidth = useRef(initialWidth);

  // Applies CSS-defined min-width and max-width limits
  const applyCssLimits = (value) => {
    if (!ref.current) return value;

    const style = getComputedStyle(ref.current);
    const min = parseFloat(style.minWidth);
    const max = parseFloat(style.maxWidth);

    return Math.max(min, Math.min(max, value));
  };


  // Called on every mousemove while dragging
  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const delta = e.clientX - startX.current;
    const newWidth = applyCssLimits(startWidth.current + delta);

    nextWidth.current = newWidth;
    ref.current.style.width = `${newWidth}px`;
  };
  // Finalize drag and trigger onResizeEnd callback
  const handleMouseUp = () => {
    onResizeEnd?.(nextWidth.current);
    isDragging.current = false;

    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  // Start dragging: record initial mouse position and width
  const handleMouseDown = (e) => {
    if (!ref.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = ref.current.offsetWidth;

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const newWidth = useMemo(() => applyCssLimits(initialWidth), [initialWidth]);

  return {
    sidebarRef: ref,
    handleMouseDown,
    newWidth,
  };
};
