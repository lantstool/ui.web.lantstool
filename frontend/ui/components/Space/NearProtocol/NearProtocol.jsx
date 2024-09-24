import { Outlet } from 'react-router-dom';
import cn from './NearProtocol.module.scss';

export const NearProtocol = () => {
  return (
    <div className={cn.container}>
      <Outlet />
    </div>
  );
};
