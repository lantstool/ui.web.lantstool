import { components } from 'react-select';
import cn from './MenuList.module.scss';

export const MenuList = ({ props, menuParams }) => {
  const onClick = () => {
    props.selectProps.onMenuClose();
  };

  return (
    <div>
      <components.MenuList {...props}>{props.children}</components.MenuList>
      {menuParams && (
        <div className={cn.container} onClick={onClick}>
          <hr className={cn.border} />
          <button type="button" onClick={menuParams.onClick} className={cn.option}>
            <span className={menuParams.icon} />
            <h2 className={cn.title}>{menuParams.title}</h2>
          </button>
        </div>
      )}
    </div>
  );
};
