import { useStoreEffect } from '../../../react-vault/index.js';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from './Topbar/Topbar.jsx';
import { useLoader } from '../hooks/useLoader.js';
import cn from './App.module.scss';

export const App = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initApp = useStoreEffect((store) => store.initApp);
  const [isLoading] = useLoader(initApp, { navigate, params });

  if (isLoading) return null;

  return (
    <div className={cn.app}>
      <Topbar />
      <Outlet />
    </div>
  );
};
