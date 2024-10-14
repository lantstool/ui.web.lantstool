import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';

export const SpaceId = () => {
  useManageRouting();
  return <Outlet />;
};
