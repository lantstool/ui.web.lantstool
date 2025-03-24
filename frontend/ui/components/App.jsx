import { useStoreEffect } from '@react-vault';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Topbar } from './Topbar/Topbar.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { useManageRouting } from './useManageRouting.js';
import { useHasToHideTopbar } from './useHasToHideTopbar.js';
import { useEmitVisitPageEvent } from './useEmitVisitPageEvent.js';
import { ToastMessage } from '@gc/ToastMessage/ToastMessage.jsx';
import cnm from 'classnames';
import cn from './App.module.scss';

export const App = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initApp = useStoreEffect((store) => store.initApp);
  const [isLoading] = useLoader(initApp, { navigate, params });
  const hasToHideTopbar = useHasToHideTopbar();

  useManageRouting();
  useEmitVisitPageEvent();

  if (isLoading) return null;

  return (
    <div className={cnm(cn.app, hasToHideTopbar && cn.appWithoutTopbar)}>
      {!hasToHideTopbar && <Topbar />}
      <div className={cn.content}>
        <Outlet />
      </div>
      <ToastMessage />
    </div>
  );
};
