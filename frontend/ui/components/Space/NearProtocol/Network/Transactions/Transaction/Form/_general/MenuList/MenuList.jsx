import { components } from 'react-select';
import cn from './MenuList.module.scss';

export const MenuList = ({ props, onClick, icon, title }) => {
  const onCloseMenu = () => {
    props.selectProps.onMenuClose();
  };

  return (
    <div>
      <components.MenuList {...props}>{props.children}</components.MenuList>
      <div className={cn.container} onClick={onCloseMenu}>
        <hr className={cn.border} />
        <button type="button" onClick={onClick} className={cn.option}>
          <span className={icon} />
          <h2 className={cn.title}>{title}</h2>
        </button>
      </div>
    </div>
  );
};
