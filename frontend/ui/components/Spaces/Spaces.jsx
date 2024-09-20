import { Outlet } from 'react-router-dom';
import cn from './Spaces.module.scss';

export const Spaces = () => {
  return (
    <div className={cn.container}>
      <span>Spaces</span>
      <Outlet />
    </div>
  );
};
