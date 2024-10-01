import { Outlet, useParams } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar.jsx';
import cn from './Network.module.scss';

export const Network = () => {
  const { networkId } = useParams();

  return (
    <div className={cn.network}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
