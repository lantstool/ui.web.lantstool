import { NavLink } from 'react-router-dom';
import cn from './LinkItem.module.scss';

export const LinkItem = ({ name, Icon, to, isSidebarMinimized }) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? cn.active : cn.container)} to={to}>
      <Icon style={cn.icon} />
      {!isSidebarMinimized && <h4 className={cn.title}>{name}</h4>}
    </NavLink>
  );
};
