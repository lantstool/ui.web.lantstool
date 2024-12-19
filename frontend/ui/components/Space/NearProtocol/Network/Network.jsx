import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar.jsx';
import { useManageRouting } from './useManageRouting.js';
import cn from './Network.module.scss';
import cnm from 'classnames';
import { useStoreState } from '@react-vault';

export const Network = () => {
  const isMinimized = useStoreState((state) => state.nearProtocol.isMinimize);
  useManageRouting();

  return (
    <div className={cnm(cn.network, isMinimized && cn.networkMinimized)}>
      <Sidebar isMinimized={isMinimized} />
      <div className={cn.contentWrapper}>
        <div className={cnm(cn.content, isMinimized && cn.contentMinimized)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
