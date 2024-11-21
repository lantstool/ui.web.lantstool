import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Network.module.scss';
import { useStoreState } from '@react-vault';

export const Network = () => {
  const isMinimized = useStoreState((state) => state.nearProtocol.isMinimize);

  useManageRouting();
  return (
    <div className={cn.network}>
      <Sidebar isMinimized={isMinimized} />
      <div className={isMinimized ? cn.minimized : cn.content}>
        <Outlet />
      </div>
    </div>
  );
};
