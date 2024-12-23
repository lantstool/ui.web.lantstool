import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import cnm from 'classnames';
import cn from './LinkItem.module.scss';

export const LinkItem = ({ name, icon, activeIcon, to, isSidebarMinimized }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <NavLink className={match ? cn.active : cn.container} to={to}>
      <span className={cnm(cn.iconContainer, match ? activeIcon : icon)} />
      {!isSidebarMinimized && <h4 className={cn.title}>{name}</h4>}
    </NavLink>
  );
};
