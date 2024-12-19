import cn from './TabButton.module.scss';

export const TabButton = ({ onClick, isActive, children, Icon }) => (
  <button onClick={onClick} className={isActive ? cn.activeButton : cn.button}>
    {Icon}
    {children}
  </button>
);
