import { useStoreEffect } from '@react-vault';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from './Topbar/Topbar.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { useManageRouting } from './useManageRouting.js';
import { ToastMessage } from './_general/ToastMessage/ToastMessage.jsx';
import cn from './App.module.scss';

export const App = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initApp = useStoreEffect((store) => store.initApp);
  const [isLoading] = useLoader(initApp, { navigate, params });
  useManageRouting();

  if (isLoading) return null;

  return (
    <div className={cn.app}>
      <Topbar />
      <div className={cn.content}>
        <Outlet />
      </div>
      <ToastMessage />
    </div>
  );
};
