import cn from './Modal.module.css';


export const Modal = ({ children, isOpen, close }) => {
  if (!isOpen) return null;

  return (
    <div className={cn.backstage} onMouseDown={close}>
      <div className={cn.modal} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
