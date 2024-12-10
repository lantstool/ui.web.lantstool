import cn from './MenuItem.module.scss';

export const MenuItem = ({ label, icon, onClick, closeMenu, closeAfterClick = true }) => {
  const handleClick = () => {
    onClick();
    closeAfterClick && closeMenu();
  };

  return (
    <button className={cn.menuItem} onClick={handleClick}>
      <span className={cn[icon]} />
      <span className={cn.label}>{label}</span>
    </button>
  );
};
