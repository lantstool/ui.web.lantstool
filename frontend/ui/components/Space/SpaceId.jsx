import { Outlet } from 'react-router-dom';
import { useHandleNavigation } from './useHandleNavigation.js';

export const SpaceId = () => {
  useHandleNavigation();
  return <Outlet />;
};
