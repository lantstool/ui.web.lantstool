import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Network.module.scss';
import cnm from 'classnames';
import { useStoreState } from '@react-vault';

export const Network = () => {
  const isSidebarMinimized = useStoreState((state) => state.nearProtocol.isSidebarMinimized);
  useManageRouting();

  return (
    <div className={cnm(cn.network, isSidebarMinimized && cn.networkMinimized)}>
      <Sidebar isSidebarMinimized={isSidebarMinimized} />
      <div className={cn.contentWrapper}>
        <div className={cnm(cn.content, isSidebarMinimized && cn.contentMinimized)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
