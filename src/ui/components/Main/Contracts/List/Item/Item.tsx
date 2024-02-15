import { NavLink } from 'react-router-dom';
import cnm from 'classnames';
import cn from './Item.module.css';

export const Item = ({ contractId, name, isActive }: any) => (
  <NavLink to={contractId} className={cnm(cn.container, isActive && cn.active)}>
    <p className={cn.title}>{name}</p>
  </NavLink>
);
