import cn from './Modal.module.scss';

export const Modal = ({ children, isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={cn.modal}>
        <div onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      <div className={cn.backstage} onMouseDown={closeModal} />
    </>
  );
};
