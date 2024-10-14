import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';

export const Space = () => {
  useManageRouting();
  return <Outlet />;
};
