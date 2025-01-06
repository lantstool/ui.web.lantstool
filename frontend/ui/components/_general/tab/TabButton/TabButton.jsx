import cn from './TabButton.module.scss';

export const TabButton = ({ type = 'button', onClick, isActive, children, Icon }) => (
  <button type={type} onClick={onClick} className={isActive ? cn.activeButton : cn.button}>
    {Icon}
    {children}
  </button>
);
