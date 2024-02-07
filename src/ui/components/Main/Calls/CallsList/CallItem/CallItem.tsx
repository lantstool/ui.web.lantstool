import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './CallItem.module.css';

export const CallItem = ({ call, isActive }: any) => {
  return (
    <NavLink
      to={`${call.callId}`}
      className={cnm(cn.container, isActive && cn.active)}
    >
      <p className={cn.title}>{call.name}</p>
    </NavLink>
  );
};
