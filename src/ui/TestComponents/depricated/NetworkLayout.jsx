import { useStoreEffect } from '../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useNavigateToSavedRoute } from '../../../store/slices/navigation/useNavigateToSavedRoute.js';
import { Sidebar } from '../../components/Space/NearProtocol/Sidebar/Sidebar.jsx';
import cn from './NetworkLayout.module.css';

export const NetworkLayout = () => {
  const getNetwork = useStoreEffect((store) => store.networks.getNetwork);
  const [loading, setLoading] = useState(true);
  const { currentNetworkId } = useParams();

  useNavigateToSavedRoute('/:currentNetworkId');

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getNetwork(currentNetworkId);
      setLoading(false);
    })();
  }, [currentNetworkId]);

  if (loading) return null;

  return (
    <div className={cn.root}>
      <Sidebar />
      <div className={cn.main}>
        <Outlet />
      </div>
    </div>
  );
};
