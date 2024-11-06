import cn from './Popper.module.scss';

export const Popper = ({ children, closeMenu, isOpen }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={cn.popper}>{children}</div>
      <div className={cn.background} onClick={closeMenu} />
    </>
  );
};
