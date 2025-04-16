import { NavLink } from 'react-router-dom';
import cn from './TabLink.module.scss';

export const TabLink = ({ to, children }) => (
  <NavLink className={({ isActive }) => (isActive ? cn.activeTab : cn.tab)} to={to}>
    {children}
  </NavLink>
);
