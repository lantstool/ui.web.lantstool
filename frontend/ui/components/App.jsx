import { useStoreAction, useStoreEffect } from '../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader.js';

export const App = () => {
  const initApp = useStoreEffect((store) => store.initApp);
  const [isLoading] = useLoader(initApp);

  return isLoading ? null : <Outlet />;
};
