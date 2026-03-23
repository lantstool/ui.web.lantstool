import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from './Popper.module.scss';

export const Popper = ({ children, closeMenu, isOpen, anchorEl, position = 'left' }) => {
  const popperRef = useRef(null);
  const [styles, setStyles] = useState({ top: 0, left: 0 });
  const [isMeasured, setIsMeasured] = useState(false);

  useEffect(() => {
    if (isOpen && anchorEl) {
      // Prevents visible flicker by ensuring the popper appears only after its position is correctly calculated.
      setIsMeasured(false);

      requestAnimationFrame(() => {
        const anchorRect = anchorEl.getBoundingClientRect();
        const popperWidth = popperRef.current?.offsetWidth || 0;

        const top = anchorRect.bottom + window.scrollY + 5;
        const left =
          position === 'right'
            ? anchorRect.left + window.scrollX
            : anchorRect.right + window.scrollX - popperWidth;

        setStyles({ top, left });
        setIsMeasured(true);
      });
    }
  }, [isOpen, anchorEl, position]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={popperRef}
      className={cn.popper}
      style={{
        position: 'absolute',
        top: `${styles.top}px`,
        left: `${styles.left}px`,
        zIndex: 9999,
        visibility: isMeasured ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    document.getElementById('popper'),
  );
};
