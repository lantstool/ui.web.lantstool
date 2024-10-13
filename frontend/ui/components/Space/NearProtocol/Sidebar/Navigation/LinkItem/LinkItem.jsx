import { NavLink } from 'react-router-dom';
import cn from './LinkItem.module.scss';

export const LinkItem = ({ isOpen, name, Icon, to }) => (
  <NavLink className={({ isActive }) => (isActive ? cn.active : cn.container)} to={to}>
    <Icon style={cn.icon} />
    {isOpen && <h4 className={cn.title}>{name}</h4>}
  </NavLink>
);
