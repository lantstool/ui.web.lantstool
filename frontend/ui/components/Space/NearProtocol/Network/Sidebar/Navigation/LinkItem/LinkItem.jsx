import { NavLink } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import cn from './LinkItem.module.scss';

export const LinkItem = ({ name, Icon, to }) => {
  const isMinimized = useStoreState((state) => state.nearProtocol.isMinimize);

  return (
    <NavLink className={({ isActive }) => (isActive ? cn.active : cn.container)} to={to}>
      <Icon style={cn.icon} />
      {!isMinimized && <h4 className={cn.title}>{name}</h4>}
    </NavLink>
  );
};
