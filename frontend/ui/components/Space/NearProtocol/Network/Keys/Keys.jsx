import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';

export const Keys = () => {
  useManageRouting();
  return <Outlet />;
};
