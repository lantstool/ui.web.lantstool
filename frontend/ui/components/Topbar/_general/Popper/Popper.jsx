import { useRef, useEffect } from 'react';
import cn from './Popper.module.scss';

export const Popper = ({ children, closeMenu, isOpen, position = 'left' }) => {
  const popperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popperRef.current && !popperRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div ref={popperRef} className={position === 'left' ? cn.popper : cn.popperRight}>
        {children}
      </div>
    </>
  );
};
