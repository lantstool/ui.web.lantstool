import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Network.module.scss';

export const Network = () => {
  useManageRouting();
  return (
    <div className={cn.network}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
