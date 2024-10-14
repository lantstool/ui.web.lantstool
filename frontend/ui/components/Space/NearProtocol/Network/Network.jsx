import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import cn from './Network.module.scss';

export const Network = () => (
  <div className={cn.network}>
    <Sidebar />
    <Outlet />
  </div>
);
