import { ReactElement } from 'react';
import cn from './Modal.module.css';

type Props = {
  children: ReactElement;
  isOpen: boolean;
  close: any;
};

export const Modal = ({ children, isOpen, close }: Props) => {
  const handleMouseDown = (e: any) => {
    const modal = document.querySelector(`.${cn.modal}`);
    if (modal && !modal.contains(e.target)) {
      close();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn.backstage} onMouseDown={handleMouseDown}>
      <div className={cn.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
