import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import cn from './Keys.module.scss';

export const Keys = () => {
  useManageRouting();
  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
